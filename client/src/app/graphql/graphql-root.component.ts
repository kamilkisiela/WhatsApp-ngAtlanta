import { Component, OnInit } from '@angular/core';
import { Loona } from '@loona/angular';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Chat, Pages, PageChangeEvent, MessageEvent, ID } from '../whatsapp';

@Component({
  selector: 'app-graphql-root',
  template: `
    <whatsapp
      [chats]="chats | async"
      [chat]="chat | async"
      [page]="page"
      (message)="onMessage($event)"
      (star)="toggleStar($event)"
      (page)="onPage($event)"
    ></whatsapp>
  `,
})
export class GraphQLRootComponent {
  page: Pages = 'chats';
  chats: Observable<Chat[]>;
  chat: Observable<Chat>;

  constructor() {}

  onPage(event: PageChangeEvent) {
    this.page = event.page;

    if (this.page === 'chats') {
      this.chat = null;
      this.loadChats();
    }

    if (this.page === 'chat') {
      this.chats = null;
      this.loadChat(event.data.chat.id);
    }
  }

  onMessage(event: MessageEvent) {}

  toggleStar(chatId: ID) {}

  loadChats() {}

  loadChat(id: ID) {}
}
