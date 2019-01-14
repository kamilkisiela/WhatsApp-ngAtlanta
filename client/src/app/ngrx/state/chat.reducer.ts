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

    default:
      return state;
  }
}
