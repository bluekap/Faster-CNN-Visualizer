# Faster-RCNN-Visualizer

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![D3.js](https://img.shields.io/badge/D3.js-F9A03C?style=for-the-badge&logo=d3.dot.js&logoColor=white)](https://d3js.org/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/)

An interactive, high-fidelity visualization of the **Faster R-CNN** object detection pipeline. This tool provides a deep dive into how deep learning models identify and localize objects (specifically cars) in complex urban environments.

---

## 🌟 Key Features

### 🔍 Advanced Visualizations
- **Interactive Receptive Fields:** Mathematically accurate mapping between feature map cells and their corresponding regions in the input image.
- **Dynamic Feature Activations:** Hover over the Shared Backbone to see simulated channel responses to localized visual patterns.
- **SVG Architecture Diagrams:** Robust, animated SVG layouts for the Detection Head, illustrating the split between classification and bounding box regression.
- **Animated RoI Pooling:** A visual demonstration of how variable-sized proposals are normalized into fixed-size tensors (7x7) for downstream processing.

### 🍱 User Experience
- **Interactive Narrative Panel:** A step-by-step walkthrough of the pipeline with visual flow connectors indicating the sequential nature of the architecture.
- **Real-time Detection Filtering:** Adjust confidence thresholds via an interactive slider to see how the model's certainty affects detection output.
- **Premium Aesthetics:** Modern dark/light mode optimization, smooth GSAP-powered transitions, and a responsive glassmorphism-inspired UI.

---

## 🛠 Tech Stack

- **Core:** [React](https://reactjs.org/) (Functional Components, Hooks)
- **Build Tool:** [Vite](https://vitejs.dev/) for ultra-fast development.
- **Graphics:** [D3.js](https://d3js.org/) for mathematical visualizations and [Lucide React](https://lucide.dev/) for iconography.
- **Animations:** [GSAP](https://greensock.com/) (GreenSock Animation Platform) for high-performance UI transitions.
- **Styling:** Vanilla CSS with a focus on modern design tokens and responsiveness.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16.0 or higher)
- npm or yarn

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/bluekap/Faster-CNN-Visualizer.git
   cd Faster-CNN-Visualizer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Development
Run the app in development mode with HMR:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

### Production
Build the project for production:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## ⚖️ License & Attribution

© 2026 **bluekap™**. All Rights Reserved.

Designed and developed by [bluekap](https://github.com/bluekap).

Faster R-CNN is a landmark framework in the field of Computer Vision. This visualizer is intended for educational purposes to help developers and researchers better understand the inner workings of two-stage object detectors.