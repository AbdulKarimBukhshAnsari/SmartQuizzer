// this function will make the questions
// this variable will check how much you have answered the question 
let i =  (JSON.parse(sessionStorage.getItem('current-question')) || 0);
// this is the variable which will deal with the timer reference .
let x ;
// this is the checker variable which will just check whether any option has been selected or not 
let click = 0 ; 

let answer_status ; 
// this is the score variable which will track the score 
let score = (JSON.parse(sessionStorage.getItem('score')) || 0);

quiz_make();
// to next the question

// for checking whether the answer is correct or not if the answer would be correct then it would make him green or red according to the chosen option 
function checker(answer){
  if (click > 0 ) {
    return 
  }
  // In the case when user did not give the answer and time is out then we can take this step 
  let obj = ['first','second' , 'third' , 'fourth'];
  if(answer==-1){
    answer_status = 'OOPs! Time is out , no worries..';
    let correct_answer = document.querySelector(`#${obj[quiz[i].ans]}`);
    correct_answer.style.backgroundColor = '#E5F8E5';
    // it will be incresed to make sure that when the time is out then the use can not check for other option or we can say can't click 
    click+=1
    if(i < quiz.length - 1){
    next_question();
    }
    else{
      submit_quiz();
    }
    return 
  }
  click += 1;
  if(answer == quiz[i].ans){
    answer_status = 'Congartulations ! Your Answer is Correct..';
    let selected_option = document.querySelector(`#${obj[answer]}`);
    selected_option.style.backgroundColor = '#E5F8E5';
    score+=1
    
  }
  else{
    answer_status = 'OOPs ! Your Answer is not correct ..';
    let selected_option = document.querySelector(`#${obj[answer]}`);
    let correct_answer = document.querySelector(`#${obj[quiz[i].ans]}`);
    selected_option.style.backgroundColor = '#FFEBEB';
    correct_answer.style.backgroundColor = '#E5F8E5';
  }
  clearInterval(x);
  // to make sure that at the end question it will show 
  if(i < quiz.length - 1){
    next_question();
    }
    else{
      submit_quiz();
   }

  
}

// this function will create next button dynamially and then will move into t=next question 
function next_question(){
  let options_html = document.querySelector(".main");
  options_html.innerHTML += `<div class='flex justify-between mt-4'>
                              <div class="text-lg">
                              <div class='text-teal-950'>
                                ${answer_status}
                              </div>
                              <div class='mt-2'>
                              ${quiz[i].explanation}
                              </div>       
                              </div>
                              <button
                                      class="nextbutton self-start  flex-shrink-0  text-white bg-customGreen lg:py-4 lg:px-14 py-3 px-10 hover:bg-teal-700 rounded-lg font-bold lg:text-2xl text-xl mt-5"
                                    >
                                    Next
                              </button>
                            </div>`;
  // add event lsitener here 
  let next_button = document.querySelector(".nextbutton");
  next_button.addEventListener("click", function () {
    if(score>quiz.length){
      score = quiz.length;
    }
    sessionStorage.setItem('score' , JSON.stringify(score));
    i += 1;
    sessionStorage.setItem('current-question' , JSON.stringify(i));
    click = 0 ;
    quiz_make();

  });
}


function submit_quiz(){
  let options_html = document.querySelector(".main");
  options_html.innerHTML += `<div class='flex justify-between mt-2'>
                              <div class="text-lg">
                              <div class='text-teal-950'>
                                ${answer_status}
                              </div>
                              <div class='mt-2'>
                              ${quiz[i].explanation
                              }
                              </div>       
                              </div>
                              <button
                                      class="submit-button  self-start  flex-shrink-0  text-white bg-customGreen lg:py-4 lg:px-14 py-3 px-10 hover:bg-teal-700 rounded-lg font-bold lg:text-2xl text-xl mt-5"
                                    >
                                    Result 
                              </button>
                            </div>`;
  let submit_button = document.querySelector('.submit-button');

  submit_button.addEventListener('click' , function(){
    if(score>quiz.length){
      score = quiz.length;
    }
    sessionStorage.setItem('score' , JSON.stringify(score));
    window.location.href = "result_page.html";
  })
  
  

}

