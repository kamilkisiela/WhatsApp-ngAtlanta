import { Component, OnInit } from '@angular/core';
import {
  Chat,
  Pages,
  PageChangeEvent,
  MessageEvent,
  pickOtherUser,
} from '../whatsapp';

const rachel = {
  id: '1',
  name: 'Rachel Green',
};

const chandler = {
  id: '2',
  name: 'Chandler Bing',
};

const rachelAndChandler = {
  id: '1',
  messages: [
    {
      id: '1',
      createdAt: new Date().toString(),
      text: 'Hi!',
      sender: rachel,
      recipient: chandler,
    },
    {
      id: '1',
      createdAt: new Date().toString(),
      text: 'Are you there?',
      sender: rachel,
      recipient: chandler,
    },
    {
      id: '3',
      createdAt: new Date().toString(),
      text: 'Oh hello!',
      sender: chandler,
      recipient: rachel,
    },
    {
      id: '4',
      createdAt: new Date().toString(),
      text: 'Fine, you?',
      sender: chandler,
      recipient: rachel,
    },
  ],
  get recentMessage() {
    return rachelAndChandler.messages[rachelAndChandler.messages.length - 1];
  },
  members: [rachel, chandler],
};

const chandlerAndRachel = {
  id: '2',
  messages: [
    {
      id: '5',
      createdAt: new Date().toString(),
      text: 'How are you?',
      sender: rachel,
      recipient: chandler,
    },
    {
      id: '6',
      createdAt: new Date().toString(),
      text: 'Super nice!',
      sender: chandler,
      recipient: rachel,
    },
  ],
  get recentMessage() {
    return chandlerAndRachel.messages[chandlerAndRachel.messages.length - 1];
  },
  members: [chandler, rachel],
};

const chats = [rachelAndChandler, chandlerAndRachel];

@Component({
  selector: 'app-fake-root',
  template: `
    <whatsapp
      [chats]="chats"
      [chat]="chat"
      [page]="page"
      (message)="onMessage($event)"
      (page)="onPage($event)"
    >
      <select-tool-button tool="fake"></select-tool-button>
    </whatsapp>
  `,
})
export class FakeRootComponent {
  page: Pages = 'chats';
  chats: Chat[] = [];
  chat: Chat;

  onPage(event: PageChangeEvent) {
    this.page = event.page;

    if (this.page === 'chats') {
      setTimeout(() => {
        this.chat = null;
        this.chats = chats;
      }, 500);
    }

    if (this.page === 'chat') {
      setTimeout(() => {
        this.chat = event.data.chat;
        this.chats = [];
      }, 500);
    }
  }

  onMessage(event: MessageEvent) {
    setTimeout(() => {
      const chat = chats.find(c => c.id === event.chat.id);

      chat.messages.push({
        id: Math.random()
          .toString(16)
          .substr(2),
        createdAt: new Date().toString(),
        text: event.text,
        sender: event.sender,
        recipient: pickOtherUser(event.chat),
      });

      this.chat = event.chat;
    }, 500);
  }
}
