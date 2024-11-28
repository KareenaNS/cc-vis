// Wait for the page to load
document.addEventListener("DOMContentLoaded", function () {
    // Select the project description section
    const projectDescription = document.querySelector(".project-description");
  
    // Set up an IntersectionObserver to trigger the animation when the section is in view
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the 'visible' class to the section when it's in view
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.5  // Trigger when 50% of the section is visible
    });
  
    // Start observing the project description section
    observer.observe(projectDescription);
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    // Select the new fade-in section
    const fadeInSection = document.querySelector(".fade-in-section");
  
    // Set up an IntersectionObserver to trigger the animation when the section is in view
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the 'visible' class to trigger the fade-in animation
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.5  // Trigger when 50% of the section is visible
    });
  
    // Start observing the fade-in section
    observer.observe(fadeInSection);
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer to trigger the typewriter effect when in view
    const typewriterElements = document.querySelectorAll('.typewriter-section');
    const observerOptions = {
      root: null,
      threshold: 0.1
    };
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the class to start the typewriter effect
          entry.target.querySelector('.typewriter-text').classList.add('start-typing');
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    typewriterElements.forEach(element => {
      observer.observe(element);
    });
  });

  
d3.csv('data/number-of-natural-disaster-events.csv').then(function(data) {
    data.forEach(d => {
      d.Year = +d.Year;
      d.Disasters = +d.Disasters;
    });
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
    .ticks(d3.max(data, d => d.Year) - 1900)
    .tickFormat(d3.format("d"))
    .tickValues(d3.range(1900, d3.max(data, d => d.Year), 10));
    const yAxis = d3.axisLeft(yScale);

    // Add x-axis and y-axis to the chart
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .selectAll("path")  // Select the axis line
        .style("stroke", "white")  // Make the axis line white
    svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis)
        .selectAll("path")
        .style("stroke", "white")  // Make the axis line white
    svg.selectAll("text") 
        .style("text-anchor", "middle")
        .style("fill", "white");  // Make the x-axis labels white
    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)  // Position at the middle of the x-axis
        .attr("y", height + margin.bottom)  // Position slightly below the axis
        .style("text-anchor", "middle")  // Center the text
        .text("Year")
        .style("font-size", "14px")
        .style("fill", "white");  // Make the x-axis label white
    svg.append("text")
        .attr("class", "y-axis-label")
        .attr("x", -height / 2)  // Position at the middle of the y-axis
        .attr("y", -margin.left + 10)  // Position slightly to the left of the axis
        .attr("transform", "rotate(-90)")  // Rotate to make it vertical
        .style("text-anchor", "middle")  // Center the text
        .text("Number of Disasters")
        .style("font-size", "14px")
        .style("fill", "white");  // Make the x-axis label white
    // svg.append("text")
    //     .attr("class", "chart-title")
    //     .attr("x", width / 2)  // Position at the center of the chart
    //     .attr("y", -margin.top / 2)  // Position at the top of the chart
    //     .style("text-anchor", "middle")  // Center the text
    //     .text("Global Natural Disaster Events Over Time")
    //     .style("font-size", "18px")
    //     .style("font-weight", "bold")
    //     .style("fill", "white");  // Make the x-axis label white

    const colorScale = d3.scaleOrdinal()
      .domain(["All Disasters", "Wildfire", "Wet Mass Movement", "Volcanic Activity", 
        "Glacial Lake Outburst Flood", "Fog", "Flood", "Extreme Temperature", "Extreme Weather", 
        "Earthquake", "Dry Mass Movement", "Drought"])  // Add more types if needed
      .range(["#1f77b4", "#eb4034", "#0091ff", "#ff8000", "#91f2ff", "#7d7d7d", "#2100a3", 
        "#ff00dd", "#047500", "#6e4c22", "#a883f7", "#ccc22f"]);  // You can choose any color you want  
        //whatever, red, blue, orange, light blue, grey, dark purple, bright pink, dark green, brown, light purple, yellow
    const tooltip = d3.select("#tooltip");
    function renderChart(disasterType) {
      const filteredData = data.filter(d => d.Entity === disasterType || disasterType === "All Disasters");
      const circles = svg.selectAll(".dot")
        .data(filteredData);
      circles.exit().remove();  
      circles.enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => xScale(d.Year))
        .attr("cy", d => yScale(d.Disasters))
        .attr("r", 5)
        .style("fill", d => colorScale(d.Entity))  // Color based on the disaster type
        .style("opacity", 0.7)
        .on("mouseover", function(event, d) {
            tooltip.style("display", "inline-block")  // Show tooltip
              .html(`Year: ${d.Year}<br>Disasters: ${d.Disasters}<br>Type: ${d.Entity}`);
          })
        .on("mousemove", function(event) {
            tooltip.style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 25) + "px");
        })
        .on("mouseout", function() {
            tooltip.style("display", "none");  // Hide tooltip when mouse leaves
        });
  
      circles.attr("cx", d => xScale(d.Year))
        .attr("cy", d => yScale(d.Disasters))
        .attr("r", 5)
        .style("fill", d => colorScale(d.Entity));  // Update color when the data changes
    }
  
    renderChart("All Disasters");
    d3.select("#disaster-select").on("change", function() {
      const selectedDisasterType = this.value;
      renderChart(selectedDisasterType);  // Re-render chart with selected disaster type
    });
  });
  



