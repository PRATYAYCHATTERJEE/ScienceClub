/* =========================
   AI ASSISTANT (ULTIMATE)
========================= */

const aiButton = document.getElementById("aiButton");
const aiBox = document.getElementById("aiBox");
const closeAI = document.getElementById("closeAI");
const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("aiInput");
const messages = document.getElementById("aiMessages");

/* ================= OPEN / CLOSE ================= */
aiButton.onclick = () => {
  aiBox.style.display = "flex";
};

closeAI.onclick = () => {
  aiBox.style.display = "none";
};

/* ================= SEND ================= */
sendBtn.onclick = sendMessage;

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});


function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addUser(text);
  input.value = "";

  showTyping();

  setTimeout(() => {
    removeTyping();
    reply(text.toLowerCase());
  }, 900);
}


/* ================= USER MESSAGE ================= */
function addUser(text) {
  const div = document.createElement("div");
  div.className = "user-msg";
  div.innerText = text;
  messages.appendChild(div);

  saveChat();
  scrollBottom();
}


/* ================= BOT MESSAGE ================= */
function addBot(text) {
  const div = document.createElement("div");
  div.className = "bot-msg";
  div.innerText = text;
  messages.appendChild(div);

  saveChat();
  scrollBottom();
}


/* ================= TYPING ANIMATION ================= */
function showTyping() {
  const div = document.createElement("div");
  div.className = "typing";
  div.id = "typing";

  div.innerHTML = "<span></span><span></span><span></span>";
  messages.appendChild(div);
  scrollBottom();
}

function removeTyping() {
  const typing = document.getElementById("typing");
  if (typing) typing.remove();
}


/* ================= SMART AI LOGIC ================= */
function reply(msg) {

  function has(words) {
    return words.some(word => msg.includes(word));
  }

  /* GREETING */
  if (has(["hi","hello","hey"])) {
    addBot("👋 Hello! I'm your Science Club Assistant. Ask me anything!");
  }

  /* EVENTS */
  else if (has(["event","events","competition","activity","fest"])) {
    addBot("🚀 We organize hackathons, science exhibitions, quizzes, and innovation challenges.");
  }

  /* MEMBERSHIP */
  else if (has(["join","member","membership","apply"])) {
    addBot("👨‍🔬 You can join by contacting coordinators or participating in events.");
  }

  /* WORKSHOP */
  else if (has(["workshop","training","session"])) {
    addBot("🤖 We conduct workshops on AI, robotics, coding, and new technologies.");
  }

  /* TEAM */
  else if (has(["team","core","coordinator"])) {
    addBot("👥 Our club is run by faculty and student coordinators with a strong core team.");
  }

  /* CONTACT */
  else if (has(["contact","email","phone"])) {
    addBot("📩 You can reach us via the contact section or coordinators.");
  }

  /* BENEFITS */
  else if (has(["benefit","why join","skills","career"])) {
    addBot("🌟 You gain skills, experience, teamwork, and exposure to real-world projects.");
  }

  /* PROJECTS */
  else if (has(["project","build","innovation"])) {
    addBot("🧠 Members build robotics, AI systems, and innovative tech projects.");
  }

  /* FUN */
  else if (has(["fun","interesting"])) {
    addBot("😄 Yes! We make learning fun with competitions and creative activities.");
  }

  /* THANKS */
  else if (has(["thanks","thank"])) {
    addBot("😊 You're welcome!");
  }

  /* BYE */
  else if (has(["bye","goodbye"])) {
    addBot("👋 See you soon!");
  }

  /* FALLBACK */
  else {
    addBot("🤖 I’m still learning! Try asking about events, membership, or workshops.");
  }
}


/* ================= QUICK QUESTIONS ================= */
function quickAsk(type) {

  let map = {
    events: "Tell me about events",
    member: "How can I join the club?",
    workshop: "What workshops do you conduct?",
    contact: "How can I contact you?"
  };

  const text = map[type];

  addUser(text);

  showTyping();

  setTimeout(() => {
    removeTyping();
    reply(text.toLowerCase());
  }, 600);
}


/* ================= CHAT MEMORY ================= */
function saveChat() {
  localStorage.setItem("aiChat", messages.innerHTML);
}

function loadChat() {
  const data = localStorage.getItem("aiChat");
  if (data) messages.innerHTML = data;
}

window.onload = loadChat;


/* ================= SCROLL ================= */
function scrollBottom() {
  messages.scrollTop = messages.scrollHeight;
}

const clearBtn = document.getElementById("clearChat");

clearBtn.addEventListener("click", function () {

  // Reset chat content
  messages.innerHTML = `
    <div class="bot-msg">
      👋 Hi! Ask me anything about the Science Club.
    </div>

    <div class="quick-questions">
      <button onclick="quickAsk('events')">Events 🚀</button>
      <button onclick="quickAsk('member')">Join Club 👨‍🔬</button>
      <button onclick="quickAsk('workshop')">Workshops 🤖</button>
      <button onclick="quickAsk('contact')">Contact 📩</button>
    </div>
  `;

  // Clear saved chat
  localStorage.removeItem("aiChat");

});