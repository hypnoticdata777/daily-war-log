document.addEventListener(`DOMContentLoaded`, () => {
    const form = document.getElementById(`loggerForm`);
    const entryList = document.getElementById(`entryList`);

    // Load existing entries on page load
    loadEntries();

    form.addEventListener(`submit`, function (e) {
        e.preventDefault();

        const priority = document.getElementById(`priority`).value.trim();
        const challenge = document.getElementById(`challenge`).value.trim();
        const insight = document.getElementById(`insight`).value.trim();
        const served = document.getElementById(`served`).value.trim();

        if (!priority && !challenge && !insight && !served) return;

        const timestamp = new Date().toLocaleString();
        const id = Date.now();
        const newEntry = { id, timestamp, priority, challenge, insight, served };

        saveEntry(newEntry);
        appendEntryToDom(newEntry);
        form.reset();
    });

    function saveEntry(entry) {
        const entries = JSON.parse(localStorage.getItem(`warroom_entries`)) || [];
        entries.unshift(entry); // latest first
        localStorage.setItem(`warroom_entries`, JSON.stringify(entries));
    }

    function deleteEntry(id) {
        const entries = JSON.parse(localStorage.getItem(`warroom_entries`)) || [];
        const updated = entries.filter(e => e.id !== id);
        localStorage.setItem(`warroom_entries`, JSON.stringify(updated));
    }

    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem(`warroom_entries`)) || [];
        entries.forEach(entry => appendEntryToDom(entry));
    }

    function escape(str) {
        const div = document.createElement(`div`);
        div.textContent = str;
        return div.innerHTML;
    }

    function appendEntryToDom(entry) {
        const li = document.createElement(`li`);
        li.dataset.id = entry.id;
        li.innerHTML = `
            <span class="timestamp">${escape(entry.timestamp)}</span>
            <strong>🎯 Priority:</strong> ${escape(entry.priority) || '-'}<br>
            <strong>⚔️ Challenge:</strong> ${escape(entry.challenge) || '-'}<br>
            <strong>🧠 Insight:</strong> ${escape(entry.insight) || '-'}<br>
            <strong>❤️ Served:</strong> ${escape(entry.served) || '-'}
            <button class="delete-btn">🗑 Delete</button>
        `;

        li.querySelector(`.delete-btn`).addEventListener(`click`, () => {
            deleteEntry(entry.id);
            li.remove();
        });

        entryList.appendChild(li);
    }
});
