'use strict';
let min=0 , max=20;
let numberToGuss=  Math.floor(Math.random() * (max - min + 1)) + min ,score = 20 ,highScore=0 , tempScore=20, flagToClose=true;

document.querySelector(".check").addEventListener("click", checkPress);
document.querySelector(".again").addEventListener("click", againPress);
document.querySelector(".setting").addEventListener("click", openSetting);
document.querySelector(".close").addEventListener("click",closeModel)
document.getElementById("blurModal").addEventListener("click",closeModel)
document.querySelector(".save").addEventListener("click",savePress);
document.addEventListener("keydown",function(e){
    if(e.key==="Escape"){
        closeModel();
    }
    if(e.key==="Enter"){
        savePress();
    }
});
function savePress(){
    let scoreDemo=0 , minDemo=0 , maxDemo=0;
    let scoreElement=document.getElementById("newScore").value , minElement=document.getElementById("newMin").value , maxElement=document.getElementById("newMax").value;

    if(scoreElement!=""){
        scoreDemo=Number(scoreElement);
    }else{scoreDemo=tempScore;}
    if(scoreDemo<1){
        displayMassage( "messageSetting" , "🛑 Score Must have to be up to 1 ..." )
        flagToClose=false;
    }else{
        score=scoreDemo;
        tempScore=scoreDemo;
        againPress();
    }
    if(minElement!=""){
        minDemo=Number(minElement);
    }else{minDemo=min;}
    if(maxElement!=""){
        maxDemo=Number(maxElement);
    }else{maxDemo=max;}
    if(minDemo>=maxDemo){
        displayMassage( "messageSetting" , "🛑 Min have to be less then Max ..." )
        flagToClose=false;
    }
    else{
        min=minDemo;
        max=maxDemo;
        document.querySelector('.between').innerHTML = `(Between ${min} and ${max})`;    
        againPress();
    }
    if(flagToClose){
        closeModel();
    }
    flagToClose=true;
}
function openSetting(){
    settingsModal.style.display = "block";
    blurModal.style.display = "block";
}

function againPress(){
    document.querySelector('.score').textContent = tempScore;
    score=tempScore;
    numberToGuss= Math.floor(Math.random() * (max - min + 1)) + min;
    document.querySelector("body").style.backgroundColor = '#222';
    document.querySelector(".number").textContent="?";
    displayMassage("message","Start guessing...");
    document.querySelector(".guess").value="";

}

function checkPress(){
    const numberUser = Number(document.querySelector(".guess").value);
    if(score>0){
        if (!numberUser){
            displayMassage("message","⚠ No Number!")
        }
        else if (numberUser<min || numberUser >max){
            displayMassage("message","⚠ Number is not in the range!")
        }
        else if (numberToGuss === numberUser){
            displayMassage("message","🏆 Correct you win!")
            document.querySelector("body").style.backgroundColor = '#79AC78';
            document.querySelector(".number").textContent=numberToGuss;
            if(highScore<score){
                 highScore=score;
            }
            document.querySelector(".highscore").textContent=highScore;
            score=-1;

        }
        else if (numberUser!==numberToGuss){
            displayMassage("message",numberUser>numberToGuss?"📈 To High!":"📉 To Low!");
            pointReduction();
        }
    }
}

function displayMassage( obj , msg ){
    document.querySelector(`.${obj}`).textContent = msg;
}

function pointReduction(){
    score--;
    if(score===0){
        displayMassage("message","👎 You Snooze Lose, try again!");
        document.querySelector(".number").textContent=numberToGuss;
    }
    document.querySelector('.score').textContent = score;
}
function closeModel(){
    blurModal.style.display = "none";
    settingsModal.style.display = "none";
    document.getElementById("newScore").value="";
    document.getElementById("newMin").value="";
    document.getElementById("newMax").value="";
    document.getElementById("messageSetting").textContent="";
}