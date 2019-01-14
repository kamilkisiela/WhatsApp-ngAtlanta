import gql from 'graphql-tag';

import { MessageFragment, UserFragment } from './fragments.graphql';

export default gql`
  query getChat($id: ID!) {
    chat(id: $id) {
      id
      starred @client
      members {
        ...UserFragment
      }
      messages {
        ...MessageFragment
      }
    }
  }
  ${MessageFragment}
  ${UserFragment}
`;
