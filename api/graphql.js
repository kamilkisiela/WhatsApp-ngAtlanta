const { ApolloServer } = require('apollo-server-express');
const gql = require('graphql-tag');
const db = require('./db');

const typeDefs = gql`
  type Query {
    chats: [Chat]
    chat(id: ID!): Chat
  }

  type Mutation {
    newMessage(id: ID!, input: MessageInput!): Message
  }

  input MessageInput {
    text: String!
    recipient: ID!
  }

  type User {
    id: ID!
    name: String!
  }

  type Message {
    id: ID!
    createdAt: String!
    text: String!
    sender: User!
    recipient: User!
  }

  type Chat {
    id: ID!
    members: [User!]!
    messages: [Message]
    recentMessage: Message
  }
`;

const resolvers = {
  Query: {
    chats() {
      return db.findChats();
    },
    chat(_, { id }) {
      return db.findChatById(id);
    },
  },
  Mutation: {
    newMessage(_, { id, input }) {
      const chat = db.findChatById(id);
      const senderId = chat.members.find(m => m.id !== input.recipient).id;

      const message = db.addMessageToChat({
        chatId: chat.id,
        text: input.text,
        recipientId: input.recipient,
        senderId,
      });

      return message;
    },
  },
  Chat: {
    recentMessage(chat) {
      const last = chat.messages.length - 1;
      return chat.messages[last];
    },
  }
};

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = {
  useGraphQL(app) {
    apollo.applyMiddleware({
      app,
      path: '/graphql',
    });
  },
  typeDefs,
  resolvers,
};
