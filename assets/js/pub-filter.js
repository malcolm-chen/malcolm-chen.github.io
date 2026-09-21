/* Publication tag filtering. Nothing is selected by default, so every paper shows. */
(function () {
  function init() {
    var bar = document.getElementById('pubFilters');
    if (!bar) return;

    var buttons = bar.querySelectorAll('.pub-filter');
    var list = document.querySelector('.publications');
    if (!list) return;

    var items = list.querySelectorAll('.pub-item');
    var years = list.querySelectorAll('.pub-year');
    var active = [];

    function matches(item) {
      if (!active.length) return true;
      var tags = (item.getAttribute('data-tags') || '').split(/\s+/);
      return active.some(function (tag) {
        return tags.indexOf(tag) !== -1;
      });
    }

    function render() {
      items.forEach(function (item) {
        item.classList.toggle('is-hidden', !matches(item));
        item.classList.remove('is-last-visible');
      });

      // hide a year heading once none of its papers are left, and drop the
      // divider under whichever paper now sits last in the year
      years.forEach(function (year) {
        var visible = year.querySelectorAll('.pub-item:not(.is-hidden)');
        year.classList.toggle('is-hidden', visible.length === 0);
        visible.forEach(function (item, i) {
          item.classList.toggle('is-last-visible', i === visible.length - 1);
        });
      });

      buttons.forEach(function (btn) {
        var filter = btn.getAttribute('data-filter');
        var on = filter === 'all' ? active.length === 0 : active.indexOf(filter) !== -1;
        btn.classList.toggle('is-active', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        if (filter === 'all') {
          active = [];
        } else {
          var i = active.indexOf(filter);
          if (i === -1) {
            active.push(filter);
          } else {
            active.splice(i, 1);
          }
        }
        render();
      });
    });

    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
