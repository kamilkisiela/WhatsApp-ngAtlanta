import gql from 'graphql-tag';

export const UserFragment = gql`
  fragment UserFragment on User {
    id
    name
  }
`;

export const MessageFragment = gql`
  fragment MessageFragment on Message {
    id
    text
    createdAt
    sender @type(name: "User") {
      ...UserFragment
    }
    recipient @type(name: "User") {
      ...UserFragment
    }
  }
  ${UserFragment}
`;
