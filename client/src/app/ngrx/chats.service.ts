import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { of, combineLatest } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { AppState } from './app.state';

function api(path: string) {
  return `http://localhost:4000${path}`;
}

@Injectable()
export class ChatsService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  getChats() {
    return this.store
      .select(state => state.chats)
      .pipe(
        mergeMap(chats => {
          if (chats && chats.length) {
            return of(chats);
          }

          return this.fetchChats().pipe(
            mergeMap(chats =>
              combineLatest(chats.map(chat => this.resolveChat(chat))),
            ),
          );
        }),
      );
  }

  getMessages(chatId: ID) {
    return this.fetchChatMessages(chatId);
  }

  private fetchChats() {
    return this.http.get<ChatsResponse>(api('/chats'));
  }

  private fetchUser(link: string) {
    return this.http.get<UserResponse>(link);
  }

  private fetchChatMessages(id: string) {
    return this.http.get<ChatMessagesResponse>(api(`/chats/${id}/messages`));
  }

  private resolveChat(chat: ChatResponse) {
    return combineLatest(chat.members.map(link => this.fetchUser(link))).pipe(
      map(members => {
        return {
          ...chat,
          messages: [],
          members,
        };
      }),
    );
  }
}

export type Link = string;
export type ID = string;

export interface ChatResponse {
  id: ID;
  members: Link[];
  messages: Link;
  recentMessage: MessageResponse;
}

export type ChatsResponse = ChatResponse[];

export interface UserResponse {
  id: ID;
  name: string;
}

export type ChatMessagesResponse = MessageResponse[];

export interface MessageResponse {
  id: ID;
  text: string;
  createdAt: string;
  sender: UserResponse;
  recipient: UserResponse;
}
