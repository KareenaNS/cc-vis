//stuff for the animation in the text elements
document.addEventListener("DOMContentLoaded", function () {
    const projectDescription = document.querySelector(".project-description");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.5
    });
      observer.observe(projectDescription);
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const fadeInSection = document.querySelector(".fade-in-section");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.5
    });
    observer.observe(fadeInSection);
  });

  document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer to trigger the typewriter effect when in view
    const typewriterElements = document.querySelectorAll('.typewriter-text');
    const observerOptions = {
      root: null,
      threshold: 0.5
    };
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the class to start the typewriter effect
          entry.target.classList.add('start-typing'); 
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    typewriterElements.forEach(element => {
      observer.observe(element);
    });
  });





//first vis
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
    const xScale = d3.scaleLinear()
    .domain([1900, d3.max(data, d => d.Year)])
    .range([0, width]);
    const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Disasters)])
    .range([height, 0]);
    const xAxis = d3.axisBottom(xScale)
    .ticks(d3.max(data, d => d.Year) - 1900)
    .tickFormat(d3.format("d"))
    .tickValues(d3.range(1900, d3.max(data, d => d.Year), 10));
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .selectAll("path")
        .style("stroke", "white")
    svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis)
        .selectAll("path")
        .style("stroke", "white")
    svg.selectAll("text") 
        .style("text-anchor", "middle")
        .style("fill", "white");
    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom)
        .style("text-anchor", "middle")
        .text("Year")
        .style("font-size", "14px")
        .style("fill", "white");
    svg.append("text")
        .attr("class", "y-axis-label")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 10)
        .attr("transform", "rotate(-90)")
        .style("text-anchor", "middle")
        .text("Number of Disasters")
        .style("font-size", "14px")
        .style("fill", "white");

    const colorScale = d3.scaleOrdinal()
      .domain(["All Disasters", "Wildfire", "Wet Mass Movement", "Volcanic Activity", 
        "Glacial Lake Outburst Flood", "Fog", "Flood", "Extreme Temperature", "Extreme Weather", 
        "Earthquake", "Dry Mass Movement", "Drought"])
      .range(["#00f0ff", "#eb4034", "#0091ff", "#ff8000", "#91f2ff", "#ffffff", "#ad00ff", 
        "#ff00dd", "#047500", "#00ff03", "#a883f7", "#f8ed34"]);  // You can choose any color you want  
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
        .style("fill", d => colorScale(d.Entity))
        .style("opacity", 0.7)
        .on("mouseover", function(event, d) {
            tooltip.style("display", "inline-block")
              .html(`Year: ${d.Year}<br>Disasters: ${d.Disasters}<br>Type: ${d.Entity}`);
          })
        .on("mousemove", function(event) {
            tooltip.style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 25) + "px");
        })
        .on("mouseout", function() {
            tooltip.style("display", "none");
        });
  
      circles.attr("cx", d => xScale(d.Year))
        .attr("cy", d => yScale(d.Disasters))
        .attr("r", 5)
        .style("fill", d => colorScale(d.Entity));
    }
    renderChart("All Disasters");
    d3.select("#disaster-select").on("change", function() {
      const selectedDisasterType = this.value;
      renderChart(selectedDisasterType);
    });
  });
  


  

