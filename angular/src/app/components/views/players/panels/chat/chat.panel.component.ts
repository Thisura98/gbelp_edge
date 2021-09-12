import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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
    new ChatMessage(1631472034, "Hello is anyone there?", "Regisa", "2", undefined),
    new ChatMessage(1631476034, "Yes its me. How are you?", "Thisura", "1", undefined),
    new ChatMessage(1631472034, "Hello is anyone there?", "Regisa", "2", undefined),
    new ChatMessage(1631476034, "Yes its me. How are you?", "Thisura", "1", undefined),
    new ChatMessage(1631472034, "Hello is anyone there?", "Regisa", "2", undefined),
    new ChatMessage(1631476034, "Yes its me. How are you?", "Thisura", "1", undefined),
    new ChatMessage(1631472034, "Hello is anyone there?", "Regisa", "2", undefined),
    new ChatMessage(1631476034, "Yes its me. How are you?", "Thisura", "1", undefined),
    new ChatMessage(1631472034, "Hello is anyone there?", "Regisa", "2", undefined),
    new ChatMessage(1631476034, "Yes its me. How are you?", "Thisura", "1", undefined),
    new ChatMessage(1631472034, "Hello is anyone there?", "Regisa", "2", undefined),
    new ChatMessage(1631476034, "Yes its me. How are you?", "Thisura", "1", undefined),
    new ChatMessage(1631472034, "Hello is anyone there?", "Regisa", "2", undefined),
    new ChatMessage(1631476034, "Yes its me. How are you?", "Thisura", "1", undefined),
    new ChatMessage(1631472034, "Hello is anyone there?", "Regisa", "2", undefined),
    new ChatMessage(1631476034, "Yes its me. How are you?", "Thisura", "1", undefined),
  ]

  @Output()
  sendMsg: EventEmitter<ChatMessage> = new EventEmitter();

  userId: string | undefined;

  constructor(
    private userService: UserService
  ){

  }
  
  ngOnInit(){
    this.userId = this.userService.getUserAndToken().user.userId!;
  }
}