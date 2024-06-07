
const canvas = document.getElementById('compass');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;
const radius = 250;

ctx.translate(centerX, centerY);

function drawCompass(isDarkMode) {
    // COLOR
    document.body.style.backgroundColor = isDarkMode ? '#000000' : '#FFFFFF';
    canvas.style.backgroundColor = isDarkMode ? '#000000' : '#FFFFFF';

    ctx.clearRect(-centerX, -centerY, width, height);

    // BORDER
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = isDarkMode ? '#FFFFFF' : '#000000'; // Dark Mode
    ctx.lineWidth = 2;
    ctx.stroke();

    // SEGMENTS
    let angle = 0;
    const drawInterval = setInterval(() => {
        if (angle <= 338) {
            const angleRad = (angle - 90) * Math.PI / 180; 
            const x = radius * Math.cos(angleRad);
            const y = radius * Math.sin(angleRad);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(x, y);
            ctx.strokeStyle = isDarkMode ? '#FFFFFF' : '#000000'; // Dark Mode
            ctx.stroke();

            // TEXT
            const textX = (radius + 20) * Math.cos(angleRad);
            const textY = (radius + 20) * Math.sin(angleRad);

            ctx.save();
            ctx.translate(textX, textY);
            ctx.rotate(angleRad + Math.PI / 2);
            ctx.font = '16px Arial';
            ctx.fillStyle = isDarkMode ? '#FFFFFF' : '#000000'; // Dark Mode
            ctx.fillText(angle.toString(), -10, 5);
            ctx.restore();

            angle += 22.5; 
        } else {
            clearInterval(drawInterval);
        }
    }, 200); // Animation Time
}

// Yeallow Circle
function drawZeroCircle(isDarkMode) {
    const zeroAngle = (-90) * Math.PI / 180;
    const zeroX = (radius + 20) * Math.cos(zeroAngle);
    const zeroY = (radius + 20) * Math.sin(zeroAngle);

    ctx.beginPath();
    ctx.arc(zeroX, zeroY, 20, 0, 2 * Math.PI);
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 3;
    ctx.stroke();
}

// Check if Dark Mode is enabled
function checkDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

drawCompass(checkDarkMode());

// Change Colors
window.matchMedia('(prefers-color-scheme: dark)').addListener(e => drawCompass(e.matches));