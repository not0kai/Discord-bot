require('dotenv').config();
const fs = require('fs');
const { Client, MessageEmbed, IntentsBitField} = require('discord.js');
const client = new Client({
    intents: [

        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessageTyping,
        IntentsBitField.Flags.GuildPresences,
    ],
});

client.on('ready' , (c) => {
    console.log(`${c.user.tag} is online.`);

    client.user.setActivity({

        name: '!add or !search'
    })

});
client.on('messageCreate', (message) => {
    if (message.guild && message.guild.id === '1162224618661216316' && message.channel.id === '1162229742603337728') {
        if (message.content.toLowerCase().includes ('name')) {
            message.reply('t'); 
        }
    }
});
client.on('messageCreate', (message) => {
    if (message.guild && message.guild.id === '1119549374033297521' && message.channel.id === '1119549375069311080') {
        if (message.content.toLowerCase().includes ('name')) {
            message.reply(''); 
        }
    }
});
client.on('messageCreate', (message) => {
    if (message.guild && message.guild.id === '1119549374033297521' && message.channel.id === '1119549375069311080') {
        if (message.content.toLowerCase().includes ('name')) {
            message.reply(''); 
        }
    }
});
client.on('messageCreate', (message) => {
    if (message.guild && message.guild.id === '1119549374033297521' && message.channel.id === '1119549375069311080') {
        if (message.content.toLowerCase().includes ('Redacted')) {
            message.reply(''); 
        }
    }
});
client.on('messageCreate', (message) => {
    if (message.guild && message.guild.id === '1119549374033297521' && message.channel.id === '1119549375069311080') {
        if (message.content.toLowerCase().includes ('Redacted')) {
            message.reply(''); 
        }
    }
});

client.on('messageCreate', (message) => {
    if (message.guild && message.guild.id === '1081191262868213820' && message.channel.id === '1081191263656759298') {
        if (message.content.toLowerCase().includes('REDACTED')) {
            message.reply(''); 
        }
    }
});
client.on('messageCreate', (message) => {
    if (message.guild && message.guild.id === '1081191262868213820' && message.channel.id === '1081191263656759298') {
        if (message.content.toLowerCase().includes('REDACTED2')) {
            message.reply(''); 
        }
    }
});
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;
  
    if (interaction.commandName === 'hey') {
      return interaction.reply('hey!');
    }
  
    if (interaction.commandName === 'ping') {
      return interaction.reply('Pong!');
    }
  });
  

const logFile = 'messagelog.txt';

client.on('messageCreate', (message) => {
    if (message.content.startsWith('!remove')) {
        const textToRemove = message.content.slice('!remove'.length).trim().toLowerCase();

        fs.readFile(logFile, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                message.reply('An error occurred while reading the file.');
            } else {
                const lines = data.split('\n');
                const filteredLines = lines.filter(line => !line.toLowerCase().includes(textToRemove));
                const updatedData = filteredLines.join('\n');

                fs.writeFile(logFile, updatedData, (err) => {
                    if (err) {
                        console.error(err);
                        message.reply('An error occurred while writing to the file.');
                    } else {
                        message.channel.send(`Lines containing "${textToRemove}" have been removed from the Bleed-out list.`);
                    }
                });
            }
        });
    }
});

client.on('messageCreate', (message) => {
    if (message.content.startsWith('!add')) {
        const text = message.content.slice('!add'.length).trim();
        const lowercasedText = text.toLowerCase();

        fs.readFile('mytextfile.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                message.reply('An error occurred while reading the file.');
            } else {
                data += '\n' + lowercasedText;

                fs.writeFile('mytextfile.txt', data, (err) => {
                    if (err) {
                        console.error(err);
                        message.reply('An error occurred while writing to the file.');
                    } else {
                        message.reply('Player added to the list.');
                    }
                });
            }
        });
    } else if (message.content.startsWith('!list')) {
        fs.readFile('mytextfile.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                message.channel.send('An error occurred while reading the file.');
            } else {
                message.channel.send(`Bleed-out list: \n\`\`\`${data}\`\`\``);
            }
        });
    } else if (message.content.startsWith('!search')) {
        const searchTerm = message.content.slice('!search'.length).trim();
        fs.readFile('mytextfile.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                message.channel.send('An error occurred while reading the file.');
            } else {
                const found = data.includes(searchTerm.toLowerCase());
                const response = found ? 'Found' : 'Not found';
                message.channel.send(`${searchTerm} is ${response} on the list.`);
            }
        });
    }
});

const userNameCounts = {};

client.on('messageCreate', async (message) => {
    if (message.content.startsWith('!info')) {
        const mentionedUser = message.mentions.users.first() || message.author;
        const serverId = message.guild.id;

        
        if (!userNameCounts[serverId]) {
            userNameCounts[serverId] = {};
        }

        
        if (!userNameCounts[serverId][mentionedUser.id]) {
            userNameCounts[serverId][mentionedUser.id] = 1;
        } else {
            userNameCounts[serverId][mentionedUser.id]++;
        }

        const NameCount = userNameCounts[serverId][mentionedUser.id];

        const infoEmbed = {
            title: 'User Info',
            color: 0xFF0000, // Bright Red
            fields: [
                {
                    name: 'Username',
                    value: mentionedUser.username,
                    inline: true,
                },
                {
                    name: 'Tag',
                    value: mentionedUser.discriminator,
                    inline: true,
                },
                {
                    name: 'Account Creation',
                    value: mentionedUser.createdAt.toLocaleString(),
                },
                {
                    name: 'Word count',
                    value: NameCount,
                },
            ],
            thumbnail: {
                url: mentionedUser.displayAvatarURL({ dynamic: true }),
            },
        };

        await message.reply({ embeds: [infoEmbed] });
    }
});
async function countNameMessages(server, user) {
    let NameCount = 0;
    const messages = await server.channels.cache.filter((channel) => channel.type === 'GUILD_TEXT').map((channel) => channel.messages.fetch());
    messages.forEach((message) => {
        if (message.author.id === user.id && message.content.toLowerCase().includes('REDACTED')) {
            NameCount++;
        }
    });
    return NameCount;
}

