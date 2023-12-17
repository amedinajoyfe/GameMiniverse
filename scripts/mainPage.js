$(document).ready(function(){
  let user = sessionStorage.getItem("logName");
  if(user != null){
    $("#nombre").text(user);
    $("#blockImage").addClass("hidden");
  }
})

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