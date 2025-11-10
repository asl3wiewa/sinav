const TESTS = {
  "genel-turizm": {
    title: "Genel Turizm Testi",
    dataUrl: "genel-turizm.json",
  },
  ziyafet: {
    title: "Ziyafet Testi 1",
    dataUrl: "ziyafet.json",
  },
  ziyafet2: {
    title: "Ziyafet Testi 2",
    dataUrl: "ziyafet-2.json",
  },
};
const TEST_ALIASES = {
  general: "genel-turizm",
  ziyafet1: "ziyafet",
  "ziyafet-1": "ziyafet",
  turizm: "genel-turizm",
};
const DEFAULT_TEST = "genel-turizm";
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const STORAGE_KEY_BASE = "bosZamanQuizState";
const STORAGE_VERSION = 1;

const elements = {
  loading: document.getElementById("loading"),
  error: document.getElementById("error"),
  card: document.getElementById("question-card"),
  progressTotal: document.getElementById("progress-total"),
  scoreCorrect: document.getElementById("score-correct"),
  scoreWrong: document.getElementById("score-wrong"),
  scoreboard: document.getElementById("scoreboard"),
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
  modeBar: document.querySelector(".mode-bar"),
  jumpForm: document.getElementById("jump-form"),
  jumpInput: document.getElementById("jump-input"),
  optionTemplate: document.getElementById("option-template"),
  quizTitle: document.getElementById("quiz-title"),
  modeButtons: Array.from(document.querySelectorAll(".mode-btn")),
  finishBtn: document.getElementById("finish-btn"),
  summaryPanel: document.getElementById("summary-panel"),
  summaryListLeft: document.getElementById("summary-list-left"),
  summaryListRight: document.getElementById("summary-list-right"),
  summaryStats: document.getElementById("summary-stats"),
  summaryClose: document.getElementById("summary-close"),
  summaryRestart: document.getElementById("summary-restart"),
  summaryBack: document.getElementById("summary-back"),
  summaryHome: document.getElementById("summary-home"),
  questionStatus: document.getElementById("question-status"),
};

const state = {
  test: null,
  mode: "manual",
  summaryVisible: false,
  finished: false,
  lastSummaryIndex: null,
  questions: [],
  index: 0,
  answers: [],
  hintsShown: new Set(),
};

const labelFor = (idx) => (idx < LETTERS.length ? LETTERS[idx] : `${idx + 1}`);

function resolveActiveTest() {
  const params = new URLSearchParams(window.location.search);
  const rawSlug = (params.get("test") || DEFAULT_TEST).toLowerCase();
  const slugCandidate = TESTS[rawSlug]
    ? rawSlug
    : TEST_ALIASES[rawSlug] || DEFAULT_TEST;
  if (TESTS[slugCandidate]) {
    return { slug: slugCandidate, ...TESTS[slugCandidate] };
  }
  return { slug: DEFAULT_TEST, ...TESTS[DEFAULT_TEST] };
}

function storageKey() {
  return `${STORAGE_KEY_BASE}:${state.test?.slug ?? DEFAULT_TEST}`;
}

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
      mode: state.mode,
      finished: state.finished,
    };
    window.localStorage?.setItem(storageKey(), JSON.stringify(payload));
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
    const raw = window.localStorage?.getItem(storageKey());
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
    if (typeof payload.mode === "string" && (payload.mode === "manual" || payload.mode === "auto")) {
      state.mode = payload.mode;
    }
    if (typeof payload.finished === "boolean") {
      state.finished = payload.finished;
    }
  } catch (error) {
    console.warn("Quiz state restore failed", error);
  }
}

function setMode(newMode) {
  if (!["manual", "auto"].includes(newMode)) {
    return;
  }
  state.mode = newMode;
  if (elements.modeButtons?.length) {
    elements.modeButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.mode === newMode);
    });
  }
  const question = currentQuestion();
  if (question) {
    applyAnswerState(question);
    renderFeedback();
  }
  updateStatus();
  updateReviewUI();
  persistState();
}

