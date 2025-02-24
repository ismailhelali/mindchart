// Initialize Brain.js for NLP
const net = new brain.recurrent.LSTM();

// Train the AI with some sample data (you can expand this)
net.train([
  { input: "Create a mind map for a startup idea", output: "startup" },
  { input: "Plan a project timeline", output: "timeline" },
  { input: "Organize my thoughts", output: "thoughts" },
]);

// Function to generate a mind chart using D3.js
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

  // Create nodes and links
  const nodes = data.map((d, i) => ({ id: i, label: d }));
  const links = nodes.slice(1).map((d, i) => ({ source: 0, target: d.id }));

  // Add links
  svg.selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("x1", width / 2)
    .attr("y1", height / 2)
    .attr("x2", d => (width / 2) + (d.target * 100 - 200))
    .attr("y2", height / 2)
    .attr("stroke", "#007bff");

  // Add nodes
  svg.selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => (i === 0 ? width / 2 : (width / 2) + (i * 100 - 200)))
    .attr("cy", height / 2)
    .attr("r", 20)
    .attr("fill", "#007bff");

  // Add labels
  svg.selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .text(d => d.label)
    .attr("x", (d, i) => (i === 0 ? width / 2 : (width / 2) + (i * 100 - 200)))
    .attr("y", height / 2 + 30)
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
