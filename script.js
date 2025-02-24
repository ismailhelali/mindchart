// Initialize Transformers.js pipeline
let classifier;

async function initializeNLP() {
  classifier = await transformers.pipeline('text-classification', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
}

// Classify the input text
async function classifyText(text) {
  const result = await classifier(text);
  return result[0].label; // Returns the predicted label
}

// Generate mind chart with Cytoscape.js
function generateMindChart(data) {
  const cy = cytoscape({
    container: document.getElementById("chart"),
    elements: [
      // Nodes
      { data: { id: "main", label: data[0] } },
      { data: { id: "step1", label: data[1] } },
      { data: { id: "step2", label: data[2] } },
      { data: { id: "step3", label: data[3] } },

      // Edges
      { data: { id: "edge1", source: "main", target: "step1" } },
      { data: { id: "edge2", source: "main", target: "step2" } },
      { data: { id: "edge3", source: "main", target: "step3" } },
    ],
    style: [
      {
        selector: "node",
        style: {
          label: "data(label)",
          "text-valign": "center",
          "text-halign": "center",
          "background-color": "#007bff",
          color: "#fff",
          width: 40,
          height: 40,
        },
      },
      {
        selector: "edge",
        style: {
          width: 2,
          "line-color": "#007bff",
          "curve-style": "bezier",
        },
      },
    ],
    layout: {
      name: "breadthfirst",
      directed: true,
      padding: 10,
      spacingFactor: 1.5,
    },
  });
}

// Event listener for the button
document.getElementById("generateChart").addEventListener("click", async () => {
  const idea = document.getElementById("ideaInput").value;

  // Classify the input text
  const category = await classifyText(idea);
  console.log("Category:", category);

  // Generate a mind chart based on the category
  const chartData = [category, "Step 1", "Step 2", "Step 3"];
  generateMindChart(chartData);
});

// Initialize NLP pipeline on page load
initializeNLP();
