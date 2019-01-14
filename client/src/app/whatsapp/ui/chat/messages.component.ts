import { Component, Input } from '@angular/core';
import { User, Message } from '../../types';

@Component({
  selector: 'message',
  template: `
    <div class="container" [ngClass]="{ 'is-owner': isOwner }">
      <avatar *ngIf="first && !isOwner" [name]="message.sender.name"></avatar>
      <div
        class="text"
        (click)="opened = !opened"
        [ngClass]="{
          'has-avatar': first,
          'is-owner': isOwner,
          'has-no-avatar': !first
        }"
      >
        {{ message.text }}
        <div *ngIf="opened" class="details">
          {{ message.createdAt | date: 'medium' }}
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin: 2px 0;
      }

      .is-owner.container {
        justify-content: flex-end;
      }

      avatar {
        width: 40px;
        height: 40px;
      }

      .text {
        padding: 10px;
        background-color: #673ac2;
        color: #fff;
        text-align: left;
      }

      .text.is-owner {
        background-color: #f5f5f5;
        color: #000;
        text-align: right;
      }

      .text.has-avatar {
        margin-left: 15px;
      }

      .text.has-no-avatar {
        margin-left: 55px;
      }

      .details {
        font-size: 10px;
        color: #fff;
        padding-top: 5px;
      }

      .is-owner .details {
        color: #999;
      }
    `,
  ],
})
export class MessageComponent {
  @Input() isOwner: boolean;
  @Input() message: Message;
  @Input() first = false;
  @Input() grouped = false;

  opened = false;
}

@Component({
  selector: 'chat-messages',
  template: `
    <div
      *ngFor="
        let message of messages;
        index as i;
        first as isFirst;
        trackBy: trackById
      "
    >
      <message
        [isOwner]="isOwner(message)"
        [message]="message"
        [grouped]="isFirst || sameAuthors(messages[i - 1], message)"
        [first]="isFirst || !sameAuthors(messages[i - 1], message)"
      ></message>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        flex: 1;
        padding: 15px;
        height: 100%;
        overflow-y: scroll;
      }
    `,
  ],
})
export class ChatMessagesComponent {
  @Input() owner: User;
  @Input() messages: Message[];

  sameAuthors(a: Message, b: Message) {
    return a.sender.id === b.sender.id;
  }

  isOwner(message: Message) {
    return message.sender.id === this.owner.id;
  }

  trackById(_: number, msg: Message) {
    return msg && msg.id;
  }
}