client.on('messageCreate', (message) => {
    if (message.guild && message.guild.id === '1081191262868213820') {
        

        
        const userTag = `${message.author.username}#${message.author.discriminator}`;
        
        const timestamp = new Date().toLocaleString();
        
        const serverName = message.guild.name;
        
        const channelName = message.channel.name;

        
        const logEntry = `[${timestamp}] [${serverName} - "${channelName}"] ${userTag}: ${message.content}\n`;

        
        fs.appendFile('messagelog.txt', logEntry, (err) => {
            if (err) {
                console.error(err);
                
            }
        });
    }
});

client.on('voiceStateUpdate', (oldState, newState) => {
    if (newState.guild.id === '1081191262868213820') {
        

        const userTag = `${newState.member.user.username}#${newState.member.user.discriminator}`;
        const serverName = newState.guild.name;
        const channelName = newState.channel ? newState.channel.name : 'N/A';
        const timestamp = new Date().toLocaleString();

        
        let logEntry = '';
        if (oldState.channelID !== newState.channelID) {
            logEntry = `[${timestamp}] [${serverName}] ${userTag} ` +
                `${oldState.channelID ? 'left' : 'joined'} voice channel: ${channelName}\n`;
        }

        
        if (logEntry) {
            fs.appendFile('messagelog.txt', logEntry, (err) => {
                if (err) {
                    console.error(err);
                    
                }
            });
        }
    }
});
const imageUrls = [
    'REDACTED',

];

client.on('messageCreate', (message) => {
    if (message.content === 'Redacted') {
        message.reply('Loading...').then((response) => {
            
            const loadingBar = ['▒▒▒▒▒▒▒▒▒▒', '█▒▒▒▒▒▒▒▒▒', '██▒▒▒▒▒▒▒▒', '███▒▒▒▒▒▒▒', '████▒▒▒▒▒▒', '█████▒▒▒▒▒', '██████▒▒▒▒▒', '███████▒▒▒▒', '████████▒▒▒', '█████████▒▒', '██████████▒', '███████████', '██████████▒', '█████████▒▒', '████████▒▒▒', '███████▒▒▒▒', '██████▒▒▒▒▒', '█████▒▒▒▒▒▒', '████▒▒▒▒▒▒▒', '███▒▒▒▒▒▒▒▒', '██▒▒▒▒▒▒▒▒▒', '█▒▒▒▒▒▒▒▒▒▒', '▒▒▒▒▒▒▒▒▒▒'];

           
            let progress = 0;

           
            const interval = setInterval(() => {
                if (progress >= loadingBar.length) {
                    
                    const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
                    const imageEmbed = {
                        image: {
                            url: randomImageUrl,
                        },
                    };
                    response.edit({ content: '', embeds: [imageEmbed] });
                    clearInterval(interval); 
                } else {
                    
                    const loadingEmbed = {
                        description: loadingBar[progress],
                    };
                    response.edit({ content: '', embeds: [loadingEmbed] });
                    progress++;
                }
            }, 900); 
        });
    }
});


const targetServerId = '1081191262868213820'; 
const forbiddenWord = 'REDACTED2'; 

client.on('messageCreate', (message) => {
    if (message.guild && message.guild.id === targetServerId && message.content.toLowerCase().includes(forbiddenWord)) {
        
        message.delete();

       
        message.author.send(`Please dont say "${forbiddenWord}".`)
            .catch((err) => {
                console.error('Error sending a direct message:', err);
            });
    }
});
const oldtargetServerId = '1081191262868213820'; 
const nforbiddenWord = 'REDACTED'; 

client.on('messageCreate', (message) => {
    if (message.guild && message.guild.id === oldtargetServerId && message.content.toLowerCase().includes(nforbiddenWord)) {
        
        message.delete();

        
        message.author.send(`Please dont say "${nforbiddenWord}"`)
            
    }
});
const newtargetServerId = '1119549374033297521'; 
const niforbiddenWord = 'projectsnake'; 

client.on('messageCreate', (message) => {
    if (message.guild && message.guild.id === newtargetServerId && message.content.toLowerCase().includes(niforbiddenWord)) {
       
        message.delete();

        
        message.author.send(`Initiating: "${niforbiddenWord}".`);
        message.author.send(`REDACTED`);
            
    }
});



const targetUser = '833359301468356659'; 
const forbiddenWords = ['kai', '']; 

client.on('messageCreate', (message) => {
    if (forbiddenWords.some(word => message.content.toLowerCase().includes(word))) {
        
        const messageContent = `Mentioned name: "${message.guild.name}", channel "${message.channel.name}":\n\n` +
            `User: ${message.author.tag}\n` +
            `Time: ${new Date().toLocaleString()}\n` +
            `Forbidden Word: ${forbiddenWords.find(word => message.content.toLowerCase().includes(word))}\n` +
            `Message Content:\n${message.content}`;

        
        client.users.cache.get(targetUser).send(messageContent)
            .catch((err) => {
                console.error('Error sending a direct message:', err);
            });
    }
});

client.on('message', (message) => {
  
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (message.content === '!liam') {
    
    const mention = message.mentions.users.first();

    if (!mention) {
      
      return message.reply('Please mention a user to spam.');
    }

    
    for (let i = 0; i < 50; i++) {
      message.channel.send(mention.toString());
    }
  }
});

client.login(process.env.TOKEN);