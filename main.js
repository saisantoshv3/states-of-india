import * as d3 from 'd3';
import html2canvas from 'html2canvas';
import { createIcons, MapPin, Download, Settings, Palette, Type, FileText, MousePointer2, Move } from 'lucide';

// Global Data - Exact names from india_states.json for perfect mapping
// Values updated based on user provided table
let stateData = [
];

const config = {
    scale: 1050,
    colorStart: "#fff5f5",
    colorEnd: "#800000",
    labelSize: 9,
    valueSize: 9,
    labelColor: "#333",
    labelFont: "Times New Roman",
    labelAngle: 0,
    lineColor: "#333",
    showValues: true,
    showLegend: false, boldLabels: true,
    selectedState: null,
    titleX: -240,
    titleY: -350,
    titleSize: 2.2,
    titleColor: "#c53030",
    mapX: 0,
    mapY: 10
};

let geoData = null;
let width = 800;
let height = 800;

const svg = d3.select("#india-map");
const gMap = svg.append("g").attr("class", "map-group");
const gStates = gMap.append("g").attr("class", "states-group");
const gLines = gMap.append("g").attr("class", "lines-group");
const gLabels = gMap.append("g").attr("class", "labels-group");
const gHandles = gMap.append("g").attr("class", "handles-group");

const projection = d3.geoMercator();
const path = d3.geoPath().projection(projection);

async function init() {
    createIcons({ icons: { MapPin, Download, Settings, Palette, Type, FileText, MousePointer2, Move } });
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
            const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');

            // 1. Direct ID match
            let match = stateData.find(s => cleanName === s.id.toLowerCase().replace(/[^a-z0-9]/g, ''));

            // 2. Exact name match
            if (!match) match = stateData.find(s => cleanName === s.name.toLowerCase().replace(/[^a-z0-9]/g, ''));

            // 3. Special cases for merged UTs
            if (!match) {
                if (cleanName.includes('dadara') || cleanName.includes('havelli') || cleanName.includes('daman') || cleanName.includes('diu')) {
                    match = stateData.find(s => s.id === "DN");
                }
            }

            // 4. Broader fuzzy match
            if (!match && cleanName.length > 3) {
                match = stateData.find(s => fuzzyMatch(s.id, name) || fuzzyMatch(s.name, name));
            }

            if (match) f.properties._mapped_id = match.id;
        });

        renderTable();
        handleResize();
        setupEventListeners();
    } catch (e) { console.error(e); }
}

