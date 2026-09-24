const fs = require('fs');
const path = require('path');

// 1. First, make sure footer.html has the 404 links the user wanted
let footer = fs.readFileSync('footer.html', 'utf8');

footer = footer.replace(/href="[^"]*" class="text-sm hover:text-white transition-colors flex items-center group"><span class="w-0 overflow-hidden group-hover:w-3 transition-all text-blue-500">▸<\/span>Cloud Hosting/g, 'href="404.html" class="text-sm hover:text-white transition-colors flex items-center group"><span class="w-0 overflow-hidden group-hover:w-3 transition-all text-blue-500">▸</span>Cloud Hosting');
footer = footer.replace(/href="[^"]*" class="text-sm hover:text-white transition-colors flex items-center group"><span class="w-0 overflow-hidden group-hover:w-3 transition-all text-blue-500">▸<\/span>Cloud Analytics/g, 'href="404.html" class="text-sm hover:text-white transition-colors flex items-center group"><span class="w-0 overflow-hidden group-hover:w-3 transition-all text-blue-500">▸</span>Cloud Analytics');
footer = footer.replace(/href="[^"]*" class="text-sm hover:text-white transition-colors flex items-center group"><span class="w-0 overflow-hidden group-hover:w-3 transition-all text-blue-500">▸<\/span>Cyber Security/g, 'href="404.html" class="text-sm hover:text-white transition-colors flex items-center group"><span class="w-0 overflow-hidden group-hover:w-3 transition-all text-blue-500">▸</span>Cyber Security');
footer = footer.replace(/<a href="[^"]*" class="hover:text-white transition-colors">Privacy Policy<\/a>/g, '<a href="404.html" class="hover:text-white transition-colors">Privacy Policy</a>');
footer = footer.replace(/<a href="[^"]*" class="hover:text-white transition-colors">Terms & Conditions<\/a>/g, '<a href="404.html" class="hover:text-white transition-colors">Terms & Conditions</a>');

fs.writeFileSync('footer.html', footer);

// 2. Extract the actual <footer ...> ... </footer> content
const footerStart = footer.indexOf('<footer');
const footerEnd = footer.indexOf('</footer>') + 9;
const footerElement = footer.substring(footerStart, footerEnd);

if (footerStart === -1 || footerEnd === -1) {
    console.log('Error: Could not find <footer> element in footer.html');
    process.exit(1);
}

// 3. Update all HTML files in the folder (except footer.html itself)
const files = fs.readdirSync(__dirname).filter(file => file.endsWith('.html') && file !== 'footer.html');

let updated = 0;
files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    const start = html.indexOf('<footer');
    const end = html.indexOf('</footer>') + 9;
    
    if (start !== -1 && end !== -1) {
        html = html.substring(0, start) + footerElement + html.substring(end);
        fs.writeFileSync(file, html);
        updated++;
    }
});

console.log('Successfully synced footer.html across ' + updated + ' HTML files!');
