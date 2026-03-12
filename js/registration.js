(() => {
  const form = document.querySelector('[data-registration-form]');
  const addBtn = document.querySelector('[data-add-player]');
  const playersWrap = document.querySelector('[data-players-wrap]');
  if (!form || !playersWrap) return;

  let playerCount = Number(playersWrap.getAttribute('data-player-count') || '4');

  function playerCardHtml(n){
    return `
      <section class="player-card" data-player-card="${n}">
        <h3>Player ${n}</h3>
        <div class="form-grid">
          <div class="field half">
            <label for="player${n}_name">Name</label>
            <input id="player${n}_name" name="player${n}_name" type="text" />
          </div>
          <div class="field half">
            <label for="player${n}_email">Email</label>
            <input id="player${n}_email" name="player${n}_email" type="email" />
          </div>
          <div class="field half">
            <label for="player${n}_phone">Phone Number</label>
            <input id="player${n}_phone" name="player${n}_phone" type="tel" />
          </div>
          <div class="field half">
            <label for="player${n}_address">Address</label>
            <input id="player${n}_address" name="player${n}_address" type="text" />
          </div>
          <div class="field half">
            <label for="player${n}_tees">Tee Selection</label>
            <select id="player${n}_tees" name="player${n}_tees">
              <option value="White Tees">White Tees</option>
              <option value="Gold Tees (55+)">Gold Tees (55+)</option>
            </select>
          </div>
        </div>
      </section>
    `;
  }

  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (playerCount >= 10) {
        addBtn.disabled = true;
        addBtn.textContent = 'Maximum 10 players reached';
        return;
      }
      playerCount += 1;
      playersWrap.insertAdjacentHTML('beforeend', playerCardHtml(playerCount));
      playersWrap.setAttribute('data-player-count', String(playerCount));
      if (playerCount >= 10) {
        addBtn.disabled = true;
        addBtn.textContent = 'Maximum 10 players reached';
      }
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    }

    const formData = new FormData(form);
    const params = new URLSearchParams();
    for (const [k, v] of formData.entries()) params.append(k, v);

    try {
      const netlifyResp = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });
      if (!netlifyResp.ok) throw new Error('Netlify form submission failed');

      const webhook = (window.ZCMC_CONFIG && window.ZCMC_CONFIG.GOOGLE_SHEETS_WEBHOOK) || '';
      if (webhook) {
        const payload = {};
        for (const [k, v] of formData.entries()) payload[k] = v;
        payload.submitted_at = new Date().toISOString();
        try {
          await fetch(webhook, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
          });
        } catch (err) {
          console.warn('Google Sheets mirror failed', err);
        }
      }

      window.location.href = 'registration-thank-you.html';
    } catch (err) {
      alert('There was a problem submitting the form. Please try again.');
      console.error(err);
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Registration';
      }
    }
  });
})();
