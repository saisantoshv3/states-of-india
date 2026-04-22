import * as d3 from 'd3';
import html2canvas from 'html2canvas';
import { createIcons, MapPin, Download, Settings, Palette, Type, FileText, MousePointer2, Move, Undo, RotateCcw, Layers } from 'lucide';

let stateData = [
    { id: "JK", name: "JK", fullName: "Jammu & Kashmir", value: 2.78, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "LA", name: "Ladakh", fullName: "Ladakh", value: 0.03, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "PB", name: "PB", fullName: "Punjab", value: 2.77, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "UP", name: "Uttar Pradesh", fullName: "Uttar Pradesh", value: 24.11, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "RJ", name: "Rajasthan", fullName: "Rajasthan", value: 6.85, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "GJ", name: "Gujarat", fullName: "Gujarat", value: 6.04, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "MP", name: "Madhya Pradesh", fullName: "Madhya Pradesh", value: 7.26, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "MH", name: "Maharashtra", fullName: "Maharashtra", value: 11.24, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "KA", name: "KA", fullName: "Karnataka", value: 6.11, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "KL", name: "Kerala", fullName: "Kerala", value: 3.45, dx: -50, dy: 20, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "TN", name: "TN", fullName: "Tamil Nadu", value: 7.21, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "AP", name: "AP", fullName: "Andhra Pradesh", value: 4.96, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "TG", name: "TG", fullName: "Telangana", value: 3.5, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "OR", name: "Odisha", fullName: "Odisha", value: 4.2, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "CT", name: "CG", fullName: "Chhattisgarh", value: 2.94, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "JH", name: "Jharkhand", fullName: "Jharkhand", value: 3.3, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "WB", name: "WB", fullName: "West Bengal", value: 9.13, dx: 0, dy: 10, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "BR", name: "Bihar", fullName: "Bihar", value: 10.41, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "AS", name: "Assam", fullName: "Assam", value: 3.12, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "AR", name: "AR", fullName: "Arunachal Pradesh", value: 0.14, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "MN", name: "Manipur", fullName: "Manipur", value: 0.29, dx: 60, dy: 30, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "TR", name: "Tripura", fullName: "Tripura", value: 0.37, dx: -20, dy: 40, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "MZ", name: "Mizoram", fullName: "Mizoram", value: 0.13, dx: 60, dy: 40, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "ML", name: "Meghalaya", fullName: "Meghalaya", value: 0.32, dx: -20, dy: 30, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "NL", name: "Nagaland", fullName: "Nagaland", value: 0.2, dx: 50, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "SK", name: "Sikkim", fullName: "Sikkim", value: 0.06, dx: 10, dy: -40, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: -30, cdy: 10 },
    { id: "HP", name: "HP", fullName: "Himachal Pradesh", value: 0.69, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "UT", name: "Uttarakhand", fullName: "Uttarakhand", value: 1.01, dx: 70, dy: -40, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "HR", name: "HR", fullName: "Haryana", value: 2.78, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "DL", name: "Delhi", fullName: "NCT of Delhi", value: 0.99, dx: 110, dy: -30, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "DN", name: "DNH & DD", fullName: "Dadra and Nagar Haveli and Daman and Diu", value: 3.5, dx: -40, dy: 20, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "PY", name: "Puducherry", fullName: "Puducherry", value: 0.14, dx: 50, dy: -30, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "GA", name: "Goa", fullName: "Goa", value: 0.15, dx: -30, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "AN", name: "A & N Islands", fullName: "Andaman & Nicobar", value: 0.42, dx: 60, dy: -80, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "LD", name: "Lakshadweep", fullName: "Lakshadweep", value: 0.01, dx: -30, dy: -10, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "CH", name: "Chandigarh", fullName: "Chandigarh", value: null, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: null, vSize: null, labelColor: null, valueColor: null, cdx: 0, cdy: 0 }
];

const INITIAL_STATE_DATA = JSON.parse(JSON.stringify(stateData));

const config = {
    scale: 1410,
    colorStops: [
        { offset: 0, color: "#7ad4b1ff" },
        { offset: 100, color: "#177a73ff" }
    ],
    labelSize: 12,
    valueSize: 15,
    labelColor: "#333",
    labelFont: "Times New Roman",
    labelAngle: 0,
    lineColor: "#333",
    lineAlignment: "middle",
    showValues: true,
    showLines: true,
    valuePrefix: "",
    valueSuffix: "",
    showLegend: true, legendDirection: "horizontal", legendX: 380, legendY: 650,
    labelBold: false,
    labelItalic: false,
    valueBold: true,
    valueItalic: false,
    selectedState: null,
    borderThickness: 0.7,
    borderColor: "#191919",
    selectedRatio: "1:1"
};

const INITIAL_CONFIG = JSON.parse(JSON.stringify(config));

