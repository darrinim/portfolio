let currentMood = document.querySelector('#mood').value // this is going to be grabbing the value from the select dropdown menu
console.log(currentMood);

// function to change color scheme
const changeMood = (e) => {
  e.preventDefault(); // I think I still need this...
  console.log(e.target.value); // just checking the value of what I'm grabbing
  let elegantElements = document.querySelectorAll(`.${currentMood}`); // Initial test to prove it worked
  console.log(elegantElements);
  // Have to loop through all the elements that I grabbed with through the variable elegantElements and then just toggling the class name
  for(let i = 0; i < elegantElements.length; i++) {
    elegantElements[i].classList.toggle(currentMood);
    elegantElements[i].classList.toggle(e.target.value)
    console.log(elegantElements[i].classList);
  }
  currentMood = e.target.value; // Placed this here because it kept repeating
}
let selectMood = document.querySelector('#mood');
selectMood.addEventListener('change', changeMood)




// BELOW IS CLICK EVENT FOR HAMBURGER menu

const hamburger = document.querySelector('.fa-bars')
const cancel = document.querySelector('.fa-times')


hamburger.addEventListener('click', function () {
  document.querySelector('.mobile-nav').style.right = '0px';
  console.log(hamburger);
})
cancel.addEventListener('click', function () {
  document.querySelector('.mobile-nav').style.right = '-50%';
  console.log(cancel);
})
