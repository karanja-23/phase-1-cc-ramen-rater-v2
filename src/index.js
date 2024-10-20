const baseUrl = 'http://localhost:3000/';
// Function to display all ramen images
const displayRamens = () => {
  const ramenMenu = document.getElementById('ramen-menu');
  if (!ramenMenu) {
    console.error('Ramen menu element not found');
    return;
  }

  fetch(`${baseUrl}ramens`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(data => data.json())
  .then(data => data.forEach(function(ramen){
    let ramenImage = document.createElement('img')
    ramenImage.src = `${ramen.image}`
    ramenImage.id = `${ramen.id}`
    ramenImage.addEventListener('click', handleClick);
    ramenMenu.appendChild(ramenImage)
  }))
};

// Function to handle click event on ramen image// Function to handle click event on ramen image
const handleClick = (ramen, event) => {
  const ramenDetail = document.getElementById('ramen-detail');
  if (!ramenDetail) {
    console.error('Ramen detail element not found');
    return;
  }
  const detailName = ramenDetail.querySelector('.name');
  const detailRestaurant = ramenDetail.querySelector('.restaurant');
  const detailImg = ramenDetail.querySelector('.detail-image');
  const detailsRating = document.getElementById("rating-display");
  const detailsComment = document.getElementById("comment-display");

  if (!detailName || !detailRestaurant || !detailImg || !detailsRating || !detailsComment) {
    console.error('Ramen detail elements not found');
    return;
  }
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailImg.src = ramen.image;
  detailsRating.textContent = ramen.rating.toString();
  detailsComment.textContent = ramen.comment;
};
// Function to add submit event listener to new-ramen form
const addSubmitListener = () => {
  const newRamenForm = document.getElementById('new-ramen');
  newRamenForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(newRamenForm);
    const newRamen = {
      image: formData.get('image'),
      name: formData.get('name'),
      restaurant: formData.get('restaurant'),
      rating: formData.get('rating'),
      comment: formData.get('comment')
    };
    const ramenMenu = document.getElementById('ramen-menu');
    if (!ramenMenu) {
      console.error('Ramen menu element not found');
      return;
    }
    const ramenImage = document.createElement('img');
    ramenImage.src = newRamen.image;
    ramenImage.id = `${Math.random()}`;
    ramenImage.addEventListener('click', handleClick);
    ramenMenu.appendChild(ramenImage);
  });
};

// Function to add submit event listener to new-ramen form

// Call displayRamens function when page loads
document.addEventListener('DOMContentLoaded', displayRamens);

// Call addSubmitListener function when page loads
document.addEventListener('DOMContentLoaded', addSubmitListener);

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
