require('dotenv').config()

const tmi = require('tmi.js');
const fetch = require("node-fetch")
const prefix = "!"

// Define configuration options
const opts = {
  identity: {
    username: "papamopjes",
    password: "oauth:9i5lg27upzkwjc77b19x98pibqc586"
  },
  channels: [ 
    "Sjmille",
  "ief_speelt",
"Djoramm",
"RelentlessWill"  ]
};
const commands = ["ping", "dad", "dice", "so"]

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

let joke = "";
let getJoke = async () =>{
    let result = await fetch(`https://icanhazdadjoke.com`, {
        headers: {
          'Accept': 'application/json'
        }
     })
     let response = await result.json();
     joke = JSON.stringify(response.joke);
     console.log(joke);

    }
// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot


  // Remove whitespace from chat message
  const commandName = msg.trim();

  let isMod = context.mod||context[13] === "mod";
  let isBroadcaster = context[4] === "Djoramm";
  let isModUp = isMod || isBroadcaster;

  // If the command is known, let's execute it
 /* if (commandName === '!dad') {
    getJoke().then(()=>{    client.say(target, `Here is your joke ${joke}`)});

    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}*/
let args= commandName.substring(prefix.length).split(" ");
        if (commandName.substr(0, prefix.length) === prefix) {
            switch (args[0]) {
                case commands[0]:
                    client.say(target, 'pong');
                    console.log(`executed ${commandName} command`)
                    break;

                    case commands[1]:
                      getJoke().then(()=>{    client.say( target,`Here is your joke: ${joke}`)}).then(()=>{
                        console.log(`* Executed ${commandName} command`)
                        //console.log(context);
                        console.log(target);
                      });

                     
                  break;

                  case commands[2]:
                    let getal;
                    if(args[1]){
                      getal = rollDice(args[1])
                    }
                    else{
                      getal = rollDice(6)
                    }
                    client.say(target, `Je rolde ${getal} met de dobbelsteen!`);
                    break;

                  case commands[3]:
                    if((context.username === 'djoramm'|| context.mod || context[13]=== 'mod') && target === "#djoramm"){
                      if(args[1]){
                        client.say(target, shoutout(args[1]).toLowerCase());
                        console.log(`shoutout done on channel ${target}`)
                      }
                      else{
                        client.say(target, "je moet me wel iemand geven om een shoutout naar te doen, anders werkt het niet hé!")
                      }
                    }
                  
                  

                  break;

                  default:
                    
                    break;
            }
          }
        }
      


// Function called when the "dice" command is issued
const rollDice =(sides = 6)=> {
  const kanten = sides;
  return Math.floor(Math.random() * kanten) + 1;
}


const shoutout = (streamer) =>{
  return `volg zeker ook ${streamer} op https://www.twitch.tv/${streamer} !  `
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}