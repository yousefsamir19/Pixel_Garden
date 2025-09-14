// class ForestBackground {
//   constructor() {
//     this.layers = document.querySelectorAll(".bg-layer");
//     this.isMoving = false;
//     this.movementSpeed = 0;
//     this.idleSpeed = 0.0;
//     this.movingSpeed = 2;
//     this.currentX = 0;
//     this.targetX = 0;
//     this.animationId = null;

//     this.init();
//   }

//   init() {
//     // Start the animation loop
//     this.animate();

//     // Add keyboard event listeners for character movement
//     this.addMovementListeners();

//     // Add touch/mouse support for mobile
//     this.addTouchSupport();
//   }

//   addMovementListeners() {
//     let isKeyPressed = false;

//     document.addEventListener("keydown", (e) => {
//       if (
//         !isKeyPressed &&
//         (e.key === "ArrowLeft" ||
//           e.key === "ArrowRight" ||
//           e.key === "a" ||
//           e.key === "d" ||
//           e.key === "A" ||
//           e.key === "D")
//       ) {
//         isKeyPressed = true;
//         this.startMoving();
//       }
//     });

//     document.addEventListener("keyup", (e) => {
//       if (
//         e.key === "ArrowLeft" ||
//         e.key === "ArrowRight" ||
//         e.key === "a" ||
//         e.key === "d" ||
//         e.key === "A" ||
//         e.key === "D"
//       ) {
//         isKeyPressed = false;
//         this.stopMoving();
//       }
//     });
//   }

//   addTouchSupport() {
//     let touchStartX = 0;
//     let isTouching = false;

//     document.addEventListener("touchstart", (e) => {
//       touchStartX = e.touches[0].clientX;
//       isTouching = true;
//       this.startMoving();
//     });

//     document.addEventListener("touchmove", (e) => {
//       if (isTouching) {
//         const touchX = e.touches[0].clientX;
//         const deltaX = touchX - touchStartX;

//         // Determine movement direction based on touch
//         if (Math.abs(deltaX) > 10) {
//           this.targetX += deltaX * 0.01;
//           touchStartX = touchX;
//         }
//       }
//     });

//     document.addEventListener("touchend", () => {
//       isTouching = false;
//       this.stopMoving();
//     });
//   }

//   startMoving() {
//     this.isMoving = true;
//     this.movementSpeed = this.movingSpeed;
//   }

//   stopMoving() {
//     this.isMoving = false;
//     this.movementSpeed = this.idleSpeed;
//   }

//   animate() {
//     // Calculate movement
//     if (this.isMoving) {
//       // When character is moving, no parallax - keep layers static
//       this.targetX = 0;
//     } else {
//       // Idle movement - subtle back and forth with parallax
//       this.targetX += Math.sin(Date.now() * 0.001) * 0.5;
//     }

//     // Smooth interpolation
//     this.currentX += (this.targetX - this.currentX) * 0.1;

//     // Apply parallax effect to each layer only during idle state
//     this.layers.forEach((layer) => {
//       const speed = parseFloat(layer.dataset.speed);
//       let x = 0;

//       if (!this.isMoving) {
//         // Only apply parallax during idle state
//         x = this.currentX * speed;

//         // Implement infinite scrolling - reset position when reaching edge
//         const layerWidth = window.innerWidth; // Width of one image
//         if (x > layerWidth) {
//           x = x - layerWidth;
//         } else if (x < -layerWidth) {
//           x = x + layerWidth;
//         }
//       }

//       layer.style.transform = `translateX(${x}px)`;
//     });

//     this.animationId = requestAnimationFrame(() => this.animate());
//   }

//   // Method to manually control background movement (for external use)
//   moveBackground(direction, speed = 1) {
//     this.targetX += direction * speed;
//   }

//   // Method to set idle state
//   setIdle() {
//     this.isMoving = false;
//     this.movementSpeed = this.idleSpeed;
//   }

