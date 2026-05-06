const WORDS = [
  "about","above","abuse","actor","acute","admit","adopt","adult","after","again",
  "agent","agree","ahead","alarm","album","alert","alien","align","alike","alive",
  "allow","alone","along","alter","angel","anger","angle","angry","ankle","apple",
  "apply","arise","array","arrow","asset","audio","audit","avoid","awake","award",
  "aware","bacon","badge","basic","beach","beard","beast","begin","below","bench",
  "berry","birth","black","blade","blame","blank","blast","blaze","bleak","blend",
  "bless","blind","block","blood","bloom","blown","board","boost","booth","brain",
  "brand","brave","bread","break","breed","brick","bride","brief","bring","broad",
  "brown","build","built","bunch","burst","buyer","cabin","camel","cargo","carry",
  "catch","cause","chain","chair","chalk","chaos","charm","chart","chase","cheap",
  "check","cheer","chess","chest","chief","child","claim","clash","class","clean",
  "clear","clerk","click","cliff","cling","clock","close","cloth","cloud","clown",
  "coach","coast","color","count","court","cover","crack","craft","crane","crash",
  "crazy","cream","creek","crisp","cross","crowd","crown","cruel","crush","cycle",
  "daily","dance","death","dense","depot","depth","digit","dirty","dodge","doubt",
  "draft","drain","drama","dream","dress","drink","drive","drown","drunk","eagle",
  "early","earth","elite","empty","enemy","enjoy","enter","equal","event","every",
  "exact","exist","extra","faith","fancy","feast","fence","ferry","fever","field",
  "fight","final","first","flame","flare","flash","fleet","float","flood","floor",
  "flour","fluid","flute","force","forge","frame","fresh","front","frost","fruit",
  "giant","given","glass","glide","globe","grace","grade","grain","grand","grant",
  "grasp","grass","grave","great","green","greet","grief","group","guard","guess",
  "guest","guide","heart","heavy","hedge","hinge","honey","honor","horse","hotel",
  "house","human","humor","ideal","image","inbox","index","inner","input","ivory",
  "jelly","jewel","joint","judge","juice","knife","knock","known","large","laser",
  "laugh","learn","leave","level","light","limit","local","logic","lover","lucky",
  "lunar","lunch","magic","major","maker","march","match","media","merge","metal",
  "might","minor","model","money","month","motor","mount","mouse","mouth","music",
  "noble","noise","north","novel","nurse","ocean","offer","olive","order","other",
  "owner","paint","panic","party","peace","phase","phone","photo","piano","place",
  "plane","plant","plate","point","pound","power","press","price","pride","prime",
  "print","prize","probe","proud","prove","pulse","queen","quick","quiet","quote",
  "radio","raise","reach","react","realm","rebel","refer","relax","repay","reply",
  "reset","river","robot","rough","round","route","royal","ruler","saint","scale",
  "scene","score","sense","serve","seven","shade","shape","share","sharp","sheet",
  "shift","shine","shock","short","sight","skill","slate","smile","smoke","snake",
  "solid","solve","space","speak","spend","spine","sport","staff","stage","stand",
  "stare","start","state","steam","steel","stick","still","stone","store","storm",
  "story","study","style","sugar","table","taste","teach","tiger","title","today",
  "token","topic","tower","track","trade","train","trash","treat","trend","trial",
  "trust","truth","under","union","unity","upper","urban","usage","usual","value",
  "valid","video","vital","voice","water","waste","watch","weary","weave","whale",
  "wheat","where","which","while","white","whole","worry","worth","would","write",
  "wrong","youth","zebra"
].filter((word, index, array) => word.length === 5 && array.indexOf(word) === index);

const VALID_WORDS = new Set(WORDS);

let level = 0;
let secretWord = "";
let currentRow = 0;
let currentCol = 0;
let currentGuess = [];
let gameOver = false;
let hearts = 7;
const MAX_HEARTS = 7;
const REGEN_INTERVAL = 10 * 60 * 1000;

let grid = [];
let playerName = "";

document.addEventListener("DOMContentLoaded", () => {
  loadFromStorage();
  setupLanding();
  setupMenuListeners();

  // clicking wordle title on game screen always goes back to landing
  document.getElementById("gameTitle").addEventListener("click", () => {
    goToLanding();
  });

  // dark mode emoji, need to change
  applyTheme();
});

