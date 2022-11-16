require('dotenv').config();
const BLACKLIST = require('./blacklist.js');
const Discord = require('discord.js');
const bot = new Discord.Client(
  { intents: ['DIRECT_MESSAGES', 'GUILD_MESSAGES'] }
);

/*  {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],

} */

const BOT_PREFIX = '!';
const BOT_PING_COMMAND = 'ping';

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!.`);
  console.log(`Our Kitchen 3.0 DutchBeatBot is alive AND kicking!!`);
});

bot.on('messageDelete', msg => {
  msg.channel.send('Eh.. stop deleting messages please! History is history..');
}
);

bot.on("message", message => {
  if (message.content.toLowerCase() === 'i love dutchbeat') {
    message.react('❤️');
  }
  if (message.content.toLowerCase() === `${BOT_PREFIX}${BOT_PING_COMMAND}`) {
    if (process.env.HOME === process.env.LOCAL) {
      console.log(`Recognized environment from variable LOCAL and is equal to: ${process.env.HOME}`);
      replyPongWhenPingEntered('Local DEV/TEST bot: ', message);
    } else {
      console.log(`Did not recognize environment from variable LOCAL but is equal to: ${process.env.HOME}`);
      console.log(process.env.LOCAL);
      replyPongWhenPingEntered('Remote PROD bot: ', message);
    }

  }
  // searchAndReplaceBlackList(message);
})

async function replyPongWhenPingEntered(env, message) {
  message.channel.send(`${env} - pong!`);
}

async function searchAndReplaceBlackList(message) {
  let alteredMessage = message.content; // Vulnerable to bugs!
  console.log(message.content);
  console.log(message.content.toLowerCase().includes('fuck'));
  console.log('BLACKLIST: ', BLACKLIST.BLACKLIST);
  console.log('BLACKLIST is array: ', Array.isArray(BLACKLIST.BLACKLIST));

  BLACKLIST.BLACKLIST.map(async (item) => {
    alteredMessage = alteredMessage.replace(item.word, item.replace);
    await message.edit(alteredMessage);
  });
}

/*
PLAY WITH THIS!!
const { MessageEmbed } = require('discord.js')
module.exports = {
  run: async (bot, message, args) => {
    const msg = new MessageEmbed()
      .setTitle("Pong!")
      .setColor(0xE67E22)
      .setTimestamp()
      .setDescription(`API:\nWeb Socket:`);
    message.channel.send(msg)
      .then(m => {
        msg.setDescription(`API: ${m.createdTimestamp - message.createdTimestamp}ms.\nWeb Socket: ${Math.round(bot.ws.ping)}ms.`)
        m.edit(msg)
      })
    message.delete()
  },
  aliases: [],
  description: 'Test API Latency'
}
*/

bot.login(process.env.BOT_TOKEN);