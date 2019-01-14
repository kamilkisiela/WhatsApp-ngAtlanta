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
  SendMessageSuccess,
  SendMessageFailure,
  SendMessageOptimistic,
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

  @Effect()
  optimistic$: Observable<ChatAction> = this.actions$.pipe(
    ofType(ActionTypes.SendMessage),
    mergeMap(action => {
      const { chatId, text, recipient } = action.payload;

      function selectMemberIf(condition: (m: User) => boolean) {
        return (state: AppState) =>
          state.chats.find(c => c.id === chatId).members.find(condition);
      }

      const recipient$ = this.store$
        .select(selectMemberIf(m => m.id === recipient))
        .pipe(take(1));
      const sender$ = this.store$
        .select(selectMemberIf(m => m.id !== recipient))
        .pipe(take(1));

      return combineLatest([recipient$, sender$]).pipe(
        mergeMap(([recipient, sender]) => {
          return of(
            new SendMessageOptimistic({
              chatId,
              message: {
                id: Math.random()
                  .toString(16)
                  .substr(2),
                createdAt: new Date().toString(),
                text,
                sender,
                recipient,
              },
            }),
          );
        }),
      );
    }),
  );

  @Effect()
  send$: Observable<ChatAction> = this.actions$.pipe(
    ofType(ActionTypes.SendMessageOptimistic),
    mergeMap(action => {
      const { chatId, message } = action.payload;
      const tempId = message.id;

      return this.chats
        .sendMessage(chatId, message.text, message.recipient.id)
        .pipe(
          mergeMap(message =>
            of(new SendMessageSuccess({ chatId, tempId, message })),
          ),
          catchError(() =>
            of(
              new SendMessageFailure({
                chatId,
                tempId,
              }),
            ),
          ),
        );
    }),
  );
}
