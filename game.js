const question = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter')
const scoreText = document.getElementById('score')
const timerElement = document.getElementById('timer')
const timerElementText = document.getElementById('timer')


let currentQuestion = {}
let acceptingAnswers = false
let score = 0 
let questionCounter = 0
let availableQuestions = []
let seconds = 60; 

//array and objects for questions and answers 

let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript??",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
      },
      {
        question:
          "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
      },
      {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
      },
      { 
        question:'What does JS stand for?',
        choice1: 'Java Script',
        choice2: 'June Sand',
        choice3: 'Jquery',
        choice4: 'Jumping Space Man',
        answer: 1
    },
    {
        question: 'Which of the following is true about variable naming conventions in JavaScript?',
        choice1: 'You should not use any of the JavaScript reserved keyword as variable name.',
        choice2: 'JavaScript variable names should not start with a numeral (0-9).',
        choice3: 'Both of the Above',
        choice4: 'None of the above',
        answer: 3
    },
    {
        question: 'Which of the following type of variable is visible everywhere in your JavaScript code?',
        choice1: 'global variable',
        choice2: 'local variable',
        choice3: 'both of the above',
        choice4: 'none of the above',
        answer: 1
    },
    {
        question: 'Which built-in method combines the text of two strings and returns a new string?',
        choice1: 'append()',
        choice2:  'concat()',
        choice3:   'attach()',  
        choice4:    'none of the above', 
        answer: 2
     
    }
]


const CORRECT_BONUS = 10 
const MAX_QUESTIONS = 7
const WRONG_BONUS = 7
const MINUS_TIME = -7

// sets the rules for starting the game
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    startTimer()
   
   
    getNewQuestion()  

}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {

    // store the scores in local storage 
    localStorage.setItem('mostRecentScore', score);

    // go to end page 
    return window.location.assign('end.html')
    
    }
    // pulls questions randomly into the question section and updates question counter
    questionCounter++
    questionCounterText.innerText = questionCounter + '/' + MAX_QUESTIONS
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

// pulls answers into the answers section 
    choices.forEach( choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

// removing the question just pulled out of the availale questions list 
    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true

}
// determines if the answer is correct and highlights the answer Green if correct red if wrong 
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;
        
        
        acceptingAnswers = false;
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = 'incorrect'
        if(selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct'
        }

// adds and removes scores 
        if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS)
        } else {
            decreaseScore(WRONG_BONUS) ;decreaseTime(MINUS_TIME);
        }
        


        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion();
        }, 1000)

        

    })
})

// adds and removes from scores and timer. Timer isn't deduction isn't working correctly 
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

decreaseScore = num => {
    score -= num
    scoreText.innerText = score    
}

decreaseTime = num => {
    seconds -= num 
    timerElementText.innerText = seconds
}



// sets my timer 

function startTimer(){
    let minutes = Math.round((seconds - 30) / 60);
    let remainingSeconds = seconds % 60;

    if(remainingSeconds < 10) {
        remainingSeconds = "0" + remainingSeconds;
    }

    document.getElementById('timer').innerHTML = minutes + ':' + remainingSeconds;
    
    if (seconds == 0) {
        clearInterval(countdownTimer);
        document.getElementById('timer').innerHTML = "Times Up"; 
        return window.location.assign('index.html')
    } else {
        seconds--;
    }
}

let countdownTimer = setInterval('startTimer()', 1000);

//starts the game
startGame()