import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';
import { GameResourceType } from '../../../../../../../../commons/src/models/game/resources';
import { GameEntry } from '../../../../../../../../commons/src/models/game/game';
import { GameListing } from 'src/app/models/game/game';
import { GameProjectResource } from '../../../../../../../../commons/src/models/game/resources';
import { GameProject } from '../../../../../../../../commons/src/models/game/project';
// import { GameProject, GameProjectResource } from 'src/app/models/game/game_project';
import { ResourceUrlTransformPipe } from 'src/app/pipes/resource-url-transform.pipe';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';
import { getGameSidebarItems } from 'src/app/constants/constants';

@Component({
  selector: 'app-game-edit-resources',
  templateUrl: './resources.component.html',
  styleUrls: [
    './resources.component.css',
    '../../common/game.commonstyles.css'
  ],
})
export class GameEditResourcesComponent implements OnInit {

  @ViewChild('resourceUploadInput')
  resourceUploadInput: ElementRef | undefined;

  isUploading: boolean = false;
  uploadProgress: number = 0.0;

  selectedResource: GameProjectResource | undefined;
  isPlayingSound: boolean = false;
  audioTimeLabel: string = '';
  imageResources: GameProjectResource[] = [];
  soundResources: GameProjectResource[] = [];

  private player = new Audio();
  private storedUploadFormData: FormData = new FormData();
  private editingGameId: number | undefined;
  private gameListing: GameListing | undefined;
  
  get sidebarItems(): DynamicSidebarItem[]{
    return getGameSidebarItems('Resources');
  }

  constructor(
    private apiService: ApiService,
    private dialogService: DialogService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private resourceUrlTransformPipe: ResourceUrlTransformPipe
  ) { }

  ngOnInit(): void {
    this.userService.routeOutIfLoggedOut();
    this.activatedRoute.queryParams.subscribe(values => {
      this.editingGameId = values['gameId'];
      this.loadData();
    });
  }

  uploadResourceClicked(){
    this.resourceUploadInput?.nativeElement.click();
  }

  uploadInputFileChanged(event: any){
    const files: FileList = event.target.files;
    
    if (files.length == 0)
      return;

    const file = files[0];
    
    this.storedUploadFormData = new FormData();
    this.storedUploadFormData.append('uploaddata', file, file.name);
    this.storedUploadFormData.append('gameid', this.editingGameId!.toString());
    this.storedUploadFormData.append('projectid', this.gameListing!.entry.project_id!.toString());

    this.resourceUploadInput!.nativeElement.value = null;

    this.startUpload();
  }

  uploadCancelPressed(){
    // TODO: Actually cancel upload
    this.isUploading = false;
    window.location.reload();
  }

  assetSelected(asset: GameProjectResource){
    if (this.selectedResource?._id == asset._id){
      this.selectedResource = undefined;
      return;
    }
    this.selectedResource = asset;

  }

  previewSoundBtnPressed(){
    this.isPlayingSound = !this.isPlayingSound;

    if (!this.isPlayingSound){
      this.player.pause();
      return;
    }

    const filePath = this.resourceUrlTransformPipe.transform(this.selectedResource!.filename);

    this.audioTimeLabel = '';
    this.player.src = filePath;
    this.player.onended = (e) => {
      this.isPlayingSound = false;
    }
    this.player.ontimeupdate = (e) => {
      const cTimeRounded = Math.round(this.player.currentTime * 100) / 100.0;
      const durationRounded = Math.round(this.player.duration * 100.0) / 100.0;

      if (cTimeRounded == NaN || durationRounded == NaN)
        return;

      this.audioTimeLabel = `${cTimeRounded}/${durationRounded}`.replace('.', ':');
    }
    this.player.load();
    this.player.play();  

    // console.log('player loading...', this.player.readyState, filePath);
  }

  /**
   * Red Delete button on side panel for resources was clicked
   */
  resourceDeleteClicked(){

    this.dialogService.showYesNo(
      'Confirm Deletion', 
      'Are you sure you want to delete this resource?', () => {

        const gameId = this.editingGameId!.toString();
        const resourceId = this.selectedResource!._id;
        this.apiService.deleteGameResource(gameId, resourceId).subscribe({
          next: (r) => {
            if (r && r.success){
              switch(this.selectedResource!.type){
                case GameResourceType.IMAGE:
                  this.imageResources = this.imageResources.filter(v => v._id != resourceId);
                break;

                case GameResourceType.SOUND:
                  this.soundResources = this.soundResources.filter(v => v._id != resourceId);
                break;
              }
            }
            else{
              this.dialogService.showDismissable('Delete Failed', r.description);
            }
          },
          error: () => {
            this.dialogService.showDismissable('Delete Failed', 'Could not delete resource');
          }
        });

    });
  }

  /* Private Functions */

  private loadData(){
    this.apiService.getGame(this.editingGameId!).subscribe({
      next: (data) => {

        // console.log(JSON.stringify(data));

        if (data.data != undefined){
          this.gameListing = data.data;
          this.setGameProject(data.data.project);
        }
        else{
          this.handleDataLoadError('Could not load data');
        }
      },
      error: (err) => {
        this.handleDataLoadError(JSON.stringify(err));
      }
    });
  }

  private handleDataLoadError(message: any){
    this.dialogService.showDismissable('Error Load Data', message, undefined);
  }

  /**
   * Upload images with data set in `storedUploadFormData`
   */
  private startUpload(){
    this.isUploading = true;
    this.uploadProgress = 0.0;

    this.apiService.uploadGameResource(this.storedUploadFormData, (progress) => {
      this.uploadProgress = progress;
    }).subscribe({
      next: (res) => {
        this.isUploading = false;
        if (res.success){
          this.setGameProject(res.data);
          this.dialogService.showSnackbar('Upload Successful!');
        }
        else{
          this.dialogService.showDismissable('Error Uploading Resource', JSON.stringify(res.description));
        }
      },
      error: (err) => {
        this.isUploading = false;
        this.dialogService.showDismissable('Error Uploading Resource', JSON.stringify(err));
      },
      
    })
  }

  /**
   * Set the project file and update view related varaibles.
   */
  private setGameProject(project: GameProject){
    this.gameListing!.project = project;
    this.selectedResource = undefined;

    this.imageResources = project.resources.filter(v => {
      return v.type == GameResourceType.IMAGE;
    })

    this.soundResources = project.resources.filter(v => {
      return v.type == GameResourceType.SOUND;
    });
  }

}