// goes to landing and always pre-fills whatever name is saved so player can edit or just hit play
function goToLanding() {
  document.getElementById("gameScreen").classList.add("hidden");
  document.getElementById("landing").classList.remove("hidden");

  const savedName = localStorage.getItem("wordle_player_name");
  if (savedName) {
    document.getElementById("nameInput").value = savedName;
  }
  document.getElementById("nameError").classList.add("hidden");
}

// landing page — wired once, handles both first visit and every return from game
function setupLanding() {
  const nameInput = document.getElementById("nameInput");
  const playButton = document.getElementById("playButton");
  const nameError = document.getElementById("nameError");

  // pre-fill saved name so returning players just hit play or type a new one
  const savedName = localStorage.getItem("wordle_player_name");
  if (savedName) {
    nameInput.value = savedName;
  }

  nameInput.addEventListener("input", () => {
    nameError.classList.add("hidden");
  });

  // let them press enter on the input too
  nameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") playButton.click();
  });

  playButton.addEventListener("click", () => {
    const value = nameInput.value.trim();

    if (!value) {
      nameError.textContent = "name can't be empty!";
      nameError.classList.remove("hidden");
      nameInput.focus();
      return;
    }

    if (value.length > 12) {
      nameError.textContent = "max 12 letters!";
      nameError.classList.remove("hidden");
      return;
    }

    // save whatever name they typed — same or newly changed, always overwrites
    playerName = value;
    localStorage.setItem("wordle_player_name", playerName);
    startGame();
  });

  // if name already saved skip landing on first page load and go straight to game
  if (savedName) {
    playerName = savedName;
    startGame();
  }
}

function startGame() {
  document.getElementById("landing").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");

  // always update badge — catches name changes made on landing
  document.getElementById("playerNameDisplay").textContent = playerName;

  buildGrid();
  buildKeyboard();
  renderHearts();
  loadLevel();
  checkHeartRegen();
}

function loadFromStorage() {
  const savedLevel = localStorage.getItem("wordle_level");
  const savedHearts = localStorage.getItem("wordle_hearts");
  const savedTime = localStorage.getItem("wordle_regen_time");

  if (savedLevel !== null) level = parseInt(savedLevel);
  if (savedHearts !== null) hearts = parseInt(savedHearts);

  if (savedTime !== null) {
    const elapsed = Date.now() - parseInt(savedTime);
    const regens = Math.floor(elapsed / REGEN_INTERVAL);
    if (regens > 0) {
      hearts = Math.min(MAX_HEARTS, hearts + regens);
      const newBase = parseInt(savedTime) + regens * REGEN_INTERVAL;
      localStorage.setItem("wordle_regen_time", newBase.toString());
      localStorage.setItem("wordle_hearts", hearts.toString());
    }
  } else {
    localStorage.setItem("wordle_regen_time", Date.now().toString());
  }
}

function saveToStorage() {
  localStorage.setItem("wordle_level", level.toString());
  localStorage.setItem("wordle_hearts", hearts.toString());
}

function buildGrid() {
  const gridElement = document.getElementById("grid");
  gridElement.innerHTML = "";
  grid = [];

  for (let row = 0; row < 6; row++) {
    grid[row] = [];
    for (let col = 0; col < 5; col++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      gridElement.appendChild(tile);
      grid[row][col] = tile;
    }
  }
}

const keyRows = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","⌫"]
];

let keyStates = {};

function buildKeyboard() {
  const keyboardElement = document.getElementById("keyboard");
  keyboardElement.innerHTML = "";
  keyStates = {};

  keyRows.forEach(row => {
    const rowElement = document.createElement("div");
    rowElement.classList.add("key-row");

    row.forEach(letter => {
      const key = document.createElement("button");
      key.classList.add("key");
      key.textContent = letter;
      key.dataset.key = letter;

      key.addEventListener("click", () => {
        handleKey(letter);
        key.classList.add("pressed");
        setTimeout(() => key.classList.remove("pressed"), 120);
      });

      rowElement.appendChild(key);
      keyStates[letter] = "unused";
    });

    keyboardElement.appendChild(rowElement);
  });
}

