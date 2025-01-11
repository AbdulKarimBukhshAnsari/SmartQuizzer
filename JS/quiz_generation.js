// taking all the things from the HTML 
let topic_of_quiz_input = document.querySelector('.topic-of-quiz');
let jsonData ; 
let number_of_question_input = document.querySelector('.total-question');
let generate_button = document.querySelector('.generate-quiz');



const API_KEY = ''; 
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

// function to generate  the response 
async function generateResponse() {
    let prompt = `
    Generate a list of ${number_of_question_input.value}  quiz questions based on the topic ${topic_of_quiz_input.value}, and difficulty level must be hard . Each question should be formatted as a JSON object with the following attributes: question (a concise question no longer than 15-20 words), options (a list of 4 options, each no longer than 3-4 words), ans (the index of the correct option, from 0 to 3), and explanation (a brief explanation, no more than 20-25 words, justifying the correct answer). The final output should be a JSON array of objects, each adhering to this structure.
    `;  
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
        throw new Error('Failed to generate response');
    }

    const data = await response.json();
    const jsonString = data.candidates[0].content.parts[0].text;
    try {
        // remove all the extra things which occurs due to the markdown
        const cleanResponse = jsonString.replace(/```json|```/g, "").trim();
        jsonData = JSON.parse(cleanResponse);
        localStorage.setItem('questions', JSON.stringify(jsonData));
        console.log(jsonData);

    } catch (error) {
        console.error("Failed to parse JSON:", error);
    }
    return data.candidates[0].content.parts[0].text;
}




generate_button.addEventListener('click' ,()=>generateResponse() );








