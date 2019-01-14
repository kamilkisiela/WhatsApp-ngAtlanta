import { Component, Input } from '@angular/core';
import { Chat } from '../../types';
import { pickOtherUser } from '../../utils/chat';

@Component({
  selector: 'chat-item',
  template: `
    <button mat-button>
      <div class="container">
        <avatar [name]="user.name"></avatar>
        <div class="info">
          <div class="author">{{ user.name }}</div>
          <div class="message">{{ recentMessage }}</div>
        </div>
        <div class="spacer"></div>
        <mat-icon color="warn" *ngIf="chat.starred">favorite</mat-icon>
        <div class="date">
          {{
            chat.recentMessage
              ? (chat.recentMessage.createdAt | date: 'medium')
              : ''
          }}
        </div>
      </div>
    </button>
  `,
  styles: [
    `
      button {
        width: 100%;
      }

      .container {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 15px;
      }

      avatar {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        flex-shrink: 0;
        object-fit: cover;
      }

      .info {
        display: flex;
        padding-left: 30px;
        flex-direction: column;
        line-height: normal;
        text-align: left;
      }

      .author {
        font-weight: 500;
        font-size: 16px;
      }

      .message {
        font-weight: 300;
      }

      .spacer {
        flex: 1 1 auto;
      }

      .date {
        font-weight: 300;
        font-size: 12px;
        color: #555;
      }

      mat-icon[color="warn"] {
        padding-right: 30px;
      }
    `,
  ],
})
export class ChatItemComponent {
  @Input() chat: Chat;

  get user() {
    return pickOtherUser(this.chat);
  }

  get recentMessage() {
    if (!this.chat.recentMessage) {
      return 'No messages';
    }

    const prefix =
      this.chat.recentMessage.sender.id !== this.user.id ? 'You: ' : '';

    return `${prefix}${this.chat.recentMessage.text}`;
  }
}
