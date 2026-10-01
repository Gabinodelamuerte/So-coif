// Scripts communs à toutes les pages : menu mobile et curseur (souris uniquement).
var root = document.documentElement;
var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

var navEl = document.getElementById('nav');
var toggle = document.getElementById('menuToggle');
if (navEl && toggle) {
  toggle.addEventListener('click', function () {
    var open = navEl.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navEl.classList.contains('open')) {
      navEl.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

/* Curseur : un point blanc, plus gros sur tout ce qui est cliquable */
var dotEl = document.getElementById('dot');
var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (dotEl && finePointer) {
  var dx = -100, dy = -100, cx = -100, cy = -100, dotActive = false;
  var ACTIONABLE = 'a, button, [role="button"], input, select, textarea, label, summary';

  var dotLoop = function () {
    window.requestAnimationFrame(dotLoop);
    var k = reduce ? 1 : 0.35;
    cx += (dx - cx) * k;
    cy += (dy - cy) * k;
    dotEl.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
  };

  window.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') { return; }
    dx = e.clientX; dy = e.clientY;
    var actionable = !!(e.target && e.target.closest && e.target.closest(ACTIONABLE));
    dotEl.classList.toggle('big', actionable);
    if (!dotActive) {
      dotActive = true; cx = dx; cy = dy;
      root.classList.add('has-dot');
      dotEl.classList.add('on');
      window.requestAnimationFrame(dotLoop);
    }
  }, { passive: true });
  document.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'touch') { dotEl.classList.add('down'); } });
  document.addEventListener('pointerup', function () { dotEl.classList.remove('down'); });
  document.documentElement.addEventListener('mouseleave', function () { dotEl.classList.remove('on'); });
  document.documentElement.addEventListener('mouseenter', function () { if (dotActive) { dotEl.classList.add('on'); } });
}
