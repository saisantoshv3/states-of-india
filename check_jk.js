const fs = require('fs');
const geoData = JSON.parse(fs.readFileSync('public/india_states.json', 'utf8'));

const jkFeatures = geoData.features.filter(f => f.properties.ID === "JK" || f.properties.ST_NM === "Jammu & Kashmir");

jkFeatures.forEach((f, i) => {
    console.log(`Feature ${i}: properties=`, f.properties);
    if (f.geometry.type === 'MultiPolygon') {
        console.log(`  MultiPolygon coordinates length: ${f.geometry.coordinates.length}`);
        f.geometry.coordinates.forEach((poly, j) => {
            if (poly[0] && poly[0][0]) {
                console.log(`    Poly ${j} first point: ${poly[0][0]}`);
            } else {
                console.log(`    Poly ${j} is EMPTY or weird: ${JSON.stringify(poly)}`);
            }
        });
    }
});
