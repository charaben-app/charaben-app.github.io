(() => {
  const root = document.documentElement;
  const toggles = [...document.querySelectorAll('[data-gaming-toggle]')];
  const storageKey = 'charaben-gaming-mode';
  const announcer = document.createElement('div');

  announcer.className = 'sr-only';
  announcer.setAttribute('aria-live', 'polite');
  document.body.append(announcer);

  let enabled = false;
  try { enabled = localStorage.getItem(storageKey) === 'on'; } catch (_) {}

  function render(announce = false) {
    root.classList.toggle('gaming-mode', enabled);
    toggles.forEach((toggle) => {
      toggle.setAttribute('aria-pressed', String(enabled));
      const label = toggle.querySelector('.gaming-toggle-label');
      if (label) label.textContent = enabled ? toggle.dataset.labelOn : toggle.dataset.labelOff;
    });
    if (announce) {
      const active = toggles[0];
      announcer.textContent = enabled ? active.dataset.announceOn : active.dataset.announceOff;
    }
  }

  toggles.forEach((toggle) => toggle.addEventListener('click', () => {
    enabled = !enabled;
    try { localStorage.setItem(storageKey, enabled ? 'on' : 'off'); } catch (_) {}
    render(true);
  }));

  render();
})();

(() => {
  const isJapanese = document.documentElement.lang === 'ja';
  const copy = isJapanese
    ? {
        nav: 'キャラフロート',
        eyebrow: 'New / Live Activity',
        title: 'ほかの学習アプリ使用時も、<br>キャラを表示。',
        intro: 'キャラフロートは、iPhoneのロック画面とDynamic Islandに、選んだキャラと集中タイマーを表示する機能です。ほかの学習アプリを使っている時間も、キャラのひとことと一緒に集中を続けられます。',
        points: [
          ['25分・50分・カスタム', 'その日の予定に合わせて集中時間を選べます'],
          ['休憩・一時停止に対応', '表示を開いたまま、ペースを調整できます'],
          ['集中した時間を記録', '完了したセッションをアプリに保存します'],
        ],
        note: '※ iOS 17以降のiPhoneで利用できます。Dynamic Islandの表示は対応モデルに限られます。',
        cta: 'キャラと集中を始める',
        screenLabel: 'ロック画面とDynamic Islandに表示されるキャラフロートのイメージ',
        activity: 'キャラフロート',
        focusing: 'キャラと勉強タイム',
        line: 'いっしょに進めよう。',
        pause: 'Ⅱ 一時停止',
        break: '☕ 5分休憩',
        done: '✓ 完了',
        lock: 'LOCK SCREEN',
        island: 'DYNAMIC ISLAND',
        cardTitle: 'キャラフロートを、いつもの勉強に',
        cardBody: 'ロック画面とDynamic Islandにキャラを表示。25分・50分・カスタムの集中時間で、ほかの学習アプリを使うときも相棒と一緒に続けられます。',
      }
    : {
        nav: 'Character Float',
        eyebrow: 'New / Live Activity',
        title: 'Your character,<br>right beside you.',
        intro: 'Character Float puts your chosen character and a focus timer on your iPhone Lock Screen and Dynamic Island. Keep your character close and stay focused even while using another study app.',
        points: [
          ['25m · 50m · custom', 'Choose the focus time that fits your day'],
          ['Pause and take breaks', 'Adjust your pace without losing the session'],
          ['Keep a focus record', 'Completed sessions are saved in CharaBen'],
        ],
        note: '* Available on iPhone with iOS 17 or later. Dynamic Island display is limited to supported models.',
        cta: 'Focus with your character',
        screenLabel: 'A Character Float preview on the Lock Screen and Dynamic Island',
        activity: 'Character Float',
        focusing: 'Study time with your character',
        line: 'Let’s keep going together.',
        pause: 'Ⅱ Pause',
        break: '☕ 5m break',
        done: '✓ Done',
        lock: 'LOCK SCREEN',
        island: 'DYNAMIC ISLAND',
        cardTitle: 'A character who stays with you',
        cardBody: 'See your character on the Lock Screen and Dynamic Island. Choose 25 minutes, 50 minutes, or a custom focus time, then keep going with your study partner beside you.',
      };

  const proofStrip = document.querySelector('.proof-strip');
  const features = document.querySelector('#features');
  if (!proofStrip || !features || document.querySelector('[data-character-float]')) return;

  const navLinks = document.querySelector('.nav-links');
  if (navLinks && !navLinks.querySelector('a[href="#character-float"]')) {
    navLinks.insertAdjacentHTML('afterbegin', `<a href="#character-float">${copy.nav}</a>`);
  }

  const points = copy.points.map(([title, body]) => `<div class="float-point"><b>${title}</b><span>${body}</span></div>`).join('');
  proofStrip.insertAdjacentHTML('afterend', `
    <section class="character-float-section" id="character-float" data-character-float>
      <div class="shell float-layout">
        <div class="float-copy">
          <p class="eyebrow">${copy.eyebrow}</p>
          <h2>${copy.title}</h2>
          <p class="float-intro">${copy.intro}</p>
          <div class="float-points">${points}</div>
          <p class="float-note">${copy.note}</p>
          <div class="actions"><a class="button" href="${isJapanese ? 'https://apps.apple.com/jp/app/id6791627723' : 'https://apps.apple.com/app/id6791627723'}">${copy.cta}</a></div>
        </div>
        <div class="float-stage" role="img" aria-label="${copy.screenLabel}">
          <div class="float-orbit"></div>
          <span class="float-label float-label-lock">${copy.lock}</span>
          <span class="float-label float-label-island">${copy.island}</span>
          <div class="float-device">
            <div class="float-status"><span>9:41</span><span>● ◒ ▰</span></div>
            <div class="float-island-pill"><i></i><span></span></div>
            <div class="float-wallpaper">
              <div class="float-clock">9:41</div>
              <div class="float-date">${isJapanese ? '9月8日 火曜日' : 'Tuesday, September 8'}</div>
              <div class="float-activity">
                <div class="float-activity-top"><span class="float-app-badge"><img src="${isJapanese ? 'assets/app-icon.png' : '../assets/app-icon.png'}" alt="">${copy.activity}</span><strong>24:38</strong></div>
                <div class="float-activity-main"><img src="${isJapanese ? 'assets/app-icon.png' : '../assets/app-icon.png'}" alt=""><div><b>${copy.focusing}</b><span>${copy.line}</span></div></div>
                <div class="float-progress"><i></i></div>
                <div class="float-controls"><span>${copy.pause}</span><span>${copy.break}</span><span>${copy.done}</span></div>
              </div>
              <div class="float-home-indicator"></div>
            </div>
          </div>
        </div>
      </div>
    </section>`);

  const featureGrid = features.querySelector('.feature-grid');
  if (featureGrid) {
    featureGrid.classList.add('has-six');
    const feature = document.createElement('article');
    feature.className = 'feature float-feature-card';
    feature.innerHTML = `<span class="number">03 / LIVE ACTIVITY</span><h3>${copy.cardTitle}</h3><p>${copy.cardBody}</p>`;
    const secondFeature = featureGrid.children[1];
    if (secondFeature) secondFeature.insertAdjacentElement('afterend', feature);
    else featureGrid.append(feature);
    const labels = ['01 / REACTION', '02 / YOUR CHARACTER', '03 / LIVE ACTIVITY', '04 / GAMING MODE', '05 / FAST IMPORT', '06 / KEEP GOING'];
    [...featureGrid.querySelectorAll('.number')].forEach((label, index) => { label.textContent = labels[index] || label.textContent; });
  }
})();

