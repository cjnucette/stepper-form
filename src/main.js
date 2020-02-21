const stepGroup = Array.from(document.querySelectorAll('.step__group'));
const stepContinue = Array.from(document.querySelectorAll('.step__continue'));
const stepBack = Array.from(document.querySelectorAll('.step__back'));
const stepForm = document.querySelector('.step');
const inputNames = Array.from(stepForm.querySelectorAll('.step__input')).map(
  i => i.name
);

let currentStep = 0;

stepContinue.forEach(btn =>
  btn.addEventListener('click', e => {
    e.preventDefault();

    const currentInput = stepForm[inputNames[currentStep]];
    if (currentInput.value !== '' && currentInput.validity.valid) {
      currentStep += currentStep < stepGroup.length - 1 ? 1 : 0;
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

  console.log(formData);
});

const setActive = step => {
  stepGroup.forEach(group => group.classList.remove('active'));
  stepGroup[step].classList.add('active');
};

setActive(currentStep);
