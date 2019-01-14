const app = require('express')();
const cors = require('cors');
const winston = require('winston');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const db = require('./db');

const port = 4000;
const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => {
          const time = chalk.gray(`${info.timestamp}:`);
          return `${time} ${info.message}`;
        }),
      ),
    }),
  ],
});

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  logger.info(req.originalUrl);
  next();
});

//
// GraphQL
//

require('./graphql').useGraphQL(app);

//
// users
//

app.get('/users/:id', (req, res) => {
  res.json(db.findUserById(req.params.id));
});

app.get('/users', (_, res) => {
  res.json(db.findUsers());
});

function userUrl(req, id) {
  return `${baseUrl(req)}/users/${id}`;
}

//
// chats
//

app.get('/chats/:id', (req, res) => {
  const chat = db.findChatById(req.params.id);

  res.json(restifyChat(req, chat));
});

app.get('/chats/:id/messages', (req, res) => {
  const chat = db.findChatById(req.params.id);

  res.json(chat.messages.map(msg => restifyMessage(req, msg)));
});

app.post('/chats/:id/message', (req, res) => {
  const chat = db.findChatById(req.params.id);
  const senderId = chat.members.find(m => m.id !== req.body.recipient).id;

  const message = db.addMessageToChat({
    chatId: chat.id,
    text: req.body.text,
    recipientId: req.body.recipient,
    senderId,
  });

  res.json(restifyMessage(req, message));
});

app.get('/chats/:id/members', (req, res) => {
  const chat = db.findChatById(req.params.id);

  res.json(chat.members);
});

app.get('/chats', (req, res) => {
  res.json(db.findChats().map(chat => restifyChat(req, chat)));
});

function chatUrl(req, id) {
  return `${baseUrl(req)}/chats/${id}`;
}

function chatMessagesUrl(req, id) {
  return `${chatUrl(req, id)}/messages`;
}

function restifyMessage(req, message) {
  return message;
}

function restifyChat(req, chat) {
  return {
    id: chat.id,
    members: chat.members.map(({ id }) => userUrl(req, id)),
    messages: chatMessagesUrl(req, chat.id),
    recentMessage: restifyMessage(req, getRecentMessage(chat)),
  };
}

function getRecentMessage(chat) {
  const last = chat.messages.length - 1;
  return chat.messages[last];
}

app.listen(port, () => {
  const graphqlUrl = chalk.gray(`http://localhost:${port}/graphql`);
  const restUrl = chalk.gray(`http://localhost:${port}/`);

  const msg = [
    ``,
    chalk.greenBright(`! API is live !`),
    ``,
    `   GraphQL    ${graphqlUrl}`,
    `   REST       ${restUrl}`,
    ``,
    `   Resources:`,
    ...app._router.stack
      .filter(
        r =>
          r.route &&
          r.route.path &&
          !r.route.path.includes('graphql') &&
          !r.route.path.includes('sofa'),
      )
      .map(r =>
        chalk.gray(
          `    ${r.route.stack[0].method.toUpperCase().padEnd(4)} ${
            r.route.path
          }`,
        ),
      ),
  ];

  console.log(msg.join('\n'));
});

function baseUrl(req) {
  return `${req.protocol}://${req.get('host')}`;
}