//second vis
// d3.csv('data/annual-co2-emissions-by-country.csv').then(function(data) {

//     // Parse the data: Convert year and CO2 emissions to numbers
//     data.forEach(d => {
//         d.Year = +d.Year;
//         d.CO2_Emissions = +d["Annual CO2 Emissions"]; // CO2 emissions in metric tons
//     });

//     // Set up chart dimensions
//     const width = 1000;
//     const height = 500;
//     const margin = { top: 20, right: 30, bottom: 50, left: 70 };

//     const svg = d3.select("#co2-chart")
//       .append("svg")
//       .attr("width", width + margin.left + margin.right)
//       .attr("height", height + margin.top + margin.bottom)
//       .append("g")
//       .attr("transform", `translate(${margin.left}, ${margin.top})`);

//     // Set up scales
//     const xScale = d3.scaleLinear()
//       .range([0, width]); // Use linear scale for x-axis (years)

//     const yScale = d3.scaleLinear()
//       .range([height, 0]);

//     const colorScale = d3.scaleOrdinal(d3.schemeCategory10); // Default color scale

//     // Define the xAxis to group by decade
//     const xAxis = d3.axisBottom(xScale)
//       .tickValues(d3.range(1900, d3.max(data, d => d.Year) + 1, 10))  // Show every 10th year
//       .tickFormat(d3.format("d"));  // Format ticks as integers (e.g., 1950, 1960, etc.)

//     const yAxis = d3.axisLeft(yScale)
//       .tickFormat(d3.format(".2s")); // Use scientific notation for large values

//     // Add x-axis and y-axis
//     svg.append("g")
//       .attr("transform", `translate(0, ${height})`)
//       .attr("class", "x-axis");

//     svg.append("g")
//       .attr("class", "y-axis");

//     // Add axis titles
//     svg.append("text")
//       .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 10})`)
//       .style("text-anchor", "middle")
//       .text("Year");

//     svg.append("text")
//       .attr("transform", "rotate(-90)")
//       .attr("x", -height / 2)
//       .attr("y", -margin.left + 20)
//       .style("text-anchor", "middle")
//       .text("CO2 Emissions (Millions of Metric Tons)");

//     // Add dropdown for country/region selection
//     d3.select("#country-select")
//       .on("change", function() {
//         const selectedCountry = this.value;
//         updateChart(selectedCountry);  // Function to update the chart
//       });

//     // Function to update chart based on selected country
//     function updateChart(selectedCountry) {
//         // Filter data based on the selected country or show all if "All" is selected
//         const filteredData = selectedCountry === "All" ? data : data.filter(d => d.Country === selectedCountry);

//         // Group data by Year and Country using d3.group()
//         const groupedData = d3.group(filteredData, d => d.Year, d => d.Country);

//         // Process the grouped data to stack it into a format suitable for a stacked bar chart
//         const stackData = Array.from(groupedData.entries()).map(([year, countryData]) => {
//             const values = Array.from(countryData.entries()).map(([country, values]) => {
//                 return { country, value: d3.sum(values, d => d.CO2_Emissions) };
//             });
//             return { year, values };
//         });

