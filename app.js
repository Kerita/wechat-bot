const { Wechaty } = require('wechaty');
const QrcodeTerminal = require('qrcode-terminal');
const ZhihuDaily = require('./tools/ZhihuDaily');
const Joke = require('./tools/Joke');
const Chat = require('./tools/Chat');

const handleScan = (url) => {
  QrcodeTerminal.generate(url);
};

const handleLogin = (user) => {
  console.log('user:', user.payload.name);
};

const handleMessage = async (message) => {
  const messageText = message.text();
  const room = message.room();
  const contact = message.from();

  const sendMessage = async () => {
    if (contact.self()) {
      return;
    }
    const replaySomeone = room || contact;
    let replyMessage = messageText;
    switch (messageText.trim().toLowerCase()) {
      case '知乎': {
        replyMessage = await ZhihuDaily.getLastestNews();
        await replaySomeone.say(replyMessage);
        break;
      }

      case '段子':
      case '笑话':
      {
        replyMessage = await Joke.getRandomJoke();
        await replaySomeone.say(replyMessage);
        break;
      }

      case 'joke':
      {
        replyMessage = await Joke.getRandomEnglishJoke();
        await replaySomeone.say(replyMessage);
        break;
      }
      default: {
        replyMessage = await Chat.itpkChat(messageText);
        await replaySomeone.say(replyMessage);
        break;
      }
    }
  };
  // contact.payload.alias to filter just send to someone
  console.log(messageText);
  if (room) {
    if (room.payload.topic === 'Test' || room.payload.topic === '快乐的一家人') {
      await sendMessage();
    }
  } else if (!room && contact.payload.alias === '春荣哥哥') {
    await sendMessage();
  }
};

const hnadleFriendship = (friendship) => {
  console.log('friendship', friendship);
};


Wechaty.instance({
  name: 'wechat-bot',
})
  .on('scan', handleScan)
  .on('login', handleLogin)
  .on('message', handleMessage)
  .on('friendship', hnadleFriendship)
  .on('room-invite', invitation => console.log(`收到入群邀请：${invitation}`))
  .start();