//   // Method to set moving state
//   setMoving() {
//     this.isMoving = true;
//     this.movementSpeed = this.movingSpeed;
//   }
// }

// // Initialize the forest background when the page loads
// document.addEventListener("DOMContentLoaded", () => {
//   window.forestBackground = new ForestBackground();
// });

// // Export for use in other scripts
// if (typeof module !== "undefined" && module.exports) {
//   module.exports = ForestBackground;
// }

const clickSound = new Audio("soundEffects/click1.mp3");
const typingSound = new Audio("soundEffects/typing.mp3");

const emma = document.querySelector("#emma");
const emmaPhoto = document.querySelector("#emmaPhoto");
const namePage = document.querySelector("#namePage");
const startPage = document.querySelector("#startPage");
const rulesPage = document.querySelector("#rulesPage");
const taskPage = document.querySelector("#taskPage");
const speechBubble = document.querySelector("#speechBubble");
const bubbleText = document.querySelector(`#speechBubble > p`);
const rulesNextBtn = document.querySelector("#rulesPage > button");
const rulesText = document.querySelector("#rulesText");
const homeBtns = document.querySelector("#homeBtns");
const homePhotos = document.querySelector("#homePhotos");

let username, task;

// emma interaction
let emmaHome = false;
let clickedEmma = false;
let mouseout = false;
emmaPhoto.addEventListener("mouseover", (event) => {
  if (emmaHome) {
    if (!clickedEmma) {
      if (mouseout == false) {
        bubbleText.textContent = "";
        event.target.src = "Assets/threatingEmma.png";
        bubbleText.textContent =
          "You better be clicking if you want me to beat you up!";
        speechBubble.style.display = "inline-block";
      }
    }
  }
});

emmaPhoto.addEventListener("click", (event) => {
  if (emmaHome) {
    if (!clickedEmma) {
      bubbleText.textContent = "";
      emma.style.top = "36rem";
      event.target.src = "Assets/angryEmma.png";
      bubbleText.textContent =
        "How you dare ?! You think you can click me and get away with it?! I'll show you!";
      clickedEmma = true;

      setTimeout(() => {
        emma.style.top = "35.1rem";
        event.target.src = "Assets/idealEmma.png";
        speechBubble.style.display = "none";
      }, 4000);
      setTimeout(() => {
        bubbleText.textContent = "";
        emma.style.top = "34.5rem";
        bubbleText.textContent =
          "Sorry I yelled at, but it really hurts. Don't do it again if you want to live";
        speechBubble.style.display = "inline-block";
        emmaPhoto.src = "Assets/sadEmma.png";
      }, 7000);

      setTimeout(() => {
        emma.style.top = "35.1rem";
        speechBubble.style.display = "none";
        bubbleText.textContent = "";
        emmaPhoto.src = "Assets/idealEmma.png";
        clickedEmma = false;
      }, 17000);
    }
  }
});

emmaPhoto.addEventListener("mouseout", (event) => {
  if (emmaHome) {
    if (!clickedEmma) {
      if (mouseout == false) {
        bubbleText.textContent = "";
        mouseout = true;
        emma.style.top = "35.1rem";
        event.target.src = "Assets/idealEmma.png";
        bubbleText.textContent = "good for you";
        setTimeout(() => {
          speechBubble.style.display = "none";
          bubbleText.textContent = "";
          mouseout = false;
        }, 3000);
      }
    }
  }
});

// the start btn that moves you to the name page

document.querySelector("#startPage > button").onclick = function () {
  clickSound.play();
  typingSound.play();

  setTimeout(() => {
    typingSound.pause();
    typingSound.currentTime = 0;
  }, 5000);
  namePage.style.display = "flex";
  startPage.style.display = "none";
  emma.style.top = "36rem";
};

// the next btn of the name page that moves you to rules page

