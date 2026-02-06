/* =========================
   HEART ENGINE OPTIMIZADO
========================= */

const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

let running = false;

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const heart = new Path2D();
heart.moveTo(0, 0);
heart.bezierCurveTo(0, -3, -5, -3, -5, 0);
heart.bezierCurveTo(-5, 3, 0, 5, 0, 8);
heart.bezierCurveTo(0, 5, 5, 3, 5, 0);
heart.bezierCurveTo(5, -3, 0, -3, 0, 0);

const pool = [];
const MAX = 65;

class P {
    constructor() { this.a = false }
    s(x, y) {
        this.x = x; this.y = y;
        this.vx = (Math.random() - 0.5);
        this.vy = -(0.6 + Math.random() * 0.9);
        this.sz = 5 + Math.random() * 5;
        this.l = 150;
        this.a = true;
    }
    u() {
        if (!this.a) return;
        this.x += this.vx;
        this.y += this.vy;
        if (--this.l <= 0) this.a = false;
    }
    d() {
        if (!this.a) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.sz, this.sz);
        ctx.fillStyle = "#ff3d6e";
        ctx.fill(heart);
        ctx.restore();
    }
}

for (let i = 0; i < MAX; i++) pool.push(new P());

function emit(n = 30) {
    let c = 0;
    for (const p of pool) {
        if (!p.a) {
            p.s(Math.random() * canvas.width, canvas.height);
            if (++c >= n) break;
        }
    }
}

function loop() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of pool) { p.u(); p.d(); }
    requestAnimationFrame(loop);
}

function start() { if (!running) { running = true; loop(); } }


/* =========================
   LÓGICA
========================= */

const intro = document.getElementById("intro");
const s1 = document.getElementById("section1");
const s2 = document.getElementById("section2");
const s3 = document.getElementById("section3");

const startHeart = document.getElementById("startHeart");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const lateYesBtn = document.getElementById("lateYesBtn");

const buttonsBox = document.getElementById("buttonsBox");
const playerBox = document.getElementById("playerBox");

const audio1 = document.getElementById("audio1");
const audio2 = document.getElementById("audio2");
const eee = document.getElementById("eee");

const typeText = document.getElementById("typeText");
const finalGif = document.getElementById("finalGif");


startHeart.onclick = () => {
    start();
    emit(60);
    intro.classList.add("hidden");
    s1.classList.remove("hidden");
};


yesBtn.onclick = () => {
    eee.play();
    emit(80);
    go2();
};


noBtn.onclick = () => {
    buttonsBox.classList.add("hidden");
    playerBox.classList.remove("hidden");
    audio1.play();

    setTimeout(() => {
        lateYesBtn.classList.remove("hidden");
    }, 13000);
};


lateYesBtn.onclick = () => {
    eee.play();
    emit(100);
    go2();
};


function go2() {
    setTimeout(() => {
        s1.classList.add("hidden");
        s2.classList.remove("hidden");
        emit(40);
    }, 600);

    setTimeout(() => {
        s2.classList.add("hidden");
        s3.classList.remove("hidden");

        audio2.volume = 0.2;
        audio2.play();

        type();
    }, 6000);
}


/* =========================
   TYPEWRITER SUAVE
========================= */

const text = `Nuestra historia comenzó hace muchos años,
pero nada se compara con todo lo que hemos vivido juntos
en estos últimos dos.

Ese 23 de mayo del 2024 me cambiaste
la vida a mejor en serio, no sabes cuan feliz me has hecho
mi amorcito, eres todo lo que queria. 

Extraño mucho esos momentos tan perfectos que vivimos juntos
y se que pronto vamos a vivirlos nuevamente y todo sera hasta
mucho mejor. 

cuando te vi por primera vez te vi tan hermosa
que incluso si no hubiese estado enamorado me hubiera enamorado
facilmente de ti, cuando te bese me di cuenta que tu eres el
amor de mi vida y lo corrobore al pasar de los dias.

En serio no me queria despegar de tu lado,
no se tu pero yo te eligiria toda la vida mi amorcito,
gracias por existir, gracias por tu amor, por tus besos, por
darme tan hermosa dicha de estar contigo, 
Te amo con todo mi ser mi Rdvca❤️
 Att: Tu futuro esposo Josué Herrera.`;





function type() {
    let i = 0;
    typeText.textContent = "";

    function w() {
        if (i < text.length) {
            typeText.textContent += text[i++];
            setTimeout(w, 22);
        } else {
            finalGif.classList.remove("hidden");
            emit(60);
        }
    }
    w();
}
