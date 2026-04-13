import { useCallback, useRef, useEffect, useState } from "react";
import gsap from "gsap";

/**
 * Hook to manage stage expansion with GSAP FLIP animation
 * FLIP: First, Last, Invert, Play
 */
export function useStageExpand() {
  const containerRef = useRef(null);
  const [expandedStage, setExpandedStage] = useState(null);

  const toggleExpand = useCallback((stageId) => {
    if (!containerRef.current) return;

    // Save current state
    const state = gsap.getProperty(containerRef.current, "height");

    // Update state
    setExpandedStage(expandedStage === stageId ? null : stageId);

    // Measure new state and animate
    gsap.to(containerRef.current, {
      height: "auto",
      duration: 0.4,
      ease: "power2.inOut",
    });
  }, [expandedStage]);

  return { containerRef, expandedStage, toggleExpand };
}

/**
 * Hook to sync narrative step with stage focus
 * When advanced through narrative, highlight corresponding stage
 */
export function useNarrativeSync(totalStages) {
  const [narrativeStep, setNarrativeStep] = React.useState(0);

  const next = useCallback(() => {
    setNarrativeStep((prev) => Math.min(prev + 1, totalStages - 1));
  }, [totalStages]);

  const prev = useCallback(() => {
    setNarrativeStep((prev) => Math.max(prev - 1, 0));
  }, []);

  return { narrativeStep, next, prev };
}

/**
 * Hook to manage flow path highlighting
 * Dims inactive flows, highlights active ones
 */
export function useFlowHighlight(activeStage) {
  const flowRefs = useRef([]);

  useEffect(() => {
    flowRefs.current.forEach((el, index) => {
      if (!el) return;

      const isActive = index <= activeStage;
      gsap.to(el, {
        opacity: isActive ? 0.9 : 0.2,
        duration: 0.3,
        ease: "power2.inOut",
      });
    });
  }, [activeStage]);

  return flowRefs;
}
