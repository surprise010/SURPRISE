'use strict';

const skipNextBtn = document.querySelector("[data-skip-next]");
const skipPrevBtn = document.querySelector("[data-skip-prev]");

const musicData = [
  {
    background: "#0B4C5F",
    title: "ISAI PUYAL",
    artist: "Playing Now...",
    musicpath: "https://stream.zeno.fm/8vs416z3b48uv",
  },
{
    background: "#0B4C5F",
    title: "Rahmania",
    artist: "Playing Now...",
    musicpath: "https://stream.zeno.fm/0az0qx8e4p8uv",
  },
{
    background: "#0B4C5F",
    title: "ISAI NYANI",
    artist: "Playing Now...",
    musicpath: "https://stream.zeno.fm/10xewnmcbkhvv",
  },
    {
    background: "#ff6b6b", // Example - replace with actual color
    title: "ARR Loop",
    artist: "Playing Now...",
    musicpath: "https://ec5.yesstreaming.net:2320/stream",
 },
  {
    background: "#0B4C5F",
    title: "ARR Limtless",
    artist: "Playing Now...",
    musicpath: "https://www.liveradio.es/http://stream.zeno.fm/ihpr0rqzoxquv",
  },
{
    background: "#0B4C5F",
    title: "Endrum Raja",
    artist: "Playing Now...",
    musicpath: "https://stream.zeno.fm/5u2c0yh0ekhvv",
  },
{
    background: "#0B4C5F",
    title: "Harris MAAMS",
    artist: "Playing Now...",
    musicpath: "https://stream.zeno.fm/kxaqyb63138uv",
  },
{
    background: "#0B4C5F",
    title: "U1 Drugs",
    artist: "Playing Now...",
    musicpath: "https://stream.zeno.fm/f939szg6a48uv",
  },
{
    background: "#0B4C5F",
    title: "Harrizzz",
    artist: "Playing Now...",
    musicpath: "https://stream-158.zeno.fm/0bhsthssutzuv",
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
    musicpath: "https://stream-164.zeno.fm/c9cxafngfekvv",
  },
{
    background: "#0B4C5F",
    title: "swarnalatha",
    artist: "Playing Now...",
    musicpath: "https://stream-169.zeno.fm/gr6nspzaa48uv",
  },
{
    background: "#0B4C5F",
    title: "Mix",
    artist: "Playing Now...",
    musicpath: "https://stream.zeno.fm/v0bu4uc1c48uv",
  },
   {
    background: "#0B4C5F",
    title: "Retro",
    artist: "Playing Now...",
    musicpath: "https://stream.zeno.fm/zrkta9fvzv8uv",
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
