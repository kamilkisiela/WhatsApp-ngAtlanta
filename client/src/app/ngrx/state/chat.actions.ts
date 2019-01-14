import { Action } from '@ngrx/store';
import { Chat, Message, ID } from '../../whatsapp';

export enum ActionTypes {
  LoadChats = '[Chats] Load',
  LoadChatsSuccess = '[Chats] Load Success',
  LoadChatsFailure = '[Chats] Load Failure',
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

export type ChatAction = LoadChats | LoadChatsSuccess | LoadChatsFailure;
