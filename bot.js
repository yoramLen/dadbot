require('dotenv').config()

const tmi = require('tmi.js');
const fetch = require("node-fetch")

// Define configuration options
const opts = {
  identity: {
    username: "papamopjes",
    password: "oauth:9i5lg27upzkwjc77b19x98pibqc586"
  },
  channels: [
    "CptSpectra"
  ]
};

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

  // If the command is known, let's execute it
  if (commandName === '!dad') {
    getJoke().then(()=>{    client.say(target, `Here is your joke ${joke}`)});

    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}