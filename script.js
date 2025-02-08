document.addEventListener('DOMContentLoaded', () => {
    const logoScreen = document.querySelector('.logo-screen');
    const chestScreen = document.querySelector('.chest-screen');
    const giftScreen = document.querySelector('.gift-screen');
    const openButton = document.querySelector('.open-button');
    const loadingBar = document.querySelector('.loading-bar');

    // Wait for loading animation to complete (3s) plus a small delay
    setTimeout(() => {
        logoScreen.style.animation = 'fadeOut 1s ease-out forwards';
        setTimeout(() => {
            logoScreen.classList.add('hidden');
            chestScreen.classList.remove('hidden');
            chestScreen.style.animation = 'fadeIn 1s ease-in';
        }, 1000);
    }, 3500); // Increased to 3.5s to ensure loading bar completes

    // Handle chest opening
    openButton.addEventListener('click', () => {
        const chest = document.querySelector('.hextech-chest');
        chest.style.animation = 'openChest 1s ease-out forwards';
        
        setTimeout(() => {
            chestScreen.classList.add('hidden');
            giftScreen.classList.remove('hidden');
            giftScreen.style.animation = 'fadeIn 1s ease-in';
        }, 1000);
    });
}); 