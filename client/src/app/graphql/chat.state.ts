import {
  State,
  Update,
  Context,
  Resolve,
  Effect,
  EffectContext,
} from '@loona/angular';
import gql from 'graphql-tag';

import NewMessage from './queries/new-message.graphql';
import { ToggleStar } from './chat.actions';

@State()
export class ChatState {
  @Update(NewMessage)
  updateChat(info, context: Context) {
    const chatId = info.variables!.id;
    const { id } = info.result;

    context.patchFragment(
      gql`
        fragment chat on Chat {
          id
          messages {
            id
            __typename
          }
        }
      `,
      { id: chatId },
      data => {
        if (!data.messages || !data.messages.length) {
          data.messages = [];
        }

        const message = {
          id,
          __typename: 'Message',
        };

        data.messages.push(message);
        data.recentMessage = message;
      },
    );
  }

  @Resolve('Chat.starred')
  starred() {
    // default value
    return false;
  }

  @Effect(ToggleStar)
  toggleStar(action, context: EffectContext) {
    const id = action.id;

    context.patchFragment(
      gql`
        fragment chat on Chat {
          id
          starred
        }
      `,
      { id },
      data => {
        data.starred = !data.starred;
      },
    );
  }
}
