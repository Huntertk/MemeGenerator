import { catsData } from "./data.js";

const emotionRadios = document.getElementById('emotion-radios')
const memeBtn = document.getElementById('memeBtn')
const innerModal = document.getElementById('innerModal')
const memeCloseBtn = document.getElementById('memeCloseBtn')

emotionRadios.addEventListener('change', getHighlightElement)
memeBtn.addEventListener('click', renderMemes)

memeCloseBtn.addEventListener('click',function(){
    document.getElementById('memeModal').style.display = 'none'
})

function getHighlightElement(event){
    const radios = document.getElementsByClassName('radio') //Show Object acts like array
    
    for(let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(event.target.id).parentElement.classList.add('highlight')
}

/*Array Decentralized*/ 
function getMatchingArray(){
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedRadioInput = document.querySelector('input[type="radio"]:checked').value

        const matchingCatsArray  = catsData.filter(function(cat){
            return cat.emotionTags.includes(selectedRadioInput)
        })
        console.log(matchingCatsArray)
        return matchingCatsArray
    }
}
    function getSingleCatObject(){
        const catsArray = getMatchingArray()
        if(catsArray.length === 1){
            return catsArray[0]
        } else{
            const randomNumber = Math.floor(Math.random() * catsArray.length)
            return catsArray[randomNumber]
        }
    }
    function renderMemes(){
        const catObject = getSingleCatObject()
        console.log(catObject.image)
        innerModal.innerHTML = `
        <img class="memeImg" src="./images/${catObject.image}" alt="${catObject.alt}">
        `
        document.getElementById('memeModal').style.display = 'flex'
    }
    
function getEmotionArray(cats){
    const emotionArry = []
    for(let cat of cats){
        for(let emotion of cat.emotionTags){
            if(!emotionArry.includes(emotion)){
                emotionArry.push(emotion)
            }
        }
    }
    return emotionArry
}


function renderEmotionArray(cat){
    const emotions = getEmotionArray(cat)
    let renderRadio = ``
    for(let emotion of emotions){
        renderRadio += 
        `<div class="radio">
             <label for="${emotion}">${emotion}</label>
             <input
              type="radio" id="${emotion}" 
              value="${emotion}" 
              name="emotions">
          </div>`
    }
    // console.log(emotions)
    emotionRadios.innerHTML = renderRadio
}
renderEmotionArray(catsData)