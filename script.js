function switchMode(mode) {
    const singleMode = document.getElementById('single-mode');
    const separateMode = document.getElementById('separate-mode');
    
    if (mode === 'single') {
        singleMode.classList.remove('hidden');
        separateMode.classList.add('hidden');
    } else {
        singleMode.classList.add('hidden');
        separateMode.classList.remove('hidden');
    }
}

function showFile(type) {
    const sections = ['html-section', 'css-section', 'js-section'];
    const buttons = document.querySelectorAll('.file-btn');
    
    sections.forEach(section => {
        document.getElementById(section).classList.add('hidden');
    });
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(`${type}-section`).classList.remove('hidden');
    event.target.classList.add('active');
}

function enkripsiHTML(html) {
    html = html.replace(/\s+/g, ' ').trim();
    const encoded = btoa(html);
    const result = `<!DOCTYPE html><html><body><script>document.write(atob("${encoded}"))</script></body></html>`;
    document.getElementById('htmlOutput').value = result;
}

function enkripsiCSS(css) {
    css = css.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
             .replace(/\s+/g, ' ')
             .trim();
    const result = btoa(css);
    document.getElementById('cssOutput').value = result;
}

function enkripsiJS(js) {
    js = js.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
           .replace(/\s+/g, ' ')
           .trim();
    const result = `eval(atob("${btoa(js)}"))`;
    document.getElementById('jsOutput').value = result;
}

function enkripsiGabungan() {
    const combined = document.getElementById('combinedInput').value;
    
    // Mencoba memisahkan HTML, CSS, dan JS
    const htmlMatch = combined.match(/<html[^>]*>[\s\S]*<\/html>/i);
    const cssMatch = combined.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    const jsMatch = combined.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
    
    let html = htmlMatch ? htmlMatch[0] : '';
    let css = cssMatch ? cssMatch[1] : '';
    let js = jsMatch ? jsMatch[1] : '';
    
    // Enkripsi masing-masing bagian
    const encodedHtml = btoa(html);
    const encodedCss = btoa(css);
    const encodedJs = btoa(js);
    
    // Membuat output gabungan
    const result = `
<!DOCTYPE html>
<html>
<head>
    <style>
        ${css ? `/* Decoded CSS */\n${atob(encodedCss)}` : ''}
    </style>
</head>
<body>
    <script>document.write(atob("${encodedHtml}"))</script>
    <script>
        ${js ? `eval(atob("${encodedJs}"))` : ''}
    </script>
</body>
</html>`;
    
    document.getElementById('combinedOutput').value = result;
}

// Set mode default
window.onload = function() {
    showFile('html');
} 