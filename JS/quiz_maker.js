// this f(unction will make the questions
let i = 0;
quiz_make();
// to next the question


// to update the timer 
function timer() {
  const total_time = 30;
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

  let x = setInterval(function () {
    temp_time -= 1;
    timer.innerHTML = temp_time;
    let percentage = temp_time / total_time;
    animate_circle.style.strokeDashoffset =
      circum_ference - circum_ference * percentage;

    if (temp_time == 0) {
      clearInterval(x);
    }
  }, 1000);
}


// for checking whether the answer is correct or not if the answer would be correct then it would make him green or red according to the choden option 
function checker(answer){
  let obj = ['first','second' , 'third' , 'fourth'];
  
  if(answer == quiz[i].ans){
    let selected_option = document.querySelector(`#${obj[answer]}`);
    selected_option.style.backgroundColor = '#E5F8E5';
  }
  else{
    let selected_option = document.querySelector(`#${obj[answer]}`);
    let correct_answer = document.querySelector(`#${obj[quiz[i].ans]}`);
    selected_option.style.backgroundColor = '#FFEBEB';
    correct_answer.style.backgroundColor = '#E5F8E5';
  }

  let options_html = document.querySelector(".main");
  options_html.innerHTML += `<div class='flex justify-end'>
                              <button
                                      class="nextbutton text-white bg-customGreen lg:py-4 lg:px-14 py-3 px-10 hover:bg-teal-700 rounded-lg font-bold lg:text-2xl text-xl mt-5"
                                    >
                                    Next
                              </button>
                            </div>`;
  // add event lsitener here 
  let next_button = document.querySelector(".nextbutton");
  next_button.addEventListener("click", function () {
    alert("Button click hua saale");
    i += 1;
    quiz_make();
  });
}

// this function will make the quiz 
function quiz_make() {
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
