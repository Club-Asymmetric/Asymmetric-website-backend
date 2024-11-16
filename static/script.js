function loadPodcast(id) {
  return async () => {
    const res = await fetch(`/api/podcasts/${id}`);
    if (res.ok) {
      const podcast = await res.json();
      const main = document.getElementById("main");
      main.innerHTML = "";
      const { id, name, guests, description, publish, image, mime } = podcast;
      main.innerHTML += `
        <h1>${name}</h1>
        <p>Guests: ${guests.join(", ")}</p>
        <p>Date: ${publish}</p>
        <p>${description}</p>
        <img src="/if/you/get/these/images/you/are/gay/${image}">
        <audio controls>
          <source src="/api/podcasts/${id}/stream" type="audio/${mime}">
          No Audio for you >:(
        </audio>
      `;
    }
  };
}
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
        <button id=${id} class="podcast">Listen</button>
      `;
    }
    for (const element of document.getElementsByClassName("podcast")) {
      element.addEventListener("click", loadPodcast(element.id));
    }
  }
}

document.getElementById("events").addEventListener("click", loadEvents);
document.getElementById("podcasts").addEventListener("click", loadPodcasts);
