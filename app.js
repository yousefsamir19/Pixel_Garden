// parallax effect for the background
// localStorage.clear();
document.addEventListener("mousemove", parallax);

function parallax(event) {
  document.querySelectorAll(".backgroundLayersmoving").forEach((shift) => {
    const position = shift.getAttribute("value") || 0;
    const x = (window.innerWidth - event.pageX * position) / 200;

    shift.style.transform = `translateX(${x}px)`;
  });
}

// weather degree , icon and the weather state

let weatherID;
const apiKey = "bb9e34a1704314f9522cbe483ca3631b";
const timeNow = new Date().getHours();
const sun = document.querySelector("#sun");

async function getWeatherData() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Cairo&appid=${apiKey}`;
  const response = await fetch(apiUrl);
  const weatherData = await response.json();
  return weatherData;
}

getWeatherData().then((weatherData) => {
  const {
    main: { temp },
    weather: [{ id, main }],
  } = weatherData;
  document.querySelector("#weather").textContent = `${(temp - 273.15).toFixed(
    1
  )}°C`;
  weatherID = id;

  setInterval(function () {
    const {
      main: { temp },
      weather: [{ id, main }],
    } = weatherData;
    document.querySelector("#weather").textContent = `${(temp - 273.15).toFixed(
      1
    )}°C`;
    weatherID = id;
  }, 1000 * 60 * 3);

  if (id >= 200 && id < 300) {
    sun.src = "Assets/storm.png";
  } else if (id >= 300 && id < 400) {
    sun.src = "Assets/rain.png";
  } else if (id >= 500 && id < 600) {
    sun.src = "Assets/rain.png";
  } else if (id >= 600 && id < 700) {
    sun.src = "Assets/snow.png";
  } else if (id >= 700 && id < 800) {
    sun.src = "Assets/clouds.png";
  } else if (id === 800) {
    if (timeNow >= 20 || timeNow < 6) {
      sun.src = "Assets/moon.png";
    } else {
      sun.src = "Assets/clearSun.png";
    }
  } else if (id >= 801 && id < 810) {
    if (timeNow >= 20 || timeNow < 6) {
      sun.src = "Assets/cloudyMoon.png";
    } else {
      sun.src = "Assets/cloudy.png";
    }
  } else {
    if (timeNow >= 20 || timeNow < 6) {
      sun.src = "Assets/moon.png";
    } else {
      sun.src = "Assets/clearSun.png";
    }
  }
  if (temp - 273.15 < 11) sun.src = "Assets/snow.png";
});

sun.addEventListener("mouseover", (event) => {
  if (emmaHome) {
    if (weatherID >= 200 && weatherID < 300) {
      speechBubble.style.display = "flex";
      bubbleText.textContent = "It looks stormy outside, stay safe!";
    } else if (weatherID >= 300 && weatherID < 400) {
      speechBubble.style.display = "flex";
      bubbleText.textContent =
        "It’s raining outside, perfect weather for some tea.";
    } else if (weatherID >= 500 && weatherID < 600) {
      speechBubble.style.display = "flex";
      bubbleText.textContent =
        "It’s raining outside, perfect weather for some tea.";
    } else if (weatherID >= 600 && weatherID < 700) {
      speechBubble.style.display = "flex";
      bubbleText.textContent = "It’s snowing! Time for a cozy blanket.";
    } else if (weatherID >= 700 && weatherID < 800) {
      speechBubble.style.display = "flex";
      bubbleText.textContent =
        "It looks foggy outside, be careful if you go out!";
    } else if (weatherID === 800) {
      if (timeNow >= 20 || timeNow < 6) {
        speechBubble.style.display = "flex";
        bubbleText.innerHTML =
          "The sky is clear, and the<br><br>moon is shining like you.";
      } else {
        speechBubble.style.display = "flex";
        bubbleText.textContent = "Clear skies! A perfect sunny day.";
      }
    } else if (weatherID >= 801 && weatherID < 810) {
      if (timeNow >= 20 || timeNow < 6) {
        speechBubble.style.display = "flex";
        bubbleText.textContent = "Clouds are covering the night sky.";
      } else {
        speechBubble.style.display = "flex";
        bubbleText.textContent = "Some clouds are floating across the sky.";
      }
    } else {
      if (timeNow >= 20 || timeNow < 6) {
        speechBubble.style.display = "flex";
        bubbleText.textContent =
          "The sky is clear, and the moon is shining bright like you.";
      } else {
        speechBubble.style.display = "flex";
        bubbleText.textContent = "A bright and beautiful day.";
      }
    }
  }
});

sun.addEventListener("mouseout", (event) => {
  bubbleText.textContent = "";
  speechBubble.style.display = "none";
});

// clock and date function

function clock() {
  setInterval(function () {
    let clockNow = new Date();
    document.querySelector("#hoursClock").textContent = `${String(
      clockNow.getHours()
    ).padStart(2, "0")}`;

    document.querySelector("#minsClock").textContent = `${String(
      clockNow.getMinutes()
    ).padStart(2, "0")}`;
  }, 1000);
  document.querySelector("#day").textContent = new Date().getDate();
  document.querySelector("#month").textContent = new Date().getMonth() + 1;
  document.querySelector("#year").textContent = new Date().getFullYear();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  document.querySelector("#weekday").textContent = days[new Date().getDay()];
}

clock();

let username = localStorage.getItem("username") || "";
let task = localStorage.getItem("task") || "";
let studyFlowers = Number(localStorage.getItem("studyFlowers")) || 0;
let taskFlowers = Number(localStorage.getItem("taskFlowers")) || 0;
let flowers = Number(localStorage.getItem("flowers")) || 0;
let ducks = Number(localStorage.getItem("ducks")) || 0;

let firstTime = localStorage.getItem("firstTime");
if (firstTime === null) {
  firstTime = true;
} else {
  firstTime = firstTime === "true";
}

if (date == 0) {
  studyFlowers = 0;
  taskFlowers = 0;
  localStorage.setItem("studyFlowers", studyFlowers);
  localStorage.setItem("taskFlowers", taskFlowers);
}
date = new Date().getDay();
document.querySelector("#report").innerHTML = `IN ${
  date + 1
} DAYS<br><br>• ${taskFlowers} Tasks completed<br><br>• ${studyFlowers} Hours of study`;

const clickSound = new Audio("soundEffects/click1.mp3");
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
const homePhotos = document.querySelector("#homePhotos");
const homePage = document.querySelector("#homePage");
const hud = document.querySelector("#hud");
const flowerCounter = document.querySelector("#flowerCounter");
const duckCounter = document.querySelector("#duckCounter");
const taskCheckpage = document.querySelector("#taskCheck");
let emmaTimeouts = [];

function clearEmmaTimeouts() {
  emmaTimeouts.forEach((timeoutID) => clearTimeout(timeoutID));
  emmaTimeouts = [];
}

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

emmaPhoto.addEventListener("mouseout", (event) => {
  if (emmaHome) {
    if (!clickedEmma) {
      if (mouseout == false) {
        bubbleText.textContent = "";
        mouseout = true;
        emma.style.top = "35.1rem";
        event.target.src = "Assets/idealEmma.png";
        bubbleText.textContent = "good for you";
        emma.style.top = "77%";

        emmaTimeouts.push(
          setTimeout(() => {
            speechBubble.style.display = "none";
            bubbleText.textContent = "";
            mouseout = false;
          }, 3000)
        );
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
      bubbleText.innerHTML =
        "How you dare ?! You think you can click me<br><br>and get away with it?! I'll show you!";
      clickedEmma = true;

      emmaTimeouts.push(
        setTimeout(() => {
          emma.style.top = "35.1rem";
          event.target.src = "Assets/idealEmma.png";
          speechBubble.style.display = "none";
        }, 4000)
      );

      emmaTimeouts.push(
        setTimeout(() => {
          bubbleText.textContent = "";
          emma.style.top = "34.5rem";
          bubbleText.innerHTML =
            "Sorry I yelled at, but it really hurts.<br><br>Don't do it again if you want to live.";
          speechBubble.style.display = "inline-block";
          emmaPhoto.src = "Assets/sadEmma.png";
        }, 7000)
      );

      emmaTimeouts.push(
        setTimeout(() => {
          emma.style.top = "35.1rem";
          speechBubble.style.display = "none";
          bubbleText.textContent = "";
          emmaPhoto.src = "Assets/idealEmma.png";
          clickedEmma = false;
        }, 17000)
      );
    }
  }
});

// emmaPhoto.addEventListener("mouseover", (event) => {
//   if (emmaHome) {
//     if (!clickedEmma) {
//       if (mouseout == false) {
//         bubbleText.textContent = "";
//         event.target.src = "Assets/cryingEmma.png";
//         bubbleText.innerHTML = "I don't wanna say goodbye";
//         speechBubble.style.display = "inline-block";
//       }
//     }
//   }
// });

// emmaPhoto.addEventListener("mouseout", (event) => {
//   if (emmaHome) {
//     if (!clickedEmma) {
//       if (mouseout == false) {
//         mouseout = true;
//         emma.style.top = "35.1rem";

//         event.target.src = "Assets/cuteEmma.png";
//         bubbleText.innerHTML =
//           "Is this the end?<br><br> we won't hang out and code again?";

//         emmaTimeouts.push(
//           setTimeout(() => {
//             speechBubble.style.display = "none";
//             bubbleText.textContent = "";
//             mouseout = false;
//           }, 3000)
//         );
//       }
//     }
//   }
// });
// the start btn that moves you to the name page

function toStartPage() {
  document.querySelector("#startPage").style.display = "flex";
}

function goToNamePage() {
  clickSound.play();

  var nameText = document.querySelector("#nameLabel");
  var nameTexteffect = new Typewriter(nameText, {
    loop: false,
    delay: 60,
  });
  nameTexteffect.pauseFor(200).typeString("What's your name?").start();

  namePage.style.display = "flex";
  startPage.style.display = "none";
  emma.style.top = "77%";
}

function goToRulesPage() {
  clickSound.play();
  if (!username) {
    username = document.querySelector("#nameInput").value;
    localStorage.setItem("username", username);
  }
  namePage.style.display = "none";
  rulesPage.style.display = "flex";
  bubbleText.prepend(`Hey ${username},`);
  var rulesText = document.querySelector("#rulesText");
  var rulesTexteffect = new Typewriter(rulesText, {
    loop: false,
    delay: 60,
  });
  rulesTexteffect
    .pauseFor(200)
    .typeString(
      `Hey ${username}, <br><br> Welcome to your Pixel Garden - your very own safe and cozy space.🌸 <br><br>`
    )
    .pauseFor(300)
    .typeString(
      "First,let me introduce you to Emma. She’ll be your companion here — each day,<br><br>"
    )
    .pauseFor(300)
    .typeString(
      `You’ll check in with her and share whether you completed your task. Emma
        will be here to give you <br><br> gentle support as you grow the habit you want
        to build. 🌱 <br><br>`
    )
    .pauseFor(300)
    .typeString(
      `If you succeed, she’ll reward you with a beautiful
        flower 🌹 <br><br>`
    )
    .pauseFor(300)
    .typeString(
      `But if you skip it… you might just meet the Angry Duck
        🔪🦆 <br><br>`
    )
    .pauseFor(300)
    .typeString(
      `Another thing — be careful not to make Emma angry…she really
      doesn’t like being clicked <br><br>`
    )
    .pauseFor(300)
    .typeString(
      `Now that you know the rules, let’s choose
      the habit or task you want to start building. 🌟`
    )
    .start();

  emma.style.display = "flex";
  speechBubble.style.display = "inline-block";
}

function goToTaskPage() {
  clickSound.play();
  rulesPage.style.display = "none";
  document.querySelector("#taskPage").style.display = "flex";
  document.querySelector(
    "#taskPage > label"
  ).textContent = `Enter The Task here`;
  emmaPhoto.src = "Assets/idealEmma.png";
  speechBubble.style.display = "none";
  emma.style.top = "77%";
}

function goToHomePage() {
  if (firstTime) {
    clickSound.play();
  }
  emmaHome = true;
  if (firstTime) {
    firstTime = "false";
    localStorage.setItem("firstTime", firstTime);
  }
  homePage.style.display = "flex";
  homePhotos.style.display = "flex";
  duckCounter.textContent = ducks;
  flowerCounter.textContent = flowers;
  hud.style.display = "flex";
  taskPage.style.display = "none";
  document.querySelector("#playerName").textContent = username;
  emmaPhoto.src = "Assets/idealEmma.png";
  emma.style.display = "flex";
  emma.style.top = "77%";
  if (firstTime) {
    task = document.querySelector("#taskInput").value;
    localStorage.setItem("task", task);
  }
  var rulesText = document.querySelector("#rulesText");
  var rulesTexteffect = new Typewriter(rulesText, {
    loop: false,
    delay: 60,
  });

  rulesTexteffect
    .pauseFor(200)
    .typeString(
      `Hey ${username}, <br><br> Welcome to your Pixel Garden - your very own safe and cozy space.🌸 <br><br>`
    )
    .pauseFor(300)
    .typeString(
      "First,let me introduce you to Emma. She’ll be your companion here — each day,<br><br>"
    )
    .pauseFor(300)
    .typeString(
      `You’ll check in with her and share whether you completed your task. Emma will be here to give you<br><br>gentle support as you grow the habit you want
        to build. 🌱 <br><br>`
    )
    .pauseFor(300)
    .typeString(
      `If you succeed, she’ll reward you with a beautiful
        flower 🌹 <br><br>`
    )
    .pauseFor(300)
    .typeString(
      `But if you skip it… you might just meet the Angry Duck
        🔪🦆 <br><br>`
    )
    .pauseFor(300)
    .typeString(
      `Another thing — be careful not to make Emma angry…she really
      doesn’t like being clicked <br><br>`
    )
    .pauseFor(300)
    .typeString(
      `Now that you know the rules, let’s choose
      the habit or task you want to start building. 🌟`
    )
    .start();
}

if (firstTime) {
  toStartPage();
}
document
  .querySelector("#startPage > button")
  .addEventListener("click", goToNamePage);
document
  .querySelector("#namePage > button")
  .addEventListener("click", goToRulesPage);
document
  .querySelector("#rulesPage > button")
  .addEventListener("click", goToTaskPage);
document
  .querySelector("#taskPage > button")
  .addEventListener("click", goToHomePage);

if (!firstTime) {
  goToHomePage();
}

// home page btns

const rulesBtn = document.querySelector("#homeBtns > button:nth-child(1)");
const sosBtn = document.querySelector("#homeBtns > button:nth-child(2)");
const taskBtn = document.querySelector("#homeBtns > button:nth-child(3)");
const studyBtn = document.querySelector("#homeBtns > button:nth-child(4)");
const homeBtn = document.querySelector("#homeBtn");

// functions of click the "Rules" btn on home screen

function toRules(event) {
  clickSound.play();
  emmaHome = false;
  clearEmmaTimeouts();
  homePage.style.display = "none";
  homeBtn.style.display = "flex";
  homePhotos.style.display = "none";
  rulesNextBtn.style.display = "none";
  rulesPage.style.display = "flex";
  hud.style.display = "none";
  emmaPhoto.src = "Assets/laughingEmma.png";
  bubbleText.textContent = " Are you stupid ? What's so hard about the rules?";
  speechBubble.style.display = "flex";

  emmaTimeouts.push(
    setTimeout(() => {
      bubbleText.textContent =
        "They're simple: do the task, and you get a flower.";
    }, 4000)
  );

  emmaTimeouts.push(
    setTimeout(() => {
      bubbleText.textContent =
        "If not, you'll end up with a stupid duck like you.";
    }, 8000)
  );

  emmaTimeouts.push(
    setTimeout(() => {
      speechBubble.style.display = "none";
      bubbleText.textContent = "";
    }, 14000)
  );
}
rulesBtn.addEventListener("click", toRules);

// functions of click the "SOS" btn on home screen

function toSos(event) {
  clickSound.play();
  emmaHome = false;
  clearEmmaTimeouts();
  homePage.style.display = "none";
  homeBtn.style.display = "flex";
  document.querySelector("#tree").style.display = "none";
  document.querySelector("#spiderFlower").style.display = "none";
  document.querySelector("#sosText").style.display = "flex";
  emmaPhoto.src = "Assets/smilingEmma.png";

  var sosText = document.querySelector("#sosText");
  var sosTexteffect = new Typewriter(sosText, {
    loop: false,
    delay: 60,
  });

  sosTexteffect
    .pauseFor(200)
    .typeString(
      "When God wants to make you successful, He will first take away your comfort,<br /><br />"
    )
    .pauseFor(300)
    .typeString(
      "He will test your patience, He will isolate you, He will challenge yourfaith.<br /><br />"
    )
    .pauseFor(300)
    .typeString(
      "because before He gives you the life you dream of,<br /><br />"
    )
    .pauseFor(300)
    .typeString("He builds the version of you that can handle it.")
    .start();

  if (!emmaHome) {
    bubbleText.textContent = `Hey, ${username}. Take it easy.`;
    speechBubble.style.display = "flex";

    emmaTimeouts.push(
      setTimeout(() => {
        bubbleText.innerHTML =
          " You're doing well and<br><br>you'll achieve those dreams.";
      }, 5000)
    );

    emmaTimeouts.push(
      setTimeout(() => {
        bubbleText.textContent = "Take this flower, and<br><br>you'll be okay.";
      }, 9000)
    );

    emmaTimeouts.push(
      setTimeout(() => {
        bubbleText.textContent = "I believe in you.";
      }, 13000)
    );

    emmaTimeouts.push(
      setTimeout(() => {
        speechBubble.style.display = "none";
        bubbleText.textContent = "";
      }, 19000)
    );
  }
}
sosBtn.addEventListener("click", toSos);

// functions of click the "Task" btn on home screen

function toTask(event) {
  clickSound.play();
  emmaHome = false;
  clearEmmaTimeouts();
  homePage.style.display = "none";
  homeBtn.style.display = "flex";
  document.querySelector("#tree").style.display = "none";
  document.querySelector("#spiderFlower").style.display = "none";
  emmaPhoto.src = "Assets/wateringEmma1.png";
  emma.style.right = "22rem";
  emma.style.top = "36rem";

  bubbleText.innerHTML =
    "I’m looking after your flowers<br><br>don’t make my effort go to waste.";
  speechBubble.style.display = "flex";
  speechBubble.style.left = "69%";
  taskCheckpage.style.display = "flex";
  document.querySelector(
    "#taskText"
  ).innerHTML = `Current Task:<br><br>${task}`;
}
taskBtn.addEventListener("click", toTask);

let finshTask = false;

document.querySelector("#taskStart").addEventListener("click", (event) => {
  document.querySelector("#taskStart").style.display = "none";
  document.querySelector("#taskCheckbtn").style.display = "flex";

  let endTime = localStorage.getItem("taskTimer");

  if (!endTime) {
    endTime = addHours(0.0166666667);
    localStorage.setItem("taskTimer", endTime);
  }
  countDown(endTime, "taskTimer", 2);
});

document.querySelector("#yesBtn").addEventListener("click", (event) => {
  finshTask = true;
});

document.querySelector("#changeBtn").addEventListener("click", (event) => {
  clickSound.play();
  document.querySelector("#changeTask").style.display = "flex";
  taskCheckpage.style.display = "none";
  homeBtn.style.display = "none";
  emma.style.display = "none";
  speechBubble.style.display = "none";
});

document.querySelector("#saveTask").addEventListener("click", (event) => {
  clickSound.play();
  task = document.querySelector("#Changetaskinput").value;
  localStorage.setItem("task", task);
  document.querySelector("#changeTask").style.display = "none";
  taskCheckpage.style.display = "flex";
  homeBtn.style.display = "flex";
  emma.style.display = "flex";
  document.querySelector(
    "#taskText"
  ).innerHTML = `Current Task:<br><br>${task}`;
});

document.querySelector("#backBtn").addEventListener("click", (event) => {
  clickSound.play();
  document.querySelector("#changeTask").style.display = "none";
  taskCheckpage.style.display = "flex";
  homeBtn.style.display = "flex";
  emma.style.display = "flex";
});

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
const alarm = new Audio("soundEffects/alarm.mp3");
const flowerSoundeffect = new Audio("soundEffects/flowerGainEffect.mp3");
const fireSound = new Audio("soundEffects/fireSound.mp3");
let surah;
let emmastudy = false;

function toStudy(event) {
  clickSound.play();
  emmaHome = false;
  emmastudy = true;
  clearEmmaTimeouts();
  homePage.style.display = "none";
  homeBtn.style.display = "flex";
  document.querySelector("#tree").style.display = "none";
  document.querySelector("#spiderFlower").style.display = "none";
  studyPage.style.display = "flex";
  emmaPhoto.src = "Assets/studyEmma.png";
  emmaPhoto.style.width = "110px";
  emma.style.top = "71%";
  emma.style.right = "45.9%";
  bubbleText.textContent = `Hey,${username} . Let's study for an hour.`;
  speechBubble.style.display = "flex";

  emmaTimeouts.push(
    setTimeout(() => {
      bubbleText.innerHTML = `You'll get a flower and a 15-minute break after<br><br>every session, so collect as many as you can!`;
    }, 3000)
  );

  emmaTimeouts.push(
    setTimeout(() => {
      bubbleText.innerHTML =
        "Oh, I almost forgot, before you start<br><br>the study session, hover over the left duck.";
    }, 7500)
  );

  emmaTimeouts.push(
    setTimeout(() => {
      speechBubble.style.display = "none";
    }, 12000)
  );
}