function updateMap() {
    if (!geoData) return;

    projection.scale(config.scale).translate([width / 2, height / 2 + 30]);
    projection.center([82.7, 21.5]);

    const minVal = d3.min(stateData, d => d.value) || 0;
    const maxVal = d3.max(stateData, d => d.value) || 100;
    const colorScale = d3.scaleLinear().domain([minVal, maxVal]).range([config.colorStart, config.colorEnd]);

    const titleDisp = d3.select('#map-title-display');
    const rawTitle = document.getElementById('map-title-input').value;
    titleDisp.html(rawTitle.replace(/\\n/g, '<br><span style="font-size:0.5em; font-weight:normal; color:#666; display:block; margin-top:5px;">') + '</span>')
        .style("transform", `translate(${config.titleX}px, ${config.titleY}px)`)
        .style("font-size", `${config.titleSize}rem`)
        .style("color", config.titleColor)
        .style("cursor", "move")
        .style("pointer-events", "all")
        .call(d3.drag().on("drag", function (event) {
            config.titleX += event.dx;
            config.titleY += event.dy;
            document.getElementById('title-x').value = Math.round(config.titleX);
            document.getElementById('title-y').value = Math.round(config.titleY);
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
        .attr("stroke", "#000")
        .attr("stroke-width", 1.0)
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
        .attr("fill", "none").attr("stroke-dasharray", "2,2")
        .attr("d", d => {
            if (!d.origX || !d.dx || (Math.abs(d.dx) < 15 && Math.abs(d.dy) < 15)) return "";
            const cx = d.origX + (d.cdx || 0);
            const cy = d.y + (d.cdy || 0);
            return `M${d.origX},${d.origY} Q${cx},${cy} ${d.x},${d.y}`;
        });
    lines.exit().remove();

    const labels = gLabels.selectAll(".label-group").data(stateData);
    const labelsEnter = labels.enter().append("g").attr("class", "label-group");

    labelsEnter.call(d3.drag()
        .on("start", function () { d3.select(this).raise(); })
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
    labelsMerge.attr("transform", d => {
        if (isNaN(d.x) || isNaN(d.y)) return "translate(0,0)";
        return `translate(${d.x},${d.y}) rotate(${d.angle || config.labelAngle})`;
    });

    labelsMerge.select(".label-name")
        .text(d => d.name)
        .attr("font-size", d => d.size || config.labelSize)
        .attr("fill", d => d.labelColor || config.labelColor)
        .attr("font-family", config.labelFont)
        .attr("font-weight", config.boldLabels ? 'bold' : 'normal')
        .attr("text-anchor", "middle")
        .on("click", (e, d) => { e.stopPropagation(); config.selectedState = d.id; updateMap(); });

    labelsMerge.select(".label-value")
        .text(d => config.showValues ? d.value : "")
        .attr("font-size", d => d.vSize || config.valueSize)
        .attr("fill", d => d.valueColor || d.labelColor || config.labelColor)
        .attr("font-family", config.labelFont)
        .attr("font-weight", config.boldLabels ? 'bold' : 'normal')
        .attr("text-anchor", "middle")
        .attr("dx", d => d.vdx)
        .attr("dy", d => d.vdy)
        .call(d3.drag()
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
        .call(d3.drag().on("drag", function (event, d) {
            d.cdx += event.dx;
            d.cdy += event.dy;
            renderLabels();
        }));
    handles.merge(handles)
        .attr("cx", d => d.origX + (d.cdx || 0))
        .attr("cy", d => d.y + (d.cdy || 0));
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
        document.getElementById('map-scale').value = config.scale;
        document.getElementById('scale-val').innerText = Math.round(config.scale);
    }

    svg.attr("width", width).attr("height", height);
    updateMap();
}

function setupEventListeners() {
    window.addEventListener('resize', handleResize);
    if (svg) svg.on("click", () => { config.selectedState = null; renderLabels(); });

    const titleInput = document.getElementById('map-title-input');
    if (titleInput) titleInput.addEventListener('input', updateMap);

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
        document.getElementById('scale-val').innerText = config.scale;
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
        document.getElementById('size-val').innerText = config.labelSize + "px"; updateMap();
    });

    const valSizeEl = document.getElementById('value-size-global');
    if (valSizeEl) valSizeEl.addEventListener('input', e => {
        config.valueSize = parseInt(e.target.value);
        document.getElementById('vsize-val').innerText = config.valueSize + "px"; updateMap();
    });

    const labelAngleEl = document.getElementById('label-angle');
    if (labelAngleEl) labelAngleEl.addEventListener('input', e => {
        config.labelAngle = parseInt(e.target.value);
        document.getElementById('angle-val').innerText = config.labelAngle + "°"; updateMap();
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
        if (!area) return;
        gHandles.style("visibility", "hidden");

        setTimeout(() => {
            html2canvas(area, {
                backgroundColor: '#ffffff',
                scale: 3,
                logging: false,
                useCORS: true,
                allowTaint: true
            }).then(canvas => {
                canvas.toBlob(blob => {
                    const link = document.createElement('a');
                    link.download = `india-map-${Date.now()}.png`;
                    link.href = URL.createObjectURL(blob);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    URL.revokeObjectURL(link.href);
                    gHandles.style("visibility", "visible");
                }, 'image/png');
            }).catch(err => {
                console.error("Export failed:", err);
                gHandles.style("visibility", "visible");
            });
        }, 150);
    });

    const resetBtn = document.getElementById('clear-colors-btn');
    if (resetBtn) resetBtn.addEventListener('click', () => {
        stateData.forEach(s => { s.dx = 0; s.dy = 0; s.angle = 0; s.vdx = 0; s.vdy = 15; s.cdx = 0; s.cdy = -20; s.labelColor = null; s.valueColor = null; });
        config.mapX = 0; config.mapY = 0; config.titleX = -240; config.titleY = -350;
        document.getElementById('map-x').value = 0; document.getElementById('map-y').value = 0;
        document.getElementById('title-x').value = -240; document.getElementById('title-y').value = -350;
        renderTable(); updateMap();
    });
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
            <td><input type="text" value="${state.name}" class="ti-name" data-idx="${actualIdx}" style="width:70px; border:none; background:transparent; font-size:0.65rem;"></td>
            <td><input type="number" value="${state.value}" class="ti-val" data-idx="${actualIdx}" style="width:35px; border:none; background:transparent; font-size:0.65rem;"></td>
            <td><input type="number" value="${state.size || config.labelSize}" class="ti-size" data-idx="${actualIdx}" style="width:25px; border:none; background:transparent; font-size:0.65rem;"></td>
            <td><input type="color" value="${state.labelColor || config.labelColor}" class="ti-color" data-idx="${actualIdx}" style="width:20px; height:20px; padding:0; border:none; background:transparent;"></td>
            <td style="border-left:1px solid #eee;"><input type="number" value="${state.vSize || config.valueSize}" class="ti-vsize" data-idx="${actualIdx}" style="width:25px; border:none; background:transparent; font-size:0.65rem;"></td>
            <td><input type="color" value="${state.valueColor || state.labelColor || config.labelColor}" class="ti-vcolor" data-idx="${actualIdx}" style="width:20px; height:20px; padding:0; border:none; background:transparent;"></td>
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
