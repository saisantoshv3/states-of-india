const fs = require('fs');
const geoData = JSON.parse(fs.readFileSync('public/india_states.json', 'utf8'));
const stateData = [
    { id: "JK", name: "JK", fullName: "Jammu & Kashmir" },
    { id: "LA", name: "Ladakh", fullName: "Ladakh" },
    { id: "PB", name: "PB", fullName: "Punjab" },
    { id: "UP", name: "UP", fullName: "Uttar Pradesh" },
    { id: "RJ", name: "Rajasthan", fullName: "Rajasthan" },
    { id: "GJ", name: "Gujarat", fullName: "Gujarat" },
    { id: "MP", name: "Madhya Pradesh", fullName: "Madhya Pradesh" },
    { id: "MH", name: "Maharashtra", fullName: "Maharashtra" },
    { id: "KA", name: "Karnataka", fullName: "Karnataka" },
    { id: "KL", name: "Kerala", fullName: "Kerala" },
    { id: "TN", name: "TN", fullName: "Tamil Nadu" },
    { id: "AP", name: "AP", fullName: "Andhra Pradesh" },
    { id: "TG", name: "TG", fullName: "Telangana" },
    { id: "OR", name: "Odisha", fullName: "Odisha" },
    { id: "CT", name: "CG", fullName: "Chhattisgarh" },
    { id: "JH", name: "Jharkhand", fullName: "Jharkhand" },
    { id: "WB", name: "WB", fullName: "West Bengal" },
    { id: "BR", name: "Bihar", fullName: "Bihar" },
    { id: "AS", name: "AS", fullName: "Assam" },
    { id: "AR", name: "AR", fullName: "Arunachal Pradesh" },
    { id: "MN", name: "Manipur", fullName: "Manipur" },
    { id: "TR", name: "Tripura", fullName: "Tripura" },
    { id: "MZ", name: "Mizoram", fullName: "Mizoram" },
    { id: "ML", name: "Meghalaya", fullName: "Meghalaya" },
    { id: "NL", name: "Nagaland", fullName: "Nagaland" },
    { id: "SK", name: "Sikkim", fullName: "Sikkim" },
    { id: "HP", name: "HP", fullName: "Himachal Pradesh" },
    { id: "UT", name: "Uttarakhand", fullName: "Uttarakhand" },
    { id: "HR", name: "HR", fullName: "Haryana" },
    { id: "DL", name: "Delhi", fullName: "NCT of Delhi" },
    { id: "DN", name: "DNH & DD", fullName: "Dadra and Nagar Haveli and Daman and Diu" },
    { id: "PY", name: "Puducherry", fullName: "Puducherry" },
    { id: "GA", name: "Goa", fullName: "Goa" },
    { id: "AN", name: "Andaman & Nicobar Islands", fullName: "Andaman & Nicobar Island" },
    { id: "LD", name: "Lakshadweep", fullName: "Lakshadweep" },
    { id: "CH", name: "Chandigarh", fullName: "Chandigarh" }
];

function fuzzyMatch(a, b) {
    if (!a || !b) return false;
    const cleanA = a.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanB = b.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (cleanA === cleanB) return true;
    if (cleanA.length > 3 && cleanB.length > 3) {
        return cleanA.includes(cleanB) || cleanB.includes(cleanA);
    }
    return false;
}

const nameKeys = ["ST_NM", "NAME_1", "state_name", "NAME"];
let nameKey = "ST_NM";
if (geoData.features[0]) {
    for (const k of nameKeys) if (geoData.features[0].properties[k]) { nameKey = k; break; }
}

const mappedStats = {};
stateData.forEach(s => mappedStats[s.id] = 0);

geoData.features.forEach(f => {
    const name = f.properties[nameKey];
    const geoId = f.properties.ID || f.properties.ST_ID?.replace('IN-', '');
    const cleanName = name ? name.toLowerCase().replace(/[^a-z0-9]/g, '') : '';

    let match = stateData.find(s => s.id === geoId);
    if (!match) match = stateData.find(s =>
        (s.fullName && cleanName === s.fullName.toLowerCase().replace(/[^a-z0-9]/g, '')) ||
        cleanName === s.name.toLowerCase().replace(/[^a-z0-9]/g, '')
    );
    if (!match && (geoId === 'DD' || cleanName.includes('dadara') || cleanName.includes('havelli') || cleanName.includes('daman') || cleanName.includes('diu'))) {
        match = stateData.find(s => s.id === "DN");
    }
    if (!match && cleanName.length > 3) {
        match = stateData.find(s => fuzzyMatch(s.name, name));
    }

    if (match) {
        mappedStats[match.id]++;
    } else {
        console.log(`Unmapped feature: ID=${geoId}, Name=${name}`);
    }
});

console.log("\nMapping Results:");
Object.keys(mappedStats).forEach(id => {
    if (mappedStats[id] === 0) {
        console.log(`!!! NO FEATURES MAPPED FOR ${id}`);
    }
});
