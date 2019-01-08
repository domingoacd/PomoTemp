let tempInterval;
/**
 * Shows/hides the "How does it work?" panel. Assigns events to the open and close buttons.
 */
function openCloseFaq() {
    const openFaqButton = document.getElementById("info-open");
    const faqTextPanel = document.getElementById("info");
    const closeFaqButton = document.getElementById("info-close");
    openFaqButton.addEventListener("click", () => {
        faqTextPanel.classList.toggle("info-show");
    });
    closeFaqButton.addEventListener("click", () => {
        faqTextPanel.classList.toggle("info-show");
    });
}
/**
 * Activates the notifications when the temp cycle ends 
 * @param {String} currentCycle -The cycle that is ending (rest, long rest or work)- 
 */
function notifications(currentCycle) {
    const notificationSound = new Audio("notification.wav");
    let notificationMessage;
    switch (currentCycle) {
        case "rest":
            notificationMessage = "Time to work!";
            break;

        case "longRest":
            notificationMessage = "Ok, to work again!";
            break;

        case "work":
            notificationMessage = "Is time to rest!";
            break;

        default:
            notificationMessage = "Message error";
            break;
    }
    notificationSound.play();
    new Notification(notificationMessage);
}
/**
 * Writes the remaining time on screen 
 * @param {Number} minutes -Timer remaining minutes- 
 * @param {Number} seconds -Timer remaining seconds-
 */
function printTime(minutes, seconds) {
    const timerDisplay = document.getElementById("time");
    const timeToPrint = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
    timerDisplay.innerText = timeToPrint;
}
/**
 * Calculates the remaining time of the timer
 *  @param {Number} totalTimeInMinutes -The starting time (in minutes) of the timer-
 *  @param {Boolean} intervalIsOn -Checks wheter an interval is currently running-
 *  @param {String} selectedCycle -The interval that is going to run (rest, long rest or work)-
 */
function startTimer(totalTimeInMinutes, intervalIsOn, selectedCycle) {
    let totalTimeInSeconds = Date.now() / 1000 + totalTimeInMinutes * 60;
    let secondsToPrint = -1;
    clearInterval(tempInterval);
    if (intervalIsOn) {
        clearInterval(tempInterval);
    }
    tempInterval = setInterval(() => {
        let remainingTime = Math.floor(totalTimeInSeconds - Date.now() / 1000);
        if (remainingTime < -1) {
            notifications(selectedCycle);
            clearInterval(tempInterval);
        } else {
            if (secondsToPrint <= 0) {
                totalTimeInMinutes--;
                secondsToPrint = 60;
            }
            secondsToPrint--;
            printTime(totalTimeInMinutes, secondsToPrint);
        }
    }, 1000);
}
/**
 * Notification request. Assigns events to buttons. Starts the timer. 
 */
function start() {
    const tempButtons = document.getElementsByClassName("temp-selector");
    for (let button of tempButtons) {
        button.addEventListener("click", () => {
            const timeToWait = Number(button.value);
            const selectedCycle = button.getAttribute("data-description");
            startTimer(timeToWait, status, selectedCycle);
        });
    }
    openCloseFaq();
    Notification.requestPermission();
}
window.onload = start;