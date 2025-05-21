
async function fetchData() {
  try {
    const response = await fetch('travel_recommendation_api.json');
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
}

function createResultCard(title, imageUrl, description) {
  return `
    <div style="border:1px solid #ccc; padding:10px; margin:10px;">
      <h3>${title}</h3>
      ${imageUrl ? `<img src="${imageUrl}" alt="${title}" style="width:200px; height:auto;">` : ""}
      <p>${description || ""}</p>
    </div>
  `;
}

async function performSearch() {
  const keyword = document.getElementById("btnSearch").value.toLowerCase();
  const resultDiv = document.getElementById("searchResults");
  resultDiv.innerHTML = "";

  const data = await fetchData();
  if (!data) {
    resultDiv.innerHTML = "<p>Failed to load recommendations.</p>";
    return;
  }

  let results = "";

  if (keyword.includes("beach")) {
    data.beaches.slice(0, 2).forEach(b => {
      results += createResultCard(b.name, b.imageUrl, b.description);
    });
  }

  if (keyword.includes("country")) {
    data.countries.slice(0, 2).forEach(c => {
      results += createResultCard(c.name);
    });
  }

  if (keyword.includes("temple")) {
    data.temples.slice(0, 2).forEach(t => {
      results += createResultCard(t.name, t.imageUrl, t.description);
    });
  }

  if (!results) {
    results = "<p>No results found for your search.</p>";
  }

  resultDiv.innerHTML = results;
}

function clearSearch() {
  document.getElementById("btnSearch").value = "";
  document.getElementById("searchResults").innerHTML = "";
}

document.getElementById("btnSearch").addEventListener("click", performSearch);
document.getElementById("btnClear").addEventListener("click", clearSearch);

