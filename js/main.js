(function () {
  'use strict';
  var doc = document.documentElement;

  /* Mobile drawer: separate from the desktop list, breakpoint 768 matches the stylesheet */
  var toggle = document.getElementById('mob-toggle');
  var drawer = document.getElementById('mob-drawer');
  var overlay = document.getElementById('mob-overlay');
  var closeBtn = document.getElementById('drawer-close');
  function openDrawer() {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    doc.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    doc.style.overflow = '';
  }
  if (toggle && drawer && overlay) {
    toggle.addEventListener('click', function () {
      if (toggle.getAttribute('aria-expanded') === 'true') { closeDrawer(); } else { openDrawer(); }
    });
    if (closeBtn) { closeBtn.addEventListener('click', closeDrawer); }
    overlay.addEventListener('click', closeDrawer);
    var drawerLinks = drawer.querySelectorAll('a');
    for (var i = 0; i < drawerLinks.length; i++) { drawerLinks[i].addEventListener('click', closeDrawer); }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeDrawer(); } });
    window.addEventListener('resize', function () { if (window.innerWidth > 768) { closeDrawer(); } });
  }

  /* FAQ accordion with a max-height transition */
  var qs = document.querySelectorAll('.faq-q');
  function setPanel(btn, open) {
    var item = btn.parentNode;
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) { item.classList.add('open'); } else { item.classList.remove('open'); }
    if (panel) { panel.style.maxHeight = open ? panel.scrollHeight + 'px' : ''; }
  }
  for (var j = 0; j < qs.length; j++) {
    qs[j].addEventListener('click', function () {
      setPanel(this, this.getAttribute('aria-expanded') !== 'true');
    });
  }
  window.addEventListener('resize', function () {
    for (var k = 0; k < qs.length; k++) {
      if (qs[k].getAttribute('aria-expanded') === 'true') { setPanel(qs[k], true); }
    }
  });

  /* Hide the floating call button while the footer is on screen so it never covers footer text */
  var fab = document.querySelector('.float-call');
  var foot = document.querySelector('.site-footer');
  if (fab && foot && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { fab.classList.add('is-hidden'); } else { fab.classList.remove('is-hidden'); }
      });
    }, { threshold: 0.05 }).observe(foot);
  }
})();
