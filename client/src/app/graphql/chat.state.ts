import { State, Update, Context } from '@loona/angular';
import gql from 'graphql-tag';

import NewMessage from './queries/new-message.graphql';

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

        data.messages.push({
          id,
          __typename: 'Message',
        });
      },
    );
  }
}
