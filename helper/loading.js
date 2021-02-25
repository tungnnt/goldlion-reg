const ProgressBar = require('progress');

const displayProgressBar = (totalDot, timeToProcessADot) => {
    const bar = new ProgressBar(':bar', { total: totalDot });

    const timer = setInterval(function () {
        bar.tick();
        if (bar.complete) {
            clearInterval(timer);
        }
    }, timeToProcessADot);
}

module.exports = async (totalDot, timeToProcessADot) => {
    displayProgressBar(totalDot, timeToProcessADot)

    await new Promise(resolve => setTimeout(resolve, totalDot * timeToProcessADot))
}