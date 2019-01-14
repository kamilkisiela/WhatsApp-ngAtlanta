import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat, Pages, PageChangeEvent, MessageEvent, ID } from '../whatsapp';

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

  constructor() {}

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

  loadChats() {}

  loadChat(id: ID) {}
}
