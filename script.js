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
const btnShare = document.getElementById("btnShare");
const btnFirework = document.getElementById("btnFirework");
const btnCard = document.getElementById("btnCard");
const fwStage = document.getElementById("fwStage");
const starsFall = document.getElementById("starsFall");
const cardName = document.getElementById("cardName");
const cardPreview = document.getElementById("cardPreview");

/* ===== 祝福语 ===== */
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

/* ===== 烟花 ===== */
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

/* ===== 飘星 ===== */
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

/* ===== 年份 ===== */
function updateYear() {
  const years = new Date().getFullYear() - 1949;
  document.getElementById("yearNum").textContent = `${years} 周年`;
}

/* ===== 吐司提示 ===== */
function showToast(msg) {
  let t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("show"), 1800);
}

/* ===== 分享 ===== */
async function sharePage() {
  const url = location.href;
  const shareData = {
    title: "庆祝国庆 · 祝福祖国",
    text: "一起为祖国送祝福！",
    url
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(url);
      showToast("链接已复制，快去粘贴分享吧！");
    }
  } catch (e) {
    // 用户取消分享不算错误
  }
}

/* ===== 生成卡片 ===== */
function drawCard(name) {
  const W = 720, H = 1000;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d");

  // 背景渐变
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#8a0b20");
  bg.addColorStop(1, "#3a0610");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // 星光点缀
  for (let i = 0; i < 60; i++) {
    ctx.fillStyle = "rgba(255,210,74," + (0.15 + Math.random() * 0.5) + ")";
    ctx.beginPath();
    ctx.arc(Math.random() * W, Math.random() * H, Math.random() * 2 + 1, 0, Math.PI * 2);
    ctx.fill();
  }

  // 顶部金线
  ctx.strokeStyle = "#ffd24a";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(80, 120);
  ctx.lineTo(W - 80, 120);
  ctx.stroke();

  // 主标题
  ctx.fillStyle = "#ffd24a";
  ctx.textAlign = "center";
  ctx.font = "bold 88px 'PingFang SC','Microsoft YaHei',sans-serif";
  ctx.shadowColor = "rgba(255,210,74,.7)";
  ctx.shadowBlur = 24;
  ctx.fillText("庆祝国庆", W / 2, 240);
  ctx.shadowBlur = 0;

  ctx.fillStyle = "#ffe9ec";
  ctx.font = "26px 'PingFang SC','Microsoft YaHei',sans-serif";
  ctx.fillText("1949 — " + new Date().getFullYear(), W / 2, 300);

  // 中央五角星
  ctx.fillStyle = "#ffd24a";
  ctx.font = "bold 130px serif";
  ctx.fillText("★", W / 2, 450);

  // 祝福语
  ctx.fillStyle = "#fff5d6";
  ctx.font = "34px 'PingFang SC','Microsoft YaHei',sans-serif";
  ctx.fillText("祝 " + name + " 国庆快乐", W / 2, 560);
  ctx.font = "26px 'PingFang SC','Microsoft YaHei',sans-serif";
  ctx.fillStyle = "#ffd9de";
  ctx.fillText("愿山河无恙，人间皆安", W / 2, 620);

  // 分隔线
  ctx.strokeStyle = "rgba(255,210,74,.6)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(180, 700);
  ctx.lineTo(W - 180, 700);
  ctx.stroke();

  // 落款
  ctx.fillStyle = "#ffd24a";
  ctx.font = "22px 'PingFang SC','Microsoft YaHei',sans-serif";
  ctx.fillText("@MOJNBYYDS666频道开发", W / 2, 760);

  // 底部祝福
  ctx.fillStyle = "rgba(255,233,236,.7)";
  ctx.font = "20px 'PingFang SC','Microsoft YaHei',sans-serif";
  ctx.fillText("祝福祖国 · 繁荣昌盛", W / 2, 900);

  return cv;
}

function generateCard() {
  let name = (cardName.value || "").trim();
  if (!name) { showToast("请先输入名字"); return; }
  if (name.length > 12) name = name.slice(0, 12);

  const cv = drawCard(name);
  cardPreview.innerHTML = "";
  cardPreview.appendChild(cv);
  const tip = document.createElement("p");
  tip.className = "card-tip";
  tip.textContent = "长按图片可保存到相册";
  cardPreview.appendChild(tip);
  cardPreview.scrollIntoView({ behavior: "smooth", block: "center" });
}

/* ===== 事件 ===== */
btnMore.addEventListener("click", renderBlessings);
btnFirework.addEventListener("click", launchFirework);
btnShare.addEventListener("click", sharePage);
btnCard.addEventListener("click", generateCard);
btnLight.addEventListener("click", () => {
  document.body.classList.toggle("lit");
  btnLight.textContent = document.body.classList.contains("lit") ? "已点亮 ★" : "点亮国旗";
});

/* ===== 初始化 ===== */
updateYear();
renderBlessings();
initStars();