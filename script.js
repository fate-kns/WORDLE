const WORDS = [
  "about","above","abuse","actor","acute","admit","adopt","adult","after","again",
  "agent","agree","ahead","alarm","album","alert","alien","align","alike","alive",
  "alley","allow","alone","along","aloud","alpha","alter","angel","anger","angle",
  "angry","anime","ankle","annex","antic","apart","apple","apply","aptly","arise",
  "armor","aroma","arose","array","arrow","asset","atlas","attic","audio","audit",
  "avert","avoid","awake","award","aware","awful","bacon","badge","basic","basis",
  "beach","beard","beast","began","begin","being","below","bench","berry","birth",
  "black","blade","blame","blank","blast","blaze","bleak","blend","bless","blind",
  "block","blood","bloom","blown","blues","blunt","blurb","blurt","board","boost",
  "booth","bound","brain","brand","brave","bread","break","breed","brick","bride",
  "brief","bring","broad","broke","brown","build","built","bunch","burst","buyer",
  "cabin","camel","cargo","carry","catch","cause","caves","cease","chain","chair",
  "chalk","chaos","charm","chart","chase","cheap","check","cheer","chess","chest",
  "chief","child","china","choir","chose","civic","civil","claim","clash","class",
  "clean","clear","clerk","click","cliff","cling","clock","close","cloth","cloud",
  "clown","clubs","clump","coach","coast","cobra","color","comet","comic","comma",
  "coral","count","court","cover","crack","craft","crane","crash","crazy","cream",
  "creek","crisp","cross","crowd","crown","cruel","crush","crust","cubic","curve",
  "cycle","daily","dance","death","debut","decay","dense","depot","depth","derby",
  "digit","dirty","disco","ditch","dizzy","dodge","doing","donor","doubt","dough",
  "draft","drain","drama","drank","draw","dream","dress","drink","drive","drone",
  "drove","drown","drunk","dryer","dusty","dwarf","dying","eagle","early","earth",
  "eight","elite","empty","ended","enemy","enjoy","enter","equal","error","essay",
  "event","every","exact","exile","exist","expel","extra","fable","facet","faith",
  "false","fancy","fatal","feast","fence","ferry","fetch","fever","fewer","fiber",
  "field","fifth","fifty","fight","final","first","fixed","fizzy","flame","flare",
  "flash","flask","fleet","flesh","float","flood","floor","floss","flour","fluid",
  "flute","flyer","focal","foggy","force","forge","forum","found","frame","frank",
  "fraud","fresh","front","frost","froze","fruit","fully","funny","fuzzy","ghost",
  "giant","given","gland","glass","glide","gloat","globe","gloom","gloss","glove",
  "going","grace","grade","grain","grand","grant","grasp","grass","grave","great",
  "greed","green","greet","grief","grind","groan","group","grove","grown","gruel",
  "guard","guess","guest","guide","guild","guilt","guise","gulch","gusto","haven",
  "heart","heavy","hedge","hence","herbs","hinge","hippo","hobby","honey","honor",
  "horse","hotel","house","human","humor","hurry","hyper","ideal","image","imply",
  "inbox","index","indie","inert","inner","input","inter","intro","ivory","jazzy",
  "jelly","jewel","joint","joker","joust","judge","juice","jumbo","juice","jumpy",
  "kayak","kneel","knife","knock","known","label","lance","large","laser","later",
  "laugh","layer","learn","lease","least","leave","legal","lemon","level","light",
  "limit","liner","liner","liver","lobby","local","lodge","logic","loose","lover",
  "lower","loyal","lucky","lunar","lunch","lyric","magic","major","maker","manor",
  "maple","march","match","mayor","media","merge","merit","metal","might","minor",
  "minus","model","money","month","moral","motif","motor","mount","mouse","mouth",
  "moved","movie","muddy","multi","music","nasty","naval","nerve","never","night",
  "ninja","noble","noise","north","noted","novel","nurse","nymph","occur","ocean",
  "offer","often","olive","onset","opera","orbit","order","other","outer","owner",
  "oxide","ozone","pager","paint","panic","paper","party","pasta","patch","pause",
  "peace","peach","pearl","penny","perch","phase","phone","photo","piano","pixel",
  "pizza","place","plain","plane","plant","plate","plaza","plead","plume","plumb",
  "point","polar","pound","power","press","price","pride","prime","print","prize",
  "probe","prose","proud","prove","psalm","pulse","punch","purse","quest","queue",
  "quick","quiet","quota","quote","radar","radio","raise","rally","ranch","range",
  "rapid","reach","react","realm","rebel","refer","reign","relax","remix","repay",
  "reply","rerun","reset","rider","rifle","right","risky","river","robot","rocky",
  "rouge","rough","round","route","royal","ruler","rural","rusty","sadly","saint",
  "salad","sauce","scale","scene","score","scout","screw","sense","serve","setup",
  "seven","shade","shake","shame","shape","share","shark","sharp","shelf","shell",
  "shift","shirt","shock","shore","short","shout","shown","sight","sigma","silly",
  "since","sixth","sixty","sized","skill","skull","slate","slave","slick","slide",
  "slope","sloth","small","smart","smell","smile","smoke","snail","snake","solar",
  "solid","solve","sorry","south","space","spare","spark","speak","spell","spend",
  "spice","spine","spite","split","spoke","sport","spray","squad","stack","staff",
  "stage","stain","stake","stale","stamp","stand","stark","start","state","stays",
  "steam","steel","steep","steer","stick","stiff","still","stock","stone","stood",
  "store","storm","story","stove","strap","stray","strip","strut","study","style",
  "sugar","suite","sunny","super","surge","sushi","swamp","swear","sweep","sweet",
  "swift","sword","swore","synth","table","talon","tarot","taste","tatoo","taunt",
  "tense","tenth","terms","thorn","three","thrive","throw","tiger","tight","timed",
  "tired","title","toast","today","token","tooth","topic","total","touch","tough",
  "towel","tower","toxic","trace","track","trade","trail","train","trait","tramp",
  "trash","tread","trend","trial","tribe","trick","tried","trove","truce","truck",
  "truly","trunk","trust","truth","tumor","tuner","tutor","twice","twist","ultra",
  "under","unify","union","unity","until","upper","upset","urban","usage","users",
  "usual","utter","vague","valid","value","valve","vapor","vault","venue","verge",
  "verse","video","vigor","viral","virus","visor","visit","vista","vital","vivid",
  "vocal","voice","voter","vague","waste","watch","water","weary","weave","wedge",
  "weigh","weird","whale","wheat","where","while","white","whole","whose","wider",
  "witch","woman","women","world","worry","worse","worst","worth","would","write",
  "wrong","yacht","yield","young","youth","zebra","zesty","zippy","zombi","zones"
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
  setupCustomCursor();

  // dark mode emoji, need to change
  applyTheme();
});

