      (function() {
    let warningCount = 0;
    const MAX_WARNINGS = 0;
    let lastWarningTime = 0;
    const WARNING_COOLDOWN = 5000; // 5 seconds cooldown between warnings

    // Create warning overlay
    const createWarningOverlay = () => {
        const overlay = document.createElement('div');
        overlay.id = 'devtools-warning';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 0, 0, 0.9);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            z-index: 999999;
            font-family: Arial, sans-serif;
        `;

        overlay.innerHTML = `
            <div>
                <h2 style="font-size: 24px; margin-bottom: 16px;">⚠️ Security Warning</h2>
                <p style="font-size: 18px;">Developer Tools are not allowed.</p>
                <p style="font-size: 16px;">Warning ${warningCount} of ${MAX_WARNINGS}</p>
            </div>
        `;

        return overlay;
    };

    // Show warning with cooldown
    const showWarning = () => {
        const currentTime = Date.now();
        if (currentTime - lastWarningTime < WARNING_COOLDOWN) return;

        lastWarningTime = currentTime;
        warningCount++;

        const overlay = createWarningOverlay();
        window.location.href="about:blank"
        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.remove();
        }, 3000);

        if (warningCount >= MAX_WARNINGS) {
            window.location.href = "/";
        }
    };

    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });

    // Disable developer keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            // F12
            if (e.key === 'F12') {
                e.preventDefault();
                showWarning();
            }
            // Ctrl+Shift+I/J/C
            if (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase())) {
                e.preventDefault();
                showWarning();
            }
            // Ctrl+U (view source)
            if (e.ctrlKey && e.key.toLowerCase() === 'u') {
                e.preventDefault();
                showWarning();
            }
        }
    });

    // Detect DevTools using size difference
    let checkDevTools = () => {
        const threshold = 160;
        if (window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold) {
            showWarning();
        }
    };

    window.addEventListener('resize', checkDevTools);
    setInterval(checkDevTools, 1000);
})();
