import gql from 'graphql-tag';

import { UserFragment, MessageFragment } from './fragments.graphql';

export default gql`
  {
    chats {
      id
      starred @client
      members {
        ...UserFragment
      }
      recentMessage {
        ...MessageFragment
      }
    }
  }
  ${UserFragment}
  ${MessageFragment}
`;