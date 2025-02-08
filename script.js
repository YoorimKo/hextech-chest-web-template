document.addEventListener('DOMContentLoaded', () => {
    const logoScreen = document.querySelector('.logo-screen');
    const chestScreen = document.querySelector('.chest-screen');
    const giftScreen = document.querySelector('.gift-screen');
    const openButton = document.querySelector('.open-button');
    
    // Video elements
    const introVideo = document.getElementById('chestIntro');
    const loopVideo = document.getElementById('chestLoop');
    const outroVideo = document.getElementById('chestOutro');

    // Add error and loading event listeners
    introVideo.addEventListener('error', (e) => {
        console.error('Error loading intro video:', introVideo.error);
    });

    introVideo.addEventListener('loadeddata', () => {
        console.log('Intro video loaded successfully');
    });

    // Preload videos with error handling
    try {
        introVideo.load();
        loopVideo.load();
        outroVideo.load();
    } catch (error) {
        console.error('Error loading videos:', error);
    }

    // Add this function to check video state
    const checkVideoState = (video) => {
        console.log('Video ready state:', video.readyState);
        console.log('Video paused:', video.paused);
        console.log('Video current time:', video.currentTime);
        console.log('Video duration:', video.duration);
        console.log('Video muted:', video.muted);
    };

    // When starting intro video, add more detailed error handling
    const startIntroVideo = () => {
        introVideo.classList.add('active');
        introVideo.muted = true;
        
        const playPromise = introVideo.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('Intro video playback started');
                    
                    // Listen for intro video end
                    introVideo.addEventListener('ended', () => {
                        console.log('Intro video ended, starting loop');
                        // Hide intro video
                        introVideo.classList.remove('active');
                        
                        // Start loop video
                        loopVideo.classList.add('active');
                        loopVideo.muted = true;
                        loopVideo.play().then(() => {
                            console.log('Loop video started');
                        }).catch(error => {
                            console.error('Loop video error:', error);
                        });
                        
                        // Show the Open button
                        openButton.classList.add('show');
                    }, { once: true }); // only trigger once
                })
                .catch(error => {
                    console.error("Video playback error:", error.message);
                    if (error.name === 'NotAllowedError') {
                        console.log('Autoplay was blocked by the browser');
                        const playButton = document.createElement('button');
                        playButton.textContent = 'Start Animation';
                        playButton.className = 'play-button';
                        chestScreen.insertBefore(playButton, chestScreen.firstChild);
                        
                        playButton.addEventListener('click', () => {
                            introVideo.play();
                            playButton.remove();
                        });
                    }
                });
        }
    };

    // Initial loading and transition
    setTimeout(() => {
        logoScreen.style.animation = 'fadeOut 1s ease-out forwards';
        setTimeout(() => {
            logoScreen.classList.add('hidden');
            chestScreen.classList.remove('hidden');
            chestScreen.style.animation = 'fadeIn 1s ease-in';
            startIntroVideo();
        }, 1000);
    }, 8500);

    // Handle chest opening
    openButton.addEventListener('click', () => {
        openButton.style.display = 'none';
        loopVideo.classList.remove('active');
        outroVideo.classList.add('active');
        outroVideo.play().catch(error => {
            console.log("Outro video playback error:", error);
        });
        
        outroVideo.addEventListener('ended', () => {
            chestScreen.classList.add('hidden');
            giftScreen.classList.remove('hidden');
            // Gift card is visible by default
        });
    });

    // Add handler for the Add to Loot button
    const addToLootButton = document.querySelector('.add-to-loot-button');
    const giftCardContainer = document.querySelector('.gift-card-container');
    const letter = document.querySelector('.letter');

    addToLootButton.addEventListener('click', () => {
        giftCardContainer.style.animation = 'fadeOut 1s ease-out forwards';
        setTimeout(() => {
            giftCardContainer.classList.add('hidden');
            letter.classList.remove('hidden');
        }, 1000);
    });
}); 