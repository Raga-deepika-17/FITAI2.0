// Handle Surprise Me popup display
document.getElementById('surpriseMeLink').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('surprisePopup').style.display = 'block';
  });

  // Close the popup if needed
  document.querySelectorAll('.close').forEach(button => {
    button.addEventListener('click', () => {
      button.parentElement.parentElement.style.display = 'none';
    });
  });

  // JavaScript for spinning wheel logic
  const options = ["Exercise", "Smoothie Recipe", "Workout Song", "Surprise Dare"];
  const exercises = ["Push Up", "Squats", "Plank"];
  const smoothies = ["Banana Smoothie", "Berry Blast", "Green Detox"];
  const songs = ["Eye of the Tiger", "Lose Yourself", "Can't Hold Us"];
  const dares = ["Do 10 Burpees", "Dance for 30 seconds", "Drink a glass of water"];

  let canvas = document.getElementById('wheelCanvas');
  let ctx = canvas.getContext('2d');
  let startAngle = 30;
  let arc = Math.PI / 2; // 90 degrees for each quarter
  let spinTimeout = null;
  let spinAngleStart = 10;
  let spinTime = 0;
  let spinTimeTotal = 0;

  function drawWheel() {
      for(let i = 0; i < options.length; i++) {
          let angle = startAngle + i * arc;
          ctx.beginPath();
          ctx.arc(200, 200, 150, angle, angle + arc, false);
          ctx.lineTo(200, 200);
          ctx.fillStyle = ["#FFCC00", "#FF6600", "#00CCFF", "#66CC00"][i];
          ctx.fill();
          ctx.strokeStyle = "#000"; // Thicker borders
          ctx.lineWidth = 4; // Thicker borders
          ctx.stroke();
          ctx.save();
          ctx.translate(200 + Math.cos(angle + arc / 2) * 100, 
                        200 + Math.sin(angle + arc / 2) * 100);
          ctx.rotate(angle + arc / 2 + Math.PI / 2);
          ctx.fillStyle = "#fff";
          ctx.font = "bold 16px Arial"; // Increased font size
          ctx.fillText(options[i], -ctx.measureText(options[i]).width / 2, 0);
          ctx.restore();
      }
  }

  function rotateWheel() {
      spinAngleStart = Math.random() * 15 + 25;
      spinTime = 0;
      spinTimeTotal = Math.random() * 2000 + 3000;
      rotate();
  }

  function rotate() {
      spinTime += 30;
      if(spinTime >= spinTimeTotal) {
          stopRotateWheel();
          return;
      }
      let spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
      startAngle += (spinAngle * Math.PI / 180);
      drawWheel();
      spinTimeout = setTimeout(rotate, 30);
  }

  function stopRotateWheel() {
      let degrees = startAngle * 180 / Math.PI + 90;
      let arcd = arc * 180 / Math.PI;
      let index = Math.floor((360 - degrees % 360) / arcd);
      let result = options[index];
      
      // Display result in a centered popup
      document.getElementById('resultDisplay').textContent = getResultText(result);
      document.getElementById('resultPopup').style.display = 'block';
  }

  function easeOut(t, b, c, d) {
      let ts = (t /= d) * t;
      let tc = ts * t;
      return b + c * (tc + -3 * ts + 3 * t);
  }

  function getResultText(result) {
      switch(result) {
          case "Exercise":
              return "Exercise: " + exercises[Math.floor(Math.random() * exercises.length)];
          case "Smoothie Recipe":
              return "Smoothie Recipe: " + smoothies[Math.floor(Math.random() * smoothies.length)];
          case "Workout Song":
              return "Workout Song: " + songs[Math.floor(Math.random() * songs.length)];
          case "Surprise Dare":
              return "Surprise Dare: " + dares[Math.floor(Math.random() * dares.length)];
          default:
              return "Try Again!";
      }
  }

  document.getElementById('spinButton').addEventListener('click', rotateWheel);
  drawWheel(); // Initial drawing of the wheel