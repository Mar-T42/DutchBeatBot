require('dotenv').config();
const Discord = require('discord.js');
const { Client, Intents } = new Discord.Client();
Client.config({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    partials:  [`MESSAGE`]
});

const BOT_PREFIX = '/';
const BOT_PING_COMMAND = 'ping';

Client.on('ready', () => {
  console.log(`Logged in as ${Client.user.tag}!.`);
  console.log(`Our Kitchen 3.0 DutchBeatBot is alive AND kicking!!`);
});

Client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
    replyPongWhenPingEntered(interaction);
});

Client.on('messageDelete', msg => {
        msg.channel.send('Eh.. stop deleting messages please! History is history..');
    }
);

Client.on("message", message => {
    if (message.content.toLowercase() === 'i love dutchbeat') {
        message.react('❤️');
    }
})

async function replyPongWhenPingEntered(interaction) {
    if (interaction.commandName === `${BOT_PREFIX}${BOT_PING_COMMAND}`) {ProcessingInstructionp
        await interaction.reply('Pong!');
      }
}

client.login(process.env.BOT_TOKEN);