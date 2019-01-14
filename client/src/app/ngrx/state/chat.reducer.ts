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

    case ActionTypes.SendMessageOptimistic: {
      const { chatId, message } = action.payload;

      return state.map(chat => {
        if (chat.id === chatId) {
          const messages = chat.messages || [];

          return {
            ...chat,
            messages: [...messages, message],
          };
        }

        return chat;
      });
    }

    case ActionTypes.SendMessageSuccess: {
      const { chatId, tempId, message } = action.payload;

      return state.map(chat => {
        if (chat.id === chatId) {
          const messages = chat.messages.map(m =>
            m.id === tempId ? message : m,
          );

          return {
            ...chat,
            messages,
            recentMessage: message,
          };
        }

        return chat;
      });
    }

    case ActionTypes.SendMessageFailure: {
      const { chatId, tempId } = action.payload;

      return state.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            messages: chat.messages.filter(m => m.id !== tempId),
          };
        }

        return chat;
      });
    }

    default:
      return state;
  }
}