(() => {
  if (document.documentElement.lang !== 'ja') return;

  const proofStrip = document.querySelector('.proof-strip');
  const features = document.querySelector('#features');
  if (!proofStrip || !features || document.querySelector('[data-quiz-experience]')) return;

  const heroSecondary = document.querySelector('.hero .button.secondary[href="#screens"]');
  if (heroSecondary) {
    heroSecondary.href = '#try';
    heroSecondary.textContent = '3問だけ体験する';
  }

  features.insertAdjacentHTML('beforebegin', `
    <section class="try-section" id="try" data-quiz-experience>
      <div class="shell">
        <div class="try-intro" data-try-intro>
          <div class="try-copy">
            <p class="eyebrow">Try CharaBen</p><h2>好きな画像で、<br>3問だけ。</h2>
            <p>あなたのキャラが、答えるたび反応します。画像なしなら、すぐに始められます。</p>
            <div class="actions"><button class="button" type="button" data-quick-start>画像なしですぐ体験</button><button class="button secondary" type="button" data-custom-start>好きな画像で体験</button></div>
            <p class="try-privacy">選択した画像はブラウザ内だけで使用されます。アップロード・保存は行いません。</p>
          </div>
          <div class="try-teaser" aria-hidden="true"><div class="teaser-top">1/3</div><div class="teaser-question"><small>✦ 4択問題</small><b>appleの意味として<br>正しいものは？</b></div><div class="teaser-choice">りんご <span>○</span></div><div class="teaser-hud"><img src="assets/app-icon.png" alt=""><span>一問ずつ、いこう。</span></div></div>
        </div>
        <div class="try-workspace" data-try-workspace hidden>
          <div class="web-setup" data-web-setup hidden>
            <div class="setup-heading"><span>WEB体験用の設定</span><button type="button" data-close-setup aria-label="設定を閉じる">×</button></div>
            <label class="try-image-picker" for="try-character-image"><span>＋</span><b>好きな画像を選ぶ</b><small>JPEG / PNG / GIF / WebP</small></label><input id="try-character-image" type="file" accept="image/jpeg,image/png,image/gif,image/webp">
            <label for="try-character-name">キャラの名前</label><input id="try-character-name" type="text" maxlength="12" value="" placeholder="例：あなたのキャラ">
            <p>画像は外部へ送信されず、ページを閉じると破棄されます。</p><button class="button setup-start" type="button" data-setup-start>この相棒でスタート</button>
          </div>
          <div class="app-demo">
            <div class="demo-caption"><b>実際のアプリ画面を再現</b><span>Web体験版</span><button type="button" data-change-character>キャラを変更</button></div>
            <div class="demo-phone" aria-label="実際のアプリ画面をもとにしたWeb体験版">
              <div class="demo-status"><span>9:41</span><span>● ◒ ▰</span></div><div class="demo-toolbar"><span>×&nbsp; 閉じる</span><b>英単語3問体験</b></div>
              <div class="demo-screen"><div class="demo-neon-line"></div><p class="demo-progress" data-demo-progress>1/3</p><div class="demo-progress-track"><i data-demo-progress-bar></i></div>
                <div data-demo-question-view><div class="demo-question"><small>✦ 4択問題</small><h3 data-demo-question>準備ができたらスタート！</h3></div><div class="demo-answers" data-demo-answers></div><div class="demo-feedback" data-demo-feedback hidden><b data-demo-feedback-title></b><p data-demo-feedback-text></p></div></div>
                <div class="demo-result" data-demo-result hidden><div class="demo-result-summary"><h3 data-demo-result-title>全問正解！</h3><p>英単語3問体験</p><div><span><small>正答率</small><b data-demo-rate>100%</b></span><span><small>MAX COMBO</small><b data-demo-combo>×3</b></span></div><p data-demo-score>3 / 3問 正解</p></div><div class="demo-result-character"><img data-demo-result-image src="assets/app-icon.png" alt=""><p><b>キャラのひとこと</b><span data-demo-result-message>今日すごい。</span></p></div><div class="demo-result-list"><b>問題ごとの結果</b><div data-demo-result-items></div></div></div>
              </div>
              <div class="demo-bottom" data-demo-bottom><div class="demo-neon-line"></div><div class="demo-hud"><img data-demo-character-image src="assets/app-icon.png" alt="設定したキャラクター画像"><p data-demo-speech>一問ずつ、いこう。</p></div><div class="demo-navigation"><button type="button" disabled>‹ 戻る</button><button type="button" data-demo-next disabled>進む ›</button></div></div>
            </div>
            <div class="demo-finish" data-demo-finish hidden><p>このキャラと、続きを始めよう。</p><div class="actions"><a class="button" href="https://apps.apple.com/jp/app/id6791627723">App Storeで無料で始める</a><button class="button secondary" type="button" data-demo-again>もう一度体験する</button></div></div>
          </div>
        </div>
      </div>
    </section>`);

  const root = document.querySelector('[data-quiz-experience]');
  const questions = [
    { text: 'appleの意味として正しいものは？', answers: ['りんご', 'みかん', 'ぶどう', 'もも'], correct: 0, explanation: 'apple は「りんご」という意味です。' },
    { text: 'challengeの意味として正しいものは？', answers: ['祝う', '挑戦する', '選ぶ', '変える'], correct: 1, explanation: 'challenge には「挑戦する」という意味があります。' },
    { text: 'rememberの意味として正しいものは？', answers: ['忘れる', '繰り返す', '覚えている', '説明する'], correct: 2, explanation: 'remember は「覚えている」という意味です。' }
  ];
  const find = (selector) => root.querySelector(selector);
  const workspace = find('[data-try-workspace]');
  const setup = find('[data-web-setup]');
  const answers = find('[data-demo-answers]');
  const characterImage = find('[data-demo-character-image]');
  const resultImage = find('[data-demo-result-image]');
  const imageInput = find('#try-character-image');
  const nameInput = find('#try-character-name');
  let objectUrl = null;
  let current = 0;
  let score = 0;
  let locked = false;
  let results = [];

  function characterName() { return nameInput.value.trim() || '相棒'; }
  function openExperience(showSetup) {
    find('[data-try-intro]').hidden = true;
    workspace.hidden = false;
    setup.hidden = !showSetup;
    workspace.classList.toggle('has-setup', showSetup);
    if (!showSetup) startQuiz();
    workspace.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function setSpeech(text) { find('[data-demo-speech]').textContent = text; }
  function renderQuestion() {
    locked = false;
    const question = questions[current];
    find('[data-demo-question-view]').hidden = false;
    find('[data-demo-result]').hidden = true;
    find('[data-demo-bottom]').hidden = false;
    find('[data-demo-finish]').hidden = true;
    find('[data-demo-progress]').textContent = `${current + 1}/${questions.length}`;
    find('[data-demo-progress-bar]').style.width = `${(current / questions.length) * 100}%`;
    find('[data-demo-question]').textContent = question.text;
    find('[data-demo-feedback]').hidden = true;
    answers.replaceChildren();
    question.answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'demo-answer'; button.textContent = answer;
      button.addEventListener('click', () => chooseAnswer(index)); answers.append(button);
    });
    const next = find('[data-demo-next]'); next.disabled = true; next.textContent = '進む ›';
    setSpeech(current === 0 ? `${characterName()}と、一問ずつね。` : '次もいってみよう。');
  }
  function chooseAnswer(selected) {
    if (locked) return; locked = true;
    const question = questions[current]; const buttons = [...answers.children];
    buttons.forEach((button) => { button.disabled = true; }); buttons[question.correct].classList.add('correct');
    const correct = selected === question.correct; results.push(correct);
    if (correct) { score += 1; setSpeech(score > 1 ? 'さすが。この調子。' : 'えらい。'); }
    else { buttons[selected].classList.add('wrong'); setSpeech('惜しい。次で取り返そう。'); }
    const feedback = find('[data-demo-feedback]'); feedback.classList.toggle('is-wrong', !correct); feedback.hidden = false;
    find('[data-demo-feedback-title]').textContent = correct ? '✓ 正解です' : '× 不正解です';
    find('[data-demo-feedback-text]').textContent = question.explanation;
    find('[data-demo-progress-bar]').style.width = `${((current + 1) / questions.length) * 100}%`;
    const next = find('[data-demo-next]'); next.disabled = false; next.textContent = current === questions.length - 1 ? '結果を見る ⚑' : '進む ›';
  }
  function showResult() {
    find('[data-demo-question-view]').hidden = true; find('[data-demo-result]').hidden = false; find('[data-demo-bottom]').hidden = true; find('[data-demo-finish]').hidden = false;
    find('[data-demo-progress]').textContent = 'COMPLETE';
    find('[data-demo-result-title]').textContent = score === 3 ? '全問正解！' : score >= 2 ? 'クリア！' : 'また挑戦！';
    find('[data-demo-rate]').textContent = `${Math.round(score / questions.length * 100)}%`;
    find('[data-demo-combo]').textContent = `×${score}`; find('[data-demo-score]').textContent = `${score} / ${questions.length}問 正解`;
    find('[data-demo-result-message]').textContent = score === 3 ? '今日すごい。' : `${score}問正解。一緒に頑張ったね。`;
    const items = find('[data-demo-result-items]'); items.replaceChildren();
    questions.forEach((question, index) => { const row = document.createElement('p'); row.className = results[index] ? '' : 'is-wrong'; const mark = document.createElement('span'); mark.textContent = results[index] ? '✓' : '×'; const copy = document.createElement('span'); copy.textContent = question.text; row.append(mark, copy); items.append(row); });
  }
  function startQuiz() { current = 0; score = 0; results = []; renderQuestion(); }

  find('[data-quick-start]').addEventListener('click', () => openExperience(false));
  find('[data-custom-start]').addEventListener('click', () => openExperience(true));
  find('[data-close-setup]').addEventListener('click', () => { setup.hidden = true; workspace.classList.remove('has-setup'); startQuiz(); });
  find('[data-change-character]').addEventListener('click', () => { setup.hidden = false; workspace.classList.add('has-setup'); setup.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
  find('[data-setup-start]').addEventListener('click', () => { setup.hidden = true; workspace.classList.remove('has-setup'); startQuiz(); find('.app-demo').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  find('[data-demo-next]').addEventListener('click', () => { if (!locked) return; current += 1; if (current < questions.length) renderQuestion(); else showResult(); });
  find('[data-demo-again]').addEventListener('click', startQuiz);
  imageInput.addEventListener('change', () => { const file = imageInput.files && imageInput.files[0]; if (!file || !file.type.startsWith('image/')) return; if (objectUrl) URL.revokeObjectURL(objectUrl); objectUrl = URL.createObjectURL(file); characterImage.src = objectUrl; resultImage.src = objectUrl; setSpeech(`${characterName()}が相棒になったよ。`); });
  window.addEventListener('pagehide', () => { if (objectUrl) URL.revokeObjectURL(objectUrl); });
})();
