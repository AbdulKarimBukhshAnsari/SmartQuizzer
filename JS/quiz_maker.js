// this f(unction will make the questions
quiz_make();
function timer() {
  const total_time = 30;

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

function quiz_make() {
    console.log(quiz)
  timer();
  let options_html = document.querySelector(".main");
  options_html.innerHTML += `
        <div class="question text-xl md:text-2xl mt-4 font-semibold text-purple-800 ">${quiz[1].question}</div>
        <!-- For the options -->
        <div class="options flex flex-col gap-4 mt-4">
          
        </div><div class="option flex items-center border border-gray-300 rounded-lg py-4 px-4 gap-4 cursor-pointer hover:border-teal-400 hover:bg-gray-50 transition">
            <div class="option_name rounded-full bg-gray-200 text-black font-medium px-3 py-1">A</div>
            <div class="ans text-gray-700 font-semibold">${quiz[1].options[0]}</div>
          </div>
          
          <div class="option flex items-center border border-gray-300 rounded-lg py-4 px-4 gap-4 cursor-pointer hover:border-teal-400 hover:bg-gray-50 transition">
            <div class="option_name rounded-full bg-gray-200 text-black font-medium px-3 py-1">A</div>
            <div class="ans text-gray-700 font-semibold">${quiz[1].options[1]}</div>
          </div>
          <div class="option flex items-center border border-gray-300 rounded-lg py-4 px-4 gap-4 cursor-pointer hover:border-teal-400 hover:bg-gray-50 transition">
            <div class="option_name rounded-full bg-gray-200 text-black font-medium px-3 py-1">A</div>
            <div class="ans text-gray-700 font-semibold">${quiz[1].options[2]}</div>
          </div>
          <div class="option flex items-center border border-gray-300 rounded-lg py-4 px-4 gap-4 cursor-pointer hover:border-teal-400 hover:bg-gray-50 transition">
            <div class="option_name rounded-full bg-gray-200 text-black font-medium px-3 py-1">A</div>
            <div class="ans text-gray-700 font-semibold">${quiz[1].options[3]}</div>
          </div>`;
 
}
