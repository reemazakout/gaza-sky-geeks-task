// Variables
const searchInput = document.getElementById("searchInput");
const quotesContainer = document.getElementById("quotesContainer");
const noResults = document.getElementById("noResults");
const errorMessage = document.getElementById("errorMessage");
let allQuotes = [];

// Fetch quotes from the API
async function fetchQuotes() {
  try {
    const res = await fetch("https://dummyjson.com/quotes");
    const data = await res.json();
    allQuotes = data.quotes;
    displayQuotes(allQuotes);
  } catch (error) {
    errorMessage.classList.remove("hidden");
    console.error("Error fetching quotes:", error);
  }
}

// Render quotes in the html code
function displayQuotes(quotes) {
  quotesContainer.innerHTML = "";

  if (quotes.length === 0) {
    noResults.classList.remove("hidden");
    return;
  }
  noResults.classList.add("hidden");

  quotes.forEach((quote) => {
    const card = document.createElement("div");
    card.className =
      "bg-white p-4 text-center shadow-md rounded-md border border-gray-200 min-h-[150px] flex items-center justify-center";
    card.textContent = quote.quote;
    quotesContainer.appendChild(card);
  });
}

// Debounce function for better performance
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Filter function
function filterQuotes(searchText) {
  const filtered = allQuotes.filter((q) =>
    q.quote.toLowerCase().includes(searchText.toLowerCase())
  );
  displayQuotes(filtered);
}

// Attach debounced search
const debouncedSearch = debounce((e) => {
  const searchValue = e.target.value.trim();
  filterQuotes(searchValue);
}, 300);

searchInput.addEventListener("input", debouncedSearch);

// Initial fetch on load
fetchQuotes();
