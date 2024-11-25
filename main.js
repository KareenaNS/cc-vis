// // Load the dataset
// d3.csv('data/number-of-natural-disaster-events.csv').then(function(data) {
  
//     // Parse the data: Convert years and disasters counts to numbers
//     data.forEach(d => {
//       d.Year = +d.Year;
//       d.Disasters = +d.Disasters;
//     });
  
//     // Set up chart dimensions
//     const width = 800;
//     const height = 400;
//     const margin = { top: 20, right: 30, bottom: 40, left: 50 };
  
//     const svg = d3.select("#disaster-chart")
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
//     // Set up scales for the chart
//     const xScale = d3.scaleLinear()
//       .domain([1900, d3.max(data, d => d.Year)])
//       .range([0, width]);
  
//     const yScale = d3.scaleLinear()
//       .domain([0, d3.max(data, d => d.Disasters)])
//       .range([height, 0]);
  
//     const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d")).ticks(d3.timeYear.every(10));
//     const yAxis = d3.axisLeft(yScale);
  
//     // Add x-axis and y-axis to the chart
//     svg.append("g")
//       .attr("class", "x-axis")
//       .attr("transform", `translate(0, ${height})`)
//       .call(xAxis);
  
//     svg.append("g")
//       .attr("class", "y-axis")
//       .call(yAxis);

//     const colorScale = d3.scaleOrdinal()
//       .domain(["All disasters", "Wildfire", "Wet Mass Movement", "Volcanic Activity", 
//         "Glacial Lake Outburst Flood", "Fog", "Flood", "Extreme Temperature", "Extreme Weather", 
//         "Earthquake", "Dry Mass Movement", "Drought"])  // Add more types if needed
//       .range(["#1f77b4", "#eb4034", "#0091ff", "#ff8000", "#91f2ff", "#7d7d7d", "#2100a3", 
//         "#ff00dd", "#047500", "#6e4c22", "#a883f7", "#ccc22f"]);  // You can choose any color you want  
//         //whatever, red, blue, orange, light blue, grey, dark purple, bright pink, dark green, brown, light purple, yellow

//     // Function to render the scatter plot based on the selected disaster type
//     function renderChart(disasterType) {
//       // Filter data based on the selected disaster type
//       const filteredData = data.filter(d => d.Entity === disasterType || disasterType === "All disasters");
  
//       // Bind data and create/update the circles (dots)
//       const circles = svg.selectAll(".dot")
//         .data(filteredData);
  
//       // Remove any existing circles
//       circles.exit().remove();
  
//       // Enter new circles for the updated data
//       circles.enter().append("circle")
//         .attr("class", "dot")
//         .attr("cx", d => xScale(d.Year))
//         .attr("cy", d => yScale(d.Disasters))
//         .attr("r", 5)
//         .style("fill", d => colorScale(d.Entity))  // Color based on the disaster type
//         .style("opacity", 0.7);
  
//       // Update existing circles
//       circles.attr("cx", d => xScale(d.Year))
//         .attr("cy", d => yScale(d.Disasters))
//         .attr("r", 5)
//         .style("fill", d => colorScale(d.Entity));  // Update color when the data changes
//     }
  
//     // Initialize the chart with the "All disasters" data
//     renderChart("All disasters");
  
//     // Event listener for dropdown change to filter the data
//     d3.select("#disaster-select").on("change", function() {
//       const selectedDisasterType = this.value;
//       renderChart(selectedDisasterType);  // Re-render chart with selected disaster type
//     });

//     const legend = d3.select("#legend");

//     // Legend data: array of disaster types and their corresponding colors
//     const legendData = [
//       { name: "All disasters", color: "#1f77b4" },
//       { name: "Wildfire", color: "#eb4034" },
//       { name: "Wet Mass Movement", color: "#0091ff" },
//       { name: "Volcanic Activity", color: "#ff8000" },
//       { name: "Glacial Lake Outburst Flood", color: "#91f2ff" },
//       { name: "Fog", color: "#7d7d7d" },
//       { name: "Flood", color: "#2100a3" },
//       { name: "Extreme Temperature", color: "#ff00dd" },
//       { name: "Extreme Weather", color: "#047500" },
//       { name: "Earthquake", color: "#6e4c22" },
//       { name: "Dry Mass Movement", color: "#a883f7" },
//       { name: "Drought", color: "#ccc22f" }
//     ];
  
//     // Append the legend items
//     const legendItems = legend.selectAll(".legend-item")
//       .data(legendData)
//       .enter()
//       .append("div")
//       .attr("class", "legend-item");
  
//     // Create color box and name for each legend item
//     legendItems.append("div")
//       .style("width", "20px")
//       .style("height", "20px")
//       .style("background-color", d => d.color)
//       .style("display", "inline-block")
//       .style("margin-right", "10px");
  
//     legendItems.append("span")
//       .text(d => d.name);
  
//   });
  

// Load the dataset
d3.csv('data/number-of-natural-disaster-events.csv').then(function(data) {
  
    // Parse the data: Convert years and disasters counts to numbers
    data.forEach(d => {
      d.Year = +d.Year;
      d.Disasters = +d.Disasters;
    });
  
    // Set up chart dimensions
    const width = 1000;
    const height = 300;
    const margin = { top: 30, right: 30, bottom: 40, left: 50 };
  
    const svg = d3.select("#disaster-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
  

    // Set up scales for the chart
    const xScale = d3.scaleLinear()
    .domain([1900, d3.max(data, d => d.Year)])  // Set domain from 1900 to the max year in data
    .range([0, width]);

    const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Disasters)])  // Set y-axis range
    .range([height, 0]);

