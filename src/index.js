// index.js

// Callbacks
const handleClick = (ramen) => {
  // Add code
  document.querySelector(".detail-image").src = ramen["image"];
  document.querySelector(".name").textContent = ramen["name"];
  document.querySelector(".restaurant").textContent = ramen["restaurant"];
  document.querySelector("#rating-display").textContent = ramen["rating"];
  document.querySelector("#comment-display").textContent = ramen["comment"];
};

const addSubmitListener = () => {
  // Add code
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const newName = event.target.name.value;
    const newRestaurant = event.target.restaurant.value;
    const newImage = event.target.image.value;
    const newRating = event.target.rating.value;
    const newComment = event.target["new-comment"].value;
    fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: newName,
        restaurant: newRestaurant,
        image: newImage,
        rating: newRating,
        comment: newComment,
      }),
    })
      .then((response) => response.json())
      .then((newRamen) => {
        handleClick(newRamen);
        displayRamens();
      });
  });
};

const displayRamens = () => {
  // Add code
  fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((ramens) => {
      handleClick(ramens[0]); //Display first ramen without clicking
      ramens.forEach((ramen) => {
        const div = document.querySelector("#ramen-menu");
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.id = ramen.id;
        img.className = "ramen";
        div.append(img);
        img.addEventListener("click", (event) => {
          event.preventDefault();
          handleClick(ramen);
        });
      });
    });
};

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  displayRamens();
  addSubmitListener();
};

main();

// Export functions for testing
export { displayRamens, addSubmitListener, handleClick, main };
