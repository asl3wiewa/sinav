const DATA_URL = "Untitled-1.json";
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const STORAGE_KEY = "bosZamanQuizState";
const STORAGE_VERSION = 1;

const elements = {
  loading: document.getElementById("loading"),
  error: document.getElementById("error"),
  card: document.getElementById("question-card"),
  progressTotal: document.getElementById("progress-total"),
  scoreCorrect: document.getElementById("score-correct"),
  scoreWrong: document.getElementById("score-wrong"),
  progressBar: document.getElementById("progress-bar-fill"),
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
  resetBtn: document.getElementById("reset-btn"),
  jumpForm: document.getElementById("jump-form"),
  jumpInput: document.getElementById("jump-input"),
  optionTemplate: document.getElementById("option-template"),
};

const state = {
  questions: [],
  index: 0,
  answers: [],
  hintsShown: new Set(),
};

const labelFor = (idx) => (idx < LETTERS.length ? LETTERS[idx] : `${idx + 1}`);

function persistState() {
  if (!state.questions.length || typeof window === "undefined") {
    return;
  }
  try {
    const payload = {
      version: STORAGE_VERSION,
      index: state.index,
      total: state.questions.length,
      answers: state.answers.map((entry) =>
        entry ? { selected: entry.selected, correct: entry.correct } : null,
      ),
      hints: [...state.hintsShown],
    };
    window.localStorage?.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn("Quiz state persist failed", error);
  }
}

function restoreState(total) {
  state.answers = new Array(total);
  state.hintsShown = new Set();
  state.index = 0;
  if (typeof window === "undefined") {
    return;
  }
  try {
    const raw = window.localStorage?.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }
    const payload = JSON.parse(raw);
    if (
      payload.version !== STORAGE_VERSION ||
      payload.total !== total
    ) {
      return;
    }
    if (Array.isArray(payload.answers)) {
      payload.answers.forEach((entry, idx) => {
        if (
          idx < total &&
          entry &&
          typeof entry.selected === "number" &&
          typeof entry.correct === "boolean"
        ) {
          state.answers[idx] = {
            selected: entry.selected,
            correct: entry.correct,
          };
        }
      });
    }
    if (Array.isArray(payload.hints)) {
      payload.hints.forEach((hintIndex) => {
        if (typeof hintIndex === "number" && hintIndex >= 0 && hintIndex < total) {
          state.hintsShown.add(hintIndex);
        }
      });
    }
    if (typeof payload.index === "number") {
      state.index = Math.min(Math.max(payload.index, 0), total - 1);
    }
  } catch (error) {
    console.warn("Quiz state restore failed", error);
  }
}

function resetQuiz() {
  state.answers = new Array(state.questions.length);
  state.hintsShown = new Set();
  state.index = 0;
  if (typeof window !== "undefined") {
    window.localStorage?.removeItem(STORAGE_KEY);
  }
  renderQuestion();
}

function jumpToQuestion(target) {
  if (!state.questions.length) {
    return;
  }
  const total = state.questions.length;
  const clamped = Math.min(Math.max(target, 0), total - 1);
  state.index = clamped;
  renderQuestion();
  persistState();
}

function processJumpInputValue(rawValue, silent = false) {
  if (!state.questions.length) {
    return;
  }
  const total = state.questions.length;
  const parsed = Number.parseInt(rawValue, 10);
  if (Number.isNaN(parsed)) {
    if (!silent) {
      window.alert("Ge\u00e7erli bir say\u0131 girin.");
    }
    if (elements.jumpInput) {
      elements.jumpInput.value = `${state.index + 1}`;
    }
    return;
  }
  if (parsed < 1 || parsed > total) {
    if (!silent) {
      window.alert(`L\u00fctfen 1 ile ${total} aras\u0131nda bir de\u011fer girin.`);
    }
    if (elements.jumpInput) {
      elements.jumpInput.value = `${state.index + 1}`;
    }
    return;
  }
  jumpToQuestion(parsed - 1);
}

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
  if (elements.progressTotal) {
    elements.progressTotal.textContent = `/ ${total}`;
  }
  if (elements.jumpInput) {
    elements.jumpInput.value = `${state.index + 1}`;
    elements.jumpInput.min = "1";
    elements.jumpInput.max = `${total}`;
  }
  const correctCount = state.answers.filter((item) => item?.correct).length;
  const answeredCount = state.answers.filter(Boolean).length;
  const wrongCount = answeredCount - correctCount;
  if (elements.scoreCorrect) {
    elements.scoreCorrect.textContent = `Dogru: ${correctCount}`;
  }
  if (elements.scoreWrong) {
    elements.scoreWrong.textContent = `Yanlis: ${wrongCount}`;
  }
  if (elements.progressBar) {
    const width = total ? Math.min((answeredCount / total) * 100, 100) : 0;
    elements.progressBar.style.width = `${width}%`;
  }
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
    button.setAttribute("aria-label", `Secenek ${labelFor(idx)}`);
    const label = button.querySelector(".option-label");
    const text = button.querySelector(".option-text");
    const detail = button.querySelector(".option-detail");
    if (label) {
      label.textContent = labelFor(idx);
    }
    if (text) {
      text.textContent = option.text ?? "";
    }
    if (detail) {
      detail.textContent = "";
      detail.classList.add("hidden");
      detail.classList.remove("correct", "incorrect");
    }
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
  elements.hint.textContent = `Ipucu: ${question.hint}`;
  elements.hint.classList.remove("hidden");
}

