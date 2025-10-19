// Disable right-click context menu
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Disable keyboard shortcuts that could open dev tools
document.addEventListener('keydown', (e) => {
    // Prevent F12 key
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }

    // Prevent Ctrl+Shift+I (Windows/Linux) and Command+Option+I (Mac)
    if ((e.ctrlKey && e.shiftKey && e.key === 'I') || 
        (e.metaKey && e.altKey && e.key === 'i')) {
        e.preventDefault();
        return false;
    }

    // Prevent Ctrl+Shift+C (Windows/Linux) and Command+Option+C (Mac)
    if ((e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.metaKey && e.altKey && e.key === 'c')) {
        e.preventDefault();
        return false;
    }

    // Prevent Ctrl+Shift+J (Windows/Linux) and Command+Option+J (Mac)
    if ((e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.metaKey && e.altKey && e.key === 'j')) {
        e.preventDefault();
        return false;
    }

    // Prevent Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }
});

// Detect and disable DevTools
const devToolsDetector = () => {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
        // You can customize this action when DevTools is detected
        document.documentElement.innerHTML = 'Developer Tools are not allowed on this site.';
    }
};

window.addEventListener('resize', devToolsDetector);
setInterval(devToolsDetector, 1000);