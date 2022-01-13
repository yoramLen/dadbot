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
"cosygeek",
"wii_freak",
"LatestVictim",
"EIkiry",
"Talon_EXE",
"mrbambiii"]
};
const commands = ["ping", "dad", "dice", "so", "lurk", "vip", "giveaway", "mom", "papakoop", "joke"]
const followersWii = ["5klater5","ekin_lion","trilllion_01","kimvn","katekannon","becciathome","yikx_","belgian_orange","bruurpact","earthling01","jampersant","multivocality","whatisinthebox","karadp","sfeerbeheer_","kstoovie","ianmestwitch","debadjasgamer","mr_wolf_1979","funkydactyl","tmcfenix","tancre56","mini_beirke","javasaurusstudios","infernolady","belgianbankai","ultimate1erazor","deltaforcex1","gm3l","nekodei","borgdrone03of13","komouru","mariekapers","sjmille","dacarrotdynast","markthesunbro","prottje","ro_gilo","dragonbirdy","aresescape","sammy_cuypers","carroarmato0","mrnood1e","mistercoldinc","aimaxgames","annso_d","gewoonkirbyyt","labiest","tulipteacups","latestvictim","totaiiybananas","thecookiegamer502","ief_speelt","studioalfazeta","relentlesswill","blazingbluefire","djoramm","jen_rox","blazeshaper","jarne_h"];

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
  let mychannel = isModUp && target === "#djoramm"



  if(commandName.includes("@papamopjes")&&commandName.includes("wil een duel met jou starten")){
    client.say(target,"!accept");
  }

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
                      if(target === "#mrbambiii"){
                        client.say(target,"Neen bambi, geen mop voor jou!");
                      }
                      else if(target !== "#eikiry"&& target!== "#mrbambiii"){
                        getJoke().then(()=>{    client.say( target,`Here is your joke: ${joke}`)}).then(()=>{
                          console.log(`* Executed ${commandName} command`)
                         // console.log(context);
                          //console.log(target);
                        });
  
                       

                      }

                      break;

               

                  case commands[2]:
                    let getal;
                    if(target !== "#eikiry"){
                      if(args[1]){
                        getal = rollDice(args[1])
                      }
                      else{
                        getal = rollDice(6)
                      }
                      client.say(target, `Je rolde ${getal} met de dobbelsteen!`);

                    }
                    else{
                      if(args[1]){
                        getal = rollDice(args[1])
                      }
                      else{
                        getal = rollDice(6)
                      }
                      client.say(target, `You got ${getal} as a dice roll!`);
                    }
         
                    break;

                  case commands[3]:
                    if((context.mod || context[14]==="mod"||context.username === "djoramm")&& target === "#djoramm"){
                      if(args[1]){
                        client.say(target, shoutout(args[1]));
                        console.log(`shoutout done on channel ${target}`)
                      }
                      else{
                        client.say(target, "Als je mij niks geeft om te shoutouten ga ik dat moeilijk kunnen doen hé!")
                      }

                    }
                  
                  

                  break;
                  case commands[4]:
                    if(target === "#djoramm"){
                      client.say(target, `Bedankt om toch langs te komen en geniet van de lurk @${context.username}!`)

                    }
                  break;

                  /*case commands[5]:
                    if(target === "#ief_speelt"){
                      client.say(target, "excuses aanvaard! Nog eens bedankt voor de VIP!d")
                    }
                    break;*/

                    case commands[6]:
                    if(target === "#wii_freak" && (context.username === "wii_freak"||context.username === "djoramm"))
                    {
                      let rngesus = Math.floor(Math.random()*followersWii.length)+1
                      client.say(target,`de winnaar van de giveaway is ${followersWii[rngesus]}`)

                    }  
                    break;

                    case commands[7]:
                      client.say(target,"CLEAN YOUR ROOM!!!")
                      break;

                      case commands[8]:
                        if (target === "#ief_speelt"){
                          client.say(target,"!ticket 10")
                          break;

                        }
                   

                        case commands[9]:
                          if(target === "#eikiry"){
                            getJoke().then(()=>{    client.say( target,`Here is your joke: ${joke}`)}).then(()=>{
                              console.log(`* Executed ${commandName} command`)
                             // console.log(context);
                              //console.log(target);
                            });

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
  return `Volg zeker ook ${streamer} op https://www.twitch.tv/${streamer.toLowerCase()}, het is een pateeke!`
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}