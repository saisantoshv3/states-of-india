# 🗺️ India Map Visualizer

An interactive, browser-based choropleth map of India built with **D3.js** and **Vite**. Visualize any state-level data — population, GDP, literacy, elections results, etc. — with a fully customizable heatmap and rich export options.

🔗 **Live Demo:** [saisantoshv3.github.io/states-of-india](https://saisantoshv3.github.io/states-of-india/)

---

## ✨ Features

- 🎨 **Heatmap Coloring** — Automatically colors all 36 states & UTs based on your data using a smooth gradient scale
- 📂 **CSV Upload** — Import your own data via a simple two-column CSV (`State, Value`)
- ✏️ **Drag-to-Reposition Labels** — Move state name labels anywhere on the map by dragging
- 🔡 **Full Text Customization** — Change font family, size, color, angle, and bold styling for all labels
- 📐 **Zoom & Pan** — Scroll to zoom in/out; drag the map canvas to pan
- 🏷️ **Draggable Legend & Title** — Reposition the color scale legend and map title freely
- ↩️ **Undo** — Up to 20-step undo history for all changes
- 💾 **Export as PNG** — Download a high-resolution (2×) PNG of the map with a click
- 🔄 **Reset Layout** — Restore all label and layout positions to defaults

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- npm

### Installation

```bash
git clone https://github.com/saisantoshv3/states-of-india.git
cd states-of-india
npm install
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📊 How to Use

### Upload Your Own Data

Prepare a CSV file with two columns — **State identifier** and **numeric value**:

```csv
State,Value
Maharashtra,11.24
Uttar Pradesh,24.11
Tamil Nadu,7.21
...
```

The state column accepts:
- State **abbreviation** (e.g., `MH`, `UP`, `TN`)
- Full **state name** (e.g., `Maharashtra`, `Uttar Pradesh`)

Click **Upload CSV** in the sidebar to load your data instantly.

### Customize the Map

| Control | Description |
|---|---|
| **Heat Map Palette** | Pick low/high colors for the gradient scale |
| **Map Scale** | Zoom the map in/out using the slider |
| **Font Family** | Choose from Times New Roman, Arial, or Serif |
| **Font Size & Color** | Adjust label and value text independently |
| **Label Angle** | Rotate all state labels globally |
| **Bold / Values** | Toggle bold text or hide numeric values |
| **Legend** | Show/hide, change direction, and drag to reposition |
| **Title** | Type a map title; use `\n` for a subtitle line |

### Export

Click **Export Visualization** in the header to download the current map view as a high-quality PNG.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [D3.js v7](https://d3js.org/) | SVG map rendering, projections, and color scales |
| [Vite](https://vitejs.dev/) | Fast dev server and production bundler |
| [html2canvas](https://html2canvas.hertzen.com/) | PNG export of the map canvas |
| [Lucide](https://lucide.dev/) | Icon set used in the UI |
| [gh-pages](https://github.com/tschaub/gh-pages) | GitHub Pages deployment |

---

## 📁 Project Structure

```
states-of-india/
├── public/
│   └── india_states.json   # GeoJSON boundaries for all states & UTs
├── index.html              # App shell and sidebar UI
├── main.js                 # Core app logic (D3 rendering, events)
├── style.css               # All styling
├── vite.config.js          # Vite config (base path for GitHub Pages)
└── package.json
```

---

## 🚢 Deployment

The project is deployed to GitHub Pages using the `gh-pages` package.

```bash
npm run deploy
```

This runs `vite build` and pushes the `dist/` folder to the `gh-pages` branch automatically.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Made with ❤️ by [saisantoshv3](https://github.com/saisantoshv3)*
