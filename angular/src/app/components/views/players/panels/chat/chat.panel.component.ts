import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { DialogService } from "src/app/services/dialog.service";
import { UserService } from "src/app/services/user.service";
import { ChatMessage } from "../../../../../../../../commons/src/models/chat";

@Component({
  selector: 'app-player-panel-chat',
  templateUrl: './chat.panel.component.html',
  styleUrls: [
    './chat.panel.component.css'
  ]
})
export class PlayerChatPanelComponent implements OnInit, AfterViewChecked{

  @Input()
  messages: ChatMessage[] = [
    // new ChatMessage(1631472034, "Hello is anyone there?", "Regisa", "2", undefined),
    // new ChatMessage(1631476034, "Yes its me. How are you?", "Thisura", "1", undefined),
    // new ChatMessage(1631472034, "Hello is anyone there?", "Regisa", "2", undefined),
  ]

  @Output()
  sendMsg: EventEmitter<ChatMessage> = new EventEmitter();

  userId: string | undefined;
  typedMessage: string | undefined;

  @ViewChild('chatContainer')
  private chatContainer: ElementRef | undefined;

  private scrollDownOnNextCheck: boolean = false;

  constructor(
    private userService: UserService,
    private dialogService: DialogService
  ){}
  
  ngOnInit(){
    this.userId = this.userService.getUserAndToken().user.userId!;
  }

  ngAfterViewChecked(){
    if (this.scrollDownOnNextCheck){
      this.actualScrollToBottom();
    }
  }

  sendMessage(){
    const ts = Math.floor(Date.now());
    const content = this.typedMessage?.trim() ?? "";
    const sender = this.userService.getUserAndToken();

    if (content.length == 0){
      this.dialogService.showSnackbar('Cannot send message with empty text');
      return;
    }

    const msg = new ChatMessage(
      ts,
      content,
      sender.user.userName ?? "Anonymous",
      sender.user.userId ?? "-1",
      undefined
    );

    this.sendMsg.emit(msg);
    this.typedMessage = undefined;
    this.scrollToBottom();
  }

  /**
   * Focus to the bottom of the panel area
   */
  scrollToBottom(){
    if (this.chatContainer == undefined)
      return;
    this.scrollDownOnNextCheck = true;
  }

  private actualScrollToBottom(){
    const div = this.chatContainer!.nativeElement as HTMLDivElement;
    if (div.scrollHeight > div.clientHeight){
      div.scrollTo(0, div.scrollHeight - div.clientHeight);
    }
    this.scrollDownOnNextCheck = false;
  }
}