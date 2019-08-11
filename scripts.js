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

//
// let originalURL = 'https://docs.google.com/spreadsheets/d/10c8Z-7FMbj_htFGaNwAjuOKKMSfKReuVC05ObQqhQqc/edit#gid=0'
// let id = '10c8Z-7FMbj_htFGaNwAjuOKKMSfKReuVC05ObQqhQqc'
// let source = `https://spreadsheets.google.com/feeds/list/${id}/od6/public/values?alt=json`

// BELOW IS API CONNECTION

// original NEW url https://docs.google.com/spreadsheets/d/1K-A_YU_SC9yevfyvhsw97skP48P8VARCRoJPzav1Tc4/edit#gid=0
// link that was given on the popup https://docs.google.com/spreadsheets/d/e/2PACX-1vR9PfMdbSCKoGZNZ0eCAekS6dwma-V8PNp_pEoh3nOC7Dn35rMdgtmTzRxRbXF9gcPIyDeacYElUVvQ/pubhtml
// https://docs.google.com/spreadsheets/d/1K-A_YU_SC9yevfyvhsw97skP48P8VARCRoJPzav1Tc4/edit#gid=0
// I believe this is the ID '1K-A_YU_SC9yevfyvhsw97skP48P8VARCRoJPzav1Tc4'
let originalURL = 'https://docs.google.com/spreadsheets/d/1K-A_YU_SC9yevfyvhsw97skP48P8VARCRoJPzav1Tc4/edit#gid=0'

// ID COMES FROM THE URL THAT IS IN THE ADDRESS BAR ONCE THE SHEET HAS BEEN CREATED/SHARED
// let id =  '15PmioBi2dQEkewpqI7MDkDpvcVF0Trw8vmarAQbwoHk'

let id = '1K-A_YU_SC9yevfyvhsw97skP48P8VARCRoJPzav1Tc4'


// BELOW URL IS HOW GOOGLE ALLOWS US TO ACCESS THE SHARED FILE AS JSON
// let source = `https://spreadsheets.google.com/feeds/list/${id}/od6/public/values?alt=json`
let source = `https://spreadsheets.google.com/feeds/list/${id}/od6/public/values?alt=json`

// https://spreadsheets.google.com/feeds/list/15PmioBi2dQEkewpqI7MDkDpvcVF0Trw8vmarAQbwoHk/1/public/values?alt=json

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
