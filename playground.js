document.addEventListener('DOMContentLoaded', () => {
    let htmlCode = '<h1>Hello, World!</h1>';
    let cssCode = 'h1 { color: #00ddeb; text-align: center; }';
    let jsCode = 'console.log("Welcome to the Modern Playground!");';
    let currentTab = 'html';
    let isDark = true;

    const codeInput = document.getElementById('code-input');
    const previewFrame = document.getElementById('preview-frame');
    const tabs = document.querySelectorAll('.tab');
    const themeToggle = document.querySelector('.theme-toggle');

    codeInput.value = htmlCode;
    updatePreview();

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            updateCode();
            currentTab = tab.getAttribute('data-tab');
            codeInput.value = currentTab === 'html' ? htmlCode : currentTab === 'css' ? cssCode : jsCode;
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    themeToggle.addEventListener('click', () => {
        isDark = !isDark;
        document.body.style.background = isDark 
            ? 'linear-gradient(135deg, #1a1a1a, #2d2d2d)' 
            : 'linear-gradient(135deg, #f0f0f0, #d9e6ff)';
        codeInput.style.color = isDark ? '#fff' : '#000';
    });

    function updateCode() {
        if (currentTab === 'html') htmlCode = codeInput.value;
        else if (currentTab === 'css') cssCode = codeInput.value;
        else if (currentTab === 'js') jsCode = codeInput.value;
    }

    function updatePreview() {
        updateCode();
        const previewHTML = `
            <html>
                <head><style>${cssCode}</style></head>
                <body>${htmlCode}<script>${jsCode}<\/script></body>
            </html>
        `;
        previewFrame.srcdoc = previewHTML;
    }

    codeInput.addEventListener('input', updatePreview);
});