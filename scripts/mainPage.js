$(document).ready(function(){
  let user = sessionStorage.getItem("logName");
  let userID = sessionStorage.getItem("logId");
  if(user != null){
    $("#nombre").text(user);
    $("#blockImage").addClass("hidden");
    fetch("http://localhost:8080/api-gamesMiniverse/v1/GamesMiniverse/users/" + userID + "/highScores")
    .then( body => {
      return body.json();
    }).then( data => {
      data.forEach(element => {
        $("#game" + element.gameId).text("Personal score: " + element.score);
      });
    })
  }
});

window.onmousemove = function(e) {
  if (e.target.classList.contains('achievementImage')) {
    var $target = e.target.nextElementSibling;

    if (!$target.classList.contains('visible')) {
      $target.classList.add('visible');
    } 
    else {
      var tipDist = 15;
      $target.style.top = (e.clientY + tipDist) + 'px';
      $target.style.left = (e.clientX + tipDist) + 'px';
    }
  } 
  else {
    var content = document.getElementsByClassName('hiddenText');
    for (var i = 0; i < content.length; i++) {
      content[i].classList.remove('visible');
    }
  }
};