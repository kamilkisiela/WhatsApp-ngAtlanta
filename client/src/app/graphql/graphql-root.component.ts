import { Component, OnInit } from '@angular/core';
import { Loona } from '@loona/angular';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Chat, Pages, PageChangeEvent, MessageEvent, ID } from '../whatsapp';
import GetChats from './queries/get-chats.graphql';

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
    >
      <select-tool-button tool="loona"></select-tool-button>
    </whatsapp>
  `,
})
export class GraphQLRootComponent {
  page: Pages = 'chats';
  chats: Observable<Chat[]>;
  chat: Observable<Chat>;

  constructor(private loona: Loona) {}

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

  loadChats() {
    this.chats = this.loona
      .query(GetChats)
      .valueChanges.pipe(pluck('data', 'chats'));
  }

  loadChat(id: ID) {}
}