const palettes = [
    { name: "Viridis", stops: [{ offset: 0, color: "#440154" }, { offset: 100, color: "#fde725" }] },
    { name: "Plasma", stops: [{ offset: 0, color: "#0d0887" }, { offset: 100, color: "#f0f921" }] },
    { name: "Inferno", stops: [{ offset: 0, color: "#000004" }, { offset: 42, color: "#932667" }, { offset: 100, color: "#fcffa4" }] },
    { name: "Magma", stops: [{ offset: 0, color: "#000004" }, { offset: 42, color: "#8c2981" }, { offset: 100, color: "#fcfdbf" }] },
    { name: "Cividis", stops: [{ offset: 0, color: "#00204d" }, { offset: 100, color: "#ffea46" }] },
    { name: "Turbo", stops: [{ offset: 0, color: "#30123b" }, { offset: 25, color: "#1ae4b6" }, { offset: 50, color: "#fbb021" }, { offset: 100, color: "#7a0403" }] },
    { name: "Spectral", stops: [{ offset: 0, color: "#d53e4f" }, { offset: 50, color: "#ffffbf" }, { offset: 100, color: "#3288bd" }] },
    { name: "Rocket", stops: [{ offset: 0, color: "#03051a" }, { offset: 50, color: "#e36a6f" }, { offset: 100, color: "#fcf2f4" }] },
    { name: "Mako", stops: [{ offset: 0, color: "#0b0405" }, { offset: 50, color: "#ad1759" }, { offset: 100, color: "#f9f4b1" }] },
    { name: "Blues", stops: [{ offset: 0, color: "#eff3ff" }, { offset: 100, color: "#084594" }] },
    { name: "Greens", stops: [{ offset: 0, color: "#f7fcf5" }, { offset: 100, color: "#00441b" }] },
    { name: "Reds", stops: [{ offset: 0, color: "#fff5f0" }, { offset: 100, color: "#67000d" }] },
    { name: "Purples", stops: [{ offset: 0, color: "#f2f0f7" }, { offset: 100, color: "#3f007d" }] },
    { name: "Oranges", stops: [{ offset: 0, color: "#fff5eb" }, { offset: 100, color: "#7f2704" }] },
    { name: "YlGnBu", stops: [{ offset: 0, color: "#ffffd9" }, { offset: 50, color: "#41b6c4" }, { offset: 100, color: "#081d58" }] },
    { name: "YlOrRd", stops: [{ offset: 0, color: "#ffffb2" }, { offset: 50, color: "#fd8d3c" }, { offset: 100, color: "#bd0026" }] },
    { name: "RdYlBu", stops: [{ offset: 0, color: "#d73027" }, { offset: 50, color: "#ffffbf" }, { offset: 100, color: "#4575b4" }] },
    { name: "RdGy", stops: [{ offset: 0, color: "#67001f" }, { offset: 50, color: "#ffffff" }, { offset: 100, color: "#1a1a1a" }] }
];

let stateHistory = [];
function saveState() {
    stateHistory.push({
        stateData: JSON.parse(JSON.stringify(stateData)),
        config: JSON.parse(JSON.stringify(config))
    });
    if (stateHistory.length > 20) stateHistory.shift();
    const btn = document.getElementById('undo-btn');
    if (btn) btn.disabled = false;
}

function undoState() {
    if (stateHistory.length === 0) return;
    const last = stateHistory.pop();
    stateData = last.stateData;
    Object.assign(config, last.config);
    syncUI();
    const btn = document.getElementById('undo-btn');
    if (btn && stateHistory.length === 0) btn.disabled = true;

    renderTable();
    renderGradientStops();
    updateMap();
}

function syncUI() {
    const fields = ['legend-x', 'legend-y', 'border-thickness', 'border-color'];
    fields.forEach(f => {
        const el = document.getElementById(f);
        if (el) {
            const prop = f.replace('-x', 'X').replace('-y', 'Y').replace('legend-', 'legend').replace('border-thickness', 'borderThickness').replace('border-color', 'borderColor');
            el.value = config[prop];
            if (f === 'border-thickness') document.getElementById('border-val').innerText = config.borderThickness;
        }
    });

    ['label-bold', 'label-italic', 'value-bold', 'value-italic', 'show-legend', 'show-values'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const prop = id.split('-').map((s, i) => i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)).join('');
            el.checked = config[prop];
        }
    });

    const lgDir = document.getElementById('legend-direction');
    if (lgDir) lgDir.value = config.legendDirection;

    const vpEl = document.getElementById('value-prefix');
    if (vpEl) vpEl.value = config.valuePrefix;
    const vsEl = document.getElementById('value-suffix');
    if (vsEl) vsEl.value = config.valueSuffix;

    const ms = document.getElementById('map-scale');
    if (ms) { ms.value = config.scale; document.getElementById('scale-val').innerText = Math.round(config.scale); }

    const ls = document.getElementById('label-size');
    if (ls) { ls.value = config.labelSize; document.getElementById('size-val').innerText = config.labelSize + "px"; }
    
    const vsSize = document.getElementById('value-size-global');
    if (vsSize) { vsSize.value = config.valueSize; document.getElementById('vsize-val').innerText = config.valueSize + "px"; }
    
    const la = document.getElementById('label-angle');
    if (la) { la.value = config.labelAngle; document.getElementById('angle-val').innerText = config.labelAngle + "°"; }

    document.querySelectorAll('.ratio-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.ratio === config.selectedRatio);
    });
}

