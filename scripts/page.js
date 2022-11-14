// ===================== Fall 2022 EECS 493 Assignment 3 =====================
// This starter code provides a structure and helper functions for implementing
// the game functionality. It is a suggestion meant to help you, and you are not
// required to use all parts of it. You can (and should) add additional functions
// as needed or change existing functions.

// ==================================================
// ============ Page Scoped Globals Here ============
// ==================================================

// Div Handlers
let game_window;
let game_screen;
let onScreenAsteroid;
let onScreenShield;
let onScreenPortal;
let danger;
let level;
let shield;
let personinv;

// Difficulty Helpers
let astProjectileSpeed = 3;          // easy: 1, norm: 3, hard: 5
let difficulty = "normal";
let spawn_rate = 800;               // easy: 1000, norm: 800, hard: 600
// Game Object Helpers
let currentAsteroid = 1;
let AST_OBJECT_REFRESH_RATE = 15;
let maxPersonPosX = 1218;
let maxPersonPosY = 658;
let PERSON_SPEED = 4;                // Speed of the person
let portalOccurrence = 20000;       // Vaccine spawns every 20 seconds
let portalGone = 5000;              // Vaccine disappears in 5 seconds
let sheildOccurrence = 15000;          // Masks spawn every 15 seconds
let sheildGone = 5000;                 // Mask disappears in 5 seconds
var gameNum = 1;
var danger_num = 20;
var level_num = 1;
var score = 0;
var mm = true;
var scoreNum;
var finalScore;
var colCheck;
var ScoreInv;
var cometInt;
var SheildInv;
var portcollinv;
var shieldcollinv;
var diedSound = new Audio('./src/audio/die.mp3');
var collectSound = new Audio('./src/audio/collect.mp3');
var pewSound = new Audio('./src/audio/pew.mp3');
var vol = 50; //default
// Movement Helpers
var LEFT = false;
var RIGHT = false;
var UP = false;
var DOWN = false;
var touched = false;

// ==============================================
// ============ Functional Code Here ============
// ==============================================

// Main
$(document).ready(function () {
  // ====== Startup ====== 
  $("#game_right_section").hide();
  $("#actual_game").hide();
  $("#tutorial").hide();
  $("#player").hide();
  game_window = $('.game-window');
  game_screen = $("#actual_game");
  scoreNum = $('#score_num');
  finalScore = $('#final_score');
  danger = $('#danger_num');
  level = $('#level_num');
  player = $('#player');
  onScreenAsteroid = $('.curAstroid');
  onScreenShield = $('.curShield');
  onScreenPortal = $('.curPortal');
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value;

  let PERSON_SPEED = 4;

  slider.oninput = function () {
    output.innerHTML = this.value;
    vol = this.value;
  }
  // TODO: ADD MORE

  scoreNum.html(score);
  finalScore.html(score);
  danger.html(danger_num);
  level.html(level_num);



  //spawn(); // Example: Spawn an asteroid that travels from one border to another

});

