<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { goto } from '$app/navigation';

    let musicPlayer: any;
	let isPlayerReady = false;
    let backgroundMusic = false;
    let playerContainer: HTMLElement;
	let volume = 30;

    const YOUTUBE_VIDEO_ID = '9uIpad4AZO4'; // Replace with your YouTube video ID

    onMount(() => {
        initializeYouTubePlayer();
    });

    function initializeYouTubePlayer() {
        // Check if YouTube API is already loaded
        if ((window as any).YT && (window as any).YT.Player) {
            createPlayer();
        } else {
            // Only load the script if it doesn't exist
            if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
                loadYouTubeAPI();
            } else {
                // Script exists but API might not be ready yet
                waitForAPI();
            }
        }
    }

    function loadYouTubeAPI() {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.onload = () => {
            waitForAPI();
        };
        document.head.appendChild(tag);
    }

    function waitForAPI() {
        // Set up a unique callback for this component instance
        const callbackName = `onYTReady_${Date.now()}`;
        
        (window as any)[callbackName] = () => {
            createPlayer();
            // Clean up the callback
            delete (window as any)[callbackName];
        };

        // If the global callback isn't set, set it to our callback
        if (!(window as any).onYouTubeIframeAPIReady) {
            (window as any).onYouTubeIframeAPIReady = (window as any)[callbackName];
        } else {
            // API is ready, create player immediately
            if ((window as any).YT && (window as any).YT.Player) {
                createPlayer();
            }
        }
    }

    function createPlayer() {
        try {
            // Clear any existing player in this container
            if (playerContainer) {
                playerContainer.innerHTML = '';
            }

            // Create a unique player element ID
            const playerId = `musicPlayer_${Date.now()}`;
            if (playerContainer) {
                playerContainer.innerHTML = `<div id="${playerId}"></div>`;
            }

            musicPlayer = new (window as any).YT.Player(playerId, {
                height: '0',
                width: '640',
                videoId: YOUTUBE_VIDEO_ID,
                playerVars: {
                    'autoplay': 1,
                    'controls': 1,
                    'rel': 0,
                    'modestbranding': 1,
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                    'onError': onPlayerError
                }
            });
        } catch (error) {
            console.error('Error creating YouTube player:', error);
        }
    }

    function onPlayerReady(event: any) {
        console.log('YouTube Player is ready');
		isPlayerReady = true;

		event.target.setVolume(volume); // Set initial volume

		if (backgroundMusic) {
			event.target.playVideo();
		}
    }

    function onPlayerStateChange(event: any) {
        console.log('Player state changed:', event.data);

		if (event.data === 0 && backgroundMusic) {
			event.target.playVideo(); // Restart video when it ends
		}
    }

    function onPlayerError(event: any) {
        console.error('YouTube Player error:', event.data);
    }

	function toggleBackgroundMusic() {
		backgroundMusic = !backgroundMusic;

		if (isPlayerReady && musicPlayer) {
			if (backgroundMusic) {
				musicPlayer.playVideo();
			} else {
				musicPlayer.pauseVideo();
			}
		}
	}

	function handleVolumeChange() {
        if (isPlayerReady && musicPlayer) {
            musicPlayer.setVolume(volume);
        }
    }

	$: if (isPlayerReady && musicPlayer) {
        if (backgroundMusic) {
            musicPlayer.playVideo();
        } else {
            musicPlayer.pauseVideo();
        }
    }

    onDestroy(() => {
        // Properly destroy the player
        if (musicPlayer && typeof musicPlayer.destroy === 'function') {
            try {
                musicPlayer.destroy();
            } catch (error) {
                console.error('Error destroying player:', error);
            }
        }

        // Clear the container
        if (playerContainer) {
            playerContainer.innerHTML = '';
        }

        // Don't delete the global callback as other instances might need it
        musicPlayer = null;
		isPlayerReady = false;
    });
</script>

<div class="flex justify-center items-center gap-4 mb-5">
    <button 
        class="btn variant-filled-primary {backgroundMusic ? 'variant-filled-success' : 'variant-filled-surface'}" 
        on:click={toggleBackgroundMusic}
        disabled={!isPlayerReady}
    >
        {#if backgroundMusic}
            <span class="mr-2">🔊</span>
            Music On
        {:else}
            <span class="mr-2">🔇</span>
            Music Off
        {/if}
    </button>

    <!-- Volume Control Slider -->
    <div class="flex items-center gap-2">
        <span class="text-sm">🔊</span>
        <input 
            type="range" 
            min="0" 
            max="100" 
            bind:value={volume}
            on:input={handleVolumeChange}
            disabled={!isPlayerReady}
            class="range range-sm w-24"
            class:opacity-50={!isPlayerReady}
        />
        <span class="text-sm w-8">{volume}</span>
    </div>
</div>


<div bind:this={playerContainer} id="musicPlayer" class="flex justify-center my-5">
    <!-- Player will be inserted here -->
</div>

<div class="flex justify-center my-5">
    <video 
        loop 
        autoplay 
        muted
        class="w-full max-w-4xl rounded-lg shadow-lg"
    >
        <source src="/warword_intro.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
</div>