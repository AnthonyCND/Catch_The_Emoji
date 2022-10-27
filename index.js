const grid = document.querySelector("#grid")
const scoreDisplay = document.querySelector("#score")
const timeLeft =document.querySelector("#time-left")
const newGameBtn = document.querySelector("#new-game")

function makeGrid(){
    for(let i=0;i<15;i++){
        const blankImg = document.createElement("img")
        blankImg.setAttribute("src", "blank.jpg")
        blankImg.setAttribute("data-id",i)
        grid.append(blankImg)
    }
}

makeGrid()

const images = document.querySelectorAll("img")
let randomId
let score = 0
let currentTime =60 //Set Gmae Time Limit
let clickpermission = true
const reactionTime=500 //Time taken to hide the image
const timetoAppear=2000 //Time taken by the image to reappear

function setImage(){
    randomId = Math.floor(Math.random()*15)
    clickpermission=true
    images[randomId].setAttribute("src","emoji-1.jpg")
    setTimeout(()=>{
        images[randomId].setAttribute("src","blank.jpg")
        clickpermission=false
    }, reactionTime)
    
}

images.forEach((img) =>{
    img.addEventListener("mousedown",mouseClick)
})

function mouseClick(){
    const clickedImageId = this.getAttribute("data-id")
    if(randomId==clickedImageId && clickpermission==true){
        score++
        clickpermission=false
        scoreDisplay.textContent=score
        images[clickedImageId].setAttribute("src","emoji-2.jpg")
    }
}

let timerID = 0

function moveImage(){
    timerID=setInterval(setImage,timetoAppear)
}

function countDown(){
    currentTime--
    timeLeft.textContent=currentTime
    if(currentTime==0){
        clearInterval(timerID)
        clearInterval(countDownTimerID)
        alert("Game Over! Your Score is "+score)
    }
}
let countDownTimerID=setInterval(countDown,1000)
moveImage()

newGameBtn.addEventListener("click",()=>location.reload())






