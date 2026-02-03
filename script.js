// Function to show the surprise popup
function showSurprisePopup() {
    document.getElementById("surprisePopup").style.display = "block";
}

// Function to close the surprise popup
function closeSurprisePopup() {
    document.getElementById("surprisePopup").style.display = "none";
}

function showBMI() {
    const panel = document.getElementById("panel");
    panel.innerHTML = `
        <h2>Calculate BMI</h2>
        <label for="weight">Enter your weight (kg):</label>
        <input type="number" id="weight" placeholder="Weight" style="width: 170px; height: 25px;"><br><br>
        <label for="height">Enter your height (cm):</label>
        <input type="number" id="height" placeholder="Height" style="width: 170px; height: 25px;"><br><br>
        <button onclick="calculateBMI()" style="width: 80px; height: 25px; border-radius:5px;"><b>Calculate</b></button>
        <div id="bmiResult"></div>
    `;

    // Restore state if parameters are available
    const urlParams = new URLSearchParams(window.location.search);
    const bmi = urlParams.get('bmi');
    const healthLevel = urlParams.get('healthLevel');

    if (bmi && healthLevel) {
        document.getElementById('weight').value = localStorage.getItem('weight') || '';
        document.getElementById('height').value = localStorage.getItem('height') || '';
        document.getElementById("bmiResult").innerHTML = `
            <p>Your BMI is ${bmi}</p>
            <p>Health Level: ${healthLevel}</p>
            <button id="moreInfoBtn" onclick="redirectToMoreInfoPage(${bmi}, '${healthLevel}')"><b>More Info</b></button>
        `;
    }
}

function calculateBMI() {
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value) / 100; // Convert cm to meters
    if (!weight || !height) {
        alert("Please enter both weight and height.");
        return;
    }

    const bmi = weight / (height * height);
    let healthLevel = "";

    if (bmi < 18.5) {
        healthLevel = "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        healthLevel = "Healthy weight";
    } else if (bmi >= 25 && bmi < 30) {
        healthLevel = "Overweight";
    } else if (bmi >= 30 && bmi < 35) {
        healthLevel = "Class 1 Obesity";
    } else if (bmi >= 35 && bmi < 40) {
        healthLevel = "Class 2 Obesity";
    } else {
        healthLevel = "Class 3 Obesity";
    }

    // Store data in local storage for later use
    localStorage.setItem('weight', document.getElementById('weight').value);
    localStorage.setItem('height', document.getElementById('height').value);
    localStorage.setItem('bmi', bmi);
    localStorage.setItem('healthLevel', healthLevel);

    document.getElementById("bmiResult").innerHTML = `
        <p>Your BMI is ${bmi.toFixed(2)}</p>
        <p>Health Level: ${healthLevel}</p>
        <button id="moreInfoBtn" onclick="redirectToMoreInfoPage(${bmi.toFixed(2)}, '${healthLevel}')" style="width: 80px; height: 25px; border-radius:5px;"><b>More Info</b></button>
    `;
}

function redirectToMoreInfoPage(bmi, healthLevel) {
    window.location.href = `more_info.html?bmi=${bmi}&healthLevel=${healthLevel}`;
}



function showExercises() {
    const panel = document.getElementById("panel");
    panel.innerHTML = `
        <h2>What do you want to work on today?</h2>
        <label for="level">Select level:</label>
        <select id="level">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
        </select>
        <button onclick="getExercises()" style="width: 120px; height: 35px; border-radius:5px;"><b>Get Exercises</b></button>
        <div id="exerciseResult"></div>
    `;
}
function getExercises() {
    const level = document.getElementById("level").value;
    fetch('exercises.json')
        .then(response => response.json())
        .then(data => {
            const exercises = Object.keys(data).filter(key => data[key].level === level);
            const limitedExercises = exercises.slice(0, 10);
            const exerciseList = limitedExercises.map(key => `<p>${data[key].name}</p>`).join("");

            document.getElementById("exerciseResult").innerHTML = `
                ${exerciseList}
                <button onclick="showMoreExercises('${level}')" style="width: 120px; height: 35px; border-radius:5px;"><b>More Exercises</b></button>
                <button onclick="redirectToExerciseInfoPage('${limitedExercises.join(',')}')" style="width: 120px; height: 35px; border-radius:5px;"><b>More Info</b></button>
            `;
        })
        .catch(error => console.error('Error:', error));
}

function redirectToExerciseInfoPage(exercises) {
    window.location.href = `exercise_info.html?exercises=${exercises}`;
}


function showMoreExercises(level) {
    window.location.href = `more_exercises.html?level=${level}`;
}

function showNutrition() {
    const panel = document.getElementById("panel");
    panel.innerHTML = `
        <h2>Nutrition Plan</h2>
        <label for="goal">Select Your Goal:</label>
        <select id="goal">
            <option value="weightLoss">Weight Loss</option>
            <option value="muscleGain">Muscle Gain</option>
            <option value="maintenance">Maintenance</option>
        </select>
        <button onclick="getNutritionPlan()" style="width: 130px; height: 35px; border-radius:5px;"><b>Get Nutrition Plan</b></button>
        <div id="nutritionResult"></div>
    `;
}

function getNutritionPlan() {
    const goal = document.getElementById("goal").value;
    let plan = "";

    switch (goal) {
        case "weightLoss":
            plan = `
                <ul>
                    <li>Eat a balanced diet with a caloric deficit.</li>
                    <li>Focus on lean proteins and vegetables.</li>
                    <li>Avoid sugary drinks and snacks.</li>
                    <li>Drink plenty of water.</li>
                </ul>
            `;
            break;
        case "muscleGain":
            plan = `
                <ul>
                    <li>Increase protein intake to support muscle growth.</li>
                    <li>Eat complex carbohydrates for energy.</li>
                    <li>Incorporate strength training into your routine.</li>
                    <li>Ensure proper hydration and recovery.</li>
                </ul>
            `;
            break;
        case "maintenance":
            plan = `
                <ul>
                    <li>Maintain a balanced diet with regular meals.</li>
                    <li>Include a variety of foods to meet nutritional needs.</li>
                    <li>Adjust calorie intake based on activity level.</li>
                    <li>Stay hydrated and active.</li>
                </ul>
            `;
            break;
        default:
            plan = "Please select a valid goal.";
    }

    document.getElementById("nutritionResult").innerHTML = `
        ${plan}
        <button onclick="redirectToNutritionInfoPage('${goal}')" style="width: 80px; height: 25px; border-radius:5px;"><b>More Info</b></button>
    `;
}

function redirectToNutritionInfoPage(goal) {
    window.location.href = `nutrition_info.html?goal=${goal}`;
}