document.querySelector("#namePage > button").onclick = function () {
  clickSound.play();
  typingSound.play();

  setTimeout(() => {
    typingSound.pause();
    typingSound.currentTime = 0;
  }, 800);

  username = document.querySelector("#nameInput").value;
  namePage.style.display = "none";
  rulesPage.style.display = "flex";
  bubbleText.prepend(`Hey ${username},`);
  document.querySelector("#rulesText").prepend(`Welcome ${username}`);
  emma.style.display = "flex";
  speechBubble.style.display = "inline-block";
};

// the next btn of the rules page that moves you to task page

document.querySelector("#rulesPage > button").onclick = function () {
  clickSound.play();
  typingSound.play();

  setTimeout(() => {
    typingSound.pause();
    typingSound.currentTime = 0;
  }, 1700);
  rulesPage.style.display = "none";
  document.querySelector("#taskPage").style.display = "flex";
  document.querySelector(
    "#taskPage > label"
  ).textContent = `Enter The Task here`;
  emmaPhoto.src = "Assets/idealEmma.png";
  speechBubble.style.display = "none";
  emma.style.top = "35.1rem";
};

// the next btn of the task page that moves you to home page

document.querySelector("#taskPage > button").onclick = function () {
  clickSound.play();
  task = document.querySelector("#taskInput").value;
  homeBtns.style.display = "none";
  taskPage.style.display = "none";
  document.querySelector("#playerName").textContent = username;
  document.querySelector("#homeBtns").style.display = "flex";
  document.querySelector("#hud").style.display = "flex";
  homePhotos.style.display = "flex";
  emmaHome = true;
};

// home page btns

const rulesBtn = document.querySelector("#homeBtns > button:nth-child(1)");
const sosBtn = document.querySelector("#homeBtns > button:nth-child(2)");
const taskBtn = document.querySelector("#homeBtns > button:nth-child(3)");
const studyBtn = document.querySelector("#homeBtns > button:nth-child(4)");
const homeBtn = document.querySelector("#homeBtn");

// functions of click the "Rules" btn on home screen

function toRules(event) {
  emmaHome = false;
  clickSound.play();
  document.querySelector("#hud").style.display = "none";
  document.querySelector("#homeBtns").style.display = "none";
  emmaPhoto.src = "Assets/laughingEmma.png";
  bubbleText.textContent = " Are you stupid ? What's so hard about the rules?";
  speechBubble.style.display = "flex";
  setTimeout(() => {
    bubbleText.textContent =
      "They're simple: do the task, and you get a flower.";
  }, 4000);
  setTimeout(() => {
    bubbleText.textContent =
      "If not, you'll end up with a stupid duck like you.";
  }, 8000);

  setTimeout(() => {
    speechBubble.style.display = "none";
    bubbleText.textContent = "";
  }, 14000);
  rulesPage.style.display = "flex";
  document.querySelector("#rulesBtn").style.display = "none";
  homePhotos.style.display = "none";
  homeBtn.style.display = "flex";
}
rulesBtn.addEventListener("click", toRules);

// functions of click the "SOS" btn on home screen

function toSos(event) {
  emmaHome = false;
  clickSound.play();
  homeBtns.style.display = "none";
  document.querySelector("#tree").style.display = "none";
  document.querySelector("#spiderFlower").style.display = "none";
  emmaPhoto.src = "Assets/smilingEmma.png";
  bubbleText.textContent = `Hey, ${username}. Take it easy.`;
  speechBubble.style.display = "flex";
  document.querySelector("#sosText").style.display = "flex";
  setTimeout(() => {
    bubbleText.textContent =
      " You're doing well and you'll achieve those dreams.";
  }, 4000);
  setTimeout(() => {
    bubbleText.textContent = "Take this flower, and you'll be okay.";
  }, 8000);
  setTimeout(() => {
    bubbleText.textContent = "I believe in you.";
  }, 12000);
  setTimeout(() => {
    speechBubble.style.display = "none";
    bubbleText.textContent = "";
  }, 18000);
  homeBtn.style.display = "flex";
}
sosBtn.addEventListener("click", toSos);

