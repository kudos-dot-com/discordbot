const http = require('http');
const fs = require('fs');
const requests = require('requests');
const express=require('express');
const app=express();

require('dotenv').config();
console.log();
const { Client }=require('discord.js');

const client=new Client();

client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {
    console.log('I am ready!');
  });
  
/*discord configuration added*/  
  client.on('message', message => {
    var data={};
    //console.log();
  if (message.content.indexOf('!') === 0  && message
  .content
  .substring(1,8)
  .toLowerCase()==='weather')
  {       
   requests(`http://api.openweathermap.org/data/2.5/weather?q=${message.content.substring(9)}&APPID=YOUR ID HERE`)
   .on('data', function (chunk) {
    const apiData = JSON.parse(chunk);
   
    message.reply(`\n Current Location : ${apiData.name}
                \nTemperature : ${apiData.main.temp}
                \nFeels Like : ${apiData.main.feels_like}
                \nMax Temperature : ${apiData.main.temp_max}
                \nMin Temperature : ${apiData.main.temp_min}
                \nPressure : ${apiData.main.pressure}
                \nHumidity : ${apiData.main.humidity}
                `)
    .then(() => console.log(`Sent a reply to ${message.author.username}`))
    .catch(console.error);
    });
    }
  });
    
  const server = http.createServer(app);
   server.listen(3000, 'localhost',()=>{
     console.log('server running at port 3000');
   });
