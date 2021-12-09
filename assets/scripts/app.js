const showModal = document.getElementById("add-modal");
const addHeaderBtn = document.querySelector("header > button");
const removingBackdrop = document.getElementById("backdrop");
const cancelModalBtn = document.querySelector(".btn.btn--passive");
const confirmModalBtn = cancelModalBtn.nextElementSibling;

const userInput = document.querySelectorAll("input");
const initialTextSection = document.querySelector("#entry-text");
const displayMovieSection = document.getElementById("movie-list");
const selectBackdrop = document.getElementById("backdrop");

const movies = [];


const clearInputData = () => {
  for(const item of userInput){
    item.value = "";
  }
}


const updateUI = () => {
  if(movies.length === 0){
    initialTextSection.style.display = "block";
  } else {
    initialTextSection.style.display = "none";
  }
};


const backdropHandler = () => {
	
	
}; //toggleBckdrop



const showMovieModal = () => {
  selectBackdrop.classList.add("visible");
};

const removeMovieModal = () => {
  selectBackdrop.classList.remove("visible");
};

const addMoviePanelHandler = () => {
  backdropHandler();
  removeMovieModal();
  clearInputData();
};


const deleteMovie = (movieID) => {
  let targetElement = 0;

    for (const movie of movies) {
      if ( movie.id === movieID) {
        break;
      }
      targetElement++;
    }

    movies.splice(targetElement, 1);
    displayMovieSection.children[targetElement].remove();
};


const deleteMovieHandler = (movieID) => {
  const deleteModal = document.getElementById("delete-modal");
  deleteModal.classList.add("visible");
};


const renderMoviesData = (movieID,title,poster,rating) => {
  const newElementLi = document.createElement("li");

  newElementLi.className = "movie-element";
  newElementLi.innerHTML = `
    <div class="movie-element__image">
      <img src="${poster}" alt="${title}" />
    </div>

    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5</p>
    </div>
  `;

  newElementLi.addEventListener("click",deleteMovieHandler.bind(null, movieID));
  displayMovieSection.appendChild(newElementLi);
};


const addingMovieData = () => {
  
  const movieTitle = userInput[0].value;
  const posterURL = userInput[1].value;
  const movieRating = userInput[2].value;

  if(movieTitle.trim() === "" || posterURL.trim() === "" || 
     movieRating.trim() === "" ||
     +movieRating < 1 || 
     +movieRating > 5
  ) {
    alert("Incorrect data please try again!");
    return;
  }

  let moviesInfo = {
    id: Math.random().toString(),
    title:movieTitle,
    poster:posterURL,
    rating:movieRating
  };

  movies.push(moviesInfo);
	console.log(movies);
	addMoviePanelHandler();
	clearInputData();
  updateUI();
	renderMoviesData(moviesInfo.id, moviesInfo.title, moviesInfo.poster, moviesInfo.rating);
};









addHeaderBtn.addEventListener("click", addMoviePanelHandler);
cancelModalBtn.addEventListener("click", removeMovieModal);
removingBackdrop.addEventListener("click", addMoviePanelHandler);
confirmModalBtn.addEventListener("click",addingMovieData);

// const backdropHandler = () => {
//   const selectBackdrop = document.getElementById('backdrop');
//     selectBackdrop.classList.add('visible');
// }

// removing the modal overlay at click either
// the cancel button or anywhere out of form
// const removingBackdropFn = () => {
//   showModal.classList.remove('visible');
//   removingBackdrop.classList.remove('visible');
// };
