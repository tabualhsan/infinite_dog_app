// establishing varibles for the global scope
let timer
let deleteFirstPhotoDelay

async function start() {

    const response = await fetch("https://dog.ceo/api/breeds/list/all")
    const data = await response.json()
    createBreedList(data.message)
}


start()

function createBreedList(breedList){
    // creating select element
    // FOR HTML TEMPLATE
    // creates a drop down
    // map will loop through the list of arrays or objects from the link
    document.getElementById("breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">   
    // The 'this' is pointing to element in function 
        <option>Choose a dog breed</option>
        ${Object.keys(breedList).map(function (breed) {
            return `<option>${breed}</option>`
        }).join('')}     
        </select>

    `
    
}
// linking breed photos 
async function loadByBreed(breed) {
   if (breed != "Choose a dog breed"){
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
      const data = await response.json()
      createSlideShow(data.message)
   }




}
// html for slidshow 
function createSlideShow(images){
    let currentPosition = 0 
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)
    document.getElementById("slideshow").innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}');"></div>
    <div class="slide" style="background-image: url('${images[1]}');"></div>
    
    `

    currentPosition += 2
    timer = setInterval(nextSlide, 3000)

    function nextSlide(){
        document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}');"></div>`);
        setTimeout(function() {
            document.querySelector(".slide").remove()
        }, 1000)
        if (currentPosition + 1 >= images.length) {
            currentPosition = 0 
        } else {
        currentPosition++
                //to increment 

            }
    }
    }
    // for 2 imgs every 3 sec it will advnace to another img