let geoData = null;
let width = 800;
let height = 800;

const svg = d3.select("#india-map").attr("width", 800).attr("height", 800);
const defs = svg.append("defs");

const gMap = svg.append("g").attr("class", "map-group");
const gStates = gMap.append("g").attr("class", "states-group");
const gLines = gMap.append("g").attr("class", "lines-group");
const gLabels = gMap.append("g").attr("class", "labels-group");
const gHandles = gMap.append("g").attr("class", "handles-group");

const projection = d3.geoMercator();
const path = d3.geoPath().projection(projection);

async function init() {
    createIcons({ icons: { MapPin, Download, Settings, Palette, Type, FileText, MousePointer2, Move, Undo, RotateCcw, Layers } });
    try {
        const response = await fetch('./india_states.json');
        geoData = await response.json();

        const nameKeys = ["ST_NM", "NAME_1", "state_name", "NAME", "name"];
        let nameKey = "ST_NM";
        if (geoData.features[0]) {
            for (const k of nameKeys) if (geoData.features[0].properties[k]) { nameKey = k; break; }
        }

        const normalize = (s) => s ? s.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/and/g, '').replace(/islands?$/, 'island') : '';

        geoData.features.forEach(f => {
            const name = f.properties[nameKey];
            const geoId = (f.properties.ID || f.properties.ST_ID || "").replace('IN-', '');
            const cleanName = normalize(name);

            // 1. Direct ID match
            let match = stateData.find(s => s.id === geoId);

            // 2. Normalized name match
            if (!match) match = stateData.find(s =>
                (s.fullName && cleanName === normalize(s.fullName)) ||
                cleanName === normalize(s.name)
            );

            // 3. Special cases
            if (!match) {
                if (geoId === 'DD' || cleanName.includes('dadara') || cleanName.includes('havelli') || cleanName.includes('daman') || cleanName.includes('diu')) {
                    match = stateData.find(s => s.id === "DN");
                }
            }

            if (match) {
                f.properties._mapped_id = match.id;
            } else {
                console.warn(`Unmapped GeoJSON feature: ${name} (ID: ${geoId})`);
            }
        });

        syncUI();
        renderTable();
        renderGradientStops();
        handleResize();
        setupEventListeners();
    } catch (e) { console.error(e); }
}

function renderLegend() {
    const legendEl = d3.select("#map-legend");
    if (!config.showLegend) {
        legendEl.style("display", "none");
        return;
    }

    legendEl.style("display", "block")
        .style("transform", `translate(${config.legendX}px, ${config.legendY}px)`)
        .html(""); // clear

    legendEl.call(d3.drag().on("start", () => saveState()).on("drag", (event) => {
        config.legendX += event.dx;
        config.legendY += event.dy;
        const lxEl = document.getElementById('legend-x');
        const lyEl = document.getElementById('legend-y');
        if (lxEl) lxEl.value = Math.round(config.legendX);
        if (lyEl) lyEl.value = Math.round(config.legendY);
        renderLegend();
    }));

    const width = config.legendDirection === 'horizontal' ? 200 : 20;
    const height = config.legendDirection === 'horizontal' ? 12 : 200;

    // Increased width for vertical labels to prevent clipping
    const svgWidth = config.legendDirection === 'horizontal' ? width + 40 : width + 100;
    const svgHeight = config.legendDirection === 'horizontal' ? height + 40 : height + 40;

    const svgLegend = legendEl.append("svg").attr("width", svgWidth).attr("height", svgHeight);
    const defsLegend = svgLegend.append("defs"); // Renamed to avoid conflict with main SVG defs
    const linearGradient = defsLegend.append("linearGradient").attr("id", "linear-gradient");

    if (config.legendDirection === 'horizontal') {
        linearGradient.attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
    } else {
        linearGradient.attr("x1", "0%").attr("y1", "100%").attr("x2", "0%").attr("y2", "0%");
    }

    config.colorStops.forEach(stop => {
        linearGradient.append("stop").attr("offset", `${stop.offset}%`).attr("stop-color", stop.color);
    });

    svgLegend.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 20)
        .attr("y", 20)
        .style("fill", "url(#linear-gradient)")
        .style("stroke", "#ccc");

    const minVal = d3.min(stateData, d => d.value) || 0;
    const maxVal = d3.max(stateData, d => d.value) || 100;

    const formatNum = (v) => v !== null ? new Intl.NumberFormat('en-IN').format(v) : "";

    if (config.legendDirection === 'horizontal') {
        svgLegend.append("text").attr("x", 20).attr("y", 15).text(`${config.valuePrefix}${formatNum(minVal)}${config.valueSuffix}`).style("font-size", "10px").style("font-family", config.labelFont);
        svgLegend.append("text").attr("x", 20 + width).attr("y", 15).attr("text-anchor", "end").text(`${config.valuePrefix}${formatNum(maxVal)}${config.valueSuffix}`).style("font-size", "10px").style("font-family", config.labelFont);
    } else {
        // Vertical labels: Max at top, Min at bottom
        svgLegend.append("text").attr("x", 20 + width + 5).attr("y", 20 + height).text(`${config.valuePrefix}${formatNum(minVal)}${config.valueSuffix}`).style("font-size", "10px").style("font-family", config.labelFont);
        svgLegend.append("text").attr("x", 20 + width + 5).attr("y", 30).text(`${config.valuePrefix}${formatNum(maxVal)}${config.valueSuffix}`).style("font-size", "10px").style("font-family", config.labelFont);
    }
}