// TODO: ADD YOUR FUNCTIONS HERE
function openSettings() {
  document.getElementById("settings").style.display = "block";
}
function closeSettings() {
  document.getElementById("settings").style.display = "none";
}
function openTutorial() {
  $("#loading-page").hide();
  if (gameNum > 1) {
    startGame();
  }
  else {

    document.getElementById("tutorial").style.display = "block";
  }
}
function setDiff(clicked_id) {
  console.log(difficulty);
  document.getElementById(difficulty).style.border = "none";
  difficulty = clicked_id;
  document.getElementById(difficulty).style.border = "4px solid yellow";
  if (difficulty === 'easy') {
    document.getElementById("danger_num").innerHTML = "10";
    danger_num = 10;
    spawn_rate = 1000;
    astProjectileSpeed = 1;

  }
  if (difficulty == "normal") {
    console.log("yes");
    danger_num = 20;
    spawn_rate = 800;
    astProjectileSpeed = 3;


  }
  if (difficulty === 'hard') {
    danger_num = 30;
    spawn_rate = 600;
    astProjectileSpeed = 5;
  }
}
function startGame() {
  console.log(PERSON_SPEED);
  PERSON_SPEED = 4;
  level_num = 1;
  gameNum++;
  $("#player").css({ 'left': '600px', 'top': '300px' });
  mm = true;
  stopped = false;

  $("#tutorial").hide();
  document.getElementById("actual_game").style.display = "block";
  document.getElementById("game_right_section").style.display = "block";
  document.getElementById("splash").style.display = "block";

  window.setTimeout("closeSplash();", 3000);
  window.setTimeout('creatingComets()', 3000);
  window.setTimeout('update_score()', 3000);
  window.setTimeout('checkCollAst()', 3000);


  window.setTimeout('Sheild()', 3000);
  window.setTimeout('Portal()', 3000);
  $(".player_img").attr('src', 'src/player/player.gif');


  window.setTimeout(function () {
    // Display the div containing the class "bottomdiv"
    $("#player").show();

  }, 3000);
  $("#tutorial").hide();

  if (difficulty == "easy") {
    astProjectileSpeed = 1;
  }
  if (difficulty == "normal") {
    astProjectileSpeed = 3;
  }
  if (difficulty == "hard") {
    astProjectileSpeed = 5;
  }
  window.setTimeout(function () {
    personinv = setInterval(movePlayer, 10);
  }, 3000);


}
function gameOver() {
  $("#game_right_section").hide();
  $("#actual_game").hide();
  $("#player").hide();
  $("#loading-page").show();
  $(".b1").hide();
  $(".b2").hide();
  $("#gameover").show();
}
function startOver() {
  score = 0;
  level_num = 1;
  if (difficulty == "easy") {
    danger_num = 10;
  }
  if (difficulty == "normal") {
    danger_num = 20;
  }
  if (difficulty == "hard") {
    danger_num = 30;

  }

  scoreNum.html(score);
  finalScore.html(score);
  danger.html(danger_num);
  level.html(level_num);
  $("#gameover").hide();
  $(".b1").show();
  $(".b2").show();


}

function closeSplash() {
  document.getElementById("splash").style.display = "none";
}
function movePlayer() {
  var newPos;

  if (mm == true) {
    if (LEFT == true) {
      newPos = parseInt(player.css('left')) - PERSON_SPEED;
      if (newPos < 0) {
        newPos = 0;
      }
      player.css('left', newPos);
      if (shield == true) {
        $(".player_img").attr('src', 'src/player/player_shielded_left.gif');
      }
      else {
        $(".player_img").attr('src', 'src/player/player_left.gif');
      }
    }
    if (RIGHT == true) {
      newPos = parseInt(player.css('left')) + PERSON_SPEED;
      if (newPos > maxPersonPosX) {
        newPos = maxPersonPosX;
      }
      player.css('left', newPos);
      if (shield == true) {
        $(".player_img").attr('src', 'src/player/player_shielded_right.gif');
      }
      else {
        $(".player_img").attr('src', 'src/player/player_right.gif');
      }
    }
    if (UP == true) {
      newPos = parseInt(player.css('top')) - PERSON_SPEED;
      if (newPos < 0) {
        newPos = 0;
      }
      player.css('top', newPos);
      if (shield == true) {
        $(".player_img").attr('src', 'src/player/player_shielded_up.gif');
      }
      else {
        $(".player_img").attr('src', 'src/player/player_up.gif');
      }
    }
    if (DOWN == true) {
      newPos = parseInt(player.css('top')) + PERSON_SPEED;
      if (newPos > maxPersonPosY) {
        newPos = maxPersonPosY;
      }
      player.css('top', newPos);
      if (shield == true) {
        $(".player_img").attr('src', 'src/player/player_shielded_down.gif');
        $(".player_img").css.height = "90px";
        $(".player_img").css.width = "80px";
      }
      else {
        $(".player_img").attr('src', 'src/player/player_down.gif');
      }

      if (shield == true) {
        $(".player_img").css.height = "90px";
        $(".player_img").css.width = "80px";
      }
      else {

        $(".player_img").css.height = "80px";
        $(".player_img").css.width = "80px";

      }
    }
  }

}
function checkCollAst() {
  colCheck = setInterval(function () {

    $(".curAstroid").children("div").each(function () {
      // console.log ($(this).astermovement);
      if (isColliding($("#player"), $(this)) == true) {
        $(".player_img").attr('src', 'src/player/player_down.gif');

        if (shield == true) {
          $(".player_img").attr('src', 'src/player/player.gif');
          shield = false;
          $(this).remove();
        }
        else {
          stopped = true;
          mm = false;
          endGame();
        }



      }
    });
  }, 100);
}

