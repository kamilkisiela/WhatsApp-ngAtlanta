import gql from 'graphql-tag';

import { MessageFragment, UserFragment } from './fragments.graphql';

export default gql`
  query getChat($id: ID!) {
    chat(id: $id) @rest(type: "Chat", path: "/chats/{args.id}") {
      id @export(as: "chatId")
      starred @client
      members @rest(type: "[User]", path: "/chats/:chatId/members") {
        ...UserFragment
      }
      messages @rest(type: "[Message]", path: "/chats/:chatId/messages") {
        ...MessageFragment
      }
    }
  }
  ${MessageFragment}
  ${UserFragment}
`;
