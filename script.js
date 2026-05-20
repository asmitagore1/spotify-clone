/* ── script.js ── Interactive player controls */

document.addEventListener('DOMContentLoaded', () => {

  // ── Progress bar ──
  const progressInput = document.getElementById('progress-input');
  const progressFill  = document.getElementById('progress-fill');
  const thumb         = document.querySelector('.progress-thumb');

  if (progressInput) {
    const update = () => {
      const v = progressInput.value;
      progressFill.style.width  = v + '%';
      if (thumb) thumb.style.left = v + '%';
    };
    progressInput.addEventListener('input', update);
    update();
  }

  // ── Volume bar ──
  const volInput = document.querySelector('.volume-input');
  const volFill  = document.querySelector('.volume-fill');

  if (volInput) {
    volInput.addEventListener('input', () => {
      volFill.style.width = volInput.value + '%';
    });
  }

  // ── Play button toggle ──
  const playBtn = document.querySelector('.play-btn');
  let playing = false;

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      playing = !playing;
      playBtn.innerHTML = playing
        ? '<i class="fa-solid fa-pause"></i>'
        : '<i class="fa-solid fa-play"></i>';
    });
  }

  // ── Heart toggle ──
  const heartBtn = document.querySelector('.heart-btn');
  if (heartBtn) {
    heartBtn.addEventListener('click', () => {
      const icon = heartBtn.querySelector('i');
      icon.classList.toggle('fa-regular');
      icon.classList.toggle('fa-solid');
      heartBtn.style.color = icon.classList.contains('fa-solid') ? 'var(--accent)' : '';
    });
  }

  // ── Card click ripple ──
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect   = this.getBoundingClientRect();
      ripple.style.cssText = `
        position:absolute;
        width:0;height:0;
        background:rgba(29,185,84,0.18);
        border-radius:50%;
        left:${e.clientX - rect.left}px;
        top:${e.clientY - rect.top}px;
        transform:translate(-50%,-50%);
        animation:ripple 0.5s ease-out forwards;
        pointer-events:none;
        z-index:10;
      `;
      if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
          @keyframes ripple {
            to { width:300px; height:300px; opacity:0; }
          }
        `;
        document.head.appendChild(style);
      }
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

});