var audio = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
var playBtn = document.querySelector(".fa-play");

var pauseBtn;
var nextSong = document.querySelector(".fa-forward");
var prevSong = document.querySelector(".fa-backward");

var songName = document.querySelector(".song-name");

var appear = document.querySelector(".appear");
var disc = document.querySelector(".disc");

var musicImgTab = ["ukulele", "summer", "hey"];

audio.controls = false;

var currentSong = 0;

function pauseMedia() {
  audio.pause();
  disc.classList.remove("rotate");
  playBtn.classList.remove("fa-pause");
  playBtn.classList.add("fa-play");
  appear.style.transform = "translate(0%, 135%)";
  appear.style.visibility = "hidden";
}

function playMedia() {
  audio.play();
  appear.style.visibility = "visible";
  appear.style.display = "flex";
  playBtn.classList.add("fa-pause");
  disc.classList.add("rotate");

  songName.innerHTML = musicImgTab[currentSong];
}

playBtn.addEventListener("click", function () {
  if (playBtn.classList.contains("fa-play")) {
    audio.play();
    appear.style.visibility = "visible";
    appear.style.display = "flex";
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
    disc.classList.add("rotate");
    appear.style.transform = "translate(15% , 20%)";
    songName.innerHTML = musicImgTab[currentSong];
  } else {
    pauseMedia();
  }
});

nextSong.addEventListener("click", function () {
  audio.src = `./music/${musicImgTab[(currentSong + 1) % 3]}.mp3`;
  disc.src = `./images/${musicImgTab[(currentSong + 1) % 3]}.jpg`;
  var temp = currentSong + 1;
  if (temp >= musicImgTab.length) {
    currentSong = temp % musicImgTab.length;
  } else {
    currentSong = temp;
  }
  console.log("Next " + currentSong);
  if (playBtn.classList.contains("fa-pause")) {
    playMedia();
  }
});

prevSong.addEventListener("click", function () {
  currentSong = currentSong - 1;
  if (currentSong < 0) {
    currentSong = currentSong + musicImgTab.length;
    audio.src = `./music/${musicImgTab[currentSong]}.mp3`;
    disc.src = `./images/${musicImgTab[currentSong]}.jpg`;
  } else {
    audio.src = `./music/${musicImgTab[currentSong]}.mp3`;
    disc.src = `./images/${musicImgTab[currentSong]}.jpg`;
  }

  if (playBtn.classList.contains("fa-pause")) {
    playMedia();
  }
});

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

audio.onended = function () {
  pauseMedia();
};

audio.addEventListener("timeupdate", updateProgress);

progressContainer.addEventListener("click", setProgress);
