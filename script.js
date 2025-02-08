document.addEventListener('DOMContentLoaded', () => {
    // Get all screens
    const logoScreen = document.querySelector('.logo-screen');
    const chestScreen = document.querySelector('.chest-screen');
    const giftScreen = document.querySelector('.gift-screen');
    const openButton = document.querySelector('.open-button');
    
    // Video elements
    const introVideo = document.getElementById('chestIntro');
    const loopVideo = document.getElementById('chestLoop');
    const outroVideo = document.getElementById('chestOutro');

    // Set initial states explicitly
    logoScreen.style.display = 'flex';
    logoScreen.style.opacity = '1';
    chestScreen.classList.add('hidden');
    giftScreen.classList.add('hidden');
    openButton.classList.remove('show');    // Make sure button is hidden initially

    // Preload videos
    try {
        introVideo.load();
        loopVideo.load();
        outroVideo.load();
    } catch (error) {
        console.error('Error loading videos:', error);
    }

    // Start sequence with logo and loading bar
    setTimeout(() => {
        logoScreen.style.animation = 'fadeOut 1s ease-out forwards';
        setTimeout(() => {
            logoScreen.classList.add('hidden');
            chestScreen.classList.remove('hidden');
            chestScreen.style.animation = 'fadeIn 1s ease-in';
            
            // Start chest intro video
            introVideo.classList.add('active');
            introVideo.muted = true;
            introVideo.play().then(() => {
                console.log('Intro video started');
                
                // When intro ends, start loop and show button
                introVideo.addEventListener('ended', () => {
                    introVideo.classList.remove('active');
                    loopVideo.classList.add('active');
                    loopVideo.muted = true;
                    loopVideo.play();
                    openButton.classList.add('show');
                }, { once: true });
            }).catch(error => {
                console.error('Video play error:', error);
            });
        }, 1000);
    }, 8500); // Wait for loading bar

    // Handle chest opening
    openButton.addEventListener('click', () => {
        openButton.style.display = 'none';
        loopVideo.classList.remove('active');
        outroVideo.classList.add('active');
        outroVideo.muted = true;
        
        outroVideo.play().then(() => {
            outroVideo.addEventListener('ended', () => {
                chestScreen.classList.add('hidden');
                giftScreen.classList.remove('hidden');
                giftScreen.style.animation = 'fadeIn 1s ease-in';
            }, { once: true });
        }).catch(error => {
            console.error('Outro video error:', error);
        });
    });

    // Handle Add to Loot button
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