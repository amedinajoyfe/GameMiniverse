$(document).ready(function(){
  let user = localStorage.getItem("logName");
  if(user != null)
    $("#nombre").text(user);
})