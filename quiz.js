// ========================================
// COZY PM CAMPUS — Friendly Quiz System
// ========================================

function shuffledOptionSet(question) {
  const options = question.options.map((text, originalIndex) => ({ text, originalIndex }));
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

function setQuestionOptionOrder() {
  const npc = gameState.quizNPC;
  if (!npc) return;
  const q = npc.questions[gameState.quizIndex];
  gameState.quizOptionOrder = shuffledOptionSet(q);
}

function startQuiz(npc) {
  gameState.phase = 'quiz';
  gameState.quizNPC = npc;
  gameState.quizIndex = 0;
  gameState.quizCorrect = 0;
  gameState.quizAnswered = false;
  gameState.quizShowHint = false;
  setQuestionOptionOrder();
  stopMapLoop();
  renderQuiz();
}

function renderQuiz() {
  const npc = gameState.quizNPC;
  if (!npc) return;

  const q = npc.questions[gameState.quizIndex];
  const renderedOptions = gameState.quizOptionOrder && gameState.quizOptionOrder.length
    ? gameState.quizOptionOrder
    : shuffledOptionSet(q);
  gameState.quizOptionOrder = renderedOptions;
  const contentEl = document.getElementById('content');
  const total = npc.questions.length;
  const correctRenderedIndex = renderedOptions.findIndex((opt) => opt.originalIndex === q.correct);

  contentEl.innerHTML = `
    <div class="quiz-screen">
      <div class="quiz-header">
        <div class="quiz-avatar">${npc.emoji}</div>
        <div class="quiz-npc-info">
          <div class="quiz-npc-name">${npc.name}</div>
          <div class="quiz-progress">Question ${gameState.quizIndex + 1} / ${total}</div>
        </div>
      </div>

      <div class="quiz-question">${q.q}</div>

      <div class="quiz-options">
        ${renderedOptions.map((opt, i) => `
          <button class="quiz-option ${gameState.quizAnswered ? (i === correctRenderedIndex ? 'correct' : 'disabled') : ''}"
                  onclick="answerQuiz(${i})"
                  ${gameState.quizAnswered ? 'disabled' : ''}>
            ${opt.text}
          </button>
        `).join('')}
      </div>

      ${gameState.quizShowHint ? `
        <div class="quiz-hint">
          <span class="quiz-hint-icon">&#x1F4A1;</span> ${q.hint}
        </div>
      ` : ''}

      ${gameState.quizAnswered ? `
        <button class="quiz-next-btn" onclick="nextQuizQuestion()">
          ${gameState.quizIndex < total - 1 ? 'Next Question' : 'See Result'}
        </button>
      ` : ''}
    </div>
  `;
}

function answerQuiz(optionIndex) {
  if (gameState.quizAnswered) return;

  const npc = gameState.quizNPC;
  const q = npc.questions[gameState.quizIndex];
  const picked = gameState.quizOptionOrder[optionIndex];

  gameState.quizAnswered = true;

  if (picked && picked.originalIndex === q.correct) {
    gameState.quizCorrect++;
    gameState.quizShowHint = false;
  } else {
    gameState.quizShowHint = true;
  }

  renderQuiz();
}

function nextQuizQuestion() {
  const npc = gameState.quizNPC;
  gameState.quizIndex++;

  if (gameState.quizIndex >= npc.questions.length) {
    finishQuiz();
    return;
  }

  gameState.quizAnswered = false;
  gameState.quizShowHint = false;
  setQuestionOptionOrder();
  renderQuiz();
}

function finishQuiz() {
  const npc = gameState.quizNPC;
  const total = npc.questions.length;
  const correct = gameState.quizCorrect;
  const passed = correct >= 2;
  const perfect = correct === total;

  const contentEl = document.getElementById('content');

  if (passed) {
    gameState.befriended.add(npc.id);

    let xpGained = correct * XP_PER_CORRECT;
    if (perfect) xpGained += XP_PERFECT_BONUS;
    const leveled = gainXP(xpGained);

    contentEl.innerHTML = `
      <div class="quiz-result success">
        <div class="result-emoji">\u2728</div>
        <div class="result-title">You befriended ${npc.name}!</div>
        <div class="result-score">${correct}/${total} correct ${perfect ? '- Perfect!' : ''}</div>
        <div class="result-xp">+${xpGained} XP${leveled ? ' - LEVEL UP!' : ''}</div>
        <div class="result-flavor">${npc.name} added to your collection!</div>
        <button class="quiz-next-btn" onclick="closeQuiz()">Back to Campus</button>
      </div>
    `;
  } else {
    contentEl.innerHTML = `
      <div class="quiz-result retry">
        <div class="result-emoji">\u{1F44B}</div>
        <div class="result-title">Let's chat again later!</div>
        <div class="result-score">${correct}/${total} correct</div>
        <div class="result-flavor">${npc.name} is still around. You can try again anytime!</div>
        <button class="quiz-next-btn" onclick="closeQuiz()">Back to Campus</button>
      </div>
    `;
  }

  gameState.quizAttempts[npc.id] = (gameState.quizAttempts[npc.id] || 0) + 1;
}

function closeQuiz() {
  gameState.quizNPC = null;
  gameState.nearNPC = null;

  if (gameState.befriended.size >= STAKEHOLDERS.length) {
    showEnding();
    return;
  }

  startOverworld();
}
