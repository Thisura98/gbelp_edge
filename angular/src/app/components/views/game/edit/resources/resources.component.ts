import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';
import { GAME_RESOURCE_TYPE, getGameSidebarItems } from 'src/app/constants/constants';
import { GameEntry, GameListing } from 'src/app/models/game/game';
import { GameProject, GameProjectResource } from 'src/app/models/game/game_project';
import { ApiService } from 'src/app/services/api.service';
import { DialogService } from 'src/app/services/dialog.service';
import { UserService } from 'src/app/services/user.service';

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
  imageResources: GameProjectResource[] = [];
  soundResources: GameProjectResource[] = [];

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
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userService.routeOutIfLoggedOut();
    this.activatedRoute.queryParams.subscribe(values => {
      this.editingGameId = values.gameId;
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

  getAssetDisplayName(asset: GameProjectResource): string{
    const split = asset.filename.split('/');
    return split[Math.max(0, split.length - 1)];
  }

  assetSelected(asset: GameProjectResource){
    if (this.selectedResource?._id == asset._id){
      this.selectedResource = undefined;
      return;
    }
    this.selectedResource = asset;

  }

  /* Private Functions */

  private loadData(){
    this.apiService.getGame(this.editingGameId!).subscribe({
      next: (data) => {
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
          this.dialogService.showDismissable('Upload Successful!', '');
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

    this.imageResources = project.resources.filter(v => {
      return v.type == GAME_RESOURCE_TYPE.IMAGE;
    })

    this.soundResources = project.resources.filter(v => {
      return v.type == GAME_RESOURCE_TYPE.SOUND;
    });
  }

}