function checkCollPort() {
  portcollinv = setInterval(function () {

    // console.log ($(this).astermovement);
    if (isColliding($("#player"), $("#curPortal")) == true) {

      //  clearInterval(astermovement);
      level_num = level_num + 1;
      console.log("lev :" + level_num);
      danger_num = danger_num + 2;
      console.log("dan:" + danger_num);

      astProjectileSpeed = astProjectileSpeed + (astProjectileSpeed * 0.2);
      removePortal();
      danger.html(danger_num);
      level.html(level_num);
      collectSound.play();
      collectSound.volume = parseFloat(vol / 100);

    }

  }, 100);
}
function checkCollShield() {
  shieldcollinv = setInterval(function () {

    // console.log ($(this).astermovement);
    if (isColliding($("#player"), $("#curShield")) == true) {
      removeSheild();
      shield = true;
      collectSound.play();
      collectSound.volume = parseFloat(vol / 100);

    }

  }, 100);
}
function update_score() {
  ScoreInv = setInterval(function () {
    score = score + 40;

    document.getElementById("score_num").innerHTML = score;
  }, 500);
}
function createSheild() {
  let shield = " <img id = 'curShield' src = 'src/shield.gif'/>";
  onScreenShield.append(shield);
  //$('#acc').hide();
  let y = getRandomNumber(0, 640);
  let x = getRandomNumber(0, 1200);

  $('#curShield').css('top', y);
  $('#curShield').css('left', x);
  //$('#acc').css('display', 'block');
  checkCollShield()


}
function createPortal() {
  let portal = " <img id = 'curPortal' src = 'src/port.gif'/>";
  onScreenPortal.append(portal);
  //$('#acc').hide();
  let y = getRandomNumber(0, 640);
  let x = getRandomNumber(0, 1200);

  $('#curPortal').css('top', y);
  $('#curPortal').css('left', x);
  //$('#acc').css('display', 'block');

  checkCollPort();

}

function Sheild() {
  sheildInt = setInterval(function () {
    createSheild();
    window.setTimeout("removeSheild()", sheildGone);
  }, sheildOccurrence);
}
function Portal() {
  portalInt = setInterval(function () {
    createPortal();

    window.setTimeout("removePortal()", portalGone);
  }, portalOccurrence);
}
function removeSheild() {

  onScreenShield.children("img").remove();
  clearInterval(shieldcollinv);
}
function removePortal() {

  onScreenPortal.children("img").remove();
  clearInterval(portcollinv);
}
function creatingComets() {

  cometInt = setInterval(function () {
    spawn();
  }, spawn_rate);

}
function removeallComets() {
  $(".curAstroid").children("div").each(function () {

    $(this).remove();

  });
}
function endGame() {
  astProjectileSpeed = 0;
  $(".curAstroid").each(function () {
    //astProjectileSpeed=0;
  });
  window.setTimeout("removeallComets();", 2000);
  window.setTimeout("gameOver();", 2000);
  $(".player_img").attr('src', 'src/player/player_touched.gif');
  diedSound.play();
  diedSound.volume = parseFloat(vol / 100);

  dropIndex = 1;
  clearInterval(colCheck);
  clearInterval(cometInt);

  clearInterval(ScoreInv);
  finalScore.html(score);
  clearInterval(shieldcollinv);
  clearInterval(portcollinv);
  clearInterval(sheildInt);
  clearInterval(portalInt);
  clearInterval(personinv);






}
// Keydown event handler
document.onkeydown = function (e) {
  if (e.key == 'ArrowLeft') LEFT = true;
  if (e.key == 'ArrowRight') RIGHT = true;
  if (e.key == 'ArrowUp') UP = true;
  if (e.key == 'ArrowDown') DOWN = true;

}

