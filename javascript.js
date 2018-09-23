let tempInterval;
/**
 * Shows/hides the "How does it work?" panel. Assigns events to the open and close buttons.
 */
function openClose(){
    let openButton = document.getElementById("info-open"),
        infoPanel= document.getElementById("info"),
        closeButton = document.getElementById("info-close");
    openButton.addEventListener("click", ()=>{
        infoPanel.classList.toggle("info-show");
    });
    closeButton.addEventListener("click", ()=>{
        infoPanel.classList.toggle("info-show");
    });
}
/**
 * Activates the notifications when the temp cycle ends 
 * @param {String} currentCycle -The cycle that is ending (rest, long rest or work)- 
 */
function notifications(currentCycle){
    let notificationSound = new Audio("notification.wav"), 
    message;
    switch (currentCycle) {
        case "rest":
            message = "Time to work!";
            break;
    
        case "longRest":
            message = "Ok, to work again!";
            break;
    
        case "work":
            message = "Is time to rest!";
            break;
    
        default:
            message = "Message error";
            break;
    }
    notificationSound.play();
    new Notification(message);
}
/**
 * Writes the remaining time on screen 
 * @param {Number} minutes -Timer remaining minutes- 
 * @param {Number} seconds -Timer remaining seconds-
 */
function outputTime(minutes, seconds){
    let display = document.getElementById("time"),
        output = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    display.innerText = output;
}
/**
 * Calculates the remaining time of the timer
 *  @param {Number} time -The starting time (in minutes) of the timer-
 *  @param {Boolean} intervalIsOn -Checks wheter an interval is currently running-
 *  @param {String} currentCycle -The interval that is going to run (rest, long rest or work)-
 */
function inputTime(time, intervalIsOn, currentCycle){
    let totalTimeSeconds = Date.now()/1000 + time*60,
        seconds = -1;
        clearInterval(tempInterval);
        if(intervalIsOn){
            clearInterval(tempInterval);
        }
        tempInterval = setInterval(()=>{
            let tiempoRestante = Math.floor(totalTimeSeconds - Date.now()/1000);
            if(tiempoRestante < -1){
                notifications(currentCycle);
                clearInterval(tempInterval);

            }else{
                if(seconds <= 0){
                    time--;
                    seconds = 60;
                }
                seconds--;
                outputTime(time, seconds);
            }
        },1000);
}
/**
 * Notification request. Assigns events to buttons. Starts the timer. 
 */
function start(){
    let buttonsList = document.getElementsByClassName("temp-selector");
    for(let button of buttonsList){
        button.addEventListener("click", ()=>{
            inputTime(Number(button.value), status, button.getAttribute("data-description"));
        });
    }
    openClose();
    Notification.requestPermission();
}
start();