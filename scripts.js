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


// BELOW IS API CONNECTION


let originalURL = 'https://docs.google.com/spreadsheets/d/1K-A_YU_SC9yevfyvhsw97skP48P8VARCRoJPzav1Tc4/edit#gid=0'
let id = '1K-A_YU_SC9yevfyvhsw97skP48P8VARCRoJPzav1Tc4'
let source = `https://spreadsheets.google.com/feeds/list/${id}/od6/public/values?alt=json`



fetch(source)
  .then( res => res.json())
  .then( data => {
     console.log('this id data.feed.entry', data.feed.entry)
     let projects = data.feed.entry.map( d => {
       return {
          title: d.gsx$title.$t,
          image: d.gsx$image.$t,
          description: d.gsx$description.$t
       }
     });
     console.log('this is  projects', projects)
     createCards(projects)
})


class Card {
  constructor(obj) {
    this.title = obj.title
    this.image = obj.image
    this.description = obj.description
  }

  render() {
    const col = document.createElement('div')
    col.classList.add('carousel-item');

    const image  = document.createElement('img')
    image.setAttribute('src', this.image)
    image.classList.add('w-100');

    const cardTitle = document.createElement('span')
    cardTitle.classList.add('card-title');
    cardTitle.innerText = this.title

    // const cardContent = new CardContent(this.description)
    // console.log('this is cardConten ', cardContent)
    // col.appendChild(cardTitle)
    col.appendChild(image)
   // card.appendChild(cardTitle)
   //  card.appendChild(cardImage)

    // card.appendChild(cardContent.render())
    // col.appendChild(card)

    return col
  }
}

class CardContent {
  constructor(desc) {
    this.desc = desc
  }
  render () {
    console.log('this is desc', this.desc)
    const cardContent = document.createElement('div')
    cardContent.classList.add('card-content');

    const paragraph = document.createElement('p')
    paragraph.innerText = this.desc

    cardContent.appendChild(paragraph)
    return cardContent
  }
}

function createCards(projects){
  const projectDiv = document.querySelector('.carousel-inner')
  projects.forEach( obj => {
    let card = new Card(obj)
    console.log('this is card', card)
    projectDiv.appendChild(card.render())
  })
    document.querySelector('.carousel-item').classList.add('active');
}



// Smooth Scroll Functionality BELOW
document.querySelector('#about').scrollIntoView({
  behavior: 'smooth'
});
document.querySelector('#projects').scrollIntoView({
  behavior: 'smooth'
});
document.querySelector('#contact').scrollIntoView({
  behavior: 'smooth'
});