// Keyup event handler
document.onkeyup = function (e) {
  if (e.key == 'ArrowLeft') LEFT = false;
  if (e.key == 'ArrowRight') RIGHT = false;
  if (e.key == 'ArrowUp') UP = false;
  if (e.key == 'ArrowDown') DOWN = false;

}

// Starter Code for randomly generating and moving an asteroid on screen
// Feel free to use and add additional methods to this class
class Asteroid {
  // constructs an Asteroid object
  constructor() {
    /*------------------------Public Member Variables------------------------*/
    // create a new Asteroid div and append it to DOM so it can be modified later
    let objectString = "<div id = 'a-" + currentAsteroid + "' class = 'curAstroid' > <img src = 'src/asteroid.png'/></div>";
    onScreenAsteroid.append(objectString);
    // select id of this Asteroid
    this.id = $('#a-' + currentAsteroid);
    currentAsteroid++; // ensure each Asteroid has its own id
    // current x, y position of this Asteroid
    this.cur_x = 0; // number of pixels from right
    this.cur_y = 0; // number of pixels from top

    /*------------------------Private Member Variables------------------------*/
    // member variables for how to move the Asteroid
    this.x_dest = 0;
    this.y_dest = 0;
    // member variables indicating when the Asteroid has reached the boarder
    this.hide_axis = 'x';
    this.hide_after = 0;
    this.sign_of_switch = 'neg';
    // spawn an Asteroid at a random location on a random side of the board
    this.#spawnAsteroid();
  }

  // Requires: called by the user
  // Modifies:
  // Effects: return true if current Asteroid has reached its destination, i.e., it should now disappear
  //          return false otherwise
  hasReachedEnd() {
    if (this.hide_axis == 'x') {
      if (this.sign_of_switch == 'pos') {
        if (this.cur_x > this.hide_after) {
          return true;
        }
      }
      else {
        if (this.cur_x < this.hide_after) {
          return true;
        }
      }
    }
    else {
      if (this.sign_of_switch == 'pos') {
        if (this.cur_y > this.hide_after) {
          return true;
        }
      }
      else {
        if (this.cur_y < this.hide_after) {
          return true;
        }
      }
    }
    return false;
  }

  // Requires: called by the user
  // Modifies: cur_y, cur_x
  // Effects: move this Asteroid 1 unit in its designated direction
  updatePosition() {
    // ensures all asteroids travel at current level's speed
    this.cur_y += this.y_dest * astProjectileSpeed;
    this.cur_x += this.x_dest * astProjectileSpeed;
    // update asteroid's css position
    this.id.css('top', this.cur_y);
    this.id.css('right', this.cur_x);
  }

  // Requires: this method should ONLY be called by the constructor
  // Modifies: cur_x, cur_y, x_dest, y_dest, num_ticks, hide_axis, hide_after, sign_of_switch
  // Effects: randomly determines an appropriate starting/ending location for this Asteroid
  //          all asteroids travel at the same speed
  #spawnAsteroid() {
    // REMARK: YOU DO NOT NEED TO KNOW HOW THIS METHOD'S SOURCE CODE WORKS
    let x = getRandomNumber(0, 1280);
    let y = getRandomNumber(0, 720);
    let floor = 784;
    let ceiling = -64;
    let left = 1344;
    let right = -64;
    let major_axis = Math.floor(getRandomNumber(0, 2));
    let minor_aix = Math.floor(getRandomNumber(0, 2));
    let num_ticks;

    if (major_axis == 0 && minor_aix == 0) {
      this.cur_y = floor;
      this.cur_x = x;
      let bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed);

