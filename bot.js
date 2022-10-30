require('dotenv').config();
const Discord = require('discord.js');
const BLACKLIST = require('./blacklist.js');
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
  searchAndReplaceBlackList(message);
})

async function replyPongWhenPingEntered(message) {
  message.channel.send('Pong!');
}

async function searchAndReplaceBlackList(message) {
  let alteredMessage = message; // Vulnerable to bugs!
  console.log(message.content);
  console.log(message.content.toLowerCase().includes('fuck'));
  console.log(BLACKLIST);
  BLACKLIST.map(
    ({item}) => console.log(item)
  );
  // BLACKLIST.map(async ({item}) => {
  //  alteredMessage = alteredMessage.replace(item.word, item.replace);
  //  await message.edit(alteredMessage);
  // });
}

client.login(process.env.BOT_TOKEN);