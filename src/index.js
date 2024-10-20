// index.js
const baseUrl = 'http://localhost:3000/'

// Callbacks
const handleClick = (ramen) => {
  fetch(`${baseUrl}ramens/${ramen.target.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(data => data.json())
  .then(ramen => {
    const imageContainer = document.querySelector('.detail-image');
     // Clear the container

    
    imageContainer.src = `${ramen.image}`;
     // Append the img element to the container

    const ramenName = document.querySelector('.name');
    ramenName.textContent = `${ramen.name}`;

    const resturantName = document.querySelector('.restaurant');
    resturantName.textContent = `${ramen.restaurant}`;

    const ramenRating = document.querySelector('#rating-display');
    ramenRating.textContent = `${ramen.rating}`;

    const comments = document.querySelector('#comment-display');
    comments.textContent = `${ramen.comment}`;
  });
};
const submit = () => {
  const ramenImages = document.querySelectorAll("#ramen-menu img")
  ramenImages.forEach(function (image){
    image.addEventListener('click', handleClick)

  })
}

const addSubmitListener = () => {
  const ramenForm = document.getElementById('new-ramen');
  ramenForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const ramen = {
      name: document.querySelector("#new-ramen #new-name").value,
      restaurant: document.querySelector("#new-ramen #new-restaurant").value,
      image: document.querySelector("#new-ramen #new-image").value,
      rating: document.querySelector("#new-ramen #new-rating").value,
      comment: document.querySelector("#new-ramen #new-comment").value,
    };
    fetch(`${baseUrl}ramens`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ramen) // Only send the ramen object in the body
    })
    .then(data => data.json())
    .then(data => {
      console.log(data);
    });
  });
};

const displayRamens = () => {
  const ramenMenu = document.getElementById('ramen-menu');
  fetch(`${baseUrl}ramens`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(data => data.json())
  .then(data => {
    data.forEach(function(ramen) {
      let ramenImage = document.createElement('img');
      ramenImage.src = `${ramen.image}`;
      ramenImage.id = `${ramen.id}`;
      ramenMenu.appendChild(ramenImage);
    });
    submit(); // Call submit function after data has been displayed
  });
};

const main = () => {
  // Invoke displayRamens here
  displayRamens()
  
  // Invoke addSubmitListener here
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
