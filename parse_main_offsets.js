const fs = require('fs');
let content = fs.readFileSync('main.js', 'utf8');

// Title top right
content = content.replace(/titleX:\s*\d+,/, 'titleX: 550,');
content = content.replace(/titleY:\s*\d+,/, 'titleY: 20,');

// Legend bottom right
content = content.replace(/legendX:\s*\d+,/, 'legendX: 550,');
content = content.replace(/legendY:\s*\d+,/, 'legendY: 650,');

// Default label/value offsets (cdx, cdy, dx, dy)
content = content.replace(/dx:\s*-?\d+/g, 'dx: 0');
content = content.replace(/dy:\s*-?\d+/g, 'dy: 0');
content = content.replace(/cdx:\s*-?\d+/g, 'cdx: 0');
content = content.replace(/cdy:\s*-?\d+/g, 'cdy: 0');

const blackLinesMatch = content.match(/\.attr\("stroke", "#fff"\)\.attr\("stroke-width", 0\.5\)/);
if (blackLinesMatch) {
    content = content.replace(/\.attr\("stroke", "#fff"\)\.attr\("stroke-width", 0\.5\)/, '.attr("stroke", "#000").attr("stroke-width", 1.0)');
} else {
    content = content.replace(/\.attr\("stroke", "#000"\)\.attr\("stroke-width", 1\.0\)/g, '.attr("stroke", "#000").attr("stroke-width", 1.0)');
}

fs.writeFileSync('main.js', content);
