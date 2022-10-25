require('dotenv').config();
const Discord = require('discord.js');
const client= new Discord.Client();

const BOT_PREFIX = '/';
const BOT_PING_COMMAND = 'ping';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!.`);
  console.log(`Our Kitchen 3.0 DutchBeatBot is alive AND kicking!!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
    replyPongWhenPingEntered(interaction);
});

client.on('messageDelete', msg => {
        msg.channel.send('Eh.. stop deleting messages please! History is history..');
    }
);

client.on("message", message => {
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