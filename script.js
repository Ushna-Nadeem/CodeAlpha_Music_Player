const songs = [
    {
        title: "Blank Space",
        artist: "Taylor Swift",
        src: "Taylor Swift - Blank Space.mp3",
        image: "song 1.jpeg"
    },
    {
        title: "I Can Do It With A Broken Heart",
        artist: "Taylor Swift",
        src: "Taylor Swift - I Can Do It With A Broken Heart.mp3",
        image: "song 2.jpeg"
    }
];

let currentSongIndex = 0;
const audio = new Audio();
const playPauseButton = document.getElementById('play-pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progressBar = document.getElementById('progress');
const volumeSlider = document.getElementById('volume');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const songImage = document.getElementById('song-image');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');
const likeButton = document.getElementById('like');
const shareButton = document.getElementById('share');

function loadSong(song) {
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    songImage.src = song.image;
    audio.src = song.src;
}

function playSong() {
    audio.play();
    playPauseButton.innerHTML = '&#10074;&#10074;'; // Pause symbol
}

function pauseSong() {
    audio.pause();
    playPauseButton.innerHTML = '&#9658;'; // Play symbol
}

playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
});

nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
});

audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercent;
    progressBar.style.setProperty('--progress-width', `${progressPercent}%`);

    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime % 60);
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration % 60);
    durationTimeEl.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
});

progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
    volumeSlider.style.setProperty('--volume-width', `${volumeSlider.value}%`);
});

likeButton.addEventListener('click', () => {
    alert('Liked!'); // Placeholder for actual like functionality
});

shareButton.addEventListener('click', () => {
    alert('Shared!'); // Placeholder for actual share functionality
});

// Load initial song
loadSong(songs[currentSongIndex]);
