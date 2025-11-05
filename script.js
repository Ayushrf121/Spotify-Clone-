// Set the document title
document.title = 'Spotify – Web Player';

// Language translation...
const resources = {
  en: {
    translation: {
      "Your Library": "Your Library",
      "Create Playlist": "Create your first playlist",
      "Create Button": "Create playlist",
      "Find Podcast": "Let's find some podcasts to follow",
      "Browse Podcast": "Browse podcasts",
      "Trending": "Trending songs",
      "Log in": "Log in",
      "Sign up": "Sign up",
      "Install App": "Install App"
    }
  },
  hi: {
    translation: {
      "Your Library": "आपकी लाइब्रेरी",
      "Create Playlist": "अपनी पहली प्लेलिस्ट बनाएं",
      "Create Button": "प्लेलिस्ट बनाएं",
      "Find Podcast": "पॉडकास्ट खोजें",
      "Browse Podcast": "पॉडकास्ट ब्राउज़ करें",
      "Trending": "लोकप्रिय गाने",
      "Log in": "लॉग इन करें",
      "Sign up": "साइन अप करें",
      "Install App": "ऐप इंस्टॉल करें"
    }
  },
  fr: {
    translation: {
      "Your Library": "Votre bibliothèque",
      "Create Playlist": "Créez votre première playlist",
      "Create Button": "Créer une playlist",
      "Find Podcast": "Trouvons quelques podcasts à suivre",
      "Browse Podcast": "Parcourir les podcasts",
      "Trending": "Chansons tendance",
      "Log in": "Connexion",
      "Sign up": "S'inscrire",
      "Install App": "Installer l'application"
    }
  },
  ge: {
    translation: {
      "Your Library": "Ihre Bibliothek",
      "Create Playlist": "Erstellen Sie Ihre erste Playlist",
      "Create Button": "Playlist erstellen",
      "Find Podcast": "Lass uns einige Podcasts finden",
      "Browse Podcast": "Podcasts durchsuchen",
      "Trending": "Trendige Songs",
      "Log in": "Anmelden",
      "Sign up": "Registrieren",
      "Install App": "App installieren"
    }
  },
  por: {
    translation: {
      "Your Library": "Sua Biblioteca",
      "Create Playlist": "Crie sua primeira playlist",
      "Create Button": "Criar playlist",
      "Find Podcast": "Vamos encontrar alguns podcasts para seguir",
      "Browse Podcast": "Procurar podcasts",
      "Trending": "Músicas em alta",
      "Log in": "Entrar",
      "Sign up": "Inscrever-se",
      "Install App": "Instalar aplicativo"
    }
  }
};


i18next.init({
  lng: "en", // default language
  debug: true,
  resources
}, function(err, t) {
  updateContent();
});

function updateContent() {
  document.querySelector(".LMD1 span").textContent = i18next.t("Your Library");
  document.querySelector(".LSD1 span").textContent = i18next.t("Create Playlist");
  document.querySelector(".lcb1").textContent = i18next.t("Create Button");
  document.querySelector(".LSD2 span").textContent = i18next.t("Find Podcast");
  document.querySelector(".lcb2").textContent = i18next.t("Browse Podcast");
  document.querySelector(".rightMainDiv > h1").textContent = i18next.t("Trending");
  document.querySelector(".navDiv2 > button").textContent = i18next.t("Log in");
  document.querySelector(".navDiv2 > a span").textContent = i18next.t("Sign up");
  document.querySelector(".nD2Two a span").textContent = i18next.t("Install App");
}


// Array of song file paths
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

let index = 0; // Current song index

// Selecting elements from DOM
let audioTrack = document.getElementById("audioPlayer");
let playButton = document.getElementById("playBtn");
let previousButton = document.getElementById("prevBtn");
let nextButton = document.getElementById("nextBtn");
let volumeButton = document.getElementById("volBtn");
let volInput = document.getElementById("volumeChange");
let shuffle = document.getElementById("shuffle");
let playlistSongName = document.getElementById("PlayList-songname");
let playlistImage = document.getElementById("PlayList-image");
let playSVGButton = document.querySelectorAll(".play");