function loadLevel() {
  secretWord = WORDS[level % WORDS.length].toUpperCase();
  currentRow = 0;
  currentCol = 0;
  currentGuess = [];
  gameOver = false;

  document.getElementById("puzzleLabel").textContent =
    "Puzzle " + String(level).padStart(4, "0");

  document.getElementById("messageArea").textContent = "";
  document.getElementById("messageArea").className = "message-area";
  document.getElementById("nextButton").classList.add("hidden");

  buildGrid();
  buildKeyboard();
  renderHearts();
}

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey || event.altKey || event.metaKey) return;

  if (event.key === "Enter") {
    handleKey("ENTER");
  } else if (event.key === "Backspace") {
    handleKey("⌫");
  } else if (/^[a-zA-Z]$/.test(event.key)) {
    handleKey(event.key.toUpperCase());
  }
});

function handleKey(key) {
  if (gameOver) return;
  if (hearts <= 0) return;

  if (key === "⌫") {
    deleteLetter();
  } else if (key === "ENTER") {
    submitGuess();
  } else if (/^[A-Z]$/.test(key)) {
    addLetter(key);
  }
}

function addLetter(letter) {
  if (currentCol >= 5) return;

  grid[currentRow][currentCol].textContent = letter;
  grid[currentRow][currentCol].classList.add("filled");
  currentGuess.push(letter);
  currentCol++;
}

function deleteLetter() {
  if (currentCol <= 0) return;

  currentCol--;
  currentGuess.pop();
  grid[currentRow][currentCol].textContent = "";
  grid[currentRow][currentCol].classList.remove("filled");
}

function submitGuess() {
  if (currentGuess.length < 5) {
    showMessage("Not enough letters!");
    shakeRow(currentRow);
    return;
  }

  const guessWord = currentGuess.join("");

  if (!VALID_WORDS.has(guessWord.toLowerCase()) && !WORDS.includes(guessWord.toLowerCase())) {
    showMessage("Not a valid word!");
    shakeRow(currentRow);
    return;
  }

  const result = scoreGuess(guessWord, secretWord);

  // reveals each tile one by one with a small delay between them
  result.forEach((status, col) => {
    const delay = col * 80;
    setTimeout(() => {
      const tile = grid[currentRow][col];
      tile.classList.add("reveal");
      setTimeout(() => {
        tile.classList.add(status);
      }, 200);
    }, delay);
  });

  setTimeout(() => {
    updateKeyboard(guessWord, result);
  }, result.length * 80 + 300);

  const won = result.every(result => result === "correct");

  setTimeout(() => {
    if (won) {
      showMessage("🎉 Nice one!");
      gameOver = true;
      showNextButton();
    } else if (currentRow >= 5) {
      loseHeart(); // hearts go down in case puzzle wrong
      showRevealedWord("The word was: " + secretWord);
      gameOver = true;
      showNextButton();
    } else {
      currentRow++;
      currentCol = 0;
      currentGuess = [];
    }
  }, result.length * 80 + 350);
}

// shows the correct word after a loss with soft rounded styling and fade in
function showRevealedWord(message) {
  const messageArea = document.getElementById("messageArea");
  messageArea.textContent = message;
  messageArea.className = "message-area word-reveal";
}

function scoreGuess(guess, secret) {
  const result = Array(5).fill("absent");
  const secretArr = secret.split("");
  const guessArr = guess.split("");

  // pass 1 — exact matches first
  for (let i = 0; i < 5; i++) {
    if (guessArr[i] === secretArr[i]) {
      result[i] = "correct";
      secretArr[i] = null;
      guessArr[i] = null;
    }
  }

  // pass 2 — right letter wrong spot, avoids double counting duplicates
  for (let i = 0; i < 5; i++) {
    if (guessArr[i] === null) continue;
    const index = secretArr.indexOf(guessArr[i]);
    if (index !== -1) {
      result[i] = "present";
      secretArr[index] = null;
    }
  }

  return result;
}

