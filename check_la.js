const fs = require('fs');
const geoData = JSON.parse(fs.readFileSync('public/india_states.json', 'utf8'));

const laFeatures = geoData.features.filter(f => f.properties.ID === "LA" || f.properties.ST_NM === "Ladakh");

laFeatures.forEach((f, i) => {
    if (f.geometry.type === 'MultiPolygon' && f.geometry.coordinates.length > 0) {
        let totalPoints = 0;
        f.geometry.coordinates.forEach(poly => {
            poly.forEach(ring => {
                totalPoints += ring.length;
            });
        });
        console.log(`Feature ${i}: total points = ${totalPoints}, ST_NM=${f.properties.ST_NM}`);
    }
});