      this.x_dest = (game_screen.width() - x);
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-.5, .5);
      this.y_dest = -astProjectileSpeed - getRandomNumber(0, .5);
      this.hide_axis = 'y';
      this.hide_after = -64;
      this.sign_of_switch = 'neg';
    }
    if (major_axis == 0 && minor_aix == 1) {
      this.cur_y = ceiling;
      this.cur_x = x;
      let bottomOfScreen = game_screen.height();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed);

      this.x_dest = (game_screen.width() - x);
      this.x_dest = (this.x_dest - x) / num_ticks + getRandomNumber(-.5, .5);
      this.y_dest = astProjectileSpeed + getRandomNumber(0, .5);
      this.hide_axis = 'y';
      this.hide_after = 784;
      this.sign_of_switch = 'pos';
    }
    if (major_axis == 1 && minor_aix == 0) {
      this.cur_y = y;
      this.cur_x = left;
      let bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed);

      this.x_dest = -astProjectileSpeed - getRandomNumber(0, .5);
      this.y_dest = (game_screen.height() - y);
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-.5, .5);
      this.hide_axis = 'x';
      this.hide_after = -64;
      this.sign_of_switch = 'neg';
    }
    if (major_axis == 1 && minor_aix == 1) {
      this.cur_y = y;
      this.cur_x = right;
      let bottomOfScreen = game_screen.width();
      num_ticks = Math.floor((bottomOfScreen + 64) / astProjectileSpeed);

      this.x_dest = astProjectileSpeed + getRandomNumber(0, .5);
      this.y_dest = (game_screen.height() - y);
      this.y_dest = (this.y_dest - y) / num_ticks + getRandomNumber(-.5, .5);
      this.hide_axis = 'x';
      this.hide_after = 1344;
      this.sign_of_switch = 'pos';
    }
    // show this Asteroid's initial position on screen
    this.id.css("top", this.cur_y);
    this.id.css("right", this.cur_x);
    // normalize the speed s.t. all Asteroids travel at the same speed
    let speed = Math.sqrt((this.x_dest) * (this.x_dest) + (this.y_dest) * (this.y_dest));
    this.x_dest = this.x_dest / speed;
    this.y_dest = this.y_dest / speed;
  }
}

// Spawns an asteroid travelling from one border to another
function spawn() {
  let asteroid = new Asteroid();
  setTimeout(spawn_helper(asteroid), 0);
}

function spawn_helper(asteroid) {
  let astermovement = setInterval(function () {
    // update asteroid position on screen
    asteroid.updatePosition();

    // determine whether asteroid has reached its end position, i.e., outside the game border
    if (asteroid.hasReachedEnd()) {
      asteroid.id.remove();
      clearInterval(astermovement);
    }
  }, AST_OBJECT_REFRESH_RATE);
}

//===================================================

// ==============================================
// =========== Utility Functions Here ===========
// ==============================================

// Are two elements currently colliding?
function isColliding(o1, o2) {
  return isOrWillCollide(o1, o2, 0, 0);
}

// Will two elements collide soon?
// Input: Two elements, upcoming change in position for the moving element
function willCollide(o1, o2, o1_xChange, o1_yChange) {
  return isOrWillCollide(o1, o2, o1_xChange, o1_yChange);
}

// Are two elements colliding or will they collide soon?
// Input: Two elements, upcoming change in position for the moving element
// Use example: isOrWillCollide(paradeFloat2, person, FLOAT_SPEED, 0)
function isOrWillCollide(o1, o2, o1_xChange, o1_yChange) {
  const o1D = {
    'left': o1.offset().left + o1_xChange,
    'right': o1.offset().left + o1.width() + o1_xChange,
    'top': o1.offset().top + o1_yChange,
    'bottom': o1.offset().top + o1.height() + o1_yChange
  };
  const o2D = {
    'left': o2.offset().left,
    'right': o2.offset().left + o2.width(),
    'top': o2.offset().top,
    'bottom': o2.offset().top + o2.height()
  };
  // Adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
  if (o1D.left < o2D.right &&
    o1D.right > o2D.left &&
    o1D.top < o2D.bottom &&
    o1D.bottom > o2D.top) {
    // collision detected!
    return true;
  }
  return false;
}

// Get random number between min and max integer
function getRandomNumber(min, max) {
  return (Math.random() * (max - min)) + min;
}
