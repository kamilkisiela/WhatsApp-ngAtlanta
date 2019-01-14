import { Chat, User } from '../types';

export function pickOtherUser(chat: Chat): User {
  return chat.members[1];
}

export function pickOwner(chat: Chat): User {
  return chat.members[0];
}
