require('dotenv').config();
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
  if (message.content.toLowerCase() === `${BOT_PREFIX}${BOT_PING_COMMAND}`){
    replyPongWhenPingEntered(message); 
  }
})

client.on('interactionCreate', async interaction => {
  console.log(interaction.commandName);
  if (!interaction.isChatInputCommand())
    return;
  replyPongWhenPingEntered(interaction);
});

async function replyPongWhenPingEntered(interaction) {
  msg.channel.send('Pong!');
}

client.login(process.env.BOT_TOKEN);