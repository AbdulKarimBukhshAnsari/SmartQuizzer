const quiz = JSON.parse(sessionStorage.getItem('questions'));
sessionStorage.setItem('total_question' , JSON.stringify(quiz.length));
