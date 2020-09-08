$(document).ready(function() {
  var count = 0;

  var You = {
    YourTurn: "",
    turn: 0, // this is the number of turns you have taken. 
    firstTime: false
  };

  var Simon = {
    //assign random color 0-4 represents different colors
    colors: Math.floor(Math.random() * 4),
    memory: [],
    Timer: 0,
    GameOver: false,
    buzz: false,
    on: false,
    strict: true,
    timerParameter: 0
  };

  $(".count").text(" "); //in the beginning don't show anything in black square

  $(".reset").click(function() {
    if (Simon.on) {
      resetParameters();
      start();
      setTimeout(function() {

        $(".count").text(count);
      }, 1000);
      $(".count").text("Reset");
    }
  });

  $(".strict").click(function() {
    if (Simon.on && !Simon.strict) {
      setTimeout(function() {
        $(".count").text(count);
      }, 1000);
      $(".count").text("-STR");
      Simon.strict = true;
    } else if (Simon.on) {
      setTimeout(function() {
        $(".count").text(count);
      }, 1000);
      $(".count").text("+STR");
      Simon.strict = false;
    }
  });

  $(".on").click(function() {
    if (!Simon.on) {
      Simon.on = true;
      start();
      $('#onLight').css({
        'background-color': '#ef3d47'
      });
    } else {

      Simon.on = false;
      resetParameters();
      $(".count").text("");
      $('#onLight').css({
        'background-color': 'black'
      });
    }
  });

  function start() {
    $(".count").text(count);
    SimonSays(true);

  }
  $("#BlueButton").click(function() {
    //For example, simon's move after blue light... 
    SimonsMove("BlueLight");
  });
  $("#RedButton").click(function() {
    SimonsMove("RedLight");
  });
  $("#GreenButton").click(function() {
    SimonsMove("GreenLight");
  });
  $("#PurpleButton").click(function() {
    SimonsMove("PurpleLight");
  });

  function SimonSays(NewMove) {

    setTimeout(function() {

      if (NewMove) {
        Simon.colors = Math.floor(Math.random() * 4);
        if (Simon.colors === 0) {
          Simon.memory.push("blue");
        }
        if (Simon.colors === 1) {
          Simon.memory.push("red");
        }
        if (Simon.colors === 2) {
          Simon.memory.push("green");
        }
        if (Simon.colors === 3) {
          Simon.memory.push("purple");
        }
      }
      You.turn = 0;
      for (var i = 0; i < Simon.memory.length; i++) {

        if (Simon.memory[i] === "blue") {
          BlueLight(500);
        }
        if (Simon.memory[i] === "red") {
          RedLight(500);
        }
        if (Simon.memory[i] === "green") {
          GreenLight(500);
        }
        if (Simon.memory[i] === "purple") {
          PurpleLight(500);
        }

      }
    }, 800);

    count++
    setTimeout(function() {

      $(".count").text(count);
    }, 800);

  }

  function SimonsMove(light) {
    if (Simon.on) {
      Simon.Timer = 0;
      if (light === "RedLight") {
        RedLight(300);
      }
      if (light === "BlueLight") {
        BlueLight(300);
      }
      if (light === "GreenLight") {
        GreenLight(300);
      }
      if (light === "PurpleLight") {
        PurpleLight(300);
      }
      if (You.YourTurn !== Simon.memory[You.turn]) {
        GameOver();
        You.firstTime = true;
      }

      if (You.turn === (Simon.memory.length - 1) && !You.firstTime) {

        SimonSays(true);

      } else if (!Simon.GameOver) {

        You.turn++;

      }
      You.firstTime = false;
      GameWin();
    }

  }

  function BlueLight(timerParameter) {
    Simon.GameOver = false;
    You.YourTurn = "blue";
    setTimeout(function() {
  
      $('#BlueButton').css({
        'background-color': '#00FFFF'
      });

    
    }, Simon.Timer += timerParameter);


    
       setTimeout(function() {
      document.getElementById("BlueSound").play();     
      $('#BlueButton').css({
        'background-color': '#3385ff'
      });
    }, Simon.Timer += timerParameter);

    
  }

  function RedLight(timerParameter) {
    Simon.GameOver = false;
    You.YourTurn = "red";
    setTimeout(function() {
        $('#RedButton').css({
          'background-color': 'pink'
        });
   
      },
      Simon.Timer += timerParameter);
  

    setTimeout(function() {
      document.getElementById("RedSound").play();   
      $('#RedButton').css({
        'background-color': 'red'
      });
    }, Simon.Timer += timerParameter);
    Simon.buzz = true;
   
  }

  function GreenLight(timerParameter) {
    Simon.GameOver = false;
    You.YourTurn = "green";
    setTimeout(function() {
      $('#GreenButton').css({
        'background-color': '#00FF00'
      });
          
   
      
    }, Simon.Timer += timerParameter);

      

    setTimeout(function() {
      document.getElementById("GreenSound").play();     
      $('#GreenButton').css({
        'background-color': '#2eb82e'
      });
    }, Simon.Timer += timerParameter);
    Simon.buzz = true;

  }

  function PurpleLight(timerParameter) {
    Simon.GameOver = false;
    You.YourTurn = "purple";

    setTimeout(function() {
      $('#PurpleButton').css({
        'background-color': '#ff99ff'
      });

    }, Simon.Timer += timerParameter);
  

        
    setTimeout(function() {
      document.getElementById("PurpleSound").play();   
      $('#PurpleButton').css({
        'background-color': '#d633ff'
      });
    }, Simon.Timer += timerParameter);

  }

  function resetParameters() {
    count = 0;
    You.turn = 0;
    Simon.GameOver = false;
    Simon.buzz = true;
    You.firstTime = false;
    Simon.memory = [];

  }

  function GameOver() {

    if (Simon.strict) {
      You.turn--;
      count--; //keeps from incrementing by one neutralizes things... 
      setTimeout(function() {

        SimonSays(false);
        $(".count").text(count);
      }, 2000);
    } else {
      Simon.memory = [];
      Simon.Timer = 0;
      setTimeout(function() {
        SimonSays(true);
        count = 1;
        $(".count").text(count);
      }, 2000);
    }
    $(".count").text("!!!!");
  }

  function GameWin() {
    if (count > 20) {
      resetParameters();
      setTimeout(function() {
        $(".count").text(count);
      }, 2000);
      $(".count").text("WIN!!");
    }
  }
});