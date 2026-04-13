import { ChevronDown } from "lucide-react";
import { colors, getStageColor } from "../constants/colors.js";
import "../styles/Stage.css";

export function Stage({ stage, index, isActive, onFocus, onClick, children }) {
  const stageColor = getStageColor(index);

  const handleClick = () => {
    onFocus?.(index);
    onClick?.(index);
  };

  return (
    <div
      className={`stage-container ${isActive ? "active" : ""}`}
      style={{
        "--stage-color": stageColor.primary,
        "--stage-light": stageColor.light,
        "--stage-accent": stageColor.accent,
      }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {/* Stage header */}
      <div className="stage-header">
        <div className="stage-number">{stage.number}</div>
        <div className="stage-title-group">
          <h3 className="stage-title">{stage.title}</h3>
          <p className="stage-subtitle">{stage.subtitle}</p>
        </div>
        <button className="expand-toggle" onClick={(e) => e.stopPropagation()}>
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Stage content preview */}
      <div className="stage-content">{children}</div>
    </div>
  );
}

export default Stage;
