const DATA_URL = "Untitled-1.json";
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const elements = {
  loading: document.getElementById("loading"),
  error: document.getElementById("error"),
  card: document.getElementById("question-card"),
  progress: document.getElementById("progress"),
  score: document.getElementById("score"),
  number: document.getElementById("question-number"),
  text: document.getElementById("question-text"),
  imageWrapper: document.getElementById("question-image"),
  image: document.querySelector("#question-image img"),
  options: document.getElementById("options"),
  feedback: document.getElementById("feedback"),
  hint: document.getElementById("hint"),
  controls: document.getElementById("controls"),
  hintBtn: document.getElementById("hint-btn"),
  prevBtn: document.getElementById("prev-btn"),
  nextBtn: document.getElementById("next-btn"),
  optionTemplate: document.getElementById("option-template"),
};

const state = {
  questions: [],
  index: 0,
  answers: [],
  hintsShown: new Set(),
};

const labelFor = (idx) => (idx < LETTERS.length ? LETTERS[idx] : `${idx + 1}`);

async function loadQuestions() {
  const response = await fetch(DATA_URL);
  if (!response.ok) {
    throw new Error("Soru dosyas\u0131 y\u00fcklenemedi");
  }
  const payload = await response.json();
  const questions = payload.questions ?? [];
  questions.sort((a, b) => (a.questionNumber || 0) - (b.questionNumber || 0));
  return questions;
}

function setLoading(visible) {
  elements.loading.classList.toggle("hidden", !visible);
  elements.card.classList.toggle("hidden", visible);
  elements.controls.classList.toggle("hidden", visible);
}

function showError(message) {
  elements.error.textContent = message;
  elements.error.classList.remove("hidden");
  elements.loading.classList.add("hidden");
  elements.card.classList.add("hidden");
  elements.controls.classList.add("hidden");
}

function currentQuestion() {
  return state.questions[state.index];
}

function updateStatus() {
  const total = state.questions.length;
  elements.progress.textContent = `Soru ${state.index + 1} / ${total}`;
  const correctCount = state.answers.filter((item) => item?.correct).length;
  elements.score.textContent = `Do\u011fru: ${correctCount}`;
  elements.prevBtn.disabled = state.index === 0;
  const isLast = state.index === total - 1;
  elements.nextBtn.textContent = isLast ? "Bitir" : "Sonraki";
  elements.nextBtn.disabled = isLast && !state.answers[state.index];
  elements.hintBtn.disabled = !currentQuestion()?.hint;
}

function renderOptions(question) {
  elements.options.innerHTML = "";
  const fragment = document.createDocumentFragment();

  question.answerOptions.forEach((option, idx) => {
    const button = elements.optionTemplate.content
      .firstElementChild.cloneNode(true);
    button.dataset.index = idx;
    button.setAttribute("role", "option");
    button.setAttribute("aria-label", `Se\u00e7enek ${labelFor(idx)}`);
    button.textContent = `${labelFor(idx)}) ${option.text}`;
    fragment.appendChild(button);
  });

  elements.options.appendChild(fragment);
  applyAnswerState(question);
}

function renderHint(question) {
  if (!question.hint || !state.hintsShown.has(state.index)) {
    elements.hint.classList.add("hidden");
    elements.hint.textContent = "";
    return;
  }
    elements.hint.textContent = `\u0130pucu: ${question.hint}`;
  elements.hint.classList.remove("hidden");
}

function renderFeedback(question) {
  const answer = state.answers[state.index];
  if (!answer) {
    elements.feedback.classList.add("hidden");
    elements.feedback.innerHTML = "";
    return;
  }
  const isCorrect = answer.correct;
  const title = isCorrect
    ? "Tebrikler! Do\u011fru cevap."
    : "Maalesef, bu se\u00e7iminiz do\u011fru de\u011fil.";
  const rationalesMarkup = question.answerOptions
    .map((option, idx) => {
      const classes = ["rationale", option.isCorrect ? "correct" : "incorrect"];
      return `
        <div class="${classes.join(" ")}">
          <div><strong>${labelFor(idx)}) ${option.text}</strong></div>
          <p>${option.rationale || "A\u00e7\u0131klama bulunmuyor."}</p>
        </div>`;
    })
    .join("");

  elements.feedback.innerHTML = `
    <p class="feedback__title">${title}</p>
    <div class="rationales">${rationalesMarkup}</div>`;
  elements.feedback.classList.remove("hidden");
}

function applyAnswerState(question) {
  const answer = state.answers[state.index];
  const buttons = [...elements.options.querySelectorAll(".option-btn")];
  buttons.forEach((button) => {
    button.classList.remove("selected", "correct", "incorrect");
  });
  if (!answer) {
    return;
  }
  const correctIndex = question.answerOptions.findIndex(
    (opt) => opt.isCorrect,
  );
  buttons.forEach((button) => {
    const idx = Number(button.dataset.index);
    if (idx === answer.selected) {
      button.classList.add("selected");
      button.classList.add(answer.correct ? "correct" : "incorrect");
    } else if (idx === correctIndex) {
      button.classList.add("correct");
    }
  });
}

function handleAnswer(optionIndex) {
  const question = currentQuestion();
  if (!question) {
    return;
  }
  const option = question.answerOptions[optionIndex];
  if (!option) {
    return;
  }
  state.answers[state.index] = {
    selected: optionIndex,
    correct: Boolean(option.isCorrect),
  };
  renderFeedback(question);
  applyAnswerState(question);
  updateStatus();
}

function renderQuestion() {
  const question = currentQuestion();
  if (!question) {
    return;
  }
  elements.number.textContent = `#${question.questionNumber ?? state.index + 1}`;
  elements.text.textContent = question.question ?? "";

  if (question.imageUrl) {
    elements.image.src = question.imageUrl;
    elements.imageWrapper.classList.remove("hidden");
  } else {
    elements.image.src = "";
    elements.imageWrapper.classList.add("hidden");
  }

  renderOptions(question);
  renderFeedback(question);
  renderHint(question);
  updateStatus();
}

function attachEventListeners() {
  elements.options.addEventListener("click", (event) => {
    const button = event.target.closest(".option-btn");
    if (!button) {
      return;
    }
    const optionIndex = Number(button.dataset.index);
    handleAnswer(optionIndex);
  });

  elements.hintBtn.addEventListener("click", () => {
    state.hintsShown.add(state.index);
    renderHint(currentQuestion());
  });

  elements.prevBtn.addEventListener("click", () => {
    if (state.index === 0) {
      return;
    }
    state.index -= 1;
    renderQuestion();
  });

  elements.nextBtn.addEventListener("click", () => {
    if (state.index >= state.questions.length - 1) {
      return;
    }
    state.index += 1;
    renderQuestion();
  });
}

async function init() {
  try {
    const questions = await loadQuestions();
    if (!questions.length) {
      showError("G\u00f6sterilecek soru bulunamad\u0131.");
      return;
    }
    state.questions = questions;
    state.answers = new Array(questions.length);
    setLoading(false);
    renderQuestion();
  } catch (error) {
    console.error(error);
    showError(error.message || "Beklenmeyen bir hata olu\u015ftu.");
  }
}

attachEventListeners();
init();