// Create x-axis using linear scale and set tick formatting (show years)
const xAxis = d3.axisBottom(xScale)
  .ticks(d3.max(data, d => d.Year) - 1900)  // Calculate number of ticks based on the year range
  .tickFormat(d3.format("d"))  // Format tick values as integers (years)
  .tickValues(d3.range(1900, d3.max(data, d => d.Year), 10));  // Ticks every 10 years


    console.log(xAxis)
    // Create y-axis
    const yAxis = d3.axisLeft(yScale);

    // Add x-axis and y-axis to the chart
    svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)  // Position x-axis at the bottom
    .call(xAxis)
    .selectAll("text")  // Select all text elements on the x-axis
    .style("text-anchor", "middle")  // Center align the labels

    svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis);

        // Add x-axis label
        svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)  // Position at the middle of the x-axis
        .attr("y", height + margin.bottom)  // Position slightly below the axis
        .style("text-anchor", "middle")  // Center the text
        .text("Year")
        .style("font-size", "14px");
  
      // Add y-axis label
      svg.append("text")
        .attr("class", "y-axis-label")
        .attr("x", -height / 2)  // Position at the middle of the y-axis
        .attr("y", -margin.left + 10)  // Position slightly to the left of the axis
        .attr("transform", "rotate(-90)")  // Rotate to make it vertical
        .style("text-anchor", "middle")  // Center the text
        .text("Number of Disasters")
        .style("font-size", "14px");

            // Add title to the chart
    svg.append("text")
    .attr("class", "chart-title")
    .attr("x", width / 2)  // Position at the center of the chart
    .attr("y", -margin.top / 2)  // Position at the top of the chart
    .style("text-anchor", "middle")  // Center the text
    .text("Global Natural Disaster Events Over Time")
    .style("font-size", "18px")
    .style("font-weight", "bold");


    const colorScale = d3.scaleOrdinal()
      .domain(["All Disasters", "Wildfire", "Wet Mass Movement", "Volcanic Activity", 
        "Glacial Lake Outburst Flood", "Fog", "Flood", "Extreme Temperature", "Extreme Weather", 
        "Earthquake", "Dry Mass Movement", "Drought"])  // Add more types if needed
      .range(["#1f77b4", "#eb4034", "#0091ff", "#ff8000", "#91f2ff", "#7d7d7d", "#2100a3", 
        "#ff00dd", "#047500", "#6e4c22", "#a883f7", "#ccc22f"]);  // You can choose any color you want  
        //whatever, red, blue, orange, light blue, grey, dark purple, bright pink, dark green, brown, light purple, yellow

    // Function to render the scatter plot based on the selected disaster type
    function renderChart(disasterType) {
      // Filter data based on the selected disaster type
      const filteredData = data.filter(d => d.Entity === disasterType || disasterType === "All Disasters");
  
      // Bind data and create/update the circles (dots)
      const circles = svg.selectAll(".dot")
        .data(filteredData);
  
      // Remove any existing circles
      circles.exit().remove();
  
      // Enter new circles for the updated data
      circles.enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(d.Year))
        .attr("cy", d => yScale(d.Disasters))
        .attr("r", 5)
        .style("fill", d => colorScale(d.Entity))  // Color based on the disaster type
        .style("opacity", 0.7);
  
      // Update existing circles
      circles.attr("cx", d => xScale(d.Year))
        .attr("cy", d => yScale(d.Disasters))
        .attr("r", 5)
        .style("fill", d => colorScale(d.Entity));  // Update color when the data changes
    }
  
    // Initialize the chart with the "All disasters" data
    renderChart("All Disasters");
  
    // Event listener for dropdown change to filter the data
    d3.select("#disaster-select").on("change", function() {
      const selectedDisasterType = this.value;
      renderChart(selectedDisasterType);  // Re-render chart with selected disaster type
    });

    const legend = d3.select("#legend");

    // Legend data: array of disaster types and their corresponding colors
    const legendData = [
      { name: "All Disasters", color: "#1f77b4" },
      { name: "Wildfire", color: "#eb4034" },
      { name: "Wet Mass Movement", color: "#0091ff" },
      { name: "Volcanic Activity", color: "#ff8000" },
      { name: "Glacial Lake Outburst Flood", color: "#91f2ff" },
      { name: "Fog", color: "#7d7d7d" },
      { name: "Flood", color: "#2100a3" },
      { name: "Extreme Temperature", color: "#ff00dd" },
      { name: "Extreme Weather", color: "#047500" },
      { name: "Earthquake", color: "#6e4c22" },
      { name: "Dry Mass Movement", color: "#a883f7" },
      { name: "Drought", color: "#ccc22f" }
    ];
  
    // Append the legend items
    const legendItems = legend.selectAll(".legend-item")
      .data(legendData)
      .enter()
      .append("div")
      .attr("class", "legend-item");
  
    // Create color box and name for each legend item
    legendItems.append("div")
      .style("width", "20px")
      .style("height", "20px")
      .style("background-color", d => d.color)
      .style("display", "inline-block")
      .style("margin-right", "10px");
  
    legendItems.append("span")
      .text(d => d.name);
  
  });
  