function renderGradientStops() {
    const container = document.getElementById('gradient-stops-container');
    if (!container) return;
    container.innerHTML = '';

    config.colorStops.sort((a, b) => a.offset - b.offset).forEach((stop, index) => {
        const div = document.createElement('div');
        div.className = 'color-pickers';
        div.style.alignItems = 'flex-end';
        div.innerHTML = `
            <div class="input-field">
                <label>Stop ${index + 1} (%)</label>
                <input type="number" value="${stop.offset}" min="0" max="100" class="stop-offset" data-index="${index}">
            </div>
            <div class="input-field" style="flex-direction: row; gap: 0.2rem;">
                <input type="color" value="${stop.color.substring(0, 7)}" class="stop-color" data-index="${index}">
                <button class="remove-stop-btn" data-index="${index}" style="background:none; border:none; cursor:pointer; color:#ef4444; padding:0;">×</button>
            </div>
        `;
        container.appendChild(div);
    });

    container.querySelectorAll('.stop-offset').forEach(el => el.addEventListener('change', e => {
        const idx = parseInt(e.target.dataset.index);
        config.colorStops[idx].offset = parseInt(e.target.value);
        updateMap();
    }));

    container.querySelectorAll('.stop-color').forEach(el => el.addEventListener('input', e => {
        const idx = parseInt(e.target.dataset.index);
        config.colorStops[idx].color = e.target.value;
        updateMap();
    }));

    container.querySelectorAll('.remove-stop-btn').forEach(el => el.addEventListener('click', e => {
        if (config.colorStops.length <= 2) return;
        saveState();
        const idx = parseInt(e.target.dataset.index);
        config.colorStops.splice(idx, 1);
        renderGradientStops();
        updateMap();
    }));
}

function updateMap() {
    renderLegend();
    if (!geoData) return;

    projection.scale(config.scale).translate([width / 2, height / 2 + 30]);
    projection.center([82.7, 21.5]);

    const validValues = stateData.filter(d => d.value !== null).map(d => d.value);
    const minVal = validValues.length > 0 ? d3.min(validValues) : 0;
    const maxVal = validValues.length > 0 ? d3.max(validValues) : 100;
    
    const colorScale = d3.scaleLinear()
        .domain(config.colorStops.map(s => minVal + (maxVal - minVal) * (s.offset / 100)))
        .range(config.colorStops.map(s => s.color));

    const titleDisp = d3.select('#map-title-display');
    const titleIn = document.getElementById('map-title-input');
    const rawTitle = titleIn ? titleIn.value : "";
    
    // Simple newline parsing, removed custom word colors
    let titleHtml = rawTitle.replace(/\\n/g, '<br><span style="font-size:0.5em; font-weight:normal; color:#666; display:block; margin-top:5px;">');
    if (titleHtml.includes('<br>')) titleHtml += '</span>';

    titleDisp.html(titleHtml)
        .style("transform", `translate(450px, 20px)`)
        .style("font-size", `2.5rem`)
        .style("cursor", "default")
        .style("pointer-events", "none");

    gMap.attr("transform", `translate(-50, 10)`);

    const states = gStates.selectAll(".state-path").data(geoData.features);
    states.enter().append("path").attr("class", "state-path")
        .on("click", (event, d) => {
            const data = stateData.find(s => s.id === d.properties._mapped_id);
            if (data) {
                config.selectedState = data.id;
                highlightTableRow(data.name);
                updateMap();
            }
        })
        .merge(states)
        .style("stroke", config.borderColor)
        .style("stroke-width", config.borderThickness + "px")
        .transition().duration(200).attr("d", path)
        .attr("fill", d => {
            const data = stateData.find(s => s.id === d.properties._mapped_id);
            if (!data || data.value === null) return "#edeeed"; // Instagram-style neutral grey
            return colorScale(data.value);
        });

    renderLabels();
}

function highlightTableRow(name) {
    const rows = document.querySelectorAll('#table-body tr');
    rows.forEach(row => {
        const input = row.querySelector('.ti-name');
        if (input && fuzzyMatch(input.value, name)) {
            row.scrollIntoView({ behavior: 'smooth', block: 'center' });
            row.style.background = '#e0e7ff';
            setTimeout(() => row.style.background = '', 2000);
        }
    });
}

