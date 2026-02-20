import * as d3 from 'd3';
import html2canvas from 'html2canvas';
import { createIcons, MapPin, Download, Settings, Palette, Type, FileText, MousePointer2, Move, Undo } from 'lucide';

// Global Data - Exact names from india_states.json for perfect mapping
// Values updated based on user provided table
let stateData = [
    { id: "JK", name: "JK", fullName: "Jammu & Kashmir", value: 2.78, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 12, vSize: 11, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "LA", name: "Ladakh", fullName: "Ladakh", value: 0.03, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "PB", name: "PB", fullName: "Punjab", value: 2.77, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 12, vSize: 11, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "UP", name: "UP", fullName: "Uttar Pradesh", value: 24.11, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 12, vSize: 11, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "RJ", name: "Rajasthan", fullName: "Rajasthan", value: 6.85, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: -40, size: 12, vSize: 11, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "GJ", name: "Gujarat", fullName: "Gujarat", value: 6.04, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "MP", name: "Madhya Pradesh", fullName: "Madhya Pradesh", value: 7.26, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 12, vSize: 11, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "MH", name: "Maharashtra", fullName: "Maharashtra", value: 11.24, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: -40, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "KA", name: "Karnataka", fullName: "Karnataka", value: 6.11, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "KL", name: "Kerala", fullName: "Kerala", value: 3.45, dx: -50, dy: 20, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "TN", name: "TN", fullName: "Tamil Nadu", value: 7.21, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "AP", name: "AP", fullName: "Andhra Pradesh", value: 4.96, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "TG", name: "TG", fullName: "Telangana", value: 3.5, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "OR", name: "Odisha", fullName: "Odisha", value: 4.2, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "CT", name: "CG", fullName: "Chhattisgarh", value: 2.94, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "JH", name: "Jharkhand", fullName: "Jharkhand", value: 3.3, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "WB", name: "WB", fullName: "West Bengal", value: 9.13, dx: 0, dy: 10, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "BR", name: "Bihar", fullName: "Bihar", value: 10.41, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "AS", name: "Assam", fullName: "Assam", value: 3.12, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "AR", name: "AR", fullName: "Arunachal Pradesh", value: 0.14, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "MN", name: "Manipur", fullName: "Manipur", value: 0.29, dx: 60, dy: 30, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "TR", name: "Tripura", fullName: "Tripura", value: 0.37, dx: -20, dy: 40, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "MZ", name: "Mizoram", fullName: "Mizoram", value: 0.13, dx: 60, dy: 40, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "ML", name: "Meghalaya", fullName: "Meghalaya", value: 0.32, dx: -20, dy: 30, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "NL", name: "Nagaland", fullName: "Nagaland", value: 0.2, dx: 50, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "SK", name: "Sikkim", fullName: "Sikkim", value: 0.06, dx: 10, dy: -40, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: -30, cdy: 10 },
    { id: "HP", name: "HP", fullName: "Himachal Pradesh", value: 0.69, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "UT", name: "Uttarakhand", fullName: "Uttarakhand", value: 1.01, dx: 70, dy: -40, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "HR", name: "Haryana", fullName: "Haryana", value: 2.78, dx: 0, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "DL", name: "Delhi", fullName: "NCT of Delhi", value: 0.99, dx: 110, dy: -30, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "DN", name: "DNH & DD", fullName: "Dadra and Nagar Haveli and Daman and Diu", value: 3.5, dx: -40, dy: 20, vdx: 0, vdy: 15, angle: 0, size: 9, vSize: 8, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "PY", name: "Puducherry", fullName: "Puducherry", value: 0.14, dx: 50, dy: -30, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "GA", name: "Goa", fullName: "Goa", value: 0.15, dx: -30, dy: 0, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "AN", name: "Andaman & Nicobar Islands", fullName: "Andaman & Nicobar Island", value: 0.42, dx: 0, dy: -30, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "LD", name: "Lakshadweep", fullName: "Lakshadweep", value: 0.01, dx: -30, dy: -10, vdx: 0, vdy: 15, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 },
    { id: "CH", name: "Chandigarh", fullName: "Chandigarh", value: 0, dx: 0, dy: 0, vdx: 0, vdy: 0, angle: 0, size: 11, vSize: 10, labelColor: null, valueColor: null, cdx: 0, cdy: 0 }
];

