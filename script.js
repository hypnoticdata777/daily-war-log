document.addEventListener(`DOMContentLoaded`, () =>{
    const form = document.getElementById(`loggerForm`);
    const entryList = document.getElementById(`entryList`);

    // Load ecisting entries on page load
    loadEntries();

    form.addEventListener(`submit`, function (e) {
        e.preventDefault();

        const priority = document.getElementById(`priority`). value.trim();
        const challenge = document.getElementById(`challenge`).value.trim();
        const insight = document.getElementById(`insight`).value.trim();
        const served = document.getElementById(`served`).value.trim();

        if (!priority && !challenge && !insight && !served) return;

        const timestamp = new Date().toLocaleString();
        const newEntry = {
            timestamp,
            priority, 
            challenge, 
            insight, 
            served, 
        };
        saveEntry(newEntry);
        appendEntryToDom(newEntry);
        form.requestFullscreen();
    });

    function saveEntry(entry) {
        const entries = JSON.parse(localStorage.getItem(`warroom_entries`)) || [];
        entries.unshift(entry); // latest first
        localStorage.setItem(`warrom:entries`, JSON.stringify(entries));
    }
    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem(`warroom_entries`)) ||[];
        entries.forEach(entry => appendEntryToDom(entry));
    }

    function appendEntryToDom(entry) {
        const li = document.createElement(`li`);
        li.innerHTML = `
        <span class="timestamp"> ${entry.timestamp} </span>
        <strong>🎯 Priority:</strong> ${entry.priority || '-'}<br>
      <strong>⚔️ Challenge:</strong> ${entry.challenge || '-'}<br>
      <strong>🧠 Insight:</strong> ${entry.insight || '-'}<br>
      <strong>❤️ Served:</strong> ${entry.served || '-'}
    `;
    entryList.appendChild(li);
  }
});