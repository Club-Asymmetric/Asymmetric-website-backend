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
        <p>Publish: ${publish}</p>
        <p>${description}</p>
        <img src="/images/are/not/here/${image}">
        <audio controls>
          <source src="/api/podcasts/${id}/stream" type="audio/${mime}">
          No Audio for you >:(
        </audio>
      `;
    }
  };
}
function loadEvent(id) {
  return async () => {
    const res = await fetch(`/api/events/${id}`);
    if (res.ok) {
      const event = await res.json();
      const main = document.getElementById("main");
      main.innerHTML = "";
      const {
        id,
        name,
        participants,
        description,
        date,
        registration_dates: [from, to],
        team_size: [min, max],
        photos,
      } = event;
      main.innerHTML += `
        <h1>${name}</h1>
        <p>Participants: ${participants}</p>
        <p>Date: ${date}</p>
        <p>${description}</p>
        <p>Registration from ${from} to ${to}</p>
        <p>Team Size: ${min} - ${max}</p>
        `;
      for (const photo of photos) {
        main.innerHTML += `<img src="/if/you/get/these/images/you/are/gay/${photo}">`;
      }
      main.innerHTML += `
        <form action="/api/registrations/${id}" method="POST">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>
          <label for="year">Current Year:</label>
          <input type="text" id="year" name="year" required>
          <label for="department">Department:</label>
          <input type="text" id="department" name="department" required>
          <label for="college">College Name:</label>
          <input type="text" id="college" name="college" required>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>
          <label for="number">Phone Number:</label>
          <input type="tel" id="number" name="number" required>
          <label for="team">Team Name (optional):</label>
          <input type="text" id="team" name="team">
          <label for="member">Member Name (optional):</label>
          <input type="text" id="member" name="member">
          <button type="submit">Submit</button>
        </form>
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
        <button id="${id}" class="event">Register</button>
      `;
    }
    for (const element of document.getElementsByClassName("event")) {
      element.addEventListener("click", loadEvent(element.id));
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
