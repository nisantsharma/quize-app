const container = document.querySelector('.container');
const questionbox = document.querySelector('.question');
const choicesbox = document.querySelector('.choices');
const btnnext = document.querySelector('.btnnext');
const scorecard= document.querySelector('.scorecard');
const alert=document.querySelector('.alert');
const start=document.querySelector('.start');
const timer=document.querySelector('.timer');

const quiz=[
    {
        question:" Which of the following is not a type of database?",
        choices:["Hierarchical","Network","Distributed","Decentralized"],
        answer:"Decentralized"
    },
    {
        question:" In which of the following formats data is stored in the database management system?",
        choices:["Image"," Text"," Table","Graph"],
        answer:"Table"
    },
    {
        question:" Who created the first DBMS?",
        choices:["Edgar Frank Codd","Charles Bachman","Charles Babbage"," Sharon B. Codd"],
        answer:"Charles Bachman"
    },
    {
        question:"What is DBMS?",
        choices:[" DBMS is a collection of queries","DBMS is a high-level language","DBMS is a programming language","DBMS stores, modifies and retrieves data"],
        answer:"DBMS stores, modifies and retrieves data"
    },
    {
        question:"Which of the following is not an example of DBMS?",
        choices:["MySQL"," Microsoft Acess","IBM DB2","Google"],
        answer:"Google"
    }

];
let currindex=0;
let score=0;
let quizover=false;
let timeleft=15;
let timeriD=null;
const  nextquestion =()=>{
 const questionDetails=quiz[currindex];

questionbox.textContent=questionDetails.question;
choicesbox.textContent="";
for(let i=0;i<questionDetails.choices.length;i++){
    const currchoise=questionDetails.choices[i];
    const choicesdiv=document.createElement('div');
    choicesdiv.textContent=currchoise;
    choicesdiv.classList.add('choise');
    choicesbox.appendChild(choicesdiv);
    choicesdiv.addEventListener('click',()=>{
        if(choicesdiv.classList.contains('selected')){
            choicesdiv.classList.remove('selected');
        }else{
            choicesdiv.classList.add('selected');
        }
    })
}
    if(currindex<quiz.length){
        startTimer();
    }
}
const checkans=()=>{
    const selectChoise=document.querySelector('.choise.selected');
    if(selectChoise.textContent===quiz[currindex].answer){
        // alert("correct");
        displayAlert("correct");
        score++;
    }else{
        // alert("worng");
        displayAlert(`worng! ${quiz[currindex].answer} is correct answer `);
    }
    timeleft=15;
    currindex++;
    if(currindex<quiz.length){
        
        nextquestion();
    }
    else{
        showScore();
        stopTimer();
        timer.style.display="none";
    }
   
}
const showScore = ()=>{
    questionbox.textContent="";
    choicesbox.textContent="";
    scorecard.textContent=`You Scored ${score} out of ${quiz.length}`;
    displayAlert("you have complete quiz");
    btnnext.textContent="play agian";
    quizover="true";
}

const displayAlert= (mag)=>{
    alert.style.display="block";
    alert.textContent=mag;
    setTimeout( ()=>{
    alert.style.display="none";
    },2000);

}

const startTimer=()=>{
    clearInterval(timeriD);
    timer.textContent=timeleft;
    const countdown =()=>{
   timeleft--;
   timer.textContent=timeleft;
   if(timeleft===0){
    const confirmuser=confirm("Time Up!!! Do you want play agian");
    if(confirmuser){
        timeleft=15;
        startQuiz();
    }
    else{
        btnnext.style.display="block";
        container.style.display="none";
        return;
    }

   }
    }
   timeriD= setInterval(countdown,1000);
}
const stopTimer=()=>{
    clearInterval(timeriD);
}

const shufflequstion=()=>{
    for(let i=quiz.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [quiz[i],quiz[j]]=[quiz[j],quiz[i]];
    }
    currindex=0;
    nextquestion();
}
const startQuiz=() =>{
    timeleft=15;
    timer.style.display="flex";
    shufflequstion();
}

start.addEventListener('click',()=>{
    start.style.display="none";
    container.style.display="block";
    startQuiz();
});

btnnext.addEventListener('click',()=>{
    const selectChoise=document.querySelector('.choise.selected');
    if(!selectChoise&& btnnext.textContent==="Next"){
        // alert("select choise");
        displayAlert("select your answer");
        return;
    }
    if(quizover){
        btnnext.textContent="Next";
        scorecard.textContent="";
        currindex=0;
        // nextquestion();
        startQuiz();
        quizover=false;
        score=0;
    }
    else{
        checkans();
    }
    
   
});