//second vis
d3.csv('data/annual-co2-emissions-by-country.csv').then(function(data) {
  data.forEach(d => {
      d.Year = +d.Year;
      d.CO2_Emissions = +d["Annual CO2 Emissions"];
  });
  const width = 1000;
  const height = 500;
  const margin = { top: 20, right: 30, bottom: 50, left: 70 };
  const svg = d3.select("#co2-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  const xScale = d3.scaleLinear()
    .range([0, width]);
  const yScale = d3.scaleLinear()
    .range([height, 0]);
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  const xAxis = d3.axisBottom(xScale)
    .tickValues(d3.range(1900, d3.max(data, d => d.Year) + 1, 10))
    .tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale)
    .tickFormat(d3.format(".2s"));
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .attr("class", "x-axis")
    .call(xAxis)
    .selectAll("path")
    .style("stroke", "white");
  svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis)
    .selectAll("path")
    .style("stroke", "white");
  svg.append("g")
    .selectAll("text")
    .style("text-anchor", "middle")
    .style("fill", "white");
  svg.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.bottom - 10})`)
    .style("text-anchor", "middle")
    .style("fill", "white")
    .text("Year");
  svg.append("text")
    .attr("class", "y-axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left + 20)
    .style("text-anchor", "middle")
    .style("fill", "white")
    .text("CO2 Emissions (Millions of Metric Tons)");
  svg.selectAll("text")
    .style("fill", "white");
  d3.select("#country-select")
    .on("change", function() {
      const selectedCountry = this.value;
      updateChart(selectedCountry);
    });
  function updateChart(selectedCountry) {
    const filteredData = selectedCountry === "All" ? data : data.filter(d => d.Country === selectedCountry);
    const groupedData = d3.group(filteredData, d => d.Year, d => d.Country);
    const stackData = Array.from(groupedData.entries()).map(([year, countryData]) => {
      const values = Array.from(countryData.entries()).map(([country, values]) => {
        return { country, value: d3.sum(values, d => d.CO2_Emissions) };
      });
      return { year, values };
    });
    stackData.forEach(d => {
      d.values.forEach(v => {
        v.value /= 1000000;
      });
    });
    xScale.domain([d3.min(stackData, d => d.year), d3.max(stackData, d => d.year)]);
    yScale.domain([0, d3.max(stackData, d => d3.sum(d.values, v => v.value))]);
    svg.select(".x-axis").call(xAxis);
    svg.select(".y-axis").call(yAxis);
    svg.selectAll(".bar").remove();
    const bars = svg.selectAll(".bar")
      .data(stackData, d => d.year);
    const newBars = bars.enter().append("g")
      .attr("class", "bar")
      .attr("transform", d => `translate(${xScale(d.year)}, 0)`);
    newBars.selectAll("rect")
      .data(d => d.values)
      .enter().append("rect")
      .attr("x", 0)
      .attr("y", d => yScale(d.value))
      .attr("width", (d, i) => {
        const yearWidth = xScale(d3.max(stackData, d => d.year)) / stackData.length;
        return yearWidth;
      })
      .attr("height", d => height - yScale(d.value))
      .style("fill", d => colorScale(d.country))
      .on("mouseover", function(event, d) {
        const year = d3.select(this.parentNode).datum().year;
        tooltip.style("display", "inline-block")
          .html(`Country: ${d.country}<br>Year: ${year}<br>CO2 Emissions: ${d3.format(".2f")(d.value)} Million Metric Tons`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 25) + "px");
      })
      .on("mouseout", function() {
        tooltip.style("display", "none");
      });
    bars.selectAll("rect")
      .data(d => d.values)
      .transition()
      .duration(500)
      .attr("y", d => yScale(d.value))
      .attr("height", d => height - yScale(d.value));
  }
  updateChart("All");
  const tooltip = d3.select("#tooltip")
    .style("position", "absolute")
    .style("background-color", "lightgray")
    .style("padding", "8px")
    .style("border-radius", "5px")
    .style("display", "none");
});

//Sea Level Rise Visualization
d3.csv("data/sea-level.csv").then(function(data) {

  data.forEach(d => {
      d.Date = new Date(d.Day);
      d.SeaLevel = +d["Global sea level as an average of Church and White (2011) and UHSLC data"]; // Use the average sea level column
  });

  const width = 1000;
  const height = 500;
  const margin = { top: 50, right: 30, bottom: 50, left: 70 };

  const svg = d3.select("#sea-level-chart") 
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, d => d.Date)) 
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain([d3.min(data, d => d.SeaLevel), d3.max(data, d => d.SeaLevel)])
    .range([height, 0]);
  
  const xAxis = d3.axisBottom(xScale).ticks(10); 
  const yAxis = d3.axisLeft(yScale);


  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end")
    .style("fill", "white");

  svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis)
    .selectAll("text")
    .style("fill", "white");


  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 10)
    .style("text-anchor", "middle")
    .style("fill", "white")
    .text("Year");

  svg.append("text")
    .attr("x", -height / 2)
    .attr("y", -margin.left + 20)
    .attr("transform", "rotate(-90)")
    .style("text-anchor", "middle")
    .style("fill", "white")
    .text("Global Sea Level (mm)");

  
  const line = d3.line()
    .x(d => xScale(d.Date))
    .y(d => yScale(d.SeaLevel))
    .curve(d3.curveMonotoneX);

  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#00f0ff")
    .attr("stroke-width", 2)
    .attr("d", line);


  const tooltip = d3.select("#tooltip")
    .style("position", "absolute")
    .style("background-color", "lightgray")
    .style("padding", "8px")
    .style("border-radius", "5px")
    .style("display", "none");

    svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.Date))
    .attr("cy", d => yScale(d.SeaLevel))
    .attr("r", 3)
    .attr("fill", "#ff5722")
    .style("opacity", 0.5) 
    .on("mouseover", function(event, d) {
        tooltip.style("display", "inline-block")
            .html(`Date: ${d.Date.toDateString()}<br>Sea Level: ${d.SeaLevel.toFixed(2)} mm`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 25) + "px");
    })
    .on("mouseout", function() {
        tooltip.style("display", "none");
    });
    
});