// Set initial audio source
audioTrack.src = songs[index];

let isAudioIsPlayedOrPaused = false; // Tracks play/pause state

// Play/Pause toggle button
playButton.addEventListener("click", () => {
    if (isAudioIsPlayedOrPaused) {
        playButton.src = "Playlist-Play.svg";
        isAudioIsPlayedOrPaused = false;
        audioTrack.pause();
    } else {
        // get all the cards.
        const cards = document.querySelectorAll(".card");
        if (cards[index]) {
            const cardMatched = cards[index];
            playlistImage.src = cardMatched.querySelector(".play").getAttribute("data-img");
            playlistSongName.innerHTML = cardMatched.querySelector("h4").innerText;
        }
        playButton.src = "Playlist-Pause.svg";
        isAudioIsPlayedOrPaused = true;
        audioTrack.play();
    }
});

// Play previous song
previousButton.addEventListener("click", () => {
    if (index > 0) {
        index--;
    } else {
        index = songs.length - 1; // Loop back to last song
    }
    const cards = document.querySelectorAll(".card");
    if (cards[index]) {
        const cardMatched = cards[index];
        playlistImage.src = cardMatched.querySelector(".play").getAttribute("data-img");
        playlistSongName.innerHTML = cardMatched.querySelector("h4").innerText;
    }
    isAudioIsPlayedOrPaused = true;
    playButton.src = "Playlist-Pause.svg";
    audioTrack.src = songs[index];
    audioTrack.play();
});

// Play next song

nextButton.addEventListener("click", () => {
    if (index < songs.length - 1) {
        index++;
    } else {
        index = 0; // Loop back to first song
    }
    const cards = document.querySelectorAll(".card");
    if (cards[index]) {
        const cardMatched = cards[index];
        playlistImage.src = cardMatched.querySelector(".play").getAttribute("data-img");
        playlistSongName.innerHTML = cardMatched.querySelector("h4").innerText;
    }
    isAudioIsPlayedOrPaused = true;
    playButton.src = "Playlist-Pause.svg";
    audioTrack.src = songs[index];
    audioTrack.play();
});



// Show/hide volume slider on volume button click
volumeButton.addEventListener("click", () => {
    volInput.classList.toggle("hidden");
    setTimeout(() => {
        volInput.classList.toggle("hidden");
    }, 5000);
});

// Change volume based on input range and update icon
volInput.addEventListener("input", function () {
    audioTrack.volume = this.value;
    if (audioTrack.volume >= 0.5) {
        volumeButton.src = "Volume-High.svg";
    } else if (audioTrack.volume == 0.00) {
        volumeButton.src = "Volume-Mute.svg";
    } else {
        volumeButton.src = "Volume-Low.svg";
    }
});

// Shuffle mode logic
let shuffleFlag = false;

shuffle.addEventListener("click", () => {
    shuffleFlag = !shuffleFlag; // Toggle shuffle mode

    if (shuffleFlag) {
        alert("Shuffle is on");

        let randomIndex = 0;
        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (randomIndex == index); // Avoid same song again

        index = randomIndex;
        const cards = document.querySelectorAll(".card");
        if (cards[index]) {
            const cardMatched = cards[index];
            playlistImage.src = cardMatched.querySelector(".play").getAttribute("data-img");
            playlistSongName.innerHTML = cardMatched.querySelector("h4").innerText;
        }
        audioTrack.src = songs[index];
        audioTrack.play();
        isAudioIsPlayedOrPaused = true;
        playButton.src = "Playlist-Pause.svg";
    } else {
        alert("Shuffle is off");
    }
});

