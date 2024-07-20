'use strict';

const skipNextBtn = document.querySelector("[data-skip-next]");
const skipPrevBtn = document.querySelector("[data-skip-prev]");

const musicData = [
  {
    background: "#0B4C5F",
    title: "Harris",
    artist: "Playing Now...",
    musicpath: "https://stream-158.zeno.fm/0bhsthssutzuv?zs=dER78CjVTE-bzSesBUKJ7A",
  },
  {
    background: "#0B4C5F",
    title: "ARR 1",
    artist: "Playing Now...",
    musicpath: "https://www.liveradio.es/http://stream.zeno.fm/ihpr0rqzoxquv",
  },
{
    background: "#0B4C5F",
    title: "Na muthukumar",
    artist: "Playing Now...",
    musicpath: "https://www.liveradio.es/http://154.38.171.207:8130/na.muthukumar",
  },
{
    background: "#0B4C5F",
    title: "G V",
    artist: "Playing Now...",
    musicpath: "https://stream-164.zeno.fm/c9cxafngfekvv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJjOWN4YWZuZ2Zla3Z2IiwiaG9zdCI6InN0cmVhbS0xNjQuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6IkVDS0RPbnBJU2hTaEl3ODB0dGdvdEEiLCJpYXQiOjE3MjE0ODY4OTgsImV4cCI6MTcyMTQ4Njk1OH0.HCFviDDgVZNoiVs5sjWWLsKi4sw-JHJdIsLGz7dvgBw",
  },
{
    background: "#0B4C5F",
    title: "swarnalatha",
    artist: "Playing Now...",
    musicpath: "https://stream-169.zeno.fm/gr6nspzaa48uv?zt=eyJhbGciOiJIUzI1NiJ9.eyJzdHJlYW0iOiJncjZuc3B6YWE0OHV2IiwiaG9zdCI6InN0cmVhbS0xNjkuemVuby5mbSIsInJ0dGwiOjUsImp0aSI6InphVXQwZVVSVDVTMnlWczFhSlgyWkEiLCJpYXQiOjE3MjE0ODcwMTksImV4cCI6MTcyMTQ4NzA3OX0.we-SCYZzp2kNkDaOTaq-Z7-_M2SYpvAdNcbJjxQFK_Q",
  },
{
    background: "#0B4C5F",
    title: "Surprise",
    artist: "Playing Now...",
    musicpath: "https://cast4.asurahosting.com/proxy/neville/stream%20%7C%20http://cast4.my-control-panel.com/proxy/neville?mp=/stream",
  },
  {
    background: "#ff6b6b", // Example - replace with actual color
    title: "ARR",
    artist: "Playing Now...",
    musicpath: "https://ec5.yesstreaming.net:2320/stream",
 }
];

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

const playlist = document.querySelector("[data-music-list]");

for (let i = 0, len = musicData.length; i < len; i++) {
  playlist.innerHTML += `
  <li>
    <button class="music-item ${i === 0 ? "playing" : ""}" data-playlist-toggler data-playlist-item="${i}">
      <div class="item-icon">
        <span class="material-symbols-rounded">equalizer</span>
      </div>
      <div>
        <p class="title-sm">${musicData[i].title}</p>
        <p class="label-sm">${musicData[i].artist}</p>
      </div>
    </button>
  </li>
  `;
}

const playlistSideModal = document.querySelector("[data-playlist]");
const playlistTogglers = document.querySelectorAll("[data-playlist-toggler]");
const overlay = document.querySelector("[data-overlay]");

const togglePlaylist = function () {
  playlistSideModal.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("modalactive");
}

addEventOnElements(playlistTogglers, "click", togglePlaylist);

const playlistItems = document.querySelectorAll("[data-playlist-item]");
let currentMusic = 0;
let lastPlayedMusic = 0;

const changePlaylistItem = function () {
  playlistItems[lastPlayedMusic].classList.remove("playing");
  playlistItems[currentMusic].classList.add("playing");
}

addEventOnElements(playlistItems, "click", function () {
  lastPlayedMusic = currentMusic;
  currentMusic = Number(this.dataset.playlistItem);
  changePlaylistItem();
  changePlayerInfo();
});

const playerBanner = document.querySelector("[data-player-banner]");
const playerTitle = document.querySelector("[data-title]");
const playerArtist = document.querySelector("[data-artist]");
const audioSource = new Audio(musicData[currentMusic].musicpath);

const changePlayerInfo = function () {
  // Update background color
  document.body.style.backgroundImage = `linear-gradient(to bottom,  ${musicData[currentMusic].background} 0%, #0c0207 100%)`;
  playerTitle.textContent = musicData[currentMusic].title;
  playerArtist.textContent = musicData[currentMusic].artist;
  audioSource.src = musicData[currentMusic].musicpath;
  playMusic(); 
}

addEventOnElements(playlistItems, "click", changePlayerInfo);

const playBtn = document.querySelector("[data-play-btn]");

const playMusic = function () {
  if (audioSource.paused) {
    audioSource.play();
    playBtn.classList.add("active");
  } else {
    audioSource.pause();
    playBtn.classList.remove("active");
  }
}

playBtn.addEventListener("click", playMusic);

const playerVolumeRange = document.querySelector("[data-volume]");
const playerVolumeBtn = document.querySelector("[data-volume-btn]");

const changeVolume = function () {
  audioSource.volume = playerVolumeRange.value;
  audioSource.muted = false;

  if (audioSource.volume <= 0.1) {
    playerVolumeBtn.children[0].textContent = "volume_mute";
  } else if (audioSource.volume <= 0.5) {
    playerVolumeBtn.children[0].textContent = "volume_down";
  } else {
    playerVolumeBtn.children[0].textContent = "volume_up";
  }
}

playerVolumeRange.addEventListener("input", changeVolume);

const muteVolume = function () {
  if (!audioSource.muted) {
    audioSource.muted = true;
    playerVolumeBtn.children[0].textContent = "volume_off";
  } else {
    changeVolume(); 
  }
}

playerVolumeBtn.addEventListener("click", muteVolume);

const skipMusic = function (direction) {
  lastPlayedMusic = currentMusic;

  if (direction === "next") {
    currentMusic = (currentMusic + 1) % musicData.length; 
  } else {
    currentMusic = (currentMusic - 1 + musicData.length) % musicData.length; 
  }

  changePlaylistItem();
  changePlayerInfo(); 
};

skipNextBtn.addEventListener("click", () => skipMusic("next"));
skipPrevBtn.addEventListener("click", () => skipMusic("previous"));
