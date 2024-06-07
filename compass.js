const canvas = document.getElementById('compass');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.translate(canvas.width / 2, canvas.height / 2);
}

let hoverCount = 0;

// Function to draw the yellow circle around the 0 label
function drawZeroCircle(radius) {
    const zeroAngle = (-90) * Math.PI / 180; // Angle for 0 label
    const zeroX = (radius + 20) * Math.cos(zeroAngle);
    const zeroY = (radius + 20) * Math.sin(zeroAngle);

    ctx.beginPath();
    ctx.arc(zeroX, zeroY, 20, 0, 2 * Math.PI);
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 3;
    ctx.stroke();
}

function drawCompass(isDarkMode) {
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;

    // Set background color
    document.body.style.backgroundColor = isDarkMode ? '#000000' : '#FFFFFF';
    canvas.style.backgroundColor = isDarkMode ? '#000000' : '#FFFFFF';

    ctx.clearRect(-centerX, -centerY, width, height);

    // Draw circle border
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = isDarkMode ? '#FFFFFF' : '#000000'; // Invert color for dark mode
    ctx.lineWidth = 2;
    ctx.stroke();

    // Define angles to draw lines
    let angle = 0;
    const drawInterval = setInterval(() => {
        if (angle <= 360) {
            const angleRad = (angle - 90) * Math.PI / 180; // Subtract 90 degrees to start from north
            const x = radius * Math.cos(angleRad);
            const y = radius * Math.sin(angleRad);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(x, y);
            ctx.strokeStyle = isDarkMode ? '#FFFFFF' : '#000000'; // Invert color for dark mode
            ctx.stroke();

            // Positioning text at the end of each line segment
            const textX = (radius + 20) * Math.cos(angleRad);
            const textY = (radius + 20) * Math.sin(angleRad);

            ctx.save();
            ctx.translate(textX, textY);
            ctx.rotate(angleRad + Math.PI / 2);
            ctx.font = '16px Arial';
            ctx.textAlign = 'center'; // Center text horizontally
            ctx.textBaseline = 'middle'; // Center text vertically
            ctx.fillStyle = isDarkMode ? '#FFFFFF' : '#000000'; // Invert color for dark mode
            ctx.fillText(angle.toString(), 0, 0);
            ctx.restore();

            angle += 2.5; // Increment angle by 2.5 degrees for smoother animation
        } else {
            clearInterval(drawInterval);
            drawZeroCircle(radius); // Draw the yellow circle after the animation completes
        }
    }, 20); // Draw every 20 milliseconds
}

// Function to check if dark mode is enabled
function checkDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Initial draw based on system's color scheme
drawCompass(checkDarkMode());

// Listen for changes in color scheme
window.matchMedia('(prefers-color-scheme: dark)').addListener(e => drawCompass(e.matches));

// Resize canvas and redraw on window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    drawCompass(checkDarkMode());
});

resizeCanvas();
drawCompass(checkDarkMode());

// Hehe, shhh ...
document.getElementById("no-no-no").addEventListener('mouseover', function() {
    hoverCount++;
    if (hoverCount === 1) {
        alert("Don't you even think copy me!");
    } else if (hoverCount === 2) {
        alert("Last Warning!");
    } else if (hoverCount === 3) {
        alert("Ok, bye ✌️ ");
        document.body.innerHTML = ''; 
    }
});