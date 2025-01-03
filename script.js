function enkripsiHTML(html) {
    // Menghapus whitespace yang tidak perlu
    html = html.replace(/\s+/g, ' ').trim();
    
    // Mengenkripsi teks menggunakan base64
    const encoded = btoa(html);
    
    // Membuat template yang akan merender HTML terenkripsi
    return `<!DOCTYPE html><html><body><script>document.write(atob("${encoded}"))</script></body></html>`;
}

function enkripsiCSS(css) {
    // Menghapus komentar dan whitespace
    css = css.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    
    // Mengenkripsi dengan base64
    return btoa(css);
}

function enkripsiJS(js) {
    // Menghapus komentar dan whitespace
    js = js.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
           .replace(/\s+/g, ' ')
           .trim();
    
    // Mengenkripsi dengan base64 dan membungkus dalam eval
    return `eval(atob("${btoa(js)}"))`;
}

function enkripsiSemua() {
    // Mengambil nilai input
    const htmlInput = document.getElementById('htmlInput').value;
    const cssInput = document.getElementById('cssInput').value;
    const jsInput = document.getElementById('jsInput').value;

    // Melakukan enkripsi
    const htmlEnkripsi = enkripsiHTML(htmlInput);
    const cssEnkripsi = enkripsiCSS(cssInput);
    const jsEnkripsi = enkripsiJS(jsInput);

    // Menampilkan hasil
    document.getElementById('htmlOutput').value = htmlEnkripsi;
    document.getElementById('cssOutput').value = cssEnkripsi;
    document.getElementById('jsOutput').value = jsEnkripsi;
} 