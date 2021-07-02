import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'dashboard-sessioninfo',
  templateUrl: './sessioninfo.component.html',
  styleUrls: ['./sessioninfo.component.css']
})
export class SessioninfoComponent implements OnInit {

  startTime: String = "--:--"
  endTime: String = "--:--"

  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {
    // this.startTime = new BehaviorSubject<String>("--:--");
    // this.endTime = new BehaviorSubject<String>("--:--");
  }

  ngOnInit(): void {
    const userId = this.userService.getUserAndToken().userId!;
    this.apiService.getLatestSessionDetailsFor(userId).subscribe(response => {
      if (response.success){
        // this.startTime.next(this.formatTime(response.data.start_time));
        // this.endTime.next(this.formatTime(response.data.end_time));
        this.startTime = this.formatTime(response.data.start_time);
        this.endTime = this.formatTime(response.data.end_time);
      }
    });
  }

  formatTime(value: string): string{
    return formatDate(value, 'MMM d, y, h:mm:ss a', 'en-US');
  }

  showGame(){
    const gameUrl = 'http://localhost/fs/demogame/index.html';
    window.open(gameUrl, '_blank')?.focus();
  }

  clearStats(){
    const userId = this.userService.getUserAndToken().userId!;
    this.apiService.clearHistories(userId).subscribe(r => {
      if (r.success){
        window.location.reload();
      }
    });
  }

}
