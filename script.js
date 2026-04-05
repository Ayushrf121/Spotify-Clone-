// ══════════════════════════════════════════════
//  SCRIPT.JS — Spotify Clone
//  All original song paths preserved exactly.
// ══════════════════════════════════════════════

document.title = 'Spotify – Web Player';

// ── i18n translations ─────────────────────────
const resources = {
  en: {
    translation: {
      "Your Library":    "Your Library",
      "Create Playlist": "Create your first playlist",
      "Create Button":   "Create playlist",
      "Find Podcast":    "Let's find some podcasts to follow",
      "Browse Podcast":  "Browse podcasts",
      "Trending":        "Trending",
      "Log in":          "Log in",
      "Sign up":         "Sign up",
      "Install App":     "Install App"
    }
  },
  hi: {
    translation: {
      "Your Library":    "आपकी लाइब्रेरी",
      "Create Playlist": "अपनी पहली प्लेलिस्ट बनाएं",
      "Create Button":   "प्लेलिस्ट बनाएं",
      "Find Podcast":    "पॉडकास्ट खोजें",
      "Browse Podcast":  "पॉडकास्ट ब्राउज़ करें",
      "Trending":        "लोकप्रिय गाने",
      "Log in":          "लॉग इन करें",
      "Sign up":         "साइन अप करें",
      "Install App":     "ऐप इंस्टॉल करें"
    }
  },
  fr: {
    translation: {
      "Your Library":    "Votre bibliothèque",
      "Create Playlist": "Créez votre première playlist",
      "Create Button":   "Créer une playlist",
      "Find Podcast":    "Trouvons quelques podcasts à suivre",
      "Browse Podcast":  "Parcourir les podcasts",
      "Trending":        "Tendances",
      "Log in":          "Connexion",
      "Sign up":         "S'inscrire",
      "Install App":     "Installer l'application"
    }
  },
  ge: {
    translation: {
      "Your Library":    "Ihre Bibliothek",
      "Create Playlist": "Erstellen Sie Ihre erste Playlist",
      "Create Button":   "Playlist erstellen",
      "Find Podcast":    "Lass uns einige Podcasts finden",
      "Browse Podcast":  "Podcasts durchsuchen",
      "Trending":        "Trends",
      "Log in":          "Anmelden",
      "Sign up":         "Registrieren",
      "Install App":     "App installieren"
    }
  },
  por: {
    translation: {
      "Your Library":    "Sua Biblioteca",
      "Create Playlist": "Crie sua primeira playlist",
      "Create Button":   "Criar playlist",
      "Find Podcast":    "Vamos encontrar alguns podcasts para seguir",
      "Browse Podcast":  "Procurar podcasts",
      "Trending":        "Tendências",
      "Log in":          "Entrar",
      "Sign up":         "Inscrever-se",
      "Install App":     "Instalar aplicativo"
    }
  }
};

// Initialise i18next
i18next.init({ lng: "en", debug: false, resources }, function () {
  updateContent();
});

function updateContent() {
  document.getElementById("libraryLabel").textContent       = i18next.t("Your Library");
  document.getElementById("createPlaylistTitle").textContent = i18next.t("Create Playlist");
  document.getElementById("createPlaylistBtn").textContent   = i18next.t("Create Button");
  document.getElementById("findPodcastTitle").textContent    = i18next.t("Find Podcast");
  document.getElementById("browsePodcastBtn").textContent    = i18next.t("Browse Podcast");
  document.getElementById("trendingLabel").innerHTML         = i18next.t("Trending") + ' <span class="highlight">songs</span>';
  document.getElementById("loginBtn").textContent            = i18next.t("Log in");
  document.getElementById("signupText").textContent          = i18next.t("Sign up");
  document.getElementById("installAppText").textContent      = i18next.t("Install App");
}

// Language switcher
document.getElementById("language").addEventListener("change", function () {
  i18next.changeLanguage(this.value, updateContent);
});


// ── Song list (original paths untouched) ───────
const songs = [
  "Songs/Blue Yung Kai - PagalWorld.mp3",
  "Songs/Ve Haaniyaan-128kbps.mp3",
  "Songs/Post Malone, Swae Lee - Sunflower (Spider-Man Into the Spider-Verse).mp3",
  "Songs/Dil Diyan Gallan - Tiger Zinda Hai 128 Kbps.mp3",
  "Songs/On The Floor Lofi Chase(PagalWorld).mp3",
  "Songs/Ye Waadiyan - SoundWorldz.mp3",
  "Songs/Zindagi Ek Safar - Andaaz (1971) 128 Kbps.mp3",
  "Songs/Sapphire (Mp3 Song)-(SambalpuriStar.In).mp3",
  "Songs/One-Kiss-Lofi.mp3",
  "Songs/Vaaste Nikhil Dsouza 128 Kbps.mp3",
  "Songs/Desi Kalakaar Yo Yo Honey Singh 128 Kbps.mp3",
  "Songs/Theres-Nothing-Holding-Me-Back.mp3",
  "Songs/Hua Hain Aaj Pehli Baar - Sanam Re 128 Kbps.mp3",
  "Songs/Night Changes(PagalWorld).mp3",
  "Songs/Taarif Karoon Kya Uski - (Raag.Fm).mp3",
  "Songs/Death Bed (PenduJatt.Com.Se).mp3",
  "Songs/My Name Is Anthony Gonsalves Amar Akbar Anthony 128 Kbps.mp3"
];

let currentIndex   = 0;
let isPlaying      = false;
let shuffleOn      = false;

