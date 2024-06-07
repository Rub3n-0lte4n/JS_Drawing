
const canvas = document.getElementById('compass');
const ctx = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;
const radius = 250;

ctx.translate(centerX, centerY);

// Draw Northen Circle
function drawZeroCircle() {
    const zeroAngle = (-90) * Math.PI / 180; 
    const zeroX = (radius + 20) * Math.cos(zeroAngle);
    const zeroY = (radius + 20) * Math.sin(zeroAngle);

    ctx.beginPath();
    ctx.arc(zeroX, zeroY, 20, 0, 2 * Math.PI);
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 3;
    ctx.stroke();
}

function drawCompass(isDarkMode) {
    document.body.style.backgroundColor = isDarkMode ? '#000000' : '#FFFFFF';
    canvas.style.backgroundColor = isDarkMode ? '#000000' : '#FFFFFF';

    ctx.clearRect(-centerX, -centerY, width, height);

    // Circle Border
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = isDarkMode ? '#FFFFFF' : '#000000'; 
    ctx.lineWidth = 2;
    ctx.stroke();

     let angle = 0;
     const drawInterval = setInterval(() => {
         if (angle <= 350) {
             const angleRad = (angle - 90) * Math.PI / 180; // Start from North
             const x = radius * Math.cos(angleRad);
             const y = radius * Math.sin(angleRad);

             ctx.beginPath();
             ctx.moveTo(0, 0);
             ctx.lineTo(x, y);
             ctx.strokeStyle = isDarkMode ? '#FFFFFF' : '#000000'; 
             ctx.stroke();

             // Add Text
             const textX = (radius + 20) * Math.cos(angleRad);
             const textY = (radius + 20) * Math.sin(angleRad);

             ctx.save();
             ctx.translate(textX, textY);
             ctx.rotate(angleRad + Math.PI / 2);
             ctx.font = '16px Arial';
             ctx.textAlign = 'center'; // Center horizontally
             ctx.textBaseline = 'middle'; // Center vertically
             ctx.fillStyle = isDarkMode ? '#FFFFFF' : '#000000'; 
             ctx.fillText(angle.toString(), 0, 0);
             ctx.restore();

            angle += 22.5; 
        } else {
            clearInterval(drawInterval);
            drawZeroCircle(); 
        }
    }, 200); // Animation Time
}

function checkDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

drawCompass(checkDarkMode());

window.matchMedia('(prefers-color-scheme: dark)').addListener(e => drawCompass(e.matches));

function checkDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

drawCompass(checkDarkMode());

// Change Colors
window.matchMedia('(prefers-color-scheme: dark)').addListener(e => drawCompass(e.matches));

// Hehe, shhh ...
hoverCount = 0;
document.getElementById("no-no-no").addEventListener('mouseover', function() {
    hoverCount++;
    if (hoverCount === 1) {
        alert("Don't you even think copy me!");
    } else if (hoverCount === 2) {
        alert("Last Warning!");
    } else if (hoverCount === 3) {
        alert("You've Been Warned ...");
        document.body.innerHTML = '';
    }
});