// functions of click the "Task" btn on home screen

function toTask(event) {
  emmaHome = false;
  clickSound.play();
  homeBtns.style.display = "none";
  emmaPhoto.src = "Assets/wateringEmma1.png";
  emma.style.right = "22rem";
  emma.style.top = "36rem";
  homeBtn.style.display = "flex";
  document.querySelector("#tree").style.display = "none";
  document.querySelector("#spiderFlower").style.display = "none";
  speechBubble.style.left = "64rem";
}
taskBtn.addEventListener("click", toTask);

// functions of click the "Study with me" btn on home screen

const quranControllers = document.querySelector("#quranControllers");
const studyPage = document.querySelector("#studyPage");
const surahMaryam = new Audio("soundEffects/surahMaryam.mp3");
const surahIbrahim = new Audio("soundEffects/surahIbrahim.mp3");
const surahElnour = new Audio("soundEffects/surahElnour.mp3");
const surahYaseen = new Audio("soundEffects/surahYaseen.mp3");
const surahYousef = new Audio("soundEffects/surahYousef.mp3");
const surahYousefmahr = new Audio("soundEffects/surahYousefmahr.mp3");
const quackSound = new Audio("soundEffects/quack.mp3");
let surah;

function toStudy(event) {
  studyPage.style.display = "flex";
  emmaHome = false;
  clickSound.play();
  homeBtns.style.display = "none";
  emmaPhoto.src = "Assets/studyEmma.png";
  homeBtn.style.display = "flex";
  document.querySelector("#tree").style.display = "none";
  document.querySelector("#spiderFlower").style.display = "none";
  bubbleText.textContent = `Hey,${username} . Let's study for an hour.`;
  speechBubble.style.display = "flex";
  setTimeout(() => {
    bubbleText.textContent = `You'll get a flower and a 15-minute break after every session, so collect as many as you can!`;
  }, 3000);
  setTimeout(() => {
    bubbleText.textContent =
      "Oh, I almost forgot, before you start the study session, hover over the left duck.";
  }, 7500);
  setTimeout(() => {
    speechBubble.style.display = "none";
  }, 12000);
}

document.querySelector("#blackDuck").addEventListener("mouseover", (event) => {
  if (!emmaHome) {
    speechBubble.style.display = "flex";
    bubbleText.textContent =
      "I recommend you listen to the Quran. Lucky for you, I have my favorite Suwar here.";
    setTimeout(() => {
      bubbleText.textContent =
        "Just click on the duck, and I'll tell you where you can find them.";
    }, 9000);
  }
});

let clickedDuck = false;
document.querySelector("#blackDuck").addEventListener("click", (event) => {
  if (!emmaHome) {
    clickedDuck = true;
    quackSound.play();
    bubbleText.textContent =
      "Hover over the items on your righ (like: tree ,cat) to choose a surah, and click on one if you want to play it.";
  } else {
    quackSound.play();
  }
});

document.querySelector("#flowers").addEventListener("mouseover", (event) => {
  if (clickedDuck) bubbleText.textContent = "Surah Maryam - Yasser Al Dosari";
});

document.querySelector("#flowers").addEventListener("click", (event) => {
  if (clickedDuck) {
    speechBubble.style.display = "none";
    surah = surahMaryam;
    surah.play();
    quranControllers.style.display = "flex";
  }
});

document.querySelector("#yellowDuck").addEventListener("mouseover", (event) => {
  if (clickedDuck) {
    bubbleText.textContent = "Surah Ibrahim - El Menshawy";
  }
});

document.querySelector("#yellowDuck").addEventListener("click", (event) => {
  if (clickedDuck) {
    speechBubble.style.display = "none";
    surah = surahIbrahim;
    surah.play();
    quranControllers.style.display = "flex";
  } else {
    quackSound.play();
  }
});

document.querySelector("#fire").addEventListener("mouseover", (event) => {
  if (clickedDuck) bubbleText.textContent = "Surah El Nour - Omar Diaa";
});

