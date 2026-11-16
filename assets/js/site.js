/* Mungo Thought — the months and the story filter. No dependencies. */
(function () {
  'use strict';

  var MONTHS = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']; // the year starts with summer
  var CALENDAR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var SEASONS = {"summer": {"ground": "#B9341E", "on": "#FFF4D6", "line": "Tomatoes that taste of something, urchins, and fish straight off the boat."}, "autumn": {"ground": "#C99A45", "on": "#1E1A16", "line": "Figs, crayfish and the first mushrooms after rain."}, "winter": {"ground": "#36421F", "on": "#FFF4D6", "line": "Citrus, slow pots and anything that gets better over coals."}, "spring": {"ground": "#A6C23A", "on": "#1E1A16", "line": "Broad beans in the pod, the first bream, asparagus by the bunch."}};
  var NAMES = {"Dec": "December", "Jan": "January", "Feb": "February", "Mar": "March", "Apr": "April", "May": "May", "Jun": "June", "Jul": "July", "Aug": "August", "Sep": "September", "Oct": "October", "Nov": "November"};
  var TILTS = ["-1deg", "1deg", "-0.6deg"];
  var CYCLE_MS = 5000;   // how long each month shows on the home page
  var PAUSE_MS = 15000;  // after someone picks a month, wait this long before cycling again

  var NOW = CALENDAR[new Date().getMonth()];
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function seasonOf(m) {
    return ['summer', 'autumn', 'winter', 'spring'][Math.floor(MONTHS.indexOf(m) / 3)];
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  function apply(scope, m) {
    var s = seasonOf(m);
    var S = SEASONS[s];
    scope.style.setProperty('--ground', S.ground);
    scope.style.setProperty('--on', S.on);
    scope.setAttribute('data-month', m);
    scope.querySelectorAll('[data-season-only]').forEach(function (el) {
      el.hidden = el.getAttribute('data-season-only') !== s;
    });
    scope.querySelectorAll('[data-bind]').forEach(function (el) {
      var k = el.getAttribute('data-bind');
      if (k === 'monthName') el.textContent = NAMES[m];
      else if (k === 'seasonName') el.textContent = cap(s);
      else if (k === 'line') el.textContent = S.line;
    });
    scope.querySelectorAll('[data-month]').forEach(function (b) {
      var mm = b.getAttribute('data-month');
      if (!mm || b === scope) return;
      b.setAttribute('aria-pressed', String(mm === m));
      if (mm === NOW) b.setAttribute('data-now', ''); else b.removeAttribute('data-now');
    });
  }

  document.querySelectorAll('[data-season-scope]').forEach(function (scope) {
    var mode = scope.getAttribute('data-mode');
    var month = NOW;
    var pauseUntil = 0;
    var visible = true;
    apply(scope, month);
    if (mode === 'now') return;

    scope.querySelectorAll('button[data-month]').forEach(function (b) {
      b.addEventListener('click', function () {
        month = b.getAttribute('data-month');
        apply(scope, month);
        pauseUntil = Date.now() + PAUSE_MS; // a pick holds, then the cycle picks up from here
      });
    });

    if (mode === 'cycle' && !reduceMotion) {
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; }).observe(scope);
      }
      setInterval(function () {
        if (document.hidden || !visible || Date.now() < pauseUntil) return;
        month = MONTHS[(MONTHS.indexOf(month) + 1) % 12];
        apply(scope, month);
      }, CYCLE_MS);
    }
  });

  // Stories: filter by topic, keep the pinboard stagger and alternating tilt.
  var tabs = document.querySelectorAll('[data-tab]');
  var cards = document.querySelectorAll('[data-topic]');
  var empty = document.querySelector('.empty');
  var emptyName = document.querySelector('.empty-name');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      var topic = t.getAttribute('data-tab');
      tabs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === t)); });
      var i = 0;
      cards.forEach(function (c) {
        var show = topic === 'All' || c.getAttribute('data-topic') === topic;
        c.hidden = !show;
        if (show) {
          c.classList.toggle('drop', i % 3 === 1);
          c.style.setProperty('--tilt', TILTS[i % 3]);
          i++;
        }
      });
      if (empty) { empty.hidden = i > 0; if (emptyName) emptyName.textContent = topic; }
    });
  });

  // Respect reduced motion: films become click-to-play.
  if (reduceMotion) {
    document.querySelectorAll('video[autoplay]').forEach(function (v) {
      v.removeAttribute('autoplay');
      v.pause();
      v.setAttribute('controls', '');
    });
  }
})();
