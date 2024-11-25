// Set up chart dimensions
const width = 800;
const height = 400;

// Select the div where the chart will go
const chartContainer = d3.select("#temperature-chart")
  .append("svg")  // Append an SVG element to the container
  .attr("width", width)
  .attr("height", height)
  .style("border", "1px solid black"); // Optional: Add border to see if the SVG is visible

// Add a circle to the SVG for testing
chartContainer.append('circle')
  .attr('cx', width / 2)  // Center the circle horizontally
  .attr('cy', height / 2) // Center the circle vertically
  .attr('r', 100)
  .style('fill', 'blue');  // Make the circle blue
