let currentMood = document.querySelector('#mood').value // this is going to be grabbing the value from the select dropdown menu
console.log(currentMood);

// function to change color scheme
const changeMood = (e) => {
  e.preventDefault(); // I think I still need this...
  console.log(e.target.value); // just checking the value of what I'm grabbing
  let elegantElements = document.querySelectorAll(`ul.${currentMood}`); // this was just initial test to prove it worked. It is currently grabbing all the ul's and their 'currentMood' which is the value the user selects from the dropdown. I will have to adjust most likely to grab specific elements...keep adding new variable names to make it easier
  console.log(elegantElements);
  // I have to loop through all the elements that I grabbed with through the variable elegantElements (FOR THE LOVE OF GOD CHANGE THE DAMN VARIABLE NAMES, SOUNDED GREAT AT FIRST TO PROVE A POINT BUT NOW IT'S CONFUSING) and then just toggling the class name
  for(let i = 0; i < elegantElements.length; i++) {
    elegantElements[i].classList.toggle(currentMood);
    elegantElements[i].classList.toggle(e.target.value)
    console.log(elegantElements[i].classList);
  }
  currentMood = e.target.value; // Why did I have to put this here? why do you ask? WHY? BECAUSE IT KEPT LOOPING THROUGH AND RECHANGING THINGS
}
let selectMood = document.querySelector('#mood');
selectMood.addEventListener('change', changeMood)
