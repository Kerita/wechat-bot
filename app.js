const { Wechaty } = require('wechaty');
const QrcodeTerminal = require('qrcode-terminal');
const ZhihuDaily = require('./tools/ZhihuDaily');
const Joke = require('./tools/Joke');

const handleScan = (url) => {
  QrcodeTerminal.generate(url);
};

const handleLogin = (user) => {
  console.log('user:', user.payload.name);
};

const handleMessage = async (message) => {
  const room = message.room();


  const sendMessage = async () => {
    const contact = message.from();
    const messageText = message.text();
    const replaySomeone = room || contact;
    let replyMessage = messageText;
    switch (messageText) {
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
      default:
        break;
    }
  };
  if ((room && room.payload.topic === 'Test') || !room) {
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