function renderLabels() {
    if (!geoData) return;

    stateData.forEach(data => {
        const features = geoData.features.filter(f => f.properties._mapped_id === data.id);
        if (features.length > 0) {
            let bestFeature = features[0];
            let maxPathLen = 0;
            features.forEach(f => {
                const len = JSON.stringify(f.geometry.coordinates).length;
                if (len > maxPathLen) { maxPathLen = len; bestFeature = f; }
            });

            // Use path.centroid for initial middle position
            const centroid = path.centroid(bestFeature);
            if (!isNaN(centroid[0])) {
                data.origX = centroid[0];
                data.origY = centroid[1];
                
                // Fine-tune centering for small/curved states to avoid borders
                if (data.id === "DL") { data.origX += 2; } // Delhi
                if (data.id === "PY") { data.origX += 5; } // Puducherry
                
                data.x = data.origX + (data.dx || 0);
                data.y = data.origY + (data.dy || 0);
            }
        }
    });

    const lines = gLines.selectAll(".leader-line").data(stateData);
    lines.enter().append("path").attr("class", "leader-line").merge(lines)
        .attr("stroke", config.lineColor)
        .attr("fill", "none")
        .attr("stroke-dasharray", "2,2")
        .attr("d", function(d) {
            const show = d.showLine !== undefined ? d.showLine : config.showLines;
            if (!show || d.value === null || !d.dx || (Math.abs(d.dx) < 15 && Math.abs(d.dy) < 15)) return "";
            
            const targetX = d.x;
            const targetY = d.y;
            
            // Adjust connection point based on lineAlignment (per-state or global)
            const align = d.lineAlign || config.lineAlignment;
            let sourceX = targetX;
            
            // Try to measure the actual text if rendered
            const labelGroup = d3.select(this.parentNode.parentNode).select(".labels-group");
            const labelNode = labelGroup.selectAll(".label-group")
                .filter(ld => ld.id === d.id)
                .select(".label-name").node();
            
            let textWidth = (d.name.length * (d.size || config.labelSize) * 0.5);
            if (labelNode && typeof labelNode.getComputedTextLength === 'function') {
                try { textWidth = labelNode.getComputedTextLength(); } catch(e) {}
            }

            if (align === 'start') {
                sourceX -= textWidth / 2;
            } else if (align === 'end') {
                sourceX += textWidth / 2;
            }

            const cx = d.origX + (d.cdx || 0);
            const cy = d.y + (d.cdy || 0);
            return `M${sourceX},${targetY} Q${cx},${cy} ${d.origX},${d.origY}`;
        });
    lines.exit().remove();

    const labels = gLabels.selectAll(".label-group").data(stateData);
    const labelsEnter = labels.enter().append("g").attr("class", "label-group");

    labelsEnter.call(d3.drag()
        .on("start", function () { saveState(); d3.select(this).raise(); })
        .on("drag", function (event, d) {
            if (event.sourceEvent.altKey) {
                d.angle = (d.angle || 0) + event.dx;
            } else {
                d.dx += event.dx;
                d.dy += event.dy;
                d.x += event.dx;
                d.y += event.dy;
            }
            renderLabels();
        })
        .on("end", function () { renderTable(); }));

    labelsEnter.append("text").attr("class", "label-name");
    labelsEnter.append("text").attr("class", "label-value");

    const labelsMerge = labelsEnter.merge(labels);
    labelsMerge.attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.angle || config.labelAngle})`);

    labelsMerge.select(".label-name")
        .text(d => d.value === null ? "" : d.name)
        .attr("font-size", d => d.size || config.labelSize)
        .attr("fill", d => d.labelColor || config.labelColor)
        .attr("font-family", config.labelFont)
        .attr("font-weight", config.labelBold ? 'bold' : 'normal')
        .attr("font-style", config.labelItalic ? 'italic' : 'normal')
        .attr("text-anchor", "middle")
        .on("click", (e, d) => { e.stopPropagation(); config.selectedState = d.id; updateMap(); });

    const formatIndian = new Intl.NumberFormat('en-IN').format;

    labelsMerge.select(".label-value")
        .text(d => (config.showValues && d.value !== null) ? `${config.valuePrefix}${formatIndian(d.value)}${config.valueSuffix}` : "")
        .attr("font-size", d => d.vSize || config.valueSize)
        .attr("fill", d => d.valueColor || d.labelColor || config.labelColor)
        .attr("font-family", config.labelFont)
        .attr("font-weight", config.valueBold ? 'bold' : 'normal')
        .attr("font-style", config.valueItalic ? 'italic' : 'normal')
        .attr("text-anchor", "middle")
        .attr("dx", d => d.vdx)
        .attr("dy", d => d.vdy)
        .call(d3.drag().on("start", () => saveState())
            .on("drag", function (event, d) {
                event.sourceEvent.stopPropagation();
                d.vdx += event.dx;
                d.vdy += event.dy;
                renderLabels();
            }));

    labels.exit().remove();

    const handles = gHandles.selectAll(".curve-handle").data(stateData.filter(d => d.id === config.selectedState && d.dx !== 0));
    handles.enter().append("circle").attr("class", "curve-handle")
        .attr("r", 7).attr("fill", "#ff0066").attr("stroke", "#fff").attr("stroke-width", 2)
        .call(d3.drag().on("start", () => saveState()).on("drag", function (event, d) {
            d.cdx += event.dx;
            d.cdy += event.dy;
            renderLabels();
        }));
    handles.merge(handles)
        .attr("cx", d => (d.origX || 0) + (d.cdx || 0))
        .attr("cy", d => (d.y || 0) + (d.cdy || 0));
    handles.exit().remove();
}

function handleResize() {
    const container = document.getElementById('map-container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    width = rect.width;
    height = rect.height;

    if (geoData) {
        projection.fitSize([width, height - 150], geoData);
        config.scale = projection.scale();
        const ms = document.getElementById('map-scale');
        if (ms) ms.value = config.scale;
        const sv = document.getElementById('scale-val');
        if (sv) sv.innerText = Math.round(config.scale);
    }
    svg.attr("width", width).attr("height", height);
    updateMap();
}

function setupEventListeners() {
    window.addEventListener('resize', handleResize);

    // Zoom via Mouse Wheel
    const container = document.getElementById('map-container');
    if (container) {
        container.addEventListener("wheel", (e) => {
            e.preventDefault();
            const zoomSpeed = 0.001;
            let newScale = config.scale * (1 - (e.deltaY * zoomSpeed));
            if (newScale < 400) newScale = 400;
            if (newScale > 3000) newScale = 3000;
            config.scale = newScale;
            const ms = document.getElementById('map-scale');
            if (ms) { ms.value = Math.round(newScale); }
            const sv = document.getElementById('scale-val');
            if (sv) sv.innerText = Math.round(newScale);
            updateMap();
        }, { passive: false });
    }

    // Panning Map Graphic removed as per request

    svg.on("click", (e) => {
        if (e.defaultPrevented) return;
        config.selectedState = null;
        renderLabels();
    });

    const titleInput = document.getElementById('map-title-input');
    if (titleInput) {
        titleInput.addEventListener('focus', saveState);
        titleInput.addEventListener('input', updateMap);
    }

    const undoBtn = document.getElementById('undo-btn');
    if (undoBtn) {
        undoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            undoState();
        });
    }

    const resetAllBtn = document.getElementById('reset-all-btn');
    if (resetAllBtn) {
        resetAllBtn.addEventListener('click', () => {
            if (confirm("Reset all settings and data to default?")) {
                saveState();
                stateData = JSON.parse(JSON.stringify(INITIAL_STATE_DATA));
                Object.assign(config, JSON.parse(JSON.stringify(INITIAL_CONFIG)));
                syncUI();
                renderTable();
                renderGradientStops();
                updateMap();
            }
        });
    }

    const resetLayoutBtn = document.getElementById('clear-colors-btn');
    if (resetLayoutBtn) {
        resetLayoutBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            stateData.forEach(s => { 
                s.dx = 0; s.dy = 0; s.angle = 0; s.vdx = 0; s.vdy = 15; s.cdx = 0; s.cdy = 0; 
                s.labelColor = null; s.valueColor = null; s.size = 12; s.vSize = 15;
                s.showLine = undefined; s.lineAlign = null;
            });
            config.scale = 1410;
            
            syncUI();
            renderTable(); 
            renderGradientStops();
            updateMap();
        });
    }

    const legDir = document.getElementById('legend-direction');
    if (legDir) legDir.addEventListener('change', e => { saveState(); config.legendDirection = e.target.value; updateMap(); });

    const legX = document.getElementById('legend-x');
    if (legX) legX.addEventListener('input', e => { config.legendX = parseFloat(e.target.value); updateMap(); });

    const legY = document.getElementById('legend-y');
    if (legY) legY.addEventListener('input', e => { config.legendY = parseFloat(e.target.value); updateMap(); });

    const mapScaleEl = document.getElementById('map-scale');
    if (mapScaleEl) mapScaleEl.addEventListener('input', e => {
        config.scale = parseInt(e.target.value);
        const sv = document.getElementById('scale-val');
        if (sv) sv.innerText = Math.round(config.scale);
        updateMap();
    });

    const borderColorEl = document.getElementById('border-color');
    if (borderColorEl) borderColorEl.addEventListener('input', e => {
        config.borderColor = e.target.value;
        updateMap();
    });

    const borderThicknessEl = document.getElementById('border-thickness');
    if (borderThicknessEl) borderThicknessEl.addEventListener('input', e => {
        config.borderThickness = parseFloat(e.target.value);
        const sv = document.getElementById('border-val');
        if (sv) sv.innerText = config.borderThickness;
        updateMap();
    });

    const showLegendEl = document.getElementById('show-legend');
    if (showLegendEl) showLegendEl.addEventListener('change', e => {
        config.showLegend = e.target.checked;
        updateMap();
    });

    const paletteSelect = document.getElementById('palette-select');
    if (paletteSelect) {
        paletteSelect.addEventListener('change', (e) => {
            const paletteName = e.target.value;
            if (paletteName) {
                saveState();
                const palette = palettes.find(p => p.name === paletteName);
                if (palette) {
                    config.colorStops = JSON.parse(JSON.stringify(palette.stops));
                    renderGradientStops();
                    updateMap();
                }
            }
        });
    }

    const addStopBtn = document.getElementById('add-stop-btn');
    if (addStopBtn) {
        addStopBtn.addEventListener('click', () => {
            if (config.colorStops.length >= 8) return;
            saveState();
            const last = config.colorStops[config.colorStops.length - 1];
            const newOffset = Math.min(100, last.offset + 10);
            config.colorStops.push({ offset: newOffset, color: last.color });
            renderGradientStops();
            updateMap();
        });
    }

    const labelBoldEl = document.getElementById('label-bold');
    if (labelBoldEl) labelBoldEl.addEventListener('change', e => {
        config.labelBold = e.target.checked;
        updateMap();
    });

    const labelItalicEl = document.getElementById('label-italic');
    if (labelItalicEl) labelItalicEl.addEventListener('change', e => {
        config.labelItalic = e.target.checked;
        updateMap();
    });

    const valueBoldEl = document.getElementById('value-bold');
    if (valueBoldEl) valueBoldEl.addEventListener('change', e => {
        config.valueBold = e.target.checked;
        updateMap();
    });

    const valueItalicEl = document.getElementById('value-italic');
    if (valueItalicEl) valueItalicEl.addEventListener('change', e => {
        config.valueItalic = e.target.checked;
        updateMap();
    });

    ['color-start', 'color-end'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none'; // Replaced by gradient stops
    });

    ['label-color', 'line-color'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', e => {
            const key = id.split('-').map((s, i) => i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)).join('');
            config[key] = e.target.value; updateMap();
        });
    });

    const labelSizeEl = document.getElementById('label-size');
    if (labelSizeEl) labelSizeEl.addEventListener('input', e => {
        config.labelSize = parseInt(e.target.value);
        const sv = document.getElementById('size-val');
        if (sv) sv.innerText = config.labelSize + "px"; updateMap();
    });

    const valSizeEl = document.getElementById('value-size-global');
    if (valSizeEl) valSizeEl.addEventListener('input', e => {
        config.valueSize = parseInt(e.target.value);
        const sv = document.getElementById('vsize-val');
        if (sv) sv.innerText = config.valueSize + "px"; updateMap();
    });

    const labelAngleEl = document.getElementById('label-angle');
    if (labelAngleEl) labelAngleEl.addEventListener('input', e => {
        config.labelAngle = parseInt(e.target.value);
        const sv = document.getElementById('angle-val');
        if (sv) sv.innerText = config.labelAngle + "°"; updateMap();
    });

    const labelFontEl = document.getElementById('label-font');
    if (labelFontEl) labelFontEl.addEventListener('change', e => {
        config.labelFont = e.target.value; updateMap();
    });

    const showValuesEl = document.getElementById('show-values');
    if (showValuesEl) showValuesEl.addEventListener('change', e => {
        config.showValues = e.target.checked; updateMap();
    });

    const valPrefixEl = document.getElementById('value-prefix');
    if (valPrefixEl) valPrefixEl.addEventListener('input', e => {
        config.valuePrefix = e.target.value; updateMap();
    });

    const valSuffixEl = document.getElementById('value-suffix');
    if (valSuffixEl) valSuffixEl.addEventListener('input', e => {
        config.valueSuffix = e.target.value; updateMap();
    });

    document.querySelectorAll('.ratio-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            config.selectedRatio = btn.dataset.ratio;
            syncUI();
        });
    });

    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) downloadBtn.addEventListener('click', () => {
        const area = document.getElementById('map-export-area');
        const titleInput = document.getElementById('map-title-input');
        const rawTitle = titleInput ? titleInput.value : "india_map";
        const snakeName = rawTitle.toLowerCase()
            .replace(/[^a-z0-9]/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '');
        const fileName = (snakeName || "india_map") + ".png";

        // Save current state
        const oldScale = config.scale;
        const oldWidth = area.style.width;
        const oldHeight = area.style.height;

        // Apply aspect ratio for download
        const [rw, rh] = config.selectedRatio.split(':').map(Number);
        const baseSize = 1000;
        area.style.width = `${baseSize}px`;
        area.style.height = `${(baseSize * rh) / rw}px`;

        // Reset to default baseline for export
        config.scale = 1410;
        
        gHandles.style("visibility", "hidden");
        updateMap();

        setTimeout(() => {
            html2canvas(area, {
                backgroundColor: null,
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: true
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = fileName;
                link.href = canvas.toDataURL("image/png");
                link.click();
                
                // Restore state
                area.style.width = oldWidth;
                area.style.height = oldHeight;
                config.scale = oldScale;
                gHandles.style("visibility", "visible");
                updateMap();
            }).catch(err => {
                console.error("Export failed:", err);
                area.style.width = oldWidth;
                area.style.height = oldHeight;
                config.scale = oldScale;
                gHandles.style("visibility", "visible");
                updateMap();
                alert("Export failed. Please try again.");
            });
        }, 100);
    });

    const csvUpload = document.getElementById('csv-upload');
    if (csvUpload) {
        csvUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            saveState();
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target.result;
                const rows = text.split(/\r?\n/).filter(r => r.trim() !== '');
                const startIdx = isNaN(parseFloat(rows[0].split(',')[1])) ? 1 : 0;

                // Reset all values to null before applying CSV data
                stateData.forEach(s => s.value = null);

                const normalize = (s) => s ? s.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/and/g, '').replace(/islands?$/, 'island') : '';

                rows.slice(startIdx).forEach(row => {
                    const cols = row.split(',');
                    if (cols.length >= 2) {
                        const rowName = cols[0].trim();
                        const val = parseFloat(cols[1]);
                        if (!isNaN(val)) {
                            const cleanRowName = normalize(rowName);
                            
                            // Try exact ID match first
                            let state = stateData.find(s => s.id.toLowerCase() === cleanRowName);

                            // Then match by normalized full name or display name
                            if (!state) {
                                state = stateData.find(s =>
                                    (s.fullName && normalize(s.fullName) === cleanRowName) ||
                                    normalize(s.name) === cleanRowName
                                );
                            }

                            // Fallback to fuzzy match if still no match
                            if (!state) {
                                state = stateData.find(s =>
                                    (s.fullName && fuzzyMatch(s.fullName, rowName)) ||
                                    fuzzyMatch(s.name, rowName)
                                );
                            }

                            if (state) state.value = val;
                        }
                    }
                });
                updateMap();
                renderTable();
            };
            reader.readAsText(file);
        });
    }
}

function fuzzyMatch(a, b) {
    if (!a || !b) return false;
    const cleanA = a.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanB = b.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (cleanA === cleanB) return true;
    
    // Only allow substring match if both strings are long enough to avoid short ID matches (like "AR" matching "Uttarakhand")
    if (cleanA.length > 3 && cleanB.length > 3) {
        return cleanA.includes(cleanB) || cleanB.includes(cleanA);
    }
    return false;
}

function renderTable() {
    const tbody = document.getElementById('table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    [...stateData].sort((a, b) => a.id.localeCompare(b.id)).forEach((state) => {
        const actualIdx = stateData.findIndex(s => s.id === state.id);
        const tr = document.createElement('tr');
        
        const showLine = state.showLine !== undefined ? state.showLine : config.showLines;
        const lineAlign = state.lineAlign || config.lineAlignment;

        tr.innerHTML = `
            <td><input type="text" value="${state.name}" class="ti-name" data-idx="${actualIdx}"></td>
            <td><input type="number" value="${state.size || config.labelSize}" class="ti-size" data-idx="${actualIdx}"></td>
            <td><input type="color" value="${state.labelColor || config.labelColor}" class="ti-color" data-idx="${actualIdx}"></td>
            <td style="border-left:1px solid #ddd; text-align: center;"><input type="checkbox" ${showLine ? 'checked' : ''} class="ti-showline" data-idx="${actualIdx}"></td>
            <td>
                <select class="ti-linealign" data-idx="${actualIdx}" style="font-size: 0.65rem; padding: 0.1rem;">
                    <option value="middle" ${lineAlign === 'middle' ? 'selected' : ''}>Mid</option>
                    <option value="start" ${lineAlign === 'start' ? 'selected' : ''}>Start</option>
                    <option value="end" ${lineAlign === 'end' ? 'selected' : ''}>End</option>
                </select>
            </td>
            <td style="border-left:1px solid #ddd;"><input type="number" value="${state.value}" class="ti-val" data-idx="${actualIdx}"></td>
            <td><input type="number" value="${state.vSize || config.valueSize}" class="ti-vsize" data-idx="${actualIdx}"></td>
            <td><input type="color" value="${state.valueColor || state.labelColor || config.labelColor}" class="ti-vcolor" data-idx="${actualIdx}"></td>
        `;
        tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.ti-val').forEach(el => el.addEventListener('change', e => {
        stateData[e.target.dataset.idx].value = parseFloat(e.target.value) || 0; updateMap();
    }));
    tbody.querySelectorAll('.ti-name').forEach(el => el.addEventListener('change', e => {
        stateData[e.target.dataset.idx].name = e.target.value; updateMap();
    }));
    tbody.querySelectorAll('.ti-size').forEach(el => el.addEventListener('change', e => {
        stateData[e.target.dataset.idx].size = parseInt(e.target.value); updateMap();
    }));
    tbody.querySelectorAll('.ti-vsize').forEach(el => el.addEventListener('change', e => {
        stateData[e.target.dataset.idx].vSize = parseInt(e.target.value); updateMap();
    }));
    tbody.querySelectorAll('.ti-color').forEach(el => el.addEventListener('input', e => {
        stateData[e.target.dataset.idx].labelColor = e.target.value; updateMap();
    }));
    tbody.querySelectorAll('.ti-vcolor').forEach(el => el.addEventListener('input', e => {
        stateData[e.target.dataset.idx].valueColor = e.target.value; updateMap();
    }));
    tbody.querySelectorAll('.ti-showline').forEach(el => el.addEventListener('change', e => {
        stateData[e.target.dataset.idx].showLine = e.target.checked; renderLabels();
    }));
    tbody.querySelectorAll('.ti-linealign').forEach(el => el.addEventListener('change', e => {
        stateData[e.target.dataset.idx].lineAlign = e.target.value; renderLabels();
    }));
}

init();
