//first press any key to start
let started = false;
let level = 0;
let gameSeq = [];
let userSeq = [];
let highest=0;
let high = document.createElement("h2");
high.innerHTML=`Highest Score : ${highest}`;
high.classList.add("highest");
document.body.appendChild(high); 
document.addEventListener("keypress", simonGame);
let btn = document.querySelector("button");
btn.addEventListener("click", simonGame);
let h2 = document.querySelector("h2");
//random color function

function randomColor() {
  let num = Math.floor(Math.random() * 4 + 1);
  if (num == 1) return "red";
  if (num == 2) return "green";
  if (num == 3) return "purple";
  if (num == 4) return "yellow";
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function check(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 250);
    }
  } else {
    h2.innerHTML = `Game Over! Your Score is <b>${level-1}</b> <br> Press any key to start `;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 100);
    if(highest<level){
        highest=level-1;
        let h=document.querySelector(".highest");
        h.innerHTML=`Highest Score : ${highest}`;
    }
    reset();
  }
}

function reset() {
  started = false;
  let btn = document.querySelectorAll(".btn");
  for (b of btn) {
    b.removeEventListener("click", btnPress);
  }
  userSeq = [];
  gameSeq = [];
  level = 0;
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerHTML = `Level ${level}`;
  let color = randomColor();
  gameSeq[level - 1] = color;
  let btn = document.querySelector(`.${color}`);
  gameFlash(btn);
}

function btnPress() {
  let button = this;
  userFlash(button);
  userSeq.push(this.classList[1]);
  check(userSeq.length - 1);
}

function simonGame() {
  //by this game will start only one time when key is pressed
  let btn = document.querySelectorAll(".btn");
  for (b of btn) {
    b.addEventListener("click", btnPress);
  }
  if (started == false) {
    started = true;
    levelUp();
  }
}