const config = {
    scale: 1200,
    colorStart: "#7ad4b1ff",
    colorEnd: "#177a73ff",
    labelSize: 9,
    valueSize: 9,
    labelColor: "#333",
    labelFont: "Times New Roman",
    labelAngle: 0,
    lineColor: "#333",
    showValues: true,
    showLegend: true, legendDirection: "horizontal", legendX: 380, legendY: 650,
    boldLabels: false,
    selectedState: null,
    titleX: 100,
    titleY: 20,
    titleSize: 2.5,
    titleColor: "#000000",
    mapX: -50,
    mapY: 10
};

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
    saveState(); // Save current before undo to allow redo later (optional)
    const last = stateHistory.pop();
    stateData = last.stateData;
    Object.assign(config, last.config);

    const fields = ['title-x', 'title-y', 'map-x', 'map-y', 'legend-x', 'legend-y'];
    fields.forEach(f => {
        const el = document.getElementById(f);
        if (el) {
            const prop = f.replace('-x', 'X').replace('-y', 'Y').replace('title-', 'title').replace('map-', 'map').replace('legend-', 'legend');
            el.value = config[prop];
        }
    });

    const lgEl = document.getElementById('show-legend');
    if (lgEl) lgEl.checked = config.showLegend;

    const lgDir = document.getElementById('legend-direction');
    if (lgDir) lgDir.value = config.legendDirection;

    const ms = document.getElementById('map-scale');
    if (ms) { ms.value = config.scale; document.getElementById('scale-val').innerText = config.scale; }

    const btn = document.getElementById('undo-btn');
    if (btn && stateHistory.length === 0) btn.disabled = true;

    renderTable();
    updateMap();
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
    createIcons({ icons: { MapPin, Download, Settings, Palette, Type, FileText, MousePointer2, Move, Undo } });
    try {
        const response = await fetch('./india_states.json');
        geoData = await response.json();

        const nameKeys = ["ST_NM", "NAME_1", "state_name", "NAME"];
        let nameKey = "ST_NM";
        if (geoData.features[0]) {
            for (const k of nameKeys) if (geoData.features[0].properties[k]) { nameKey = k; break; }
        }

        geoData.features.forEach(f => {
            const name = f.properties[nameKey];
            const geoId = f.properties.ID || f.properties.ST_ID?.replace('IN-', '');
            const cleanName = name ? name.toLowerCase().replace(/[^a-z0-9]/g, '') : '';

<<<<<<< HEAD
            let match = stateData.find(s => s.id === geoId);
            if (!match) match = stateData.find(s =>
                (s.fullName && cleanName === s.fullName.toLowerCase().replace(/[^a-z0-9]/g, '')) ||
                cleanName === s.name.toLowerCase().replace(/[^a-z0-9]/g, '')
            );

=======
            // 1. Direct ID match (highest priority from GeoJSON ID)
            let match = stateData.find(s => s.id === geoId);

            // 2. Exact name match (fallback to full names or display names)
            if (!match) match = stateData.find(s =>
                (s.fullName && cleanName === s.fullName.toLowerCase().replace(/[^a-z0-9]/g, '')) ||
                cleanName === s.name.toLowerCase().replace(/[^a-z0-9]/g, '')
            );

            // 3. Special cases for merged UTs or alternative IDs
>>>>>>> 1c689d9 (Corrected state mapping, fixed export, updated UI to Times New Roman, and refined table styling)
            if (!match) {
                if (geoId === 'DD' || cleanName.includes('dadara') || cleanName.includes('havelli') || cleanName.includes('daman') || cleanName.includes('diu')) {
                    match = stateData.find(s => s.id === "DN");
                }
            }

<<<<<<< HEAD
=======
            // 4. Broader fuzzy match
>>>>>>> 1c689d9 (Corrected state mapping, fixed export, updated UI to Times New Roman, and refined table styling)
            if (!match && cleanName.length > 3) {
                match = stateData.find(s => fuzzyMatch(s.name, name));
            }

            if (match) f.properties._mapped_id = match.id;
        });

        renderTable();
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

    const svgLegend = legendEl.append("svg").attr("width", width + 40).attr("height", height + 40);
<<<<<<< HEAD
    const defsLegend = svgLegend.append("defs");
=======
    const defsLegend = svgLegend.append("defs"); // Renamed to avoid conflict with main SVG defs
>>>>>>> 1c689d9 (Corrected state mapping, fixed export, updated UI to Times New Roman, and refined table styling)
    const linearGradient = defsLegend.append("linearGradient").attr("id", "linear-gradient");

    if (config.legendDirection === 'horizontal') {
        linearGradient.attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
    } else {
        linearGradient.attr("x1", "0%").attr("y1", "100%").attr("x2", "0%").attr("y2", "0%");
    }

    linearGradient.append("stop").attr("offset", "0%").attr("stop-color", config.colorStart);
    linearGradient.append("stop").attr("offset", "100%").attr("stop-color", config.colorEnd);

    svgLegend.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("x", 20)
        .attr("y", 20)
        .style("fill", "url(#linear-gradient)")
        .style("stroke", "#ccc");

    const minVal = d3.min(stateData, d => d.value) || 0;
    const maxVal = d3.max(stateData, d => d.value) || 100;

    if (config.legendDirection === 'horizontal') {
        svgLegend.append("text").attr("x", 20).attr("y", 15).text(minVal).style("font-size", "10px").style("font-family", config.labelFont);
        svgLegend.append("text").attr("x", 20 + width).attr("y", 15).attr("text-anchor", "end").text(maxVal).style("font-size", "10px").style("font-family", config.labelFont);
    } else {
        svgLegend.append("text").attr("x", 20 + width + 5).attr("y", 20 + height).text(minVal).style("font-size", "10px").style("font-family", config.labelFont);
        svgLegend.append("text").attr("x", 20 + width + 5).attr("y", 25).text(maxVal).style("font-size", "10px").style("font-family", config.labelFont);
    }
}

