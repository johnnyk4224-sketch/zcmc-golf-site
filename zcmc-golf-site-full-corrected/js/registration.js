(() => {
  const form = document.querySelector('[data-registration-form]');
  const addBtn = document.querySelector('[data-add-player]');
  const playersWrap = document.querySelector('[data-players-wrap]');
  if (!form || !playersWrap) return;

  let playerCount = Number(playersWrap.getAttribute('data-player-count') || '4');

  function playerCardHtml(n){
    return `
      <section class="player-card">
        <h3>Player ${n}</h3>
        <div class="form-grid">
          <div class="field half"><label>Name</label><input name="player${n}_name" type="text" /></div>
          <div class="field half"><label>Email</label><input name="player${n}_email" type="email" /></div>
          <div class="field half"><label>Phone Number</label><input name="player${n}_phone" type="tel" /></div>
          <div class="field half"><label>Address</label><input name="player${n}_address" type="text" /></div>
          <div class="field half">
            <label>Tee Selection</label>
            <select name="player${n}_tees">
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
    });
  }
})();
