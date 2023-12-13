$(document).ready(function(){
    fetch("http://localhost:8080/api-gamesMiniverse/v1/GamesMiniverse/games/1")
      .then( body => {
        return body.json();
      }).then( data => {
        console.log(data.highScores);
      })
})