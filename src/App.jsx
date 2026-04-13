import { useState } from "react";
import Pipeline from "./components/Pipeline.jsx";
import DetailModal from "./components/DetailModal.jsx";
import NarrativePanel from "./components/NarrativePanel.jsx";
import { stages } from "./constants/stageData.js";
import "./styles/App.css";

// Street scenario - finding a car in an urban scene
const STREET_SCENARIO = {
  label: "Street Scene",
  noun: "car",
  description: "Finding cars in busy urban streets",
};

function App() {
  const [activeStage, setActiveStage] = useState(0);
  const [showNarrative, setShowNarrative] = useState(false);
  const [selectedStageIndex, setSelectedStageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Content for each stage
  const stageContent = [
    <BackboneStage key="backbone" />,
    <RPNStage key="rpn" />,
    <RoIStage key="roi" />,
    <HeadStage key="head" />,
  ];

  const handleStageClick = (index) => {
    setSelectedStageIndex(index);
    setIsModalOpen(true);
    setActiveStage(index);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-left">
          <h1 className="app-title">Faster R-CNN: Finding Cars in Streets</h1>
          <p className="app-subtitle">{STREET_SCENARIO.description}</p>
        </div>
        <div className="header-right">
          <button 
            className="narrative-toggle-btn"
            onClick={() => setShowNarrative(!showNarrative)}
          >
            {showNarrative ? "Hide Details" : "Show Details"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className={`app-main ${showNarrative ? "with-narrative" : ""}`}>
        <div className="pipeline-wrapper">
          <Pipeline
            activeStage={activeStage}
            onStageClick={setActiveStage}
            onStageOpen={handleStageClick}
          >
            {stageContent}
          </Pipeline>
        </div>

        {/* Narrative Panel - Hidden by default */}
        {showNarrative && (
          <NarrativePanel
            currentStage={activeStage}
            onNext={() => setActiveStage(Math.min(activeStage + 1, stages.length - 1))}
            onPrev={() => setActiveStage(Math.max(activeStage - 1, 0))}
            totalStages={stages.length}
          />
        )}
      </main>

      {/* Detail Modal */}
      {selectedStageIndex !== null && (
        <DetailModal
          stage={stages[selectedStageIndex]}
          index={selectedStageIndex}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        >
          {stageContent[selectedStageIndex]}
        </DetailModal>
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>Faster R-CNN is a state-of-the-art object detection framework that balances accuracy and speed.</p>
      </footer>
    </div>
  );
}

// Stage Content Components
function BackboneStage() {
  // Generate different feature map patterns to show variety
  const generateFeaturePattern = (channelIdx) => {
    const patterns = [
      { name: 'Edges', color: 'rgba(59, 130, 246, 0.7)' }, // Blue - edge detection
      { name: 'Textures', color: 'rgba(139, 92, 246, 0.7)' }, // Purple - texture
      { name: 'Shapes', color: 'rgba(236, 72, 153, 0.7)' }, // Pink - shape
      { name: 'Colors', color: 'rgba(34, 197, 94, 0.7)' }, // Green - color
    ];
    return patterns[channelIdx % patterns.length];
  };

  return (
    <div className="stage-visualization backbone-viz">
      <div className="viz-card primary-input">
        <div className="viz-label">Input: Street Scene</div>
        <div className="viz-placeholder feature-map">
          <img src="/images/street.jpg" alt="Street scene" className="stage-input-image" />
        </div>
        <div className="viz-meta">512×512</div>
      </div>
      <div className="viz-arrow">→</div>
      <div className="viz-card output">
        <div className="viz-label">Feature Extraction</div>
        <div className="viz-placeholder feature-grid-enhanced">
          {Array.from({ length: 16 }).map((_, i) => {
            const pattern = generateFeaturePattern(i);
            return (
              <div key={i} className="feature-map-cell" title={`Channel ${i + 1}`}>
                <div 
                  className="feature-cell-visual"
                  style={{
                    background: `linear-gradient(135deg, ${pattern.color} 0%, ${pattern.color.replace('0.7', '0.3')} 100%)`,
                    boxShadow: `inset 0 0 8px ${pattern.color.replace('0.7', '0.4')}`
                  }}
                />
                <div className="feature-cell-label">Ch. {i + 1}</div>
                <div className="feature-cell-type">{pattern.name}</div>
              </div>
            );
          })}
        </div>
        <div className="viz-meta">Feature Maps: 256 channels (showing 16 representatives)</div>
        <div className="feature-info">
          <div className="info-item">
            <span className="info-dot" style={{background: 'rgba(59, 130, 246, 0.7)'}}></span>
            <span>Edge Detection</span>
          </div>
          <div className="info-item">
            <span className="info-dot" style={{background: 'rgba(139, 92, 246, 0.7)'}}></span>
            <span>Texture</span>
          </div>
          <div className="info-item">
            <span className="info-dot" style={{background: 'rgba(236, 72, 153, 0.7)'}}></span>
            <span>Shape</span>
          </div>
          <div className="info-item">
            <span className="info-dot" style={{background: 'rgba(34, 197, 94, 0.7)'}}></span>
            <span>Color</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RPNStage() {
  return (
    <div className="stage-visualization rpn-viz">
      <div className="viz-card">
        <div className="viz-label">Feature Maps with Anchors</div>
        <div className="viz-placeholder rpn-input">
          <img src="/images/street.jpg" alt="Feature maps" className="stage-input-image small" />
          <div className="grid-overlay"></div>
        </div>
        <div className="viz-meta">Anchor Grid: 16px stride</div>
      </div>
      <div className="viz-arrow">→</div>
      <div className="viz-card">
        <div className="viz-label">Generated Proposals</div>
        <div className="viz-placeholder rpn-proposals">
          <img src="/images/street.jpg" alt="Proposals on image" className="stage-input-image small" />
          <svg className="proposal-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
            <rect x="8" y="37" width="28" height="33" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
            <rect x="10" y="33" width="24" height="4" fill="#3B82F6" />
            <text x="12" y="37" fontSize="3" fill="white" fontWeight="bold">92%</text>
            
            <rect x="50" y="40" width="32" height="35" fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.8" />
            <rect x="52" y="36" width="28" height="4" fill="#8B5CF6" opacity="0.8" />
            <text x="54" y="40" fontSize="3" fill="white" fontWeight="bold">76%</text>
            
            <rect x="25" y="15" width="30" height="22" fill="none" stroke="#EC4899" strokeWidth="1.5" opacity="0.6" />
            <rect x="27" y="11" width="26" height="4" fill="#EC4899" opacity="0.6" />
            <text x="29" y="15" fontSize="3" fill="white" fontWeight="bold">48%</text>
          </svg>
        </div>
        <div className="viz-meta">Top 3 proposals shown</div>
      </div>
    </div>
  );
}

function RoIStage() {
  return (
    <div className="stage-visualization roi-viz">
      <div className="viz-card">
        <div className="viz-label">Top Proposals (After NMS)</div>
        <div className="viz-placeholder roi-source">
          <img src="/images/street.jpg" alt="Proposals" className="stage-input-image small" />
          <svg className="roi-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
            <rect x="8" y="37" width="28" height="33" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
            <rect x="10" y="33" width="24" height="4" fill="#3B82F6" />
            <text x="12" y="37" fontSize="2.5" fill="white" fontWeight="bold">1</text>
            
            <rect x="50" y="40" width="32" height="35" fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.8" />
            <rect x="52" y="36" width="28" height="4" fill="#8B5CF6" opacity="0.8" />
            <text x="54" y="40" fontSize="2.5" fill="white" fontWeight="bold">2</text>
          </svg>
        </div>
        <div className="viz-meta">NMS filters low-confidence boxes</div>
      </div>
      <div className="viz-arrow">→</div>
      <div className="viz-card">
        <div className="viz-label">RoI Pooling: Extract & Normalize</div>
        <div className="viz-placeholder roi-pooling-demo">
          <div className="roi-pool-item">
            <div className="roi-pool-input">
              <div className="roi-pool-label-small">Proposal 1</div>
              <img src="/images/street.jpg" alt="Proposal 1" className="roi-crop-preview" />
            </div>
            <div className="roi-pool-arrow">→</div>
            <div className="roi-pool-grid">
              {Array.from({ length: 49 }).map((_, i) => (
                <div 
                  key={i} 
                  className="roi-cell"
                  style={{
                    background: `rgba(59, 130, 246, ${0.3 + Math.random() * 0.6})`
                  }}
                />
              ))}
            </div>
            <div className="roi-pool-label-small">7×7</div>
          </div>
        </div>
        <div className="viz-meta">Variable sizes → Fixed 7×7 tensors</div>
      </div>
    </div>
  );
}

function HeadStage() {
  return (
    <div className="stage-visualization head-viz">
      <div className="viz-card">
        <div className="viz-label">Classification Branch</div>
        <div className="viz-placeholder classification">
          <div className="class-row highlight">
            <span className="class-name">🚗 Car</span>
            <div className="class-score">92%</div>
          </div>
          <div className="class-row">
            <span className="class-name">Background</span>
            <div className="class-score">8%</div>
          </div>
        </div>
      </div>
      <div className="viz-arrow">→</div>
      <div className="viz-card">
        <div className="viz-label">Final Detection</div>
        <div className="viz-placeholder detection-final">
          <img src="/images/street.jpg" alt="Detection result" className="stage-input-image small" />
          <svg className="detection-box-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* First car detection box */}
            <rect x="8" y="37" width="28" height="33" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="10" y="33" width="24" height="5" fill="#10B981" rx="2" />
            <text x="14" y="38" fontSize="3.5" fill="white" fontWeight="bold" fontFamily="system-ui">Car 88%</text>
            
            {/* Second car detection box */}
            <rect x="50" y="40" width="32" height="35" fill="none" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="52" y="36" width="28" height="5" fill="#10B981" rx="2" />
            <text x="56" y="41" fontSize="3.5" fill="white" fontWeight="bold" fontFamily="system-ui">Car 92%</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;
