console.clear();
var pos = 0;
const pacArray = [
  ["./images/PacMan1.png", "./images/PacMan2.png"],
  ["./images/PacMan3.png", "./images/PacMan4.png"],
];
var direction = 0;
const pacMen = []; // This array holds all the pacmen

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}
// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);
  // console.log("x:" + position.x + " y:" + position.y);
  let chomp = false;
  // console.log(chomp);
  // Add image to div id = game
  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";
  newimg.src = pacArray[0][0];
  newimg.width = 100;
  //
  // set position here
  //
  newimg.style.left = position.x;
  newimg.style.top = position.y;

  // add new Child image to game
  game.appendChild(newimg);
  // return details in an object
  return {
    position,
    velocity,
    newimg,
    chomp,
  };
}

function update() {
  //loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.chomp = !item.chomp;
    item.newimg.src = pacArray[0][item.chomp ? 1 : 0];
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  //
  // detect collision with all walls and make pacman bounce
  //
  let w = window.innerWidth;
  if (item.position.x < 0 || item.position.x > w) {
    item.velocity.x = item.velocity.x * -1;
  }
  let h = window.innerHeight;
  if (item.position.y < 0 || item.position.y > h) {
    item.velocity.y = item.velocity.y * -1;
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
  // pacMen.forEach(element => {
  //   console.log(element.newimg)
  // });
}