function updateMap() {
    renderLegend();
    if (!geoData) return;

    projection.scale(config.scale).translate([width / 2, height / 2 + 30]);
    projection.center([82.7, 21.5]);

    const minVal = d3.min(stateData, d => d.value) || 0;
    const maxVal = d3.max(stateData, d => d.value) || 100;
    const colorScale = d3.scaleLinear().domain([minVal, maxVal]).range([config.colorStart, config.colorEnd]);

    const titleDisp = d3.select('#map-title-display');
    const titleIn = document.getElementById('map-title-input');
    const rawTitle = titleIn ? titleIn.value : "";
    titleDisp.html(rawTitle.replace(/\\n/g, '<br><span style="font-size:0.5em; font-weight:normal; color:#666; display:block; margin-top:5px;">') + '</span>')
        .style("transform", `translate(${config.titleX}px, ${config.titleY}px)`)
        .style("font-size", `${config.titleSize}rem`)
        .style("color", config.titleColor)
        .style("cursor", "move")
        .style("pointer-events", "all")
        .call(d3.drag().on("start", () => saveState()).on("drag", function (event) {
            config.titleX += event.dx;
            config.titleY += event.dy;
            const txEl = document.getElementById('title-x');
            const tyEl = document.getElementById('title-y');
            if (txEl) txEl.value = Math.round(config.titleX);
            if (tyEl) tyEl.value = Math.round(config.titleY);
            updateMap();
        }));

    gMap.attr("transform", `translate(${config.mapX}, ${config.mapY})`);

    const states = gStates.selectAll(".state-path").data(geoData.features);
    states.enter().append("path").attr("class", "state-path")
        .attr("stroke", "#000").attr("stroke-width", 1.0)
        .on("click", (event, d) => {
            const data = stateData.find(s => s.id === d.properties._mapped_id);
            if (data) {
                config.selectedState = data.id;
                highlightTableRow(data.name);
                updateMap();
            }
        })
        .merge(states).transition().duration(200).attr("d", path)
        .attr("fill", d => {
            const data = stateData.find(s => s.id === d.properties._mapped_id);
            return data ? colorScale(data.value) : "#f1f5f9";
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

            const centroid = path.centroid(bestFeature);
            if (!isNaN(centroid[0])) {
                data.origX = centroid[0];
                data.origY = centroid[1];
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
        .attr("d", d => {
            if (d.value === 0 || !d.dx || (Math.abs(d.dx) < 15 && Math.abs(d.dy) < 15)) return "";
            const cx = d.origX + (d.cdx || 0);
            const cy = d.y + (d.cdy || 0);
            return `M${d.x},${d.y} Q${cx},${cy} ${d.origX},${d.origY}`;
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
        .text(d => d.value === 0 ? "" : d.name)
        .attr("font-size", d => d.size || config.labelSize)
        .attr("fill", d => d.labelColor || config.labelColor)
        .attr("font-family", config.labelFont)
        .attr("font-weight", config.boldLabels ? 'bold' : 'normal')
        .attr("text-anchor", "middle")
        .on("click", (e, d) => { e.stopPropagation(); config.selectedState = d.id; updateMap(); });

    labelsMerge.select(".label-value")
        .text(d => (config.showValues && d.value !== 0) ? d.value : "")
        .attr("font-size", d => d.vSize || config.valueSize)
        .attr("fill", d => d.valueColor || d.labelColor || config.labelColor)
        .attr("font-family", config.labelFont)
        .attr("font-weight", config.boldLabels ? 'bold' : 'normal')
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

    // Panning Map Graphic
    svg.call(d3.drag().subject(function () { return { x: config.mapX, y: config.mapY }; })
        .on("start", () => saveState())
        .on("drag", (event) => {
            const container = document.getElementById('map-container');
            if (container) {
                const rect = container.getBoundingClientRect();
                width = rect.width;
                height = rect.height;
                svg.attr("width", width).attr("height", height);
            }
            config.mapX = event.x;
            config.mapY = event.y;
            const mxEl = document.getElementById('map-x');
            const myEl = document.getElementById('map-y');
            if (mxEl) mxEl.value = Math.round(config.mapX);
            if (myEl) myEl.value = Math.round(config.mapY);
            updateMap();
        })
    );

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
    if (undoBtn) undoBtn.addEventListener('click', undoState);

    const legDir = document.getElementById('legend-direction');
    if (legDir) legDir.addEventListener('change', e => { saveState(); config.legendDirection = e.target.value; updateMap(); });

    const legX = document.getElementById('legend-x');
    if (legX) legX.addEventListener('input', e => { config.legendX = parseFloat(e.target.value); updateMap(); });

    const legY = document.getElementById('legend-y');
    if (legY) legY.addEventListener('input', e => { config.legendY = parseFloat(e.target.value); updateMap(); });

    ['title-x', 'title-y', 'title-size', 'map-x', 'map-y'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', e => {
            const key = id.replace('title-', 'title').replace('map-', 'map').replace('-size', 'Size').replace('-x', 'X').replace('-y', 'Y');
            config[key] = parseFloat(e.target.value);
            updateMap();
        });
    });

    const titleColorEl = document.getElementById('title-color');
    if (titleColorEl) titleColorEl.addEventListener('input', e => {
        config.titleColor = e.target.value;
        updateMap();
    });

    const mapScaleEl = document.getElementById('map-scale');
    if (mapScaleEl) mapScaleEl.addEventListener('input', e => {
        config.scale = parseInt(e.target.value);
        const sv = document.getElementById('scale-val');
        if (sv) sv.innerText = config.scale;
        updateMap();
    });

    const showLegendEl = document.getElementById('show-legend');
    if (showLegendEl) showLegendEl.addEventListener('change', e => {
        config.showLegend = e.target.checked;
        updateMap();
    });

    const boldLabelsEl = document.getElementById('bold-labels');
    if (boldLabelsEl) boldLabelsEl.addEventListener('change', e => {
        config.boldLabels = e.target.checked;
        updateMap();
    });

    ['color-start', 'color-end', 'label-color', 'line-color'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', e => {
            const key = id.split('-').map((s, i) => i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)).join('');
            config[key] = e.target.value; updateMap();
        });
    });

    const labelSizeEl = document.getElementById('label-size');
    if (labelSizeEl) labelSizeEl.addEventListener('input', e => {
        config.labelSize = parseInt(e.target.value);
<<<<<<< HEAD
        const sv = document.getElementById('size-val');
        if (sv) sv.innerText = config.labelSize + "px"; updateMap();
=======
        const valEl = document.getElementById('size-val');
        if (valEl) valEl.innerText = config.labelSize + "px"; updateMap();
>>>>>>> 1c689d9 (Corrected state mapping, fixed export, updated UI to Times New Roman, and refined table styling)
    });

    const valSizeEl = document.getElementById('value-size-global');
    if (valSizeEl) valSizeEl.addEventListener('input', e => {
        config.valueSize = parseInt(e.target.value);
<<<<<<< HEAD
        const sv = document.getElementById('vsize-val');
        if (sv) sv.innerText = config.valueSize + "px"; updateMap();
=======
        const valEl = document.getElementById('vsize-val');
        if (valEl) valEl.innerText = config.valueSize + "px"; updateMap();
>>>>>>> 1c689d9 (Corrected state mapping, fixed export, updated UI to Times New Roman, and refined table styling)
    });

    const labelAngleEl = document.getElementById('label-angle');
    if (labelAngleEl) labelAngleEl.addEventListener('input', e => {
        config.labelAngle = parseInt(e.target.value);
<<<<<<< HEAD
        const sv = document.getElementById('angle-val');
        if (sv) sv.innerText = config.labelAngle + "°"; updateMap();
=======
        const valEl = document.getElementById('angle-val');
        if (valEl) valEl.innerText = config.labelAngle + "°"; updateMap();
>>>>>>> 1c689d9 (Corrected state mapping, fixed export, updated UI to Times New Roman, and refined table styling)
    });

    const labelFontEl = document.getElementById('label-font');
    if (labelFontEl) labelFontEl.addEventListener('change', e => {
        config.labelFont = e.target.value; updateMap();
    });

    const showValuesEl = document.getElementById('show-values');
    if (showValuesEl) showValuesEl.addEventListener('change', e => {
        config.showValues = e.target.checked; updateMap();
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

        gHandles.style("visibility", "hidden");

        html2canvas(area, {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = fileName;
            link.href = canvas.toDataURL("image/png");
            link.click();
            gHandles.style("visibility", "visible");
        }).catch(err => {
            console.error("Export failed:", err);
            gHandles.style("visibility", "visible");
<<<<<<< HEAD
            alert("Export failed. Please try again.");
=======
            alert("Export failed. Please try taking a manual screenshot or checking the console.");
>>>>>>> 1c689d9 (Corrected state mapping, fixed export, updated UI to Times New Roman, and refined table styling)
        });
    });

    const resetBtn = document.getElementById('clear-colors-btn');
    if (resetBtn) resetBtn.addEventListener('click', () => {
        stateData.forEach(s => { s.dx = 0; s.dy = 0; s.angle = 0; s.vdx = 0; s.vdy = 15; s.cdx = 0; s.cdy = -20; s.labelColor = null; s.valueColor = null; });
        config.mapX = 0; config.mapY = 0; config.titleX = 100; config.titleY = 20;
        document.getElementById('map-x').value = 0; document.getElementById('map-y').value = 0;
        document.getElementById('title-x').value = 100; document.getElementById('title-y').value = 20;
        renderTable(); updateMap();
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
<<<<<<< HEAD
=======
                // Check if first row is header
>>>>>>> 1c689d9 (Corrected state mapping, fixed export, updated UI to Times New Roman, and refined table styling)
                const startIdx = isNaN(parseFloat(rows[0].split(',')[1])) ? 1 : 0;

                rows.slice(startIdx).forEach(row => {
                    const cols = row.split(',');
                    if (cols.length >= 2) {
                        const rowName = cols[0].trim();
                        const val = parseFloat(cols[1]);
                        if (!isNaN(val)) {
                            const cleanRowName = rowName.toLowerCase().replace(/[^a-z0-9]/g, '');
                            const state = stateData.find(s =>
                                s.id.toLowerCase() === cleanRowName ||
                                (s.fullName && s.fullName.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanRowName) ||
                                s.name.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanRowName
                            );
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
    const clean = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean(a) === clean(b) || clean(a).includes(clean(b)) || clean(b).includes(clean(a));
}

function renderTable() {
    const tbody = document.getElementById('table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    [...stateData].sort((a, b) => a.id.localeCompare(b.id)).forEach((state) => {
        const actualIdx = stateData.findIndex(s => s.id === state.id);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" value="${state.name}" class="ti-name" data-idx="${actualIdx}"></td>
            <td><input type="number" value="${state.value}" class="ti-val" data-idx="${actualIdx}"></td>
            <td><input type="number" value="${state.size || config.labelSize}" class="ti-size" data-idx="${actualIdx}"></td>
            <td><input type="color" value="${state.labelColor || config.labelColor}" class="ti-color" data-idx="${actualIdx}"></td>
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
}

init();
