import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of, combineLatest } from 'rxjs';
import { mergeMap, catchError, first, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import {
  ChatAction,
  ActionTypes,
  LoadChatsSuccess,
  LoadChatsFailure,
  LoadMessagesSuccess,
  LoadMessagesFailure,
} from './chat.actions';
import { User } from '../../whatsapp';
import { ChatsService } from '../chats.service';

@Injectable()
export class ChatEffects {
  constructor(
    protected actions$: Actions<ChatAction>,
    protected store$: Store<AppState>,
    protected chats: ChatsService,
  ) {}

  @Effect()
  loadChats$: Observable<ChatAction> = this.actions$.pipe(
    ofType(ActionTypes.LoadChats),
    mergeMap(_ => {
      return this.chats.getChats().pipe(
        mergeMap(chats => of(new LoadChatsSuccess({ chats }))),
        catchError(() => of(new LoadChatsFailure())),
      );
    }),
  );

  @Effect()
  loadMessages$: Observable<ChatAction> = this.actions$.pipe(
    ofType(ActionTypes.LoadMessages),
    mergeMap(action =>
      this.store$
        .select(state => state.chats.find(c => c.id === action.payload.chatId))
        .pipe(first()),
    ),
    mergeMap(chat =>
      this.chats
        .getMessages(chat.id)
        .pipe(
          mergeMap(messages =>
            of(new LoadMessagesSuccess({ messages, chatId: chat.id })),
          ),
        ),
    ),
    catchError(() => of(new LoadMessagesFailure())),
  );
}
