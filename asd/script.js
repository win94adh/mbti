const questions = [
    { q: "새로운 무대에 오르기 직전 당신은?", a: "박수 소리가 설레고 기대된다", b: "차분하게 대본을 복기한다", type: "EI" },
    { q: "예기치 못한 조명 사고가 발생한다면?", a: "자연스러운 애드리브로 승화한다", b: "매뉴얼대로 침착하게 대처한다", type: "JP" },
    { q: "연습 중 동료가 대사를 까먹었다면?", a: "효율적인 개선책을 바로 알려준다", b: "기운 낼 수 있게 따뜻하게 격려한다", type: "TF" },
    { q: "공연이 끝난 후 뒤풀이 제안을 받는다면?", a: "밤새도록 떠들며 즐기고 싶다", b: "혼자 조용히 오늘의 공연을 반추한다", type: "EI" },
    { q: "연습 스케줄을 짤 때 당신의 스타일은?", a: "분 단위로 철저하게 계획한다", b: "큰 흐름만 잡고 유연하게 움직인다", type: "JP" },
    { q: "라이벌이 나보다 더 큰 박수를 받는다면?", a: "그의 강점이 무엇인지 냉철하게 분석한다", b: "그의 노력이 빛을 발해 진심으로 기쁘다", type: "TF" },
    { q: "나를 수식하는 가장 어울리는 말은?", a: "빈틈없는 카리스마의 완벽주의자", b: "사람의 마음을 울리는 감성 아티스트", type: "TF" },
    { q: "공연 당일 배역이 바뀌었다는 소식을 듣는다면?", a: "새로운 기회라 생각하고 즐긴다", b: "당황스럽지만 빠르게 계획을 수정한다", type: "JP" },
    { q: "더 선호하는 무대의 형태는?", a: "함께 호흡을 맞추는 화려한 합동 무대", b: "나만의 색깔을 온전히 보여주는 솔로 무대", type: "EI" },
    { q: "관객에게 듣고 싶은 최고의 극찬은?", a: "실력이 정말 압도적이었다는 평가", b: "당신의 연기로 큰 위로를 받았다는 후기", type: "TF" }
];

const results = {
    "ETJ": { title: "찬란한 빛의 지휘자", mbti: "ENTJ", desc: "완벽한 계획과 카리스마로 무대를 장악하는 리더입니다.", color: "#00d4ff", icon: "💎" },
    "EFP": { title: "자유로운 영감의 스파크", mbti: "ENFP", desc: "긍정 에너지로 관객을 사로잡는 비타민 같은 존재입니다.", color: "#ffd700", icon: "🌟" },
    "ITJ": { title: "고요한 새벽의 전략가", mbti: "INTJ", desc: "커튼 뒤에서 완벽을 설계하는 커튼 뒤의 실력자입니다.", color: "#a29bfe", icon: "🔭" },
    "IFP": { title: "부드러운 달빛의 예술가", mbti: "ISFP", desc: "섬세한 감성으로 마음을 적시는 예술가입니다.", color: "#fab1a0", icon: "🎨" }
};

let currentIdx = 0;
let scores = { E: 0, I: 0, T: 0, F: 0, J: 0, P: 0 };
let isClickable = true;

function openGate() {
    document.getElementById('gate-container').classList.add('gate-open');
    setTimeout(() => {
        document.getElementById('quiz-screen').classList.add('active');
        renderQuestion();
    }, 1200);
}

function renderQuestion() {
    const area = document.getElementById('quiz-area');
    const q = questions[currentIdx];
    area.innerHTML = `
        <p style="color:var(--gold); font-weight:bold;">SCENE ${currentIdx + 1}</p>
        <h2 style="margin-bottom:30px;">${q.q}</h2>
        <div class="choice-container">
            <button class="btn-choice" onclick="handleSelect('a')">${q.a}</button>
            <button class="btn-choice" onclick="handleSelect('b')">${q.b}</button>
        </div>
    `;
    isClickable = true;
}

window.handleSelect = function(choice) {
    if (!isClickable) return;
    isClickable = false;
    const type = questions[currentIdx].type;
    scores[(choice === 'a') ? type[0] : type[1]]++;
    currentIdx++;
    if (currentIdx < questions.length) renderQuestion();
    else startLoadingShow();
};

function startLoadingShow() {
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('gate-container').classList.remove('gate-open');
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('active');
        document.body.classList.add('loading-active');
        setTimeout(revealResult, 5000); // 5초 로딩
    }, 1500);
}

function revealResult() {
    const mbti = (scores.E >= scores.I ? "E" : "I") + (scores.T >= scores.F ? "T" : "F") + (scores.J >= scores.P ? "J" : "P");
    const data = results[mbti] || results["ETJ"];
    document.getElementById('result-title').innerText = data.title;
    document.getElementById('result-mbti').innerText = `#${data.mbti}`;
    document.getElementById('result-desc').innerText = data.desc;
    document.getElementById('char-icon-container').innerHTML = `<div style="font-size:100px;">${data.icon}</div>`;

    document.getElementById('loading-screen').classList.remove('active');
    document.body.classList.remove('loading-active');
    document.getElementById('gate-container').classList.add('gate-open');
    document.getElementById('result-screen').classList.add('active');
    document.getElementById('main-beam').style.opacity = "1";
    launchFireworks();
}

function launchFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: canvas.width / 2, y: canvas.height / 2,
            vx: Math.random() * 20 - 10, vy: Math.random() * 20 - 10,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`, life: 100
        });
    }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += p.vx; p.y += p.vy; p.vy += 0.2; p.life--;
            ctx.fillStyle = p.color;
            ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill();
            if (p.life <= 0) particles.splice(i, 1);
        });
        if (particles.length > 0) requestAnimationFrame(animate);
    }
    animate();
}