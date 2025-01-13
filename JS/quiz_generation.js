// taking all the things from the HTML 
let topic_of_quiz_input = document.querySelector('.topic-of-quiz');
let total_time = document.querySelector('.total-time');
let easy_button = document.querySelector('.easy-button');
let med_button  = document.querySelector('.med-button');
let hard_button  = document.querySelector('.hard-button');
let number_of_question_input = document.querySelector('.total-question');
let generate_button = document.querySelector('.generate-quiz');
let complexity_level = 'easy';
easy_button.classList.add('bg-teal-500');
console.log(complexity_level);


// to add visualization when the certain button is selected 

easy_button.addEventListener('click' , function(e){
    med_button.classList.remove('bg-teal-500');
    hard_button.classList.remove('bg-teal-500');
    complexity_level = 'easy';
    e.target.classList.add('bg-teal-500'); 
})

med_button.addEventListener('click' , function(e){
    easy_button.classList.remove('bg-teal-500');
    hard_button.classList.remove('bg-teal-500');
    complexity_level = 'medium';
    e.target.classList.add('bg-teal-500'); 
})

hard_button.addEventListener('click' , function(e){
    med_button.classList.remove('bg-teal-500');
    easy_button.classList.remove('bg-teal-500');
    complexity_level = 'hard';
    e.target.classList.add('bg-teal-500'); 
})




const API_KEY = ''; 
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

// function to generate  the response 
async function generateResponse() {
    if(topic_of_quiz_input.value === "" ){
        alert("Choose Topic first!!!");
        location.reload();
    }
    sessionStorage.setItem('time' , JSON.stringify(total_time.value));
    sessionStorage.setItem('quiz_topic' , JSON.stringify(topic_of_quiz_input.value))
    console.log('Complexity level: ' + complexity_level);
    let prompt = `
    Generate a list of ${number_of_question_input.value}  quiz questions based on the topic ${topic_of_quiz_input.value}, and difficulty level must be ${complexity_level}. Each question should be formatted as a JSON object with the following attributes: question (a concise question no longer than 15-20 words), options (a list of 4 options, each no longer than 3-4 words), ans (the index of the correct option, from 0 to 3), and explanation (a brief explanation, no more than 25-30 words, justifying the correct answer). The final output should be a JSON array of objects, each adhering to this structure.
    `;
    let main_body_of_page = document.querySelector('.main-body')
    // to show the progress bar 
    main_body_of_page.innerHTML += ` <div class="fixed inset-0 bg-black bg-opacity-50 w-full h-full z-10"></div>
  <div class="fixed inset-0 flex justify-center items-center z-20">
    <div class="bg-white p-10 rounded-lg shadow-md flex flex-col items-center space-y-6">
      <!-- Loading Circle -->
      <div class="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <!-- Text -->
      <p class="waiting-text text-lg font-bold text-purple-500">Generating the Quiz</p>
    </div>
  </div>`;  
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                        }
                    ]
                }
            ]
        })
    });

    if (!response.ok) {
        let waiting_text = document.querySelector('.waiting-text');
        waiting_text.innerHTML = 'Failed to Generate the Quiz.';
    }

    const data = await response.json();
    const jsonString = data.candidates[0].content.parts[0].text;
    try {
        // remove all the extra things which occurs due to the markdown
        const cleanResponse = jsonString.replace(/```json|```/g, "").trim();
        let jsonData = JSON.parse(cleanResponse);
        sessionStorage.setItem('questions', JSON.stringify(jsonData));

        window.location.href = "quiz.html";

    } catch (error) {
        console.error("Failed to parse JSON:", error);
    }
    return data.candidates[0].content.parts[0].text;
}




generate_button.addEventListener('click' ,()=>generateResponse() );








