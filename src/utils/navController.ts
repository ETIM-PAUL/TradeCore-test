export function moveSlides(stepPosition: number, setSelected: any) {
  const steps = document.querySelectorAll(".step");
  function updateSteps() {
    steps[stepPosition].classList.add("current-step");
    steps[stepPosition - 1].classList.remove("current-step");
    setSelected(false);
  }
  updateSteps();
}

export function firstSlide(initialStep: number) {
  const lastStep = document.getElementById("finished") as HTMLDivElement;
  const steps = document.querySelectorAll(".step");
  function firstStep() {
    lastStep.classList.remove("current-step");
    steps[initialStep].classList.add("current-step");
  }
  firstStep();
}

export function jumpSlide(step: number, setSelected: any) {
  const subGenre = document.getElementById(
    "selectingSubGenre"
  ) as HTMLDivElement;
  const steps = document.querySelectorAll(".step");
  function firstStep() {
    subGenre.classList.remove("current-step");
    steps[step].classList.add("current-step");
    setSelected(false);
  }
  firstStep();
}

export function prevSlide(step: number) {
  const steps = document.querySelectorAll(".step");
  function firstStep() {
    steps[step - 1].classList.add("current-step");
    steps[step].classList.remove("current-step");
  }
  firstStep();
}

export function skipSlide(step: number, stepName: string) {
  const steps = document.querySelectorAll(".step");
  function firstStep() {
    steps[step - 1].classList.add("current-step");
    if (stepName === "addNewSubGenre") {
      steps[step].classList.remove("current-step");
    } else {
      steps[step + 1].classList.remove("current-step");
    }
  }
  firstStep();
}
