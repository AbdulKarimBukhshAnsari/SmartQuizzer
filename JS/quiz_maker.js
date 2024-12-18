// this function will make the questions 
timer();
function timer(){
    const total_time = 5;
        let timer = document.querySelector('.time');
        let animate_circle = document.querySelector('svg circle:nth-child(2)');
        let circum_ference = 40 * Math.PI * 2;  // Circumference of the circle
        animate_circle.style.strokeDasharray = circum_ference;
        timer.innerHTML = total_time;
        
        let temp_time = total_time;
        
        let x = setInterval(function() {
            temp_time -= 1;
            timer.innerHTML = temp_time;
            let percentage = (temp_time / total_time);
            animate_circle.style.strokeDashoffset = circum_ference - (circum_ference * percentage); 
            
            if (temp_time == 0) {
                clearInterval(x);
            }
        }, 1000);
}