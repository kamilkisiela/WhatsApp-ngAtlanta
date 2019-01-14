export type ID = string;

export interface User {
  id: ID;
  name: string;
}

export interface Message {
  id: ID;
  text: string;
  createdAt: string;
  sender: User;
  recipient: User;
}

export interface Chat {
  id: ID;
  members: User[];
  messages?: Message[];
  recentMessage?: Message;
  starred?: boolean;
}

export interface MessageEvent {
  text: string;
  chat: Chat;
  sender: User;
}

export type Pages = 'chats' | 'chat';

export interface PageChangeEvent {
  page: Pages;
  data: any;
}
