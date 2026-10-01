const BLESSINGS = [
  "山河锦绣，国泰民安，祝祖国繁荣昌盛！",
  "五星闪耀，皆为信仰；红旗飘扬，皆为力量。",
  "愿以吾辈之青春，捍卫盛世之中华。",
  "目光所至皆为华夏，五星闪耀皆为信仰。",
  "祝祖国生日快乐，愿山河无恙，人间皆安。",
  "一寸山河一寸情，万里江山万里红。",
  "盛世华诞，举国同庆；此生无悔入华夏。",
  "愿山河永固，愿国泰民安，愿中华长青。"
];

const PAGE_SIZE = 4;

const blessList = document.getElementById("blessList");
const btnMore = document.getElementById("btnMore");
const btnLight = document.getElementById("btnLight");
const btnFirework = document.getElementById("btnFirework");
const fwStage = document.getElementById("fwStage");
const starsFall = document.getElementById("starsFall");

function renderBlessings() {
  const pool = [...BLESSINGS].sort(() => Math.random() - 0.5).slice(0, PAGE_SIZE);
  blessList.innerHTML = "";
  pool.forEach((text, i) => {
    const li = document.createElement("li");
    li.textContent = text;
    li.style.animationDelay = `${i * 0.08}s`;
    blessList.appendChild(li);
  });
}

function launchFirework() {
  const rect = fwStage.getBoundingClientRect();
  const colors = ["#ffd24a", "#c8102e", "#ff7a8a", "#fff0b3", "#ff4d6d"];
  const cx = Math.random() * rect.width;
  const cy = Math.random() * rect.height * 0.6 + 20;
  const n = 22;
  for (let i = 0; i < n; i++) {
    const spark = document.createElement("span");
    spark.className = "spark";
    const a = (Math.PI * 2 * i) / n;
    const d = 50 + Math.random() * 70;
    spark.style.left = cx + "px";
    spark.style.top = cy + "px";
    spark.style.setProperty("--dx", Math.cos(a) * d + "px");
    spark.style.setProperty("--dy", Math.sin(a) * d + "px");
    spark.style.background = colors[i % colors.length];
    fwStage.appendChild(spark);
    setTimeout(() => spark.remove(), 1000);
  }
}

function initStars() {
  for (let i = 0; i < 16; i++) {
    const s = document.createElement("i");
    s.textContent = "★";
    s.style.left = Math.random() * 100 + "vw";
    s.style.fontSize = 8 + Math.random() * 10 + "px";
    s.style.animationDuration = 6 + Math.random() * 8 + "s";
    s.style.animationDelay = Math.random() * 8 + "s";
    starsFall.appendChild(s);
  }
}

function updateYear() {
  const years = new Date().getFullYear() - 1949;
  document.getElementById("yearNum").textContent = `${years} 周年`;
}

btnMore.addEventListener("click", renderBlessings);
btnLight.addEventListener("click", () => {
  document.body.classList.toggle("lit");
  btnLight.textContent = document.body.classList.contains("lit") ? "已点亮 ★" : "点亮国旗";
});
btnFirework.addEventListener("click", launchFirework);

updateYear();
renderBlessings();
initStars();