document.querySelector("#fire").addEventListener("click", (event) => {
  if (clickedDuck) {
    speechBubble.style.display = "none";
    surah = surahElnour;
    surah.play();
    quranControllers.style.display = "flex";
  }
});

document.querySelector("#greenTree").addEventListener("mouseover", (event) => {
  if (clickedDuck) bubbleText.textContent = "Surah Yousef - El Menshawy";
});

document.querySelector("#greenTree").addEventListener("click", (event) => {
  if (clickedDuck) {
    speechBubble.style.display = "none";
    surah = surahYousef;
    surah.play();
    quranControllers.style.display = "flex";
  }
});

document.querySelector("#cats").addEventListener("mouseover", (event) => {
  if (clickedDuck) bubbleText.textContent = "Surah Yaseen - Yasser Al Dosari";
});

document.querySelector("#cats").addEventListener("click", (event) => {
  if (clickedDuck) {
    speechBubble.style.display = "none";
    surah = surahYaseen;
    surah.play();
    quranControllers.style.display = "flex";
  }
});

document.querySelector("#sun").addEventListener("mouseover", (event) => {
  if (clickedDuck) bubbleText.textContent = "Surah Yousef - Maher El Mouaikel";
});

document.querySelector("#sun").addEventListener("click", (event) => {
  if (clickedDuck) {
    speechBubble.style.display = "none";
    surah = surahYousefmahr;
    surah.play();
    quranControllers.style.display = "flex";
  }
});

document.querySelector("#pauseBtn").addEventListener("click", (event) => {
  surah.pause();
});

document.querySelector("#stopBtn").addEventListener("click", (event) => {
  surah.pause();
  quranControllers.style.display = "none";
  speechBubble.style.display = "none";
});
document.querySelector("#playbtn").addEventListener("click", (event) => {
  surah.play();
});

function addHours(hours) {
  return new Date().getTime() + hours * 60 * 60 * 1000;
}

function countDown(endTime, key) {
  let x = setInterval(function () {
    let startTime = new Date().getTime();
    let distance = endTime - startTime;

    if (distance < 0) {
      localStorage.removeItem(key);
      clearInterval(x);
      return;
    }
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let sec = Math.floor((distance % (1000 * 60)) / 1000);

    document.querySelector("#hours").textContent = `${String(hours).padStart(
      2,
      "0"
    )}`;
    document.querySelector("#mins").textContent = `${String(min).padStart(
      2,
      "0"
    )}`;
    document.querySelector("#sec").textContent = `${String(sec).padStart(
      2,
      "0"
    )}`;
  }, 1000);
}
document.querySelector("#timerBtn").addEventListener("click", (event) => {
  clickSound.play();
  let endTime = localStorage.getItem("swm");

  if (!endTime) {
    endTime = addHours(0.0166666667);
    localStorage.setItem("swm", endTime);
  }
  timerBtn.style.display = "none";
  countDown(endTime, "swm");

  setTimeout(() => {
    timerBtn.style.display = "flex";
  }, 1000 * 60);
});

studyBtn.addEventListener("click", toStudy);

function toHome(event) {
  emmaHome = true;
  clickedDuck = false;
  clickSound.play();
  homeBtns.style.display = "felx";
  emmaPhoto.src = "Assets/idealEmma.png";
  speechBubble.style.display = "none";
  document.querySelector("#hud").style.display = "flex";
  emma.style.right = "45rem";
  emma.style.top = "35.1rem";
  speechBubble.style.left = "42rem";
  homeBtns.style.display = "flex";
  homeBtn.style.display = "none";
  document.querySelector("#tree").style.display = "flex";
  document.querySelector("#spiderFlower").style.display = "flex";
  document.querySelector("#sosText").style.display = "none";
  homePhotos.style.display = "flex";
  rulesPage.style.display = "none";
  studyPage.style.display = "none";
}

homeBtn.addEventListener("click", toHome);
