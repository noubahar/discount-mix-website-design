(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const revealTargets = document.querySelectorAll('.logo-heading,.logo-grid,.section-top,.feature-showcase,.story-heading,.story-row,.testimonial-head,.testimonial-track,.testimonial-cta,.faq,.final-cta');
  let revealObserver;
  const showAll = () => {
    revealTargets.forEach(el => { el.classList.remove('motion-pending'); el.classList.add('motion-show'); });
    revealObserver?.disconnect();
  };
  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    const intro = document.querySelectorAll('.hero h1,.hero-grid>div>p,.hero-grid .actions,.hero-grid .visual');
    intro.forEach((el, i) => { el.style.setProperty('--intro-delay', `${i * 90}ms`); el.classList.add('motion-intro'); });
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('motion-pending');
        entry.target.classList.add('motion-show');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    revealTargets.forEach(el => { el.classList.add('motion-pending'); revealObserver.observe(el); });
    document.addEventListener('focusin', event => {
      const target = event.target.closest('.motion-pending');
      if (target) { target.classList.remove('motion-pending'); target.classList.add('motion-show'); revealObserver.unobserve(target); }
    });
  }

  const shell = document.querySelector('.feature-showcase');
  const toggle = document.getElementById('feature-autoplay');
  const position = document.getElementById('feature-position');
  const rotationDelay = 6000;
  let paused = reducedMotion.matches;
  let hovered = false;
  let touching = false;
  let inView = false;
  let timer;
  const focused = () => shell.contains(document.activeElement) && document.activeElement !== toggle;
  const canRotate = () => !paused && !hovered && !touching && !focused() && inView && !document.hidden;
  const stopTimer = () => { clearTimeout(timer); timer = undefined; };
  const schedule = () => {
    stopTimer();
    if (!canRotate()) return;
    timer = setTimeout(() => {
      if (!canRotate()) return;
      selectFeature(currentFeature + 1, false, true);
      schedule();
    }, rotationDelay);
  };
  const updateToggle = () => {
    toggle.textContent = paused ? 'Play' : 'Pause';
    toggle.setAttribute('aria-label', paused ? 'Start automatic feature rotation' : 'Pause automatic feature rotation');
    toggle.setAttribute('aria-pressed', String(paused));
    position.setAttribute('aria-live', paused ? 'polite' : 'off');
    schedule();
  };
  toggle.addEventListener('click', () => { paused = !paused; updateToggle(); });
  shell.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') { hovered = true; schedule(); } });
  shell.addEventListener('pointerleave', () => { hovered = false; schedule(); });
  shell.addEventListener('focusin', schedule);
  shell.addEventListener('focusout', () => queueMicrotask(schedule));
  shell.addEventListener('click', schedule);
  shell.addEventListener('keydown', schedule);
  shell.addEventListener('touchstart', () => { touching = true; schedule(); }, { passive: true });
  shell.addEventListener('touchend', () => { touching = false; schedule(); }, { passive: true });
  shell.addEventListener('touchcancel', () => { touching = false; schedule(); }, { passive: true });
  document.addEventListener('visibilitychange', schedule);
  window.addEventListener('pagehide', stopTimer);
  window.addEventListener('pageshow', schedule);
  reducedMotion.addEventListener('change', event => {
    if (event.matches) { showAll(); paused = true; updateToggle(); }
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; schedule(); }, { threshold: 0.2 }).observe(shell);
  } else { inView = true; }
  updateToggle();
})();
