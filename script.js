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
        playBackgroundMusic();  // Start the background music
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
                    
                    // Add sound events after button is visible
                    openButton.addEventListener('mouseenter', playHoverSound);
                    openButton.addEventListener('click', playClickSound);
                }, { once: true });
            }).catch(error => {
                console.error('Video play error:', error);
            });
        }, 1000);
    }, 8500); // Wait for loading bar

    // Handle chest opening
    openButton.addEventListener('click', () => {
        playBackgroundMusic();  // Start music on first click
        playClickSound();
        playOpenSound();
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
    const giftCode = document.querySelector('.gift-code');

    addToLootButton.addEventListener('click', () => {
        playClickSound();
        playLootOpenSound();

        // Copy gift code to clipboard
        navigator.clipboard.writeText(giftCode.textContent)
            .then(() => {
                // Visual feedback that code was copied
                addToLootButton.textContent = 'Copied!';
                
                // Transition to letter after copying
                giftCardContainer.style.animation = 'fadeOut 1s ease-out forwards';
                setTimeout(() => {
                    giftCardContainer.classList.add('hidden');
                    letter.classList.remove('hidden');
                    // Reset button text
                    setTimeout(() => {
                        addToLootButton.textContent = 'Add to Loot';
                    }, 1000);
                }, 1000);
            })
            .catch(err => {
                console.error('Failed to copy:', err);
            });
    });

    // Add this to your existing JavaScript
    const loveButton = document.querySelector('.love-button');
    let isAnimating = false;
    let loveClickCount = 0;
    const EASTER_EGG_TRIGGER = 5; // Show special image after this many clicks

    loveButton.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        loveButton.disabled = true;
        
        loveClickCount++;

        // Normal emote behavior
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createFloatingEmote();
            }, i * 150);
        }
        
        // Re-enable button after animation
        setTimeout(() => {
            isAnimating = false;
            loveButton.disabled = false;
        }, 6000);
    });

    function createFloatingEmote() {
        const emote = document.createElement('img');
        emote.className = 'floating-emote';
        
        // Array of all emote images
        const images = [
            'asset/event_snowdown_poro_love_inventory.png',
            'asset/penguin_love_kiss_inventory.png',
            'asset/penguin_love_cheerful_inventory.png',
            'asset/em_pcs_psg_show_me_your_love_inventory.png',
            'asset/em_events_valentines_iloveyou_01_inventory.png',
            'asset/em_love_ya_inventory.png',
            'asset/ahri_love_wink_02_inventory.png',
            'asset/4610_lec_fnc__thank_you_next_inventory.accessories_14_17.png',
            'asset/4453_heartsteel_love_inventory.png',
            'asset/4600_cblol_kbm__hang_love_inventory.accessories_14_17.png'
        ];
        emote.src = images[Math.floor(Math.random() * images.length)];
        
        // Random position, rotation, and size variation
        const randomLeft = Math.random() * window.innerWidth;
        const randomRotation = Math.random() * 360;
        const randomSize = 48 + Math.random() * 32; // Random size between 48px and 80px
        const randomDelay = Math.random() * 0.5; // Random delay up to 0.5s
        
        emote.style.left = `${randomLeft}px`;
        emote.style.setProperty('--rotation', `${randomRotation}deg`);
        emote.style.width = `${randomSize}px`;
        emote.style.height = `${randomSize}px`;
        emote.style.animationDelay = `${randomDelay}s`;
        
        document.body.appendChild(emote);
        
        // Remove element after animation
        emote.addEventListener('animationend', () => {
            emote.remove();
        });
    }

    // Update the sound functions
    function playHoverSound(event) {
        // Don't play sound if the button is disabled
        if (event.target.disabled) return;
        
        const sound = document.getElementById('hoverSound');
        sound.currentTime = 0;
        sound.playbackRate = 1.0;
        sound.play().catch(error => console.log('Hover sound play prevented'));
    }

    function playClickSound() {
        const sound = document.getElementById('clickSound');
        sound.currentTime = 0;
        sound.playbackRate = 1.5;  // Faster playback for click
        sound.play().catch(error => console.log('Click sound play prevented'));
    }

    // Add sound events for other buttons immediately
    const otherButtons = [addToLootButton, loveButton];
    otherButtons.forEach(button => {
        button.addEventListener('mouseenter', playHoverSound);
        button.addEventListener('click', playClickSound);
    });

    // Update the open sound function with shorter delay
    function playOpenSound() {
        setTimeout(() => {
            const sound = document.getElementById('openSound');
            sound.currentTime = 0;
            sound.play().catch(error => console.log('Open sound play prevented'));
        }, 630);  // Reduced from 730ms to 630ms
    }

    // Update the loot button open sound function with adjusted delay
    function playLootOpenSound() {
        setTimeout(() => {
            const sound = document.getElementById('openSound');
            sound.currentTime = 0;
            sound.play().catch(error => console.log('Open sound play prevented'));
        }, 370);  // Adjusted from 360ms to 370ms
    }

    // Update the background music function
    function playBackgroundMusic() {
        const bgMusic = document.getElementById('backgroundMusic');
        bgMusic.volume = 0.5;
        
        // Try to play and handle any autoplay restrictions
        const playPromise = bgMusic.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Autoplay prevented, waiting for user interaction');
                // Add a one-time click handler to start music
                document.addEventListener('click', () => {
                    bgMusic.play().catch(error => console.log('Background music play prevented'));
                }, { once: true });
            });
        }
    }

    // Add this to handle card tilt effect
    function initCardTilt() {
        const card = document.querySelector('.gift-card');
        const letterCard = document.querySelector('.letter-content');
        
        [card, letterCard].forEach(element => {
            if (!element) return;
            
            element.addEventListener('mousemove', handleTilt);
            element.addEventListener('mouseleave', resetTilt);
        });
    }

    function handleTilt(e) {
        const card = e.currentTarget;
        const isLetterContent = card.classList.contains('letter-content');
        const wrapper = isLetterContent ? card.closest('.card-wrapper') : null;
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const baseRotation = 6;
        const dampingFactor = 0.7;
        
        const distanceX = Math.abs(mouseX) / (cardRect.width / 2);
        const distanceY = Math.abs(mouseY) / (cardRect.height / 2);
        
        const damping = dampingFactor * (1 / (1 + Math.max(distanceX, distanceY)));
        const maxRotationX = mouseY < 0 ? baseRotation * 1.5 : baseRotation;
        
        const rotateX = -maxRotationX * (mouseY / (cardRect.height / 2)) * damping;
        const rotateY = baseRotation * (mouseX / (cardRect.width / 2)) * damping;
        
        requestAnimationFrame(() => {
            if (isLetterContent && wrapper) {
                // For letter content, combine with existing flip transform
                const isFlipped = wrapper.classList.contains('flipped');
                const flipTransform = isFlipped ? 'rotateY(180deg)' : '';
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${flipTransform}`;
            } else {
                // For gift card, just apply tilt
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
    }

    function resetTilt(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }

    // Add this after the gift card is shown
    initCardTilt();

    // Add flip functionality
    const flipButtons = document.querySelectorAll('.flip-button');
    const cardWrapper = document.querySelector('.card-wrapper');

    flipButtons.forEach(button => {
        button.addEventListener('click', () => {
            playClickSound();
            cardWrapper.classList.toggle('flipped');
        });
    });

    function handleLoveClick() {
        const loveCount = parseInt(localStorage.getItem('loveCount') || '0');
        localStorage.setItem('loveCount', loveCount + 1);
        updateLoveCount();
    }
}); 