//         // Scale down CO2 emissions for easier readability (e.g., divide by 1 million for millions of metric tons)
//         stackData.forEach(d => {
//             d.values.forEach(v => {
//                 v.value /= 1000000; // Scaling down the values to millions of metric tons
//             });
//         });

//         // Update the xScale and yScale domains based on the data
//         xScale.domain([d3.min(stackData, d => d.year), d3.max(stackData, d => d.year)]);  // Years on x-axis
//         yScale.domain([0, d3.max(stackData, d => d3.sum(d.values, v => v.value))]); // Maximum total emissions for y-axis

//         svg.select(".x-axis").call(xAxis);
//         svg.select(".y-axis").call(yAxis);

//         // Bind data to bars (stacked)
//         const bars = svg.selectAll(".bar")
//           .data(stackData, d => d.year);

//         // Remove old bars for exiting data
//         bars.exit().remove();

//         // Enter new bars for new data
//         const newBars = bars.enter().append("g")
//           .attr("class", "bar")
//           .attr("transform", d => `translate(${xScale(d.year)}, 0)`);

//         newBars.selectAll("rect")
//           .data(d => d.values)
//           .enter().append("rect")
//           .attr("x", 0)  // Align the bars at the start
//           .attr("y", d => yScale(d.value))  // Set the y position based on CO2 emissions
//           .attr("width", (d, i) => {
//             // Calculate width manually since we're using a linear scale
//             const yearWidth = xScale(d3.max(stackData, d => d.year)) / stackData.length;
//             return yearWidth;
//           })
//           .attr("height", d => height - yScale(d.value))  // Height of the bar (scaled by emissions)
//           .style("fill", d => colorScale(d.country))  // Color based on country
//           .on("mouseover", function(event, d) {
//             // Show tooltip on hover
//             tooltip.style("display", "inline-block")
//               .html(`Country: ${d.country}<br>Year: ${d.year}<br>CO2 Emissions: ${d3.format(".2f")(d.value)} Million Metric Tons`)
//               .style("left", (event.pageX + 10) + "px")
//               .style("top", (event.pageY - 25) + "px");
//           })
//           .on("mouseout", function() {
//             tooltip.style("display", "none");
//           });

//         // Update bars for existing data
//         bars.selectAll("rect")
//           .data(d => d.values)
//           .transition()
//           .duration(500)
//           .attr("y", d => yScale(d.value))  // Update y position
//           .attr("height", d => height - yScale(d.value));  // Update height
//     }

//     // Initialize the chart with "All" countries
//     updateChart("All");

//     // Tooltip for hover effects
//     const tooltip = d3.select("#tooltip")
//       .style("position", "absolute")
//       .style("background-color", "lightgray")
//       .style("padding", "8px")
//       .style("border-radius", "5px")
//       .style("display", "none");

// });

