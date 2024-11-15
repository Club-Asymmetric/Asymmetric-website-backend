async function loadEvents() {
  const res = await fetch("/api/events");
  if (res.ok) {
    const [obj] = await res.json();
    const main = document.getElementById("main");
    main.innerHTML = "";
    for (let event of obj) {
      const { id, name, description } = event;
      main.innerHTML += `
        <h1>${name}</h1>
        <p>${description}</p>
        <button>Register</button>
      `;
    }
  }
}

async function loadPodcasts() {
  const res = await fetch("/api/podcasts");
  if (res.ok) {
    const [obj] = await res.json();
    const main = document.getElementById("main");
    main.innerHTML = "";
    for (let podcast of obj) {
      const { id, name, guests, description } = podcast;
      main.innerHTML += `
        <h1>${name}</h1>
        <p>Guests: ${guests.join(", ")}</p>
        <p>${description}</p>
        <button>Listen</button>
      `;
    }
  }
}

document.getElementById("events").addEventListener("click", loadEvents);
document.getElementById("podcasts").addEventListener("click", loadPodcasts);
