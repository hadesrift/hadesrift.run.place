document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('cursor');
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// YouTube Data API setup
const API_KEY = 'AIzaSyBpW4RE11YybhSTgvTZRWX8FSItw2NGBvs';  // Replace with your YouTube Data API key
const CHANNEL_ID = 'UC4NsCPOo3pv9j7ZwR2AMV3w';  // Replace with your YouTube channel ID
const videoGrid = document.getElementById('video-grid');

async function fetchYouTubeVideos() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=9`);
        const data = await response.json();
        
        // Display each video
        data.items.forEach(item => {
            if (item.id.kind === "youtube#video") {
                const videoId = item.id.videoId;
                const videoElement = document.createElement('iframe');
                videoElement.src = `https://www.youtube.com/embed/${videoId}`;
                videoElement.title = item.snippet.title;
                videoElement.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                videoElement.allowFullscreen = true;
                
                videoGrid.appendChild(videoElement);
            }
        });
    } catch (error) {
        console.error("Error fetching videos:", error);
    }
}

// Load videos on page load
fetchYouTubeVideos();
