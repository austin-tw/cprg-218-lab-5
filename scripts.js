/*Create one card from item data.*/
function createCardElement(item) {
  return `
      <li class="card">
          <img src="${item}" alt="Dog Image">
          <div class="card-content">
              <p class="subheader">
                  Breed:
              </p>
              <h3 class="header">
                  ${item.split('/')[4]} <!-- Extracting breed from the image URL -->
              </h3>
          </div>
      </li>
    `; 
}

/*Create multiple cards from array of item data.*/
function createCardElements(data) {
  return data.map(createCardElement).join("");
}

/*Fetch random dog images*/
async function fetchRandomDogImages(count) {
  try {
    const response = await fetch(`https://dog.ceo/api/breeds/image/random/${count}`);
    const data = await response.json();
    return data.message; // Array of returned data
    // Error handling
  } catch (error) {
    console.log(error);
  }
}

/*Render dog images*/
async function renderDogImages() {
  const count = 48; // Number of images to fetch (max is 50)
  const dogImages = await fetchRandomDogImages(count);
  const cards = createCardElements(dogImages);
  document.getElementById("option-2-enhanced-results").innerHTML = cards;
}

renderDogImages();

/*Search bar function*/
function searchbarEventHandler() {
  // Get the value of the input field with id="searchbar"
  let input = document.getElementById("searchbar").value.toLowerCase();
  // Get all the cards
  const enhancedResults = document.getElementById("option-2-enhanced-results");
  const cards = enhancedResults.getElementsByClassName("card");

  for (let i = 0; i < cards.length; i++) {
    // If the value of the input field is not found in the card's content, hide the card
    if (!cards[i].textContent.toLowerCase().includes(input)) {
      cards[i].style.display = "none";
      //If the value of the input field is equal to the name of the card, show the card
    } else {
      cards[i].style.display = "block";
    }
  }
}

const searchbar = document.getElementById("searchbar");
searchbar.addEventListener("keyup", searchbarEventHandler);
