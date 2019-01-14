import { ChatAction, ActionTypes } from './chat.actions';
import { ChatState } from './chat.state';

export const initialState: ChatState = [];

export function chatReducer(
  state = initialState,
  action: ChatAction,
): ChatState {
  switch (action.type) {
    case ActionTypes.LoadChatsSuccess: {
      const { chats } = action.payload;

      return chats;
    }

    case ActionTypes.LoadMessagesSuccess: {
      const { chatId, messages } = action.payload;

      return state.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages,
          };
        }

        return chat;
      });
    }

    case ActionTypes.SendMessageSuccess: {
      const { chatId, message } = action.payload;

      return state.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: [...chat.messages, message],
          };
        }

        return chat;
      });
    }

    default:
      return state;
  }
}
