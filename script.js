// Cuenta regresiva
const countdown = document.getElementById("countdown");
const targetDate = new Date("2025-07-13T00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    countdown.textContent = "IT'S TIME!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdown.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);

// Estilo dinámico de canciones
document.querySelectorAll(".track").forEach(track => {
  const img = track.getAttribute("data-img");
  track.style.setProperty("--img", `url('${img}')`);
  track.style.setProperty("background-image", `url('${img}')`);
});

// Cámara + Marcos grandes (sin personaje en esquina)

// Solo marcos, ya no usamos personajes
const frames = [
  "characters/hobi.png",
  "characters/suga.png",
  "characters/jimin.png",
  "characters/tae.png",
  "characters/jk.png",
  "characters/rm.png",
  "characters/jin.png"
];

let currentFrame = 0;

const startBtn = document.getElementById("start-camera");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureBtn = document.getElementById("capture");
const downloadLink = document.getElementById("download");
const cameraContainer = document.getElementById("camera-container");
const changeBtn = document.getElementById("change-character");

let stream = null;

let frameImage = new Image();
let frameLoaded = false;

// Función para setear marco y cargar su imagen
function setFrame(index) {
  frameImage = new Image();
  frameLoaded = false;
  frameImage.onload = () => {
    frameLoaded = true;
    console.log("✅ Marco cargado:", frameImage.src);
  };
  frameImage.onerror = () => {
    console.error("❌ Error al cargar el marco:", frameImage.src);
    alert("No se pudo cargar el marco. Verifica la ruta y el nombre del archivo.");
  };
  frameImage.src = frames[index];
}

setFrame(currentFrame); // Cargar marco inicial

startBtn.addEventListener("click", async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    cameraContainer.classList.remove("hidden");
    console.log("📷 Cámara encendida");
  } catch (err) {
    alert("Error al acceder a la cámara: " + err.message);
    console.error(err);
  }
});

changeBtn.addEventListener("click", () => {
  currentFrame = (currentFrame + 1) % frames.length;
  setFrame(currentFrame);
});

captureBtn.addEventListener("click", () => {
  if (!frameLoaded) {
    alert("La imagen del marco aún no se ha cargado.");
    return;
  }
  drawCapture();
});

function drawCapture() {
  console.log("📸 Capturando imagen...");

  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // 1. Dibujar el video (la cámara)
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // 2. Dibujar el marco grande encima del video
  context.drawImage(frameImage, 0, 0, canvas.width, canvas.height);

  // 3. Preparar para descarga
  const imgData = canvas.toDataURL("image/png");
  downloadLink.href = imgData;
  downloadLink.style.display = "inline-block";
  downloadLink.download = "foto_con_marco.png";
  console.log("✅ Foto lista con marco aplicado.");
}


// Selector de idioma
document.getElementById("language").addEventListener("change", (e) => {
  const lang = e.target.value;
  alert(`Traducción al ${lang.toUpperCase()} aún no implementada.`);
});
