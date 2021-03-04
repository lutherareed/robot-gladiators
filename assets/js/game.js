// function to start a new game
var startGame = function() {
  // reset player stats
  playerInfo.reset();

  // fight each enemy robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
      console.log("I'm in the right version all right.");

      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemyInfo[i];

      // reset enemyHealth and attack values before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);

      // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyObj);
    }
    // if player is not alive, break out of the loop and let endGame function run
    else {
      break;
    }
  }

  // after loop ends, we are either out of player health or enemies to fight, so run the endGame function
  endGame();
};

// function to end the entire game
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");

  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + '.');
  } else {
    window.alert("You've lost your robot in battle!");
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm('Would you like to play again?');

  if (playAgainConfirm) {
    startGame();
  } else {
    window.alert('Thank you for playing Battlebots! Come back soon!');
  }
};

var fightOrSkip = function() {
  var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle?');

  if (!promptFight) {
    window.alert("You need to pick a valid option!  Try again.");
    return fightOrSkip();
  }

  promptFight = promptFight.toLowerCase();

  if (promptFight === "skip") {
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave the fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight.  Goodbye!");
      // subtract money from playerMoney for skipping
      playerInfo.playerMoney = playerInfo.money - 10;
      shop();
    }
  }
}

// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run
    fightOrSkip();
    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // ask if player wants to use the store before next round
      var storeConfirm = window.confirm('The fight is over, visit the store before the next round?');

      // if yes, take them to the store() function
      if (storeConfirm) {
        shop();
      }

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' +playerInfo.health + ' health left.');
    }
  }
};

// go to shop between battles function
var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    'Would you like to (1) REFILL your health, (2) UPGRADE your attack, or (3) LEAVE the store? Please choose a number.'
  );

  shopOptionPrompt = parseInt(shopOptionPrompt);
  // use switch case to carry out action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert('Leaving the store.');
      break;
    default:
      window.alert('You did not pick a valid option. Try again.');
      shop();
      break;
  }
};

// function to generate a random numeric value between 40 and 60.
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * ((max - min) + 1) + min);

  return value;
}

var getPlayerName = function() {
  var name = "";

  while (name === "" || name === null) {
    name = window.prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
}

// Define the player attributes and enemy attributes
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = randomNumber(10, 14);
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
        this.health += 20;
        this.money -= 7;
    } else {
      window.alert("You don't have enough money.");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
        this.attack += 6;
        this.money -= 7;
    } else {
      window.alert("You don't have enough money.");
    }
  }
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

// start first game when page loads
startGame();
