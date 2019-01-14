import gql from 'graphql-tag';

import { UserFragment, MessageFragment } from './fragments.graphql';

export default gql`
  {
    chats @rest(type: "Chat", path: "/chats") {
      id @export(as: "chatId")
      starred @client
      members @rest(type: "[User]", path: "/chats/:chatId/members") {
        ...UserFragment
      }
      recentMessage @type(name: "Message") {
        ...MessageFragment
      }
    }
  }
  ${UserFragment}
  ${MessageFragment}
`;