// ── DOM references ─────────────────────────────
const audioTrack      = document.getElementById("audioPlayer");
const playBtn         = document.getElementById("playBtn");
const playBtnImg      = document.getElementById("playBtnImg");
const prevBtn         = document.getElementById("prevBtn");
const nextBtn         = document.getElementById("nextBtn");
const volBtn          = document.getElementById("volBtn");
const volIcon         = document.getElementById("volIcon");
const volInput        = document.getElementById("volumeChange");
const shuffleBtn      = document.getElementById("shuffle");
const nowPlayingImg   = document.getElementById("PlayList-image");
const nowPlayingName  = document.getElementById("PlayList-songname");
const searchIcon      = document.getElementById("SearchSong");
const searchInput     = document.getElementById("NavSearch");
const menuBtn         = document.getElementById("menuIcon");
const sidebar         = document.getElementById("sidebar");
const overlay         = document.getElementById("overlay");

// Set initial track
audioTrack.src = songs[currentIndex];

// ── Helper: update now-playing panel ──────────
function updateNowPlaying(index) {
  const cards = document.querySelectorAll(".card");
  if (cards[index]) {
    const card = cards[index];
    nowPlayingImg.src  = card.querySelector(".play").getAttribute("data-img");
    nowPlayingName.textContent = card.querySelector(".card-title").textContent;
  }
}

// ── Helper: set play state visually ───────────
function setPlayState(playing) {
  isPlaying = playing;
  // Swap icon: use inline SVG path so no extra files needed
  playBtnImg.src = playing ? "Playlist-Pause.svg" : "play.svg";
}

// ── Play / Pause ───────────────────────────────
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    audioTrack.pause();
    setPlayState(false);
  } else {
    updateNowPlaying(currentIndex);
    audioTrack.play();
    setPlayState(true);
  }
});

// ── Previous ───────────────────────────────────
prevBtn.addEventListener("click", () => {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : songs.length - 1;
  loadAndPlay(currentIndex);
});

// ── Next ───────────────────────────────────────
nextBtn.addEventListener("click", () => {
  currentIndex = currentIndex < songs.length - 1 ? currentIndex + 1 : 0;
  loadAndPlay(currentIndex);
});

// ── Load & play a track by index ──────────────
function loadAndPlay(index) {
  updateNowPlaying(index);
  audioTrack.src = songs[index];
  audioTrack.play();
  setPlayState(true);
}

// ── Auto-advance on track end ──────────────────
audioTrack.addEventListener("ended", () => {
  if (shuffleOn) {
    pickRandomAndPlay();
  } else {
    setPlayState(false);
    playBtnImg.src = "play.svg";
  }
});

// ── Shuffle ────────────────────────────────────
shuffleBtn.addEventListener("click", () => {
  shuffleOn = !shuffleOn;
  shuffleBtn.classList.toggle("active", shuffleOn);

  if (shuffleOn) {
    pickRandomAndPlay();
  }
});

function pickRandomAndPlay() {
  let rnd;
  do {
    rnd = Math.floor(Math.random() * songs.length);
  } while (rnd === currentIndex && songs.length > 1);
  currentIndex = rnd;
  loadAndPlay(currentIndex);
}

// ── Volume button (show/hide slider) ──────────
volBtn.addEventListener("click", () => {
  volInput.classList.toggle("hidden");
  // Auto-hide after 5 s
  clearTimeout(volBtn._hideTimer);
  if (!volInput.classList.contains("hidden")) {
    volBtn._hideTimer = setTimeout(() => volInput.classList.add("hidden"), 5000);
  }
});

// ── Volume slider ──────────────────────────────
volInput.addEventListener("input", function () {
  audioTrack.volume = this.value;

  if (audioTrack.volume === 0) {
    volIcon.src = "Volume-Mute.svg";
  } else if (audioTrack.volume < 0.5) {
    volIcon.src = "Volume-Low.svg";
  } else {
    volIcon.src = "Volume-High.svg";
  }
});

// ── Card play buttons ──────────────────────────
document.querySelectorAll(".play").forEach((playEl, idx) => {
  playEl.style.cursor = "pointer";
  playEl.addEventListener("click", () => {
    currentIndex = idx;
    const songSrc  = playEl.getAttribute("data-songs");
    const songImg  = playEl.getAttribute("data-img");
    const cardTitle = playEl.closest(".card").querySelector(".card-title").textContent;

    nowPlayingImg.src           = songImg;
    nowPlayingName.textContent  = cardTitle;
    audioTrack.src              = songSrc;
    audioTrack.play();
    setPlayState(true);
  });
});

// ── Search: click icon ─────────────────────────
searchIcon.addEventListener("click", () => runSearch());

// ── Search: press Enter ────────────────────────
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") runSearch();
});

function runSearch() {
  const query = searchInput.value.toLowerCase().trim();
  if (!query) return;

  let found = false;
  document.querySelectorAll(".card").forEach((card, idx) => {
    const title = card.querySelector(".card-title").textContent.toLowerCase().trim();
    if (title.includes(query) && !found) {
      found = true;
      currentIndex = idx;
      const playEl  = card.querySelector(".play");
      const songSrc = playEl.getAttribute("data-songs");
      const songImg = playEl.getAttribute("data-img");

      nowPlayingImg.src           = songImg;
      nowPlayingName.textContent  = card.querySelector(".card-title").textContent;
      audioTrack.src              = songSrc;
      audioTrack.play();
      setPlayState(true);

      // Scroll card into view
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });

  if (!found) alert("No song matched your search!");
}

// ── Mobile menu (hamburger) ────────────────────
menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("show");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
});