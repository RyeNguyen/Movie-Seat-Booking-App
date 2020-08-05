const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let posterBlock = document.querySelector(".left-block");

// '+' is similar to parseInt
let ticketPrice = +movieSelect.value;

populateUI();
updatePoster();
updateSelectedCount();

//Get data from local storage and populate to the UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");

    if (selectedMoviePrice !== null) {
        ticketPrice = +selectedMoviePrice;
    }
}

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

//Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    count.textContent = selectedSeats.length.toString();
    total.textContent = (selectedSeats.length * ticketPrice).toString();
}

//Update the poster
function updatePoster() {
    const gradient = "linear-gradient(-90deg, rgb(36, 35, 51), rgba(57, 55, 82, 0.44)), ";
    const image = `url(${movieSelect.value}.jpg)`;
    posterBlock.style.backgroundImage = gradient + image;
}

//Movie select event
movieSelect.addEventListener("change", e => {
    ticketPrice = +movieSelect.value;
    setMovieData(movieSelect.selectedIndex, movieSelect.value);
    updateSelectedCount();
    updatePoster();
});

//Seat click event
container.addEventListener("click", e => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
});