// custom cursor follows the mouse everywhere, grows on hover over clickable things
function setupCustomCursor() {
  const cursor = document.getElementById("customCursor");

  document.addEventListener("mousemove", (event) => {
    cursor.style.left = event.clientX + "px";
    cursor.style.top = event.clientY + "px";
  });

  // make cursor bigger when hovering buttons, links, inputs
  document.addEventListener("mouseover", (event) => {
    const hoverable = event.target.closest("button, a, input, label, [role='button']");
    if (hoverable) {
      cursor.classList.add("hovering");
    } else {
      cursor.classList.remove("hovering");
    }
  });
}

// landing page — runs first before the game shows
function setupLanding() {
  const nameInput = document.getElementById("nameInput");
  const playButton = document.getElementById("playButton");
  const nameError = document.getElementById("nameError");

  const savedName = localStorage.getItem("wordle_player_name");
  if (savedName) {
    playerName = savedName;
    startGame();
    return;
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

    playerName = value;
    localStorage.setItem("wordle_player_name", playerName);
    startGame();
  });
}

function startGame() {
  document.getElementById("landing").classList.add("hidden");
  document.getElementById("gameScreen").classList.remove("hidden");

  document.getElementById("playerNameDisplay").textContent = playerName;

  buildGrid();
  buildKeyboard();
  renderHearts();
  loadLevel();
  checkHeartRegen();
  setupMenuListeners();

  // clicking the wordle title on game screen goes back to landing page
  document.getElementById("gameTitle").addEventListener("click", () => {
    document.getElementById("gameScreen").classList.add("hidden");
    document.getElementById("landing").classList.remove("hidden");
  });
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
      // show the revealed word with the soft styled class
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

  for (let i = 0; i < 5; i++) {
    if (guessArr[i] === secretArr[i]) {
      result[i] = "correct";
      secretArr[i] = null;
      guessArr[i] = null;
    }
  }

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