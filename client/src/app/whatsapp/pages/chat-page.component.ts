import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Chat, MessageEvent } from '../types';
import { pickOtherUser, pickOwner } from '../utils/chat';

@Component({
  selector: 'whatsapp-chat-page',
  template: `
    <mat-toolbar color="primary">
      <mat-toolbar-row>
        <button mat-icon-button (click)="back.emit()">
          <mat-icon>arrow_back</mat-icon>
        </button>

        <span class="spacer"></span> <span *ngIf="chat">{{ user.name }}</span>
        <span class="spacer"></span>

        <button *ngIf="chat" mat-icon-button [color]="chat.starred ? 'warn' : 'default'" (click)="star.emit(chat.id)">
          <mat-icon>favorite</mat-icon>
        </button>
        <button *ngIf="chat" mat-icon-button>
          <mat-icon>delete</mat-icon>
        </button>
      </mat-toolbar-row>
    </mat-toolbar>

    <chat-messages
      *ngIf="chat"
      [owner]="owner"
      [messages]="chat.messages"
    ></chat-messages>

    <message-form *ngIf="chat" (message)="onText($event)"></message-form>

    <whatsapp-loading *ngIf="!chat"></whatsapp-loading>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
      }

      .spacer {
        flex: 1 1 auto;
      }
    `,
  ],
})
export class ChatPageComponent {
  @Input() chat: Chat;
  @Output() back = new EventEmitter<void>();
  @Output('message') onMessage = new EventEmitter<MessageEvent>();
  @Output() star = new EventEmitter<MessageEvent>();

  get user() {
    return pickOtherUser(this.chat);
  }

  get owner() {
    return pickOwner(this.chat);
  }

  onText(text: string) {
    this.onMessage.emit({
      chat: this.chat,
      sender: this.owner,
      text,
    });
  }
}
