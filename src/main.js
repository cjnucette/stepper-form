const steps = Array.from(document.querySelectorAll('.step__header'));
const stepContinue = Array.from(document.querySelectorAll('.continue'));
const stepBack = Array.from(document.querySelectorAll('.back'));
const stepForm = document.querySelector('.step__form');
const inputNames = Array.from(stepForm.querySelectorAll('.step__input')).map(
  i => i.name
);

let currentStep = 0;

stepContinue.forEach(btn =>
  btn.addEventListener('click', e => {
    e.preventDefault();

    const currentInput = stepForm[inputNames[currentStep]];
    if (currentInput.value !== '' && currentInput.validity.valid) {
      setDone(currentStep, true);
      currentStep += currentStep < steps.length - 1 ? 1 : 0;
      setActive(currentStep);
    }
  })
);

stepBack.forEach(btn =>
  btn.addEventListener('click', e => {
    e.preventDefault();
    currentStep -= currentStep > 0 ? 1 : 0;
    setActive(currentStep);
  })
);

stepForm.addEventListener('submit', e => {
  e.preventDefault();

  let formData = {};

  for (let name of inputNames) {
    formData = { ...formData, [name]: stepForm[name].value };
  }
  setDone(currentStep, true);
  steps[currentStep].parentElement.classList.remove('active');
  console.log(formData);
});

const setDone = (step, isDone) => {
  if (isDone) {
    steps[step].parentElement.classList.add('done');
    steps[step].children[0].innerHTML = '&#10004;';
  } else {
    steps[step].parentElement.classList.remove('done');
    steps[step].children[0].innerHTML = step + 1;
  }
};

const setActive = step => {
  steps.forEach(s => s.parentElement.classList.remove('active'));
  steps[step].parentElement.classList.add('active');
  setDone(step, false);
};

setActive(currentStep);
