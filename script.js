// Load pre-trained weights (if available)
const net = new brain.recurrent.LSTM();
const savedWeights = localStorage.getItem("trainedWeights");

if (savedWeights) {
  net.fromJSON(JSON.parse(savedWeights));
} else {
  // Train the model and save the weights
  net.train([
    { input: "Create a mind map for a startup idea", output: "startup" },
    { input: "Plan a project timeline", output: "timeline" },
    { input: "Organize my thoughts", output: "thoughts" },
  ]);
  localStorage.setItem("trainedWeights", JSON.stringify(net.toJSON()));
}

// Generate mind chart
function generateMindChart(data) {
  const width = 600;
  const height = 400;

  // Clear previous chart
  d3.select("#chart").html("");

  // Create SVG element
  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Create nodes
  const nodes = data.map((d, i) => ({
    id: i,
    label: d,
    x: i === 0 ? width / 2 : (width / 2) + (i * 100 - 200),
    y: height / 2,
  }));

  // Add links
  svg.selectAll("line")
    .data(nodes.slice(1))
    .enter()
    .append("line")
    .attr("x1", width / 2)
    .attr("y1", height / 2)
    .attr("x2", d => d.x)
    .attr("y2", d => d.y)
    .attr("stroke", "#007bff");

  // Add nodes
  svg.selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 20)
    .attr("fill", "#007bff");

  // Add labels
  svg.selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .text(d => d.label)
    .attr("x", d => d.x)
    .attr("y", d => d.y + 30)
    .attr("text-anchor", "middle")
    .attr("fill", "#333");
}

// Event listener for the button
document.getElementById("generateChart").addEventListener("click", () => {
  const idea = document.getElementById("ideaInput").value;

  // Use Brain.js to process the idea
  const category = net.run(idea);

  // Generate a simple mind chart based on the idea
  const chartData = [category, "Step 1", "Step 2", "Step 3"]; // Example data
  generateMindChart(chartData);
});
