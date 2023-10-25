function drawHorizontalBarChart(id, data, name, value) {
  let svgToRemove = d3.select(id).select("svg");
  svgToRemove.remove();

  // Set the dimensions and margins for the chart
  const margin = { top: 20, right: 30, bottom: 30, left: 50 };
  //const width = 500;
  const containerWidth = document.getElementById("diagrams-column").offsetWidth;

  const width = containerWidth - margin.left - margin.right - 15;
  const height = 200 - margin.top - margin.bottom;

  // Create a scale for X and Y axes
  const xScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return d[value] + 10;
      }),
    ])
    .range([0, width]);
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d[name]))
    .range([0, height])
    .padding(0.1);

  // Create the SVG element
  const svg = d3
    .select(id)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Create horizontal bars
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("id", (d) => "ID" + d[name])
    .attr("y", (d) => yScale(d[name]))
    .attr("width", (d) => xScale(d[value]))
    .attr("height", yScale.bandwidth())
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("fill", mainColor);

  // Add X and Y axes
  svg.append("g").call(d3.axisLeft(yScale));
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Add labels to bars
  svg
    .selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", (d) => xScale(d[value]) + 5) // Offset the labels a bit from the bars
    .attr("y", (d) => yScale(d[name]) + yScale.bandwidth() / 2)
    .text((d) => d[value]);
}
