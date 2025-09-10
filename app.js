class ForestBackground {
  constructor() {
    this.layers = document.querySelectorAll(".bg-layer");
    this.isMoving = false;
    this.movementSpeed = 0;
    this.idleSpeed = 0.0;
    this.movingSpeed = 2;
    this.currentX = 0;
    this.targetX = 0;
    this.animationId = null;

    this.init();
  }

  init() {
    // Start the animation loop
    this.animate();

    // Add keyboard event listeners for character movement
    this.addMovementListeners();

    // Add touch/mouse support for mobile
    this.addTouchSupport();
  }

  addMovementListeners() {
    let isKeyPressed = false;

    document.addEventListener("keydown", (e) => {
      if (
        !isKeyPressed &&
        (e.key === "ArrowLeft" ||
          e.key === "ArrowRight" ||
          e.key === "a" ||
          e.key === "d" ||
          e.key === "A" ||
          e.key === "D")
      ) {
        isKeyPressed = true;
        this.startMoving();
      }
    });

    document.addEventListener("keyup", (e) => {
      if (
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "a" ||
        e.key === "d" ||
        e.key === "A" ||
        e.key === "D"
      ) {
        isKeyPressed = false;
        this.stopMoving();
      }
    });
  }

  addTouchSupport() {
    let touchStartX = 0;
    let isTouching = false;

    document.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      isTouching = true;
      this.startMoving();
    });

    document.addEventListener("touchmove", (e) => {
      if (isTouching) {
        const touchX = e.touches[0].clientX;
        const deltaX = touchX - touchStartX;

        // Determine movement direction based on touch
        if (Math.abs(deltaX) > 10) {
          this.targetX += deltaX * 0.01;
          touchStartX = touchX;
        }
      }
    });

    document.addEventListener("touchend", () => {
      isTouching = false;
      this.stopMoving();
    });
  }

  startMoving() {
    this.isMoving = true;
    this.movementSpeed = this.movingSpeed;
  }

  stopMoving() {
    this.isMoving = false;
    this.movementSpeed = this.idleSpeed;
  }

  animate() {
    // Calculate movement
    if (this.isMoving) {
      // When character is moving, no parallax - keep layers static
      this.targetX = 0;
    } else {
      // Idle movement - subtle back and forth with parallax
      this.targetX += Math.sin(Date.now() * 0.001) * 0.5;
    }

    // Smooth interpolation
    this.currentX += (this.targetX - this.currentX) * 0.1;

    // Apply parallax effect to each layer only during idle state
    this.layers.forEach((layer) => {
      const speed = parseFloat(layer.dataset.speed);
      let x = 0;

      if (!this.isMoving) {
        // Only apply parallax during idle state
        x = this.currentX * speed;

        // Implement infinite scrolling - reset position when reaching edge
        const layerWidth = window.innerWidth; // Width of one image
        if (x > layerWidth) {
          x = x - layerWidth;
        } else if (x < -layerWidth) {
          x = x + layerWidth;
        }
      }

      layer.style.transform = `translateX(${x}px)`;
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  // Method to manually control background movement (for external use)
  moveBackground(direction, speed = 1) {
    this.targetX += direction * speed;
  }

  // Method to set idle state
  setIdle() {
    this.isMoving = false;
    this.movementSpeed = this.idleSpeed;
  }

  // Method to set moving state
  setMoving() {
    this.isMoving = true;
    this.movementSpeed = this.movingSpeed;
  }
}

// Initialize the forest background when the page loads
document.addEventListener("DOMContentLoaded", () => {
  window.forestBackground = new ForestBackground();
});

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = ForestBackground;
}

const clickSound = new Audio("click1.mp3");
const typingSound = new Audio("typing.mp3");
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
let username, task;

// emma interaction
let emmaHome = false;
let clickedEmma = false;
emmaPhoto.addEventListener("mouseover", (event) => {
  if (emmaHome) {
    event.target.src = "Assets/threatingEmma.png";
    bubbleText.textContent = "I dare you shit head to do it!";
    speechBubble.style.display = "inline-block";
  }
});

emmaPhoto.addEventListener("click", (event) => {
  if (emmaHome) {
    emma.style.top = "36rem";
    event.target.src = "Assets/angryEmma.png";
    bubbleText.textContent = "I will kill you";
    clickedEmma = true;
  }
});

emmaPhoto.addEventListener("mouseout", (event) => {
  if (emmaHome) {
    if (clickedEmma) {
      setTimeout(() => {
        emma.style.top = "35.1rem";
        event.target.src = "Assets/idealEmma.png";
        speechBubble.style.display = "none";
      }, 2000);
      setTimeout(() => {
        emma.style.top = "34.5rem";
        bubbleText.textContent =
          "Sorry I yelled at you, but it really hurts. Don't do it again";
        speechBubble.style.display = "inline-block";
        emmaPhoto.src = "Assets/sadEmma.png";
      }, 5000);

      setTimeout(() => {
        emma.style.top = "35.1rem";
        speechBubble.style.display = "none";
        bubbleText.textContent = "";
        emmaPhoto.src = "Assets/idealEmma.png";
      }, 17000);
    } else {
      emma.style.top = "35.1rem";
      event.target.src = "Assets/idealEmma.png";
      bubbleText.textContent = "good";

      setTimeout(() => {
        speechBubble.style.display = "none";
      }, 3000);
    }
  }
});

// the start btn that moves you to the name page

document.querySelector("#startPage > button").onclick = function () {
  clickSound.play();
  typingSound.play();

  setTimeout(() => {
    typing.pause();
    typing.currentTime = 0;
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
    typing.pause();
    typing.currentTime = 0;
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
    typing.pause();
    typing.currentTime = 0;
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
  taskPage.style.display = "none";
  document.querySelector("#playerName").textContent = username;
  document.querySelector("#homeBtns").style.display = "flex";
  document.querySelector("#hud").style.display = "flex";
  emmaHome = true;
};

// home page btns

const rulesBtn = document.querySelector("#homeBtns > button:nth-child(1)");
const studyBtn = document.querySelector("#homeBtns > button:nth-child(4)");
const taskBtn = document.querySelector("#homeBtns > button:nth-child(3)");
function toRules(event) {
  clickSound.play();
  document.querySelector("#hud").style.display = "none";
  document.querySelector("#homeBtns").style.display = "none";
  emmaPhoto.src = "Assets/laughingEmma.png";
  bubbleText.textContent =
    "Are you stupid? What's so hard about the rules? They're simple: do the task, and you get a flower. If not, you'll end up with a stupid duck like you.";
  speechBubble.style.display = "flex";
  rulesPage.style.display = "flex";
  emmaHome = false;
}
rulesBtn.addEventListener("click", toRules);

function toStudy(event) {
  clickSound.play();
  homeBtns.style.display = "none";
  emmaPhoto.src = "Assets/studyEmma.png";
  emmaHome = false;
}

studyBtn.addEventListener("click", toStudy);

function toTask(event) {
  clickSound.play();
  homeBtns.style.display = "none";
  emmaPhoto.src = "Assets/wateringEmma1.png";

  emmaHome = false;
}

taskBtn.addEventListener("click", toTask);

// const tasksBtn = document.querySelector("#tasksPage > button");
// tasksBtn.onclick = function () {
//   tasksNum = parseInt(document.querySelector("#tasksNumInput").value);
//   const tasksPage = document.querySelector("#tasksPage");
//   let flag = true;
//   if (tasksNum < 1 || tasksNum > 3) {
//     flag = false;
//   } else {
//     flag = true;
//   }
//   const invalidNum = document.createElement("h1");
//   invalidNum.textContent = "Pls Enter from 1 to 3 only";
//   invalidNum.style.color = "red";
//   invalidNum.style.fontSize = "xx-large";
//   invalidNum.style.textAlign = "center";
//   tasksPage.insertBefore(invalidNum, tasksBtn);
//   if (flag) {
//     document.querySelector("#namePage").style.display = "none";
//     tasksPage.style.display = "block";
//   }
// };

// document.querySelectorAll(".start-button.pixel-corners--wrapper")[1].onclick =
//   function () {
//     username = document.ge("input")[0].value;
//     document.getElementsByClassName(
//       "inputLabel"
//     )[1].textContent = `Hello ${username} Enter Number of Task You Want to Track`;
//     tasksNum = document.getElementsByClassName("input")[1].value;
//   };
