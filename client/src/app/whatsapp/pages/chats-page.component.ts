import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Chat } from '../types';

@Component({
  selector: 'whatsapp-chats-page',
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <span>WhatsApp</span>
        <span class="spacer"></span>
        <ng-content></ng-content>
      </mat-toolbar-row>
    </mat-toolbar>

    <div *ngIf="hasChats">
      <chat-item
        *ngFor="let chat of chats"
        (click)="onChat.emit(chat)"
        (mouseenter)="onHover.emit(chat.id)"
        [chat]="chat"
      ></chat-item>
    </div>

    <whatsapp-loading *ngIf="!hasChats"></whatsapp-loading>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
    `,
  ],
})
export class ChatsPageComponent {
  @Input() chats: Chat[] = [];
  @Output('chat') onChat = new EventEmitter<Chat>();
  @Output('hover') onHover = new EventEmitter<Chat['id']>();

  get hasChats() {
    return this.chats && this.chats.length > 0;
  }
}
