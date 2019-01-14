import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Chat, Pages, PageChangeEvent, MessageEvent, ID } from '../whatsapp';
import { LoadChats, LoadMessages } from './state/chat.actions';
import { AppState } from './app.state';

@Component({
  selector: 'app-ngrx-root',
  template: `
    <whatsapp
      [chats]="chats | async"
      [chat]="chat | async"
      [page]="page"
      (message)="onMessage($event)"
      (star)="toggleStar($event)"
      (page)="onPage($event)"
    >
      <select-tool-button tool="ngrx"></select-tool-button>
    </whatsapp>
  `,
})
export class NgRxRootComponent {
  page: Pages = 'chats';
  chats: Observable<Chat[]>;
  chat: Observable<Chat>;

  constructor(private store: Store<AppState>) {}

  onPage(event: PageChangeEvent) {
    this.page = event.page;

    if (this.page === 'chats') {
      this.chat = undefined;
      setTimeout(() => {
        this.loadChats();
      });
    }

    if (this.page === 'chat') {
      this.chats = undefined;
      setTimeout(() => {
        this.loadChat(event.data.chat.id);
      });
    }
  }

  onMessage(event: MessageEvent) {}

  toggleStar(chatId: ID) {}

  loadChats() {
    this.store.dispatch(new LoadChats());
    this.chats = this.store.select(state => state.chats);
  }

  loadChat(id: ID) {
    this.store.dispatch(
      new LoadMessages({
        chatId: id,
      }),
    );

    this.chat = this.store.select(state => state.chats.find(c => c.id === id));
  }
}
