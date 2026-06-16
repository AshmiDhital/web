const form = document.getElementById('studyForm');
const message = document.getElementById('message');
const nameStep = document.getElementById('stepName');
const hoursStep = document.getElementById('stepHours');
const nextButton = document.getElementById('nextButton');
const submitButton = document.getElementById('submitButton');
const nameInput = document.getElementById('name');
const hoursInput = document.getElementById('hours');
const namePrompt = document.getElementById('namePrompt');

let savedName = '';

form.addEventListener('submit', function (event) {
    event.preventDefault();
});

nextButton.addEventListener('click', function () {
    const name = nameInput.value.trim();

    if (!name) {
        showMessage('I need a name before I can roast you properly.', 'error');
        return;
    }

    savedName = name;
    nameStep.classList.add('hidden');
    hoursStep.classList.remove('hidden');
    namePrompt.textContent = `Alright ${savedName}, spill the hours. Don't try to lie.`;
    hoursInput.focus();
    showMessage('Name received. Now let’s see if you actually studied or just stared at your phone.', 'success');
});

submitButton.addEventListener('click', function () {
    const hours = parseFloat(hoursInput.value);

    if (Number.isNaN(hours) || hours < 0) {
        showMessage('Enter a valid number of hours, not nonsense.', 'error');
        return;
    }

    const result = createStudyMessage(savedName, hours);
    showBigMessage(result.message, result.type);

    if (result.confetti) {
        launchConfetti(24);
    }

    hideForm();
});

function showBigMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type} show big`;
}

function hideForm() {
    form.classList.add('hidden');
}

function createStudyMessage(name, hours) {
    const lowerName = name.trim();
    let response;
    let type = 'success';
    let confetti = false;

    if (hours === 0) {
        response = `Hey ${lowerName}, 0 hours? Your books are judging you harder than your ex. Stop the excuses and actually open a page.`;
    } else if (hours <= 1) {
        response = `One hour, ${lowerName}? That’s basically a snack, not real studying. Quit the pretend grind and get to the real stuff.`;
    } else if (hours <= 3) {
        response = `${lowerName}, ${hours} hours is cute. You still spent more time thinking about studying than actually doing it.`;
    } else if (hours <= 5) {
        response = `Alright ${lowerName}, ${hours} hours — not terrible, but also not legendary. Don't celebrate yet, your laziness is still invited.`;
    } else {
        response = `Wow ${lowerName}, ${hours} hours? You actually survived it. Now keep going, because your future self is still waiting on you.`;
        confetti = true;
    }

    return { message: response, type, confetti };
}

function showMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type} show`;

    setTimeout(() => {
        message.classList.remove('show');
    }, 4000);
}

function resetForm() {
    savedName = '';
    hoursStep.classList.add('hidden');
    nameStep.classList.remove('hidden');
    form.reset();
    nameInput.focus();
}

function launchConfetti(count = 20) {
    const colors = ['#60a5fa', '#f472b6', '#34d399', '#facc15', '#a78bfa'];

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('span');
        confetti.className = 'confetti';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${50 + Math.random() * 20}%`;
        confetti.style.top = `${25 + Math.random() * 15}%`;
        confetti.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
        confetti.style.width = `${8 + Math.random() * 6}px`;
        confetti.style.height = `${8 + Math.random() * 6}px`;

        document.body.appendChild(confetti);

        requestAnimationFrame(() => {
            const x = (Math.random() - 0.5) * 260;
            const y = 220 + Math.random() * 130;
            const rotation = Math.random() * 720;
            confetti.style.transition = 'transform 1.3s ease-out, opacity 1.3s ease-out';
            confetti.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
            confetti.style.opacity = '0';
        });

        setTimeout(() => confetti.remove(), 1400);
    }
}
