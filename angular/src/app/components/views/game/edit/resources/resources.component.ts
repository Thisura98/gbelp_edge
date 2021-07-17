import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicSidebarItem } from 'src/app/components/ui/dynamicsidebar/dynamicsidebar.component';
import { getGameSidebarItems } from 'src/app/constants/constants';
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

  private storedUploadFormData: FormData = new FormData();
  private editingGameId: number | undefined;
  
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
    this.startUpload();
  }

  /* Private Functions */

  private startUpload(){
    this.isUploading = true;
    this.uploadProgress = 0.0;

    this.apiService.uploadGameResource(this.storedUploadFormData, (progress) => {
      this.uploadProgress = progress;
    }).subscribe({
      next: (res) => {
        this.isUploading = false;
        if (res.success){
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

}
