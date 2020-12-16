const BootBot = require('bootbot');
const config = require('config');

const fetch = require('node-fetch');
const GIPHY_URL = 'http://api.giphy.com/v1/gifs/search?api_key=---------------------q=';  //&q=  //limit=20&


const bot = new BootBot({
  accessToken: config.get('ACCESS_TOKEN'),
  verifyToken: config.get('VERIFY_TOKEN'),
  appSecret: config.get('APP_SECRET')
});


bot.hear(['hello', 'hi', 'hey', 'привет', 'ahoy'], (payload, chat) => {
  chat.say('Hello there! If you want to choose gif, type "gif" and any word or letter', { typing: true });
    },20000);

bot.hear(/gif (.*)/i, (payload, chat, data) => {
  const query = data.match[1];
    chat.say('Searching for the perfect gif for you...');
      fetch(GIPHY_URL + query)
        .then(res => res.json())
          .then(json =>{                    //!!этот вариант кода просто картинка, без лишнего
            chat.say({
              attachment: 'image',
                url: json.data[0].images.fixed_height.url
                   },{
                    typing: true
      }); 
    },20000);
  })  

  
    bot.hear(/gif (.*)/i, (payload, chat, data) => {

      chat.conversation((conversation) =>{
        const query = data.match[1];
          fetch(GIPHY_URL + query)
           .then(res => res.json())
              .then(json =>{
                handlePlot(conversation, json)  //conversation.end();   //
  });
 })
})  
               
function handlePlot(conversation, json) {
      setTimeout(() =>
        conversation.ask({
           text: "Would you like  to try It once again?",
             quickReplies: ["Yes", "No"],
               options: {typing: true}
                }, (payload, conversation)=> {
                  if(payload.message.text ==="Yes") {  
                    conversation.say("You can try once again", {typing: true});      
                       conversation.end();
      
                        } else{
                          conversation.say(" Have nice day!", {typing: true});     
                            conversation.end();
      
      }
    })
  ,15000)
 };

//   bot.hear(/gif (.*)/i, (payload, chat, data) => {

// chat.conversation((conversation) =>{
//  const query = data.match[1];
//  conversation.say('Searching for the perfect gif for you...');
//  conversation.end();


// fetch(GIPHY_URL + query)
// .then(res => res.json())
// .then(json =>{
//  conversation.say({
//     attachment: 'image',
//     url: json.data[0].images.fixed_height.url
//   },{
//     typing: true
//   }); 
//   handlePlot(conversation, json)  //conversation.end();   //
// });
// })

// })  
       

// function handlePlot(conversation, json) {
//   setTimeout(() =>
//   conversation.ask({
//     text: "Would you like to choose a gif yourself?",
//     quickReplies: ["Yes", "Random gif"],
//     options: {typing: true}
//   }, (payload, conversation)=> {
//     if(payload.message.text ==="Yes") {
//       conversation.say(json.Plot, {typing: true});      //здесь нужно печать заданного выбора
//       conversation.end();
//     } else{
//       conversation.say(" It'll be random gif", {typing: true});     
//       conversation.end();
//       //здесь нужно апи рандом вставить
//     }
//   })
//   ,2000)
// };


bot.start(); 

