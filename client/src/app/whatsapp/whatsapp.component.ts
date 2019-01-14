import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Chat, MessageEvent, Pages, PageChangeEvent, ID } from './types';

@Component({
  selector: 'whatsapp',
  template: `
    <ng-container [ngSwitch]="page">
      <whatsapp-chats-page
        *ngSwitchCase="'chats'"
        [chats]="chats"
        (chat)="goToChat($event)"
        (hover)="onPreload.emit($event)"
      >
        <ng-content></ng-content>
      </whatsapp-chats-page>

      <whatsapp-chat-page
        *ngSwitchCase="'chat'"
        [chat]="chat"
        (message)="onMessage.emit($event)"
        (star)="onStar.emit($event)"
        (back)="goToChats()"
      ></whatsapp-chat-page>

      <whatsapp-loading *ngSwitchDefault></whatsapp-loading>
    </ng-container>
  `,
  styles: [],
})
export class WhatsappComponent implements OnInit {
  @Input() page: Pages;
  @Input() chats: Chat[];
  @Input() chat: Chat;

  @Output('page') onPage = new EventEmitter<PageChangeEvent>();
  @Output('message') onMessage = new EventEmitter<MessageEvent>();
  @Output('star') onStar = new EventEmitter<ID>();
  @Output('preload') onPreload = new EventEmitter<ID>();

  ngOnInit() {
    this.onPage.emit({
      page: this.page,
      data: {},
    });
  }

  goToChats() {
    this.onPage.emit({
      page: 'chats',
      data: {},
    });
  }

  goToChat(chat: Chat) {
    this.onPage.emit({
      page: 'chat',
      data: {
        chat,
      },
    });
  }
}