function resetQuiz() {
  state.answers = new Array(state.questions.length);
  state.hintsShown = new Set();
  state.index = 0;
  state.finished = false;
  state.summaryVisible = false;
  if (typeof window !== "undefined") {
    window.localStorage?.removeItem(storageKey());
  }
  renderQuestion();
  hideSummary();
  updateReviewUI();
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

function buildSummary() {
  const summary = state.questions.map((question, index) => {
    const answer = state.answers[index];
    if (!answer) {
      return { index, status: "unanswered" };
    }
    return { index, status: answer.correct ? "correct" : "incorrect" };
  });
  const stats = summary.reduce(
    (acc, item) => {
      if (item.status === "correct") acc.correct += 1;
      else if (item.status === "incorrect") acc.incorrect += 1;
      else acc.unanswered += 1;
      return acc;
    },
    { correct: 0, incorrect: 0, unanswered: 0 },
  );
  return { summary, stats };
}

function renderSummaryPanel() {
  if (!elements.summaryPanel || !elements.summaryListLeft || !elements.summaryListRight) {
    return;
  }
  const { summary, stats } = buildSummary();
  if (elements.summaryStats) {
    elements.summaryStats.textContent = `Doğru: ${stats.correct} | Yanlış: ${stats.incorrect} | Boş: ${stats.unanswered}`;
  }
  const leftList = elements.summaryListLeft;
  const rightList = elements.summaryListRight;
  if (!leftList || !rightList) return;
  const leftColumn = document.getElementById("summary-column-left");
  const rightColumn = document.getElementById("summary-column-right");
  const leftTitle = document.getElementById("summary-left-title");
  const rightTitle = document.getElementById("summary-right-title");
  leftList.innerHTML = "";
  rightList.innerHTML = "";
  const total = summary.length;
  const half = Math.ceil(total / 2);
  if (leftColumn) leftColumn.classList.remove("hidden");
  if (leftTitle) leftTitle.textContent = `1-${Math.max(1, half)}`;
  if (rightColumn) {
    if (total > half) {
      rightColumn.classList.remove("hidden");
      if (rightTitle) rightTitle.textContent = `${half + 1}-${total}`;
    } else {
      rightColumn.classList.add("hidden");
    }
  }

  summary.forEach((item, idx) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `summary__item ${item.status}`;
    button.dataset.index = item.index;
    const statusLabel =
      item.status === "correct"
        ? "Doğru"
        : item.status === "incorrect"
          ? "Yanlış"
          : "Boş";
    button.innerHTML = `<span>Soru ${item.index + 1}</span><span>${statusLabel}</span>`;
    button.addEventListener("click", () => {
      state.lastSummaryIndex = item.index;
      jumpToQuestion(item.index);
      hideSummary({ showBack: true });
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    if (idx < half) {
      leftList.appendChild(button);
    } else {
      rightList.appendChild(button);
    }
  });
}

function showSummary() {
  if (!elements.summaryPanel) return;
  if (!state.summaryVisible) {
    state.lastSummaryIndex = state.index;
  }
  renderSummaryPanel();
  elements.summaryPanel.classList.remove("hidden");
  elements.summaryPanel.focus?.();
  elements.summaryPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  state.summaryVisible = true;
  state.finished = true;
  if (elements.summaryBack) {
    elements.summaryBack.classList.add("hidden");
  }
  if (elements.card) {
    elements.card.classList.add("hidden");
  }
  if (elements.controls) {
    elements.controls.classList.add("hidden");
  }
  updateReviewUI();
  updateStatus();
  if (state.lastSummaryIndex != null) {
    const targetButton =
      elements.summaryPanel.querySelector(`.summary__item[data-index="${state.lastSummaryIndex}"]`) ||
      elements.summaryPanel.querySelector(".summary__item");
    targetButton?.scrollIntoView({ block: "center" });
  }
  window.location.hash = "summary-panel";
}

function hideSummary(options = {}) {
  if (!elements.summaryPanel) return;
  elements.summaryPanel.classList.add("hidden");
  state.summaryVisible = false;
  if (elements.summaryBack) {
    if (options.showBack) {
      elements.summaryBack.classList.remove("hidden");
    } else {
      elements.summaryBack.classList.add("hidden");
    }
  }
  if (elements.card) {
    elements.card.classList.remove("hidden");
  }
  if (elements.controls) {
    elements.controls.classList.remove("hidden");
  }
  updateReviewUI();
  updateStatus();
  if (!options.showBack) {
    window.location.hash = "";
    state.lastSummaryIndex = null;
  }
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

async function loadQuestions(dataUrl) {
  const response = await fetch(dataUrl);
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
  const scoreboardVisible = state.mode === "manual" && !state.finished;
  if (elements.scoreboard) {
    elements.scoreboard.classList.toggle("hidden", !scoreboardVisible);
  }
  elements.prevBtn.disabled = state.index === 0;
  const isLast = state.index === total - 1;
  elements.nextBtn.textContent = isLast ? "Bitir" : "Sonraki";
  elements.nextBtn.disabled = isLast && !state.answers[state.index];
  elements.hintBtn.disabled = !currentQuestion()?.hint;

  if (elements.questionStatus) {
    const answer = state.answers[state.index];
    let statusClass = "unanswered";
    let statusText = "Boş";
    if (answer) {
      statusClass = answer.correct ? "correct" : "incorrect";
      statusText = answer.correct ? "Doğru" : "Yanlış";
    }
    if (state.finished) {
      elements.questionStatus.textContent = statusText;
      elements.questionStatus.className = `question__status ${statusClass}`;
      elements.questionStatus.classList.remove("hidden");
    } else {
      elements.questionStatus.classList.add("hidden");
    }
  }
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
  const showImmediateFeedback = state.mode === "manual" || state.finished;
  buttons.forEach((button) => {
    button.classList.remove("selected", "correct", "incorrect", "answered-selected", "answered-other");
    const idx = Number(button.dataset.index);
    const option = question.answerOptions[idx];
    const detail = button.querySelector(".option-detail");
    if (!hasAnswer) {
      const isFinished = state.finished;
      button.disabled = isFinished;
      if (detail) {
        if (isFinished) {
          const isCorrect = Boolean(option?.isCorrect);
          const prefix = isCorrect ? "Dogru" : "Yanlis";
          detail.textContent = `${prefix} - ${option.rationale || "Aciklama bulunmuyor."}`;
          detail.classList.remove("hidden");
          detail.classList.toggle("correct", isCorrect);
          detail.classList.toggle("incorrect", !isCorrect);
        } else {
          detail.textContent = "";
          detail.classList.add("hidden");
          detail.classList.remove("correct", "incorrect");
        }
      }
      if (isFinished && option?.isCorrect) {
        button.classList.add("correct");
      }
      return;
    }
    const allowEdit = state.mode === "auto" && !state.finished;
    button.disabled = !allowEdit;
    const isCorrectOption = Boolean(option?.isCorrect);
    if (idx === answer.selected) {
      button.classList.add("selected");
      if (showImmediateFeedback) {
        button.classList.add(answer.correct ? "correct" : "incorrect");
      } else {
        button.classList.add("answered-selected");
      }
    } else if (showImmediateFeedback && isCorrectOption) {
      button.classList.add("correct");
    } else if (!showImmediateFeedback) {
      button.classList.add("answered-other");
    }
    if (detail && option) {
      if (showImmediateFeedback) {
        const prefix = isCorrectOption ? "Dogru" : "Yanlis";
        detail.textContent = `${prefix} - ${option.rationale || "Aciklama bulunmuyor."}`;
        detail.classList.remove("hidden");
        detail.classList.toggle("correct", isCorrectOption);
        detail.classList.toggle("incorrect", !isCorrectOption);
      } else {
        detail.textContent = "";
        detail.classList.add("hidden");
        detail.classList.remove("correct", "incorrect");
      }
    }
  });
}

function handleAnswer(optionIndex) {
  const question = currentQuestion();
  const allowOverwrite = state.mode === "auto" && !state.finished;
  if (!question || (!allowOverwrite && state.answers[state.index]) || state.finished) {
    return;
  }
  const option = question.answerOptions[optionIndex];
  if (!option) {
    return;
  }
  const previouslyAnswered = Boolean(state.answers[state.index]);
  state.answers[state.index] = {
    selected: optionIndex,
    correct: Boolean(option.isCorrect),
  };
  applyAnswerState(question);
  updateStatus();
  persistState();
  if (state.mode === "auto" && !state.finished) {
    const nextIndex = state.index + 1;
    if (nextIndex < state.questions.length) {
      setTimeout(() => {
        state.index = nextIndex;
        renderQuestion();
        persistState();
      }, previouslyAnswered ? 200 : 350);
    }
  }
}

function renderQuestion() {
  const question = currentQuestion();
  if (!question) {
    return;
  }
  if (elements.modeButtons?.length) {
    elements.modeButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.mode === state.mode);
    });
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

  if (elements.modeButtons?.length) {
    elements.modeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        setMode(btn.dataset.mode);
      });
    });
  }

  if (elements.finishBtn) {
    elements.finishBtn.addEventListener("click", () => {
      showSummary();
    });
  }

  if (elements.summaryClose) {
    elements.summaryClose.addEventListener("click", () => {
      hideSummary();
    });
  }

  if (elements.summaryBack) {
    elements.summaryBack.addEventListener("click", () => {
      showSummary();
    });
  }

  if (elements.summaryRestart) {
    elements.summaryRestart.addEventListener("click", () => {
      hideSummary();
      resetQuiz();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (elements.summaryHome) {
    elements.summaryHome.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
}

async function init() {
  try {
    const activeTest = resolveActiveTest();
    state.test = activeTest;
    if (elements.quizTitle) {
      elements.quizTitle.textContent = activeTest.title;
    }
    if (typeof document !== "undefined") {
      document.title = `${activeTest.title} | Turizm Test Portalı`;
    }
    const questions = await loadQuestions(activeTest.dataUrl);
    if (!questions.length) {
      showError("G\u00f6sterilecek soru bulunamad\u0131.");
      return;
    }
    state.questions = questions;
    restoreState(questions.length);
    setLoading(false);
    renderQuestion();
    if (state.finished) {
      showSummary();
    }
    persistState();
  } catch (error) {
    console.error(error);
    showError(error.message || "Beklenmeyen bir hata olu\u015ftu.");
  }
}

attachEventListeners();
init();
function updateReviewUI() {
  const reviewMode = state.finished && !state.summaryVisible;
  if (elements.modeBar) {
    elements.modeBar.classList.toggle("hidden", reviewMode);
  }
  if (elements.finishBtn) {
    elements.finishBtn.textContent = reviewMode ? "Sonuca dön" : "Testi Bitir";
    elements.finishBtn.classList.toggle("hidden", state.summaryVisible);
  }
}
