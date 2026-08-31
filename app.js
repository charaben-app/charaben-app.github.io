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