document.querySelector("#blackDuck").addEventListener("mouseover", (event) => {
  if (emmastudy) {
    if (!clickedDuck) {
      speechBubble.style.display = "flex";
      bubbleText.innerHTML =
        "I recommend you listen to the Quran. Lucky for you,<br><br>I have my favorite Suwar here.";

      emmaTimeouts.push(
        setTimeout(() => {
          bubbleText.innerHTML =
            "Just click on the duck,<br><br>and I'll tell you where you can find them.";
        }, 9000)
      );
    }
  }
});

let clickedDuck = false;
document.querySelector("#blackDuck").addEventListener("click", (event) => {
  if (!emmaHome) {
    clickedDuck = true;
    clearEmmaTimeouts();
    quackSound.play();
    bubbleText.innerHTML =
      "Hover over the items on your righ (like: tree ,cat)<br><br>to choose a surah, and click on one<br><br>if you want to play it.";
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
  clickSound.play();
  surah.pause();
});

document.querySelector("#stopBtn").addEventListener("click", (event) => {
  clickSound.play();
  surah.pause();
  quranControllers.style.display = "none";
  speechBubble.style.display = "none";
});

document.getElementById("playBtn").addEventListener("click", (event) => {
  clickSound.play();
  surah.play();
});

document.querySelector("#fireplaceBtn").addEventListener("click", (event) => {
  clickSound.play();
  fireSound.loop = true;
  fireSound.play();
  document.querySelector("#fireplacePage").style.display = "flex";
});

function backToStudy() {
  clickSound.play();
  fireSound.pause();
  document.querySelector("#fireplacePage").style.display = "none";
}

const fireVideo = document.querySelector("#firePlaceVideo");
document
  .querySelector("#backStudyBtn")
  .addEventListener("mouseover", (event) => {
    fireVideo.setAttribute("controls", "true");
    setTimeout(() => {
      fireVideo.removeAttribute("controls");
    }, 7000);
  });

document.querySelector("#backStudyBtn").addEventListener("click", backToStudy);

function addHours(hours) {
  return new Date().getTime() + hours * 60 * 60 * 1000;
}

function countDown(endTime, key, mode) {
  let x = setInterval(function () {
    let startTime = new Date().getTime();
    let distance = endTime - startTime;

    if (distance < 0) {
      localStorage.removeItem(key);
      clearInterval(x);
      if (mode == 2 && finshTask == false) {
        document.querySelector("#taskStart").style.display = "flex";
        document.querySelector("#taskCheckbtn").style.display = "none";
        ducks++;
        localStorage.setItem("ducks", ducks);
        alarm.play();
        setTimeout(() => {
          duckCounter.textContent = ducks;
          quackSound.play();
        }, 7000);
      }
      return;
    }
    if (finshTask == true) {
      localStorage.removeItem(key);
      clearInterval(x);
      finshTask = false;
      document.querySelector("#taskStart").style.display = "flex";
      document.querySelector("#taskCheckbtn").style.display = "none";
      flowers++;
      taskFlowers++;
      localStorage.setItem("taskFlowers", taskFlowers);
      localStorage.setItem("flowers", flowers);
      flowerCounter.textContent = flowers;
      document.querySelector("#report").innerHTML = `IN ${
        date + 1
      } DAYS<br><br>• ${taskFlowers} Tasks completed<br><br>• ${studyFlowers} Hours of study`;
      flowerSoundeffect.play();
      document.querySelector("#taskHours").textContent = "00";
      document.querySelector("#taskMins").textContent = "00";
      document.querySelector("#taskSec").textContent = "00";
      return;
    }

    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let sec = Math.floor((distance % (1000 * 60)) / 1000);
    if (mode == 1) {
      document.querySelector("#studyHours").textContent = `${String(
        hours
      ).padStart(2, "0")}`;
      document.querySelector("#studyMins").textContent = `${String(
        min
      ).padStart(2, "0")}`;
      document.querySelector("#studySec").textContent = `${String(sec).padStart(
        2,
        "0"
      )}`;
    }
    if (mode == 2) {
      document.querySelector("#taskHours").textContent = `${String(
        hours
      ).padStart(2, "0")}`;
      document.querySelector("#taskMins").textContent = `${String(min).padStart(
        2,
        "0"
      )}`;
      document.querySelector("#taskSec").textContent = `${String(sec).padStart(
        2,
        "0"
      )}`;
    }
  }, 1000);
}

document.querySelector("#timerBtn").addEventListener("click", (event) => {
  clickSound.play();
  let endTime = localStorage.getItem("swm");

  if (!endTime) {
    endTime = addHours(0.0166666667);
    localStorage.setItem("swm", endTime);
  }
  if (endTime > 0) {
    timerBtn.style.display = "none";
    countDown(endTime, "swm", 1);

    setTimeout(() => {
      alarm.play();
      timerBtn.style.display = "flex";
      flowers++;
      studyFlowers++;
    }, 1000 * 60);

    setTimeout(() => {
      flowerCounter.textContent = flowers;
      flowerSoundeffect.play();
    }, 1000 * 60 + 7000);
  } else {
    flowers++;
    studyFlowers++;
    flowerCounter.textContent = flowers;
    flowerSoundeffect.play();
  }
});

studyBtn.addEventListener("click", toStudy);

function toHome(event) {
  clickSound.play();
  emmaHome = true;
  clickedDuck = false;
  emmastudy = false;
  clickedEmma = false;
  clearEmmaTimeouts();
  homePage.style.display = "flex";
  homeBtn.style.display = "none";
  homePhotos.style.display = "flex";
  document.querySelector("#tree").style.display = "flex";
  document.querySelector("#spiderFlower").style.display = "flex";
  hud.style.display = "flex";
  document.querySelector("#sosText").style.display = "none";
  rulesPage.style.display = "none";
  studyPage.style.display = "none";
  emmaPhoto.src = "Assets/idealEmma.png";
  speechBubble.style.left = "47%";
  speechBubble.style.display = "none";
  emma.style.right = "46.5%";
  emma.style.top = "77.1%";
  emmaPhoto.style.width = "80px";
  taskCheckpage.style.display = "none";
}
homeBtn.addEventListener("click", toHome);
