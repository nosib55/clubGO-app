import { useEffect, useRef } from "react";
import * as d3 from "d3";

const COLORS = ["#2563eb", "#16a34a"];

const RevenuePieD3 = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 400;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value(d => d.value);

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius);

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "#111")
      .style("color", "#fff")
      .style("padding", "6px 10px")
      .style("border-radius", "6px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    g.selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (_, i) => COLORS[i])
      .on("mousemove", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(`${d.data.name}: $${d.data.value}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 20 + "px");
      })
      .on("mouseout", () => tooltip.style("opacity", 0));

    return () => tooltip.remove();
  }, [data]);

  return <svg ref={svgRef} className="mx-auto" />;
};

export default RevenuePieD3;
