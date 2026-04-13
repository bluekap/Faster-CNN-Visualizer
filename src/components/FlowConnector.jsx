import { useEffect, useRef } from "react";
import * as d3 from "d3";

export function FlowConnector({ active = false, color = "#a855f7" }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 100;
    const height = 100;

    // Set SVG dimensions
    const svg = d3.select(svgRef.current);
    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    // Clear previous content
    svg.selectAll("*").remove();

    // Create vertical curved path (downward flow)
    const curve = d3.line()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(d3.curveMonotoneY);

    const pathData = [
      [width / 2, 10],
      [width / 2, height - 10],
    ];

    svg
      .append("path")
      .attr("d", curve(pathData))
      .attr("fill", "none")
      .attr("stroke", active ? color : `${color}40`)
      .attr("stroke-width", active ? 3 : 2)
      .attr("stroke-linecap", "round")
      .attr("opacity", active ? 0.9 : 0.4)
      .style("transition", "stroke 0.3s ease, opacity 0.3s ease");

    // Add arrowhead marker pointing downward
    svg
      .append("defs")
      .append("marker")
      .attr("id", `arrowhead-${Math.random()}`)
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("refX", 5)
      .attr("refY", 9)
      .attr("orient", "auto")
      .append("polygon")
      .attr("points", "0 0, 10 0, 5 10")
      .attr("fill", active ? color : `${color}40`);
  }, [active, color]);

  return <svg ref={svgRef} className="flow-connector" style={{ width: "100%", height: "100px" }} />;
}

export default FlowConnector;
