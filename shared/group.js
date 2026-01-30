document.addEventListener('DOMContentLoaded', () => {

  const tooltip = document.getElementById('tooltip');

  // build lookup: pathId -> { name, listItem }
  const infoByPath = {};
  document.querySelectorAll('#people li').forEach(li => {
    const pathId = li.dataset.path;
    if (!pathId) return;
    infoByPath[pathId] = {
      name: li.textContent.trim(),
      li
    };
  });

  // LIST → SHAPE (hover + click)
  document.querySelectorAll('#people li').forEach(li => {
    const pathId = li.dataset.path;
    if (!pathId) return;

    const path = document.getElementById(pathId);
    if (!path) return;

    li.addEventListener('mouseenter', () => {
      path.classList.add('active');
    });

    li.addEventListener('mouseleave', () => {
      path.classList.remove('active');
    });

    li.addEventListener('click', () => {
      // clear previous selection
      document.querySelectorAll('svg .person.active')
        .forEach(p => p.classList.remove('active'));

      path.classList.add('active');
    });
  });

  // SHAPE → TOOLTIP + VISIBILITY
  document.querySelectorAll('svg .person').forEach(path => {
    const info = infoByPath[path.id];
    if (!info) return;

    path.addEventListener('mouseenter', e => {
      path.classList.add('active');
      tooltip.textContent = info.name;
      tooltip.style.opacity = '1';
    });

path.addEventListener('mousemove', e => {
  const padding = 12;
  const tooltipRect = tooltip.getBoundingClientRect();

  let x = e.clientX + padding;
  let y = e.clientY + padding;

  // keep inside viewport
  if (x + tooltipRect.width > window.innerWidth) {
    x = window.innerWidth - tooltipRect.width - padding;
  }

  if (y + tooltipRect.height > window.innerHeight) {
    y = window.innerHeight - tooltipRect.height - padding;
  }

  tooltip.style.left = x + 'px';
  tooltip.style.top  = y + 'px';
});
    path.addEventListener('mouseleave', () => {
      path.classList.remove('active');
      tooltip.style.opacity = '0';
    });
  });

});