(() => {
  'use strict';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.querySelector('#contours');
  const toggle = document.querySelector('.motion-toggle');
  let paused = reduced.matches;
  let frame = 0;
  let phase = 0;
  let pointer = { x: 0, y: 0 };
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--perfect-purple').trim();
    if (ctx) {
      let width = 0, height = 0;
      const resize = () => {
        width = canvas.clientWidth; height = canvas.clientHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr; canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        draw();
      };
      const draw = () => {
        ctx.clearRect(0, 0, width, height);
        const cx = width * .48 + pointer.x * 10;
        const cy = height * .48 + pointer.y * 10;
        for (let ring = 0; ring < 47; ring++) {
          ctx.beginPath();
          for (let point = 0; point <= 220; point++) {
            const angle = point / 220 * Math.PI * 2;
            const ripple = Math.sin(angle * 3 + phase + ring * .065) * 12 + Math.cos(angle * 7 - phase * .6) * 5;
            const radius = 28 + ring * 4.4 + ripple;
            const x = cx + Math.cos(angle) * radius * .93;
            const y = cy + Math.sin(angle) * radius * 1.18;
            point ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
          }
          ctx.closePath();
          ctx.strokeStyle = ring > 32 && ring < 38 ? accent : '#232520';
          ctx.lineWidth = ring % 5 === 0 ? 1.7 : .8;
          ctx.stroke();
        }
        ctx.fillStyle = accent;
        ctx.beginPath();ctx.arc(cx, cy, 9, 0, Math.PI * 2);ctx.fill();
      };
      let last = 0;
      const animate = time => {
        if (paused || document.hidden) { frame = 0; return; }
        if (time - last > 32) { phase += .007; draw(); last = time; }
        frame = requestAnimationFrame(animate);
      };
      const sync = () => {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        if (!paused && !document.hidden) frame = requestAnimationFrame(animate);
        if (toggle) { toggle.hidden = false; toggle.textContent = paused ? 'Resume motion' : 'Pause motion'; toggle.setAttribute('aria-pressed', String(paused)); }
        document.body.classList.toggle('motion-paused', paused);
        draw();
      };
      window.addEventListener('resize', resize, { passive: true });
      document.addEventListener('pointermove', event => { if (!paused) pointer = { x: event.clientX / window.innerWidth - .5, y: event.clientY / window.innerHeight - .5 }; }, { passive: true });
      document.addEventListener('visibilitychange', sync);
      reduced.addEventListener('change', event => { paused = event.matches; sync(); });
      toggle?.addEventListener('click', () => { paused = !paused; sync(); });
      resize();sync();
    }
    const photo = document.querySelector('.art-photo');
    document.querySelectorAll('.world').forEach(world => {
      const preview = () => { if (photo) photo.style.backgroundImage = `url("${world.dataset.image}")`; };
      world.addEventListener('pointerenter', preview);
      world.addEventListener('focus', preview);
    });
  }
  const search = document.querySelector('#track-search');
  const collections = [...document.querySelectorAll('.collection')];
  const tracks = [...document.querySelectorAll('.track')];
  const count = document.querySelector('#search-count');
  if (search) {
    document.querySelector('.archive-tools').hidden = false;
    search.addEventListener('input', () => {
      const query = search.value.trim().toLocaleLowerCase();
      let visible = 0;
      tracks.forEach(track => { track.hidden = !track.textContent.toLocaleLowerCase().includes(query); if (!track.hidden) visible++; });
      collections.forEach(section => { section.hidden = ![...section.querySelectorAll('.track')].some(track => !track.hidden); });
      if (count) count.textContent = `${visible} of ${tracks.length} tracks`;
      document.querySelector('.no-results').hidden = visible > 0;
    });
    if (count) count.textContent = `${tracks.length} tracks`;
  }
  const player = document.querySelector('#archive-audio');
  if (player) {
    document.querySelector('#close-player').addEventListener('click', () => {
      player.pause();
      player.removeAttribute('src');
      player.load();
      player.closest('.player').hidden = true;
    });
    tracks.forEach(track => {
      const link = [...track.querySelectorAll('a')].find(a => /\.mp3(?:$|\?)/i.test(a.getAttribute('href')));
      if (!link) return;
      const button = document.createElement('button');
      button.type = 'button';button.className = 'play-track';button.textContent = 'Play';
      const title = track.firstChild.textContent.trim();
      button.setAttribute('aria-label', `Play ${title}`);
      button.addEventListener('click', () => {
        player.closest('.player').hidden = false;
        document.querySelector('#now-playing').textContent = title;
        document.querySelector('#playback-status').textContent = '';
        player.src = link.href;
        player.play().catch(() => { document.querySelector('#playback-status').textContent = 'Playback could not start. Try the MP3 link to open the recording directly.'; });
      });
      track.append(button);
    });
    player.addEventListener('error', () => { document.querySelector('#playback-status').textContent = 'This recording could not be loaded. Try its original MP3 link.'; });
  }
})();