d3.csv('data/annual-co2-emissions-by-country.csv').then(function(data) {
    // Parse the data: Convert year and CO2 emissions to numbers
    data.forEach(d => {
        d.Year = +d.Year;
        d.CO2_Emissions = +d["Annual CO2 Emissions"]; // CO2 emissions in metric tons
    });

    // Set up chart dimensions
    const width = 1000;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 50, left: 70 };

    const svg = d3.select("#co2-chart")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Set up scales
    const xScale = d3.scaleLinear()
      .range([0, width]); // Use linear scale for x-axis (years)

    const yScale = d3.scaleLinear()
      .range([height, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10); // Default color scale

    // Define the xAxis to group by decade
    const xAxis = d3.axisBottom(xScale)
      .tickValues(d3.range(1900, d3.max(data, d => d.Year) + 1, 10))  // Show every 10th year
      .tickFormat(d3.format("d"));  // Format ticks as integers (e.g., 1950, 1960, etc.)

    const yAxis = d3.axisLeft(yScale)
      .tickFormat(d3.format(".2s")); // Use scientific notation for large values

    // Add x-axis and y-axis
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .attr("class", "x-axis");

    svg.append("g")
      .attr("class", "y-axis");

    // Add axis titles
    svg.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 10})`)
      .style("text-anchor", "middle")
      .text("Year");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", -margin.left + 20)
      .style("text-anchor", "middle")
      .text("CO2 Emissions (Millions of Metric Tons)");

    // Add dropdown for country/region selection
    d3.select("#country-select")
      .on("change", function() {
        const selectedCountry = this.value;
        updateChart(selectedCountry);  // Function to update the chart
      });

    // Function to update chart based on selected country
    function updateChart(selectedCountry) {
        // Filter data based on the selected country or show all if "All" is selected
        const filteredData = selectedCountry === "All" ? data : data.filter(d => d.Country === selectedCountry);

        // Group data by Year and Country using d3.group()
        const groupedData = d3.group(filteredData, d => d.Year, d => d.Country);

        // Process the grouped data to stack it into a format suitable for a stacked bar chart
        const stackData = Array.from(groupedData.entries()).map(([year, countryData]) => {
            const values = Array.from(countryData.entries()).map(([country, values]) => {
                return { country, value: d3.sum(values, d => d.CO2_Emissions) };
            });
            return { year, values };
        });

        // Scale down CO2 emissions for easier readability (e.g., divide by 1 million for millions of metric tons)
        stackData.forEach(d => {
            d.values.forEach(v => {
                v.value /= 1000000; // Scaling down the values to millions of metric tons
            });
        });

        // Update the xScale and yScale domains based on the data
        xScale.domain([d3.min(stackData, d => d.year), d3.max(stackData, d => d.year)]);  // Years on x-axis
        yScale.domain([0, d3.max(stackData, d => d3.sum(d.values, v => v.value))]); // Maximum total emissions for y-axis

        svg.select(".x-axis").call(xAxis);
        svg.select(".y-axis").call(yAxis);

        const stack = d3.stack()
        .keys(Array.from(new Set(data.map(d => d.Country))))  // Use unique country names as the keys for stacking
        .value((d, key) => {
            const countryData = d.values.find(v => v.country === key);
            return countryData ? countryData.value : 0;
        });
        const stackedData = stack(stackData);

        // Bind data to bars (stacked)
        const bars = svg.selectAll(".bar")
          .data(stackedData, d => d.year);

        // Remove old bars for exiting data
        bars.exit().remove();

        // Enter new bars for new data
        const newBars = bars.enter().append("g")
          .attr("class", "bar")
          .attr("transform", d => {
              const xPos = xScale(d.year);
              return !isNaN(xPos) ? `translate(${xPos}, 0)` : 'translate(0, 0)';
          });

        newBars.selectAll("rect")
          .data(d => d.values)
          .enter().append("rect")
          .attr("x", 0)  // Align the bars at the start
          .attr("y", d => yScale(d.value))  // Set the y position based on CO2 emissions
          .attr("width", (d, i) => {
            // Calculate width manually since we're using a linear scale
            const yearWidth = xScale(d3.max(stackData, d => d.year)) / stackData.length;
            return yearWidth;
          })
          .attr("height", d => height - yScale(d.value))  // Height of the bar (scaled by emissions)
          .style("fill", d => colorScale(d.country))  // Color based on country
          .on("mouseover", function(event, d) {
            // Show tooltip on hover
            tooltip.style("display", "inline-block")
              .html(`Country: ${d.country}<br>Year: ${d.Year}<br>CO2 Emissions: ${d3.format(".2f")(d.value)} Million Metric Tons`)
              .style("left", (event.pageX + 10) + "px")
              .style("top", (event.pageY - 25) + "px");
          })
          .on("mouseout", function() {
            tooltip.style("display", "none");
          });

        // Update bars for existing data
        bars.selectAll("rect")
          .data(d => d.values)
          .transition()
          .duration(500)
          .attr("y", d => yScale(d.value))  // Update y position
          .attr("height", d => height - yScale(d.value));  // Update height
    }

    // Initialize the chart with "All" countries
    updateChart("All");

    // Tooltip for hover effects
    const tooltip = d3.select("#tooltip")
      .style("position", "absolute")
      .style("background-color", "lightgray")
      .style("padding", "8px")
      .style("border-radius", "5px")
      .style("display", "none");

});
