import { Action } from '@ngrx/store';
import { Chat, Message, ID } from '../../whatsapp';

export enum ActionTypes {
  LoadChats = '[Chats] Load',
  LoadChatsSuccess = '[Chats] Load Success',
  LoadChatsFailure = '[Chats] Load Failure',

  LoadMessages = '[Chat] Load messages',
  LoadMessagesSuccess = '[Chat] Load messages Success',
  LoadMessagesFailure = '[Chat] Load messages Failure',

  SendMessage = '[Chat] Send message',
  SendMessageSuccess = '[Chat] Send message Success',
  SendMessageFailure = '[Chat] Send message Failure',
}

// All chats

export class LoadChats implements Action {
  readonly type = ActionTypes.LoadChats;
}

export class LoadChatsSuccess implements Action {
  readonly type = ActionTypes.LoadChatsSuccess;
  constructor(
    public payload: {
      chats: Chat[];
    },
  ) {}
}

export class LoadChatsFailure implements Action {
  readonly type = ActionTypes.LoadChatsFailure;
}

// Chat's messages

export class LoadMessages implements Action {
  readonly type = ActionTypes.LoadMessages;

  constructor(
    public payload: {
      chatId: ID;
    },
  ) {}
}

export class LoadMessagesSuccess implements Action {
  readonly type = ActionTypes.LoadMessagesSuccess;
  constructor(
    public payload: {
      chatId: ID;
      messages: Message[];
    },
  ) {}
}

export class LoadMessagesFailure implements Action {
  readonly type = ActionTypes.LoadMessagesFailure;
}

// New Message

export class SendMessage implements Action {
  readonly type = ActionTypes.SendMessage;

  constructor(
    public payload: {
      chatId: ID;
      text: string;
      recipient: ID;
    },
  ) {}
}

export class SendMessageSuccess implements Action {
  readonly type = ActionTypes.SendMessageSuccess;
  constructor(
    public payload: {
      chatId: ID;
      message: Message;
    },
  ) {}
}

export class SendMessageFailure implements Action {
  readonly type = ActionTypes.SendMessageFailure;
  constructor(
    public payload: {
      chatId: ID;
    },
  ) {}
}

export type ChatAction =
  | LoadChats
  | LoadChatsSuccess
  | LoadChatsFailure
  | LoadMessages
  | LoadMessagesSuccess
  | LoadMessagesFailure
  | SendMessage
  | SendMessageSuccess
  | SendMessageFailure;
