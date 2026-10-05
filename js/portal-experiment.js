(() => {
  'use strict';
  const trigger = document.querySelector('.art-trigger');
  const photo = document.querySelector('.art-photo');
  const worlds = [...document.querySelectorAll('.world')];
  if (!trigger || !photo || !worlds.length) return;
  const viewer = document.createElement('div');
  viewer.className = 'portal-viewer';
  viewer.hidden = true;
  viewer.setAttribute('role', 'dialog');
  viewer.setAttribute('aria-modal', 'true');
  viewer.setAttribute('aria-label', 'Explore portal photographs');
  viewer.innerHTML = '<a class="portal-image"></a><span class="portal-signal" aria-hidden="true"></span><button class="portal-close" type="button">Close ×</button><div class="portal-caption"><button class="portal-previous" type="button" aria-label="Previous portal">←</button><div><p class="portal-name" role="status" aria-live="polite"></p><p>Scroll to explore · Click the image to visit</p></div><button class="portal-next" type="button" aria-label="Next portal">→</button></div>';
  document.body.append(viewer);
  const imageLink = viewer.querySelector('.portal-image');
  const signal = viewer.querySelector('.portal-signal');
  const name = viewer.querySelector('.portal-name');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let selected = 0, opened = false, expandTimer = 0, wheelSum = 0, lastWheel = 0;
  let backgroundState = [];
  const select = index => {
    selected = (index + worlds.length) % worlds.length;
    const world = worlds[selected];
    imageLink.style.backgroundImage = `url("${world.dataset.image}")`;
    imageLink.href = world.href;
    imageLink.setAttribute('aria-label', `Visit ${world.querySelector('.world-name').textContent}`);
    name.textContent = `${String(selected + 1).padStart(2, '0')} / ${world.querySelector('.world-name').textContent}`;
    photo.style.backgroundImage = `url("${world.dataset.image}")`;
  };
  const expand = () => {
    viewer.classList.add('is-expanded');
    imageLink.style.transform = 'none';
    imageLink.focus({ preventScroll: true });
  };
  const open = () => {
    if (opened) return;
    opened = true;
    const current = photo.style.backgroundImage || getComputedStyle(photo).backgroundImage;
    const index = worlds.findIndex(world => current.includes(world.dataset.image));
    const rect = photo.getBoundingClientRect();
    const centre = trigger.getBoundingClientRect();
    select(index < 0 ? 0 : index);
    viewer.hidden = false;
    viewer.classList.remove('is-expanded');
    signal.style.left = `${centre.left + centre.width / 2}px`;
    signal.style.top = `${centre.top + centre.height / 2}px`;
    imageLink.style.transform = `translate(${rect.left}px, ${rect.top}px) scale(${rect.width / innerWidth}, ${rect.height / innerHeight})`;
    trigger.setAttribute('aria-expanded', 'true');
    backgroundState = [...document.body.children].filter(el => el !== viewer && !['SCRIPT', 'STYLE'].includes(el.tagName)).map(el => [el, el.inert]);
    backgroundState.forEach(([el]) => { el.inert = true; });
    document.documentElement.classList.add('portal-open');
    // Commit the starting rectangle before animating to the viewport.
    void imageLink.offsetWidth;
    viewer.classList.add('is-entering');
    viewer.querySelector('.portal-close').focus({ preventScroll: true });
    if (reduced.matches || document.body.classList.contains('motion-paused')) expand();
    else expandTimer = setTimeout(expand, 800);
  };
  const close = () => {
    if (!opened) return;
    opened = false;
    clearTimeout(expandTimer);
    viewer.hidden = true;
    viewer.classList.remove('is-entering', 'is-expanded');
    document.documentElement.classList.remove('portal-open');
    backgroundState.forEach(([el, inert]) => { el.inert = inert; });
    backgroundState = [];
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus({ preventScroll: true });
    wheelSum = 0;
  };
  trigger.hidden = false;
  trigger.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') open(); });
  trigger.addEventListener('click', open);
  imageLink.addEventListener('click', event => {
    if (!viewer.classList.contains('is-expanded')) event.preventDefault();
  });
  viewer.querySelector('.portal-close').addEventListener('click', close);
  viewer.querySelector('.portal-previous').addEventListener('click', () => select(selected - 1));
  viewer.querySelector('.portal-next').addEventListener('click', () => select(selected + 1));
  imageLink.addEventListener('wheel', event => {
    event.preventDefault();
    if (!viewer.classList.contains('is-expanded')) return;
    const now = performance.now();
    if (now - lastWheel < 450) return;
    wheelSum += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
    if (Math.abs(wheelSum) < 60) return;
    select(selected + Math.sign(wheelSum));
    wheelSum = 0; lastWheel = now;
  }, { passive: false });
  viewer.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') { event.preventDefault(); select(selected + 1); }
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') { event.preventDefault(); select(selected - 1); }
    else if (event.key === 'Tab') {
      const controls = [...viewer.querySelectorAll('a,button')];
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  reduced.addEventListener('change', event => { if (event.matches && opened) { clearTimeout(expandTimer); expand(); } });
})();
