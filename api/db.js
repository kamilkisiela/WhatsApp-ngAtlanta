function ID() {
  return Math.random()
    .toString(16)
    .substr(2);
}

//
// Users
//

const RachelGreen = {
  id: ID(),
  name: 'Rachel Green',
};

const ChandlerBing = {
  id: ID(),
  name: 'Chandler Bing',
};

const PhoebeBuffay = {
  id: ID(),
  name: 'Phoebe Buffay',
};

const RossGeller = {
  id: ID(),
  name: 'Ross Geller',
};

const users = [RachelGreen, ChandlerBing, PhoebeBuffay, RossGeller];

//
// Messages
//

//
// Chats
//

const RachelWithChandler = {
  id: ID(),
  members: [RachelGreen, ChandlerBing],
  messages: [
    {
      id: ID(),
      createdAt: new Date(),
      text: 'Hi',
      sender: RachelGreen,
      recipient: ChandlerBing,
    },
    {
      id: ID(),
      createdAt: new Date(),
      text: 'Oh hi',
      sender: ChandlerBing,
      recipient: RachelGreen,
    },
  ],
};

const RachelWithPhoebe = {
  id: ID(),
  members: [RachelGreen, PhoebeBuffay],
  messages: [
    {
      id: ID(),
      createdAt: new Date(),
      text: 'Hi Phoebe',
      sender: RachelGreen,
      recipient: PhoebeBuffay,
    },
    {
      id: ID(),
      createdAt: new Date(),
      text: 'I am Princess Consuela Banana Hammock now!',
      sender: PhoebeBuffay,
      recipient: RachelGreen,
    },
  ],
};

const RachelWithRoss = {
  id: ID(),
  members: [RachelGreen, RossGeller],
  messages: [
    {
      id: ID(),
      createdAt: new Date(),
      text: 'Hi Ross',
      sender: RachelGreen,
      recipient: RossGeller,
    },
    {
      id: ID(),
      createdAt: new Date(),
      text: 'Hello Princess Leia',
      sender: RossGeller,
      recipient: RachelGreen,
    },
  ],
};

const chats = [RachelWithPhoebe, RachelWithChandler, RachelWithRoss];

module.exports = {
  findUserById(id) {
    return users.find(u => u.id === id);
  },
  findUsers() {
    return users;
  },

  findChatById(id) {
    return chats.find(c => c.id === id);
  },

  findChats() {
    return chats;
  },

  addMessageToChat({ chatId, text, senderId, recipientId }) {
    const sender = this.findUserById(senderId);
    const recipient = this.findUserById(recipientId);
    const chat = this.findChatById(chatId);

    const message = {
      id: ID(),
      createdAt: new Date(),
      text,
      sender,
      recipient,
    };

    chat.messages.push(message);

    return message;
  },
};