// Handle song end based on shuffle mode
audioTrack.addEventListener("ended", () => {
    if (shuffleFlag) {
        let randomIndex = 0;
        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (randomIndex == index);

        index = randomIndex;
        const cards = document.querySelectorAll(".card");
        if (cards[index]) {
            const cardMatched = cards[index];
            playlistImage.src = cardMatched.querySelector(".play").getAttribute("data-img");
            playlistSongName.innerHTML = cardMatched.querySelector("h4").innerText;
        }
        audioTrack.src = songs[index];
        audioTrack.play();
        isAudioIsPlayedOrPaused = true;
        playButton.src = "Playlist-Pause.svg";
    } else {
        isAudioIsPlayedOrPaused = false;
        playButton.src = "Playlist-Play.svg";
        return;
    }
});

// Play Button Clickable event so that we can click and music play.
playSVGButton.forEach((play) => {
    play.addEventListener(("click"), () => {
        const cardKaSong = play.getAttribute("data-songs");
        const cardKaImage = play.getAttribute("data-img");

        const card = play.closest(".card"); // Get parent card element
        const cardKaTitle = card.querySelector("h4").innerText; // Get song name from <h4>


        playlistImage.src = cardKaImage;
        playlistSongName.innerHTML = cardKaTitle;
        audioTrack.src = cardKaSong;
        audioTrack.play();
        isAudioIsPlayedOrPaused = true;
        playButton.src = "Playlist-Pause.svg";
    });
    play.style.cursor = "pointer";
});

// Search Button in search menu working
let searchIcon = document.getElementById("SearchSong");
let navSearch = document.getElementById("NavSearch");

searchIcon.addEventListener("click", () => {
    // Complete text fetch krega and then use yha get krega aur trailing spaces cut krega...
    const searchText = navSearch.value.toLowerCase().trim(); // Get search text

    let found = false;

    // Loop through all cards to find a matching song title
    document.querySelectorAll(".card").forEach((card) => {
        // each time inputed text ko search krega then get krega...
        const title = card.querySelector("h4").innerText.toLowerCase().trim();
        // .includes() allow to compare the string (songName) partially... 
        if (title.includes(searchText) && !found) {
            const songSrc = card.querySelector(".play").getAttribute("data-songs");
            const songImg = card.querySelector(".play").getAttribute("data-img");

            playlistImage.src = songImg;
            playlistSongName.innerHTML = card.querySelector("h4").innerText;
            audioTrack.src = songSrc;
            audioTrack.play();
            isAudioIsPlayedOrPaused = true;
            playButton.src = "Playlist-Pause.svg";

            // Update current index for next/prev functionality
            index = songs.indexOf(songSrc);
            found = true;
        }
    });

    if (!found) {
        alert("No song matched your search!");
    }
});

// enter key search song.
navSearch.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const searchText = navSearch.value.toLowerCase().trim(); // Get search text
        let found = false;
    if (searchText === "") {
            return;
        }
        document.querySelectorAll(".card").forEach((card) => {
            const title = card.querySelector("h4").innerText.toLowerCase().trim();
            if (title.includes(searchText) && !found) {
                const songSrc = card.querySelector(".play").getAttribute("data-songs");
                const songImg = card.querySelector(".play").getAttribute("data-img");

                playlistImage.src = songImg;
                playlistSongName.innerHTML = card.querySelector("h4").innerText;
                audioTrack.src = songSrc;
                audioTrack.play();
                isAudioIsPlayedOrPaused = true;
                playButton.src = "Playlist-Pause.svg";

                index = songs.indexOf(songSrc);
                found = true;
            }
        });

        if (!found) {
            alert("No song matched your search!");
        }
    }
});

// to connect with i18next 
document.getElementById("language").addEventListener("change", function () {
  const selectedLang = this.value;
  i18next.changeLanguage(selectedLang, () => {
    updateContent();
  });
});


// Menu Button working below 875px.
const menuButton=document.getElementById("menuIcon");
const navDiv2=document.querySelector(".navDiv2");
menuButton.addEventListener(("click"),()=>{
    navDiv2.classList.toggle("navDiv2Alternate");
})
