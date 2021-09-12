import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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
export class PlayerChatPanelComponent implements OnInit{

  @Input()
  messages: ChatMessage[] = [
    // new ChatMessage(1631472034, "Hello is anyone there?", "Regisa", "2", undefined),
    // new ChatMessage(1631476034, "Yes its me. How are you?", "Thisura", "1", undefined),
    // new ChatMessage(1631472034, "Hello is anyone there?", "Regisa", "2", undefined),
    // new ChatMessage(1631476034, "Yes its me. How are you?", "Thisura", "1", undefined),
    // new ChatMessage(1631472034, "Hello is anyone there?", "Regisa", "2", undefined),
    // new ChatMessage(1631476034, "Yes its me. How are you?", "Thisura", "1", undefined),
    // new ChatMessage(1631472034, "Hello is anyone there?", "Regisa", "2", undefined),
    // new ChatMessage(1631476034, "Yes its me. How are you?", "Thisura", "1", undefined),
    // new ChatMessage(1631472034, "Hello is anyone there?", "Regisa", "2", undefined),
    // new ChatMessage(1631476034, "Yes its me. How are you?", "Thisura", "1", undefined),
    // new ChatMessage(1631472034, "Hello is anyone there?", "Regisa", "2", undefined),
    // new ChatMessage(1631476034, "Yes its me. How are you?", "Thisura", "1", undefined),
    // new ChatMessage(1631472034, "Hello is anyone there?", "Regisa", "2", undefined),
    // new ChatMessage(1631476034, "Yes its me. How are you?", "Thisura", "1", undefined),
    // new ChatMessage(1631472034, "Hello is anyone there?", "Regisa", "2", undefined),
    // new ChatMessage(1631476034, "Yes its me. How are you?", "Thisura", "1", undefined),
  ]

  @Output()
  sendMsg: EventEmitter<ChatMessage> = new EventEmitter();

  userId: string | undefined;

  typedMessage: string | undefined;

  constructor(
    private userService: UserService,
    private dialogService: DialogService,
  ){

  }
  
  ngOnInit(){
    this.userId = this.userService.getUserAndToken().user.userId!;
  }

  sendMessage(){
    const ts = Math.floor(Date.now() / 1000);
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
  }
}