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
let select = document.querySelector("select");
let colors=["red","green","purple","yellow"];
select.addEventListener("change",()=>{
  let lvl=select.value;
  let l2=document.querySelector(".line-two")
  let l3=document.querySelector(".line-three")
  if(lvl==="easy"){
    colors=["red","green"];
    l2.classList.add("disable");
    l3.classList.add("disable");
  }
  else if(lvl==="medium"){
    colors=["red","green","purple","yellow"];
    l2.classList.remove("disable")
    l3.classList.add("disable");
  }
  else{
    colors=["red","green","purple","yellow","blue","orange"];
    l2.classList.remove("disable")
    l3.classList.remove("disable");
  }
})

//random color function
function randomColor(color) {
  let num = Math.floor(Math.random() * color.length )+ 1;
  return color[num-1];
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
  select.disabled=false;
  userSeq = [];
  gameSeq = [];
  level = 0;
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerHTML = `Level ${level}`;
  let color = randomColor(colors);
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
    select.disabled=true;
    levelUp();
  }
}