function renderFeedback() {
  elements.feedback.classList.add("hidden");
  elements.feedback.innerHTML = "";
}

function applyAnswerState(question) {
  const answer = state.answers[state.index];
  const buttons = [...elements.options.querySelectorAll(".option-btn")];
  const hasAnswer = Boolean(answer);
  buttons.forEach((button) => {
    button.classList.remove("selected", "correct", "incorrect");
    const idx = Number(button.dataset.index);
    const option = question.answerOptions[idx];
    const detail = button.querySelector(".option-detail");
    if (!hasAnswer) {
      button.disabled = false;
      if (detail) {
        detail.textContent = "";
        detail.classList.add("hidden");
        detail.classList.remove("correct", "incorrect");
      }
      return;
    }
    button.disabled = true;
    const isCorrectOption = Boolean(option?.isCorrect);
    if (idx === answer.selected) {
      button.classList.add("selected");
      button.classList.add(answer.correct ? "correct" : "incorrect");
    } else if (isCorrectOption) {
      button.classList.add("correct");
    }
    if (detail && option) {
      const prefix = isCorrectOption ? "Dogru" : "Yanlis";
      detail.textContent = `${prefix} - ${option.rationale || "Aciklama bulunmuyor."}`;
      detail.classList.remove("hidden");
      detail.classList.toggle("correct", isCorrectOption);
      detail.classList.toggle("incorrect", !isCorrectOption);
    }
  });
}

function handleAnswer(optionIndex) {
  const question = currentQuestion();
  if (!question || state.answers[state.index]) {
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
  applyAnswerState(question);
  updateStatus();
  persistState();
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
  renderFeedback();
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
    button.blur();
  });

  elements.hintBtn.addEventListener("click", () => {
    state.hintsShown.add(state.index);
    renderHint(currentQuestion());
    persistState();
  });

  elements.prevBtn.addEventListener("click", () => {
    if (state.index === 0) {
      return;
    }
    state.index -= 1;
    renderQuestion();
    persistState();
  });

  elements.nextBtn.addEventListener("click", () => {
    if (state.index >= state.questions.length - 1) {
      return;
    }
    state.index += 1;
    renderQuestion();
    persistState();
  });

  if (elements.resetBtn) {
    elements.resetBtn.addEventListener("click", () => {
      resetQuiz();
    });
  }

  if (elements.jumpForm) {
    elements.jumpForm.addEventListener("submit", (event) => {
      event.preventDefault();
      processJumpInputValue(elements.jumpInput?.value ?? "", false);
    });
  }

  if (elements.jumpInput) {
    elements.jumpInput.addEventListener("change", () => {
      processJumpInputValue(elements.jumpInput?.value ?? "", true);
    });
  }
}

async function init() {
  try {
    const questions = await loadQuestions();
    if (!questions.length) {
      showError("G\u00f6sterilecek soru bulunamad\u0131.");
      return;
    }
    state.questions = questions;
    restoreState(questions.length);
    setLoading(false);
    renderQuestion();
    persistState();
  } catch (error) {
    console.error(error);
    showError(error.message || "Beklenmeyen bir hata olu\u015ftu.");
  }
}

attachEventListeners();
init();
