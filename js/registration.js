(() => {
  const addBtn = document.querySelector('[data-add-player]');
  const playersWrap = document.querySelector('[data-players-wrap]');
  if (!playersWrap) return;

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
})();
