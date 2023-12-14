import userSession from './userSession.js';

$(document).ready(function(){
  console.log(userSession.username);
  if(userSession.loggedIn){
    $("#nombre").text(userSession.username);
  }
})