// keys only upgrade in color, never go backwards
function updateKeyboard(guess, result) {
  const priority = { correct: 3, present: 2, absent: 1, unused: 0 };

  result.forEach((status, i) => {
    const letter = guess[i];
    const currentState = keyStates[letter] || "unused";

    if (priority[status] > priority[currentState]) {
      keyStates[letter] = status;
    }
  });

  document.querySelectorAll(".key").forEach(keyElement => {
    const letter = keyElement.dataset.key;
    const state = keyStates[letter];
    keyElement.classList.remove("correct", "present", "absent");
    if (state && state !== "unused") {
      keyElement.classList.add(state);
    }
  });
}

function renderHearts() {
  const heartsRow = document.getElementById("heartsRow");
  heartsRow.innerHTML = "";

  for (let i = 0; i < MAX_HEARTS; i++) {
    const heart = document.createElement("span");
    heart.classList.add("heart");
    heart.textContent = "♥";
    if (i >= hearts) {
      heart.classList.add("empty");
    }
    heartsRow.appendChild(heart);
  }
}

function loseHeart() {
  hearts = Math.max(0, hearts - 1);
  saveToStorage();

  if (!localStorage.getItem("wordle_regen_time")) {
    localStorage.setItem("wordle_regen_time", Date.now().toString());
  }

  renderHearts();

  if (hearts <= 0) {
    showMessage("Come back in just few minutes~ You got this! ✨");
    gameOver = true;
    document.getElementById("nextButton").classList.add("hidden");
  }
}

// checks every 30 seconds if enough time has passed to give back a heart
function checkHeartRegen() {
  setInterval(() => {
    if (hearts >= MAX_HEARTS) return;

    const savedTime = localStorage.getItem("wordle_regen_time");
    if (!savedTime) return;

    const elapsed = Date.now() - parseInt(savedTime);
    if (elapsed >= REGEN_INTERVAL) {
      hearts = Math.min(MAX_HEARTS, hearts + 1);
      localStorage.setItem("wordle_hearts", hearts.toString());
      localStorage.setItem("wordle_regen_time", Date.now().toString());
      renderHearts();
    }
  }, 30000);
}

function showMessage(message) {
  document.getElementById("messageArea").textContent = message;
}

function showNextButton() {
  document.getElementById("nextButton").classList.remove("hidden");
}

function shakeRow(row) {
  grid[row].forEach(tile => {
    tile.classList.add("shake");
    setTimeout(() => tile.classList.remove("shake"), 400);
  });
}

document.getElementById("nextButton").addEventListener("click", () => {
  level++;
  saveToStorage();
  loadLevel();
});

const themeToggle = document.getElementById("themeToggle");
const toggleIcon = document.getElementById("toggleIcon");
let darkMode = localStorage.getItem("wordle_dark") === "true";

themeToggle.addEventListener("click", () => {
  darkMode = !darkMode;
  localStorage.setItem("wordle_dark", darkMode.toString());
  applyTheme();
});

function applyTheme() {
  document.body.classList.toggle("dark", darkMode);
  document.body.classList.toggle("light", !darkMode);
  toggleIcon.textContent = darkMode ? "🪼" : "🪄"; // light mode emoji
}

function setupMenuListeners() {
  const hamburgerButton = document.getElementById("hamburgerButton");
  const menuPanel = document.getElementById("menuPanel");
  const menuClose = document.getElementById("menuClose");

  hamburgerButton.addEventListener("click", () => {
    menuPanel.classList.add("open");
  });

  menuClose.addEventListener("click", () => {
    menuPanel.classList.remove("open");
  });

  // closes menu if player clicks anywhere outside of it
  document.addEventListener("click", (event) => {
    if (
      menuPanel.classList.contains("open") &&
      !menuPanel.contains(event.target) &&
      event.target !== hamburgerButton &&
      !hamburgerButton.contains(event.target)
    ) {
      menuPanel.classList.remove("open");
    }
  });

  // how to play is same as normal wordle, nothing new
  const howToPlayButton = document.getElementById("howToPlayButton");
  const howToPlayModal = document.getElementById("howToPlayModal");
  const modalClose = document.getElementById("modalClose");

  howToPlayButton.addEventListener("click", () => {
    howToPlayModal.classList.add("open");
    menuPanel.classList.remove("open");
  });

  modalClose.addEventListener("click", () => {
    howToPlayModal.classList.remove("open");
  });

  howToPlayModal.addEventListener("click", (event) => {
    if (event.target === howToPlayModal) {
      howToPlayModal.classList.remove("open");
    }
  });
}