// to update the timer 
function timer() {
  const total_time = JSON.parse(sessionStorage.getItem('time'));
  let question_number = document.querySelector('.question-number');
  let percentage_completion = document.querySelector('.percenatge-of-completion');
  let percenatge_find = Math.round((i/quiz.length) *100);
  percentage_completion.innerHTML = `${percenatge_find}% Complete`;
  question_number.innerHTML = `Question ${i+1} of ${quiz.length}`
  let percentage_line = document.querySelector('.green-workflow');
  percentage_line.style.width =  `${percenatge_find}%`;
  let circle = document.querySelector(".circle");
  circle.innerHTML = `<div class="time text-2xl font-bold absolute mx-auto mt-6 text-customGreen  "></div>
          <svg class="w-full max-w-[80px] h-auto" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#f0f0f0"
              stroke-width="12"
            ></circle>
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="rgb(13,148,136)"
              stroke-width="5"
              transform="rotate(-90 50 50)"
            ></circle>
          </svg>`;

  let timer = document.querySelector(".time");
  let animate_circle = document.querySelector("svg circle:nth-child(2)");
  let circum_ference = 40 * Math.PI * 2; // Circumference of the circle
  animate_circle.style.strokeDasharray = circum_ference;
  timer.innerHTML = total_time;

  let temp_time = total_time;

  x = setInterval(function () {
    temp_time -= 1;
    timer.innerHTML = temp_time;
    let percentage = temp_time / total_time;
    animate_circle.style.strokeDashoffset =
      circum_ference - circum_ference * percentage;

    if (temp_time == 0) {
      clearInterval(x);
      checker(-1);
    }
  }, 1000);
  
}


// this function will make the quiz 
function quiz_make() {
  click = 0;
  timer();
  //to get the element where we have to insert the qustions and the options and the button 
  let options_html = document.querySelector(".main");
  options_html.innerHTML = `
        <div class="question text-xl md:text-2xl mt-4 font-semibold text-purple-800">${quiz[i].question}</div>
        <!-- For the options -->
        <div class="options flex flex-col gap-4 mt-4">
        <div class="option flex items-center border border-gray-300 rounded-lg py-4 px-4 gap-4 cursor-pointer hover:border-teal-400 hover:bg-gray-50 transition" id='first' onclick='checker(0)'>
          <div class="option_name rounded-full bg-gray-200 text-black font-medium px-3 py-1">A</div>
          <div class="ans text-gray-700 font-semibold">${quiz[i].options[0]}</div>
        </div>

        <div class="option flex items-center border border-gray-300 rounded-lg py-4 px-4 gap-4 cursor-pointer hover:border-teal-400 hover:bg-gray-50 transition" id='second' onclick='checker(1)'>
          <div class="option_name rounded-full bg-gray-200 text-black font-medium px-3 py-1">B</div>
          <div class="ans text-gray-700 font-semibold">${quiz[i].options[1]}</div>
        </div>

        <div class="option flex items-center border border-gray-300 rounded-lg py-4 px-4 gap-4 cursor-pointer hover:border-teal-400 hover:bg-gray-50 transition" id='third' onclick='checker(2)'>
          <div class="option_name rounded-full bg-gray-200 text-black font-medium px-3 py-1">C</div>
          <div class="ans text-gray-700 font-semibold">${quiz[i].options[2]}</div>
        </div>

        <div class="option flex items-center border border-gray-300 rounded-lg py-4 px-4 gap-4 cursor-pointer hover:border-teal-400 hover:bg-gray-50 transition" id='fourth' onclick='checker(3)'>
          <div class="option_name rounded-full bg-gray-200 text-black font-medium px-3 py-1">D</div>
          <div class="ans text-gray-700 font-semibold">${quiz[i].options[3]}</div>
        </div>
      </div>
`;
  
}
