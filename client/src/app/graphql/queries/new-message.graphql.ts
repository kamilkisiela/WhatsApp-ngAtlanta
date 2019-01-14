import gql from 'graphql-tag';

import { MessageFragment } from './fragments.graphql';

export default gql`
  mutation newMessage($id: ID!, $input: MessageInput!) {
    newMessage(id: $id, input: $input) {
      ...MessageFragment
    }
  }
  ${MessageFragment}
`;
