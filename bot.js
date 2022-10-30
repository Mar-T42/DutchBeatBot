require('dotenv').config();
const BLACKLIST = require('./blacklist.js');
const Discord = require('discord.js');
const client = new Discord.Client(
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

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!.`);
  console.log(`Our Kitchen 3.0 DutchBeatBot is alive AND kicking!!`);
});

client.on('messageDelete', msg => {
  msg.channel.send('Eh.. stop deleting messages please! History is history..');
}
);

client.on("message", message => {
  if (message.content.toLowerCase() === 'i love dutchbeat') {
    message.react('❤️');
  }
  if (message.content.toLowerCase() === `${BOT_PREFIX}${BOT_PING_COMMAND}`) {
    replyPongWhenPingEntered(message);
  }
  // searchAndReplaceBlackList(message);
})

async function replyPongWhenPingEntered(message) {
  message.channel.send('Pong!');
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
  run: async (client, message, args) => {
    const msg = new MessageEmbed()
      .setTitle("Pong!")
      .setColor(0xE67E22)
      .setTimestamp()
      .setDescription(`API:\nWeb Socket:`);
    message.channel.send(msg)
      .then(m => {
        msg.setDescription(`API: ${m.createdTimestamp - message.createdTimestamp}ms.\nWeb Socket: ${Math.round(client.ws.ping)}ms.`)
        m.edit(msg)
      })
    message.delete()
  },
  aliases: [],
  description: 'Test API Latency'
}
*/

client.login(process.env.BOT_TOKEN);