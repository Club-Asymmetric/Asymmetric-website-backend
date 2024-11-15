function renderCredits() {
  const creditContainer = document.createElement("div");
  creditContainer.style.textAlign = "center";
  creditContainer.style.marginTop = "50px";
  creditContainer.style.fontFamily = "Arial, sans-serif";

  const title = document.createElement("h1");
  title.textContent = "Credits";
  title.style.fontSize = "2em";
  title.style.marginBottom = "20px";
  creditContainer.appendChild(title);

  const creditsList = [
    {
      name: "Vishal",
      contributors: "Backend Developer",
      role: "Project Manager",
    },
    {
      name: "Samuel Jabez",
      contributors: "Backend Developer",
      role: "Database Manager",
    },
    { name: "Akash Kumar", contributors: "UI/UX Designer" },
    {
      name: "Hemanthraj",
      contributors: "Frontend Developer",
      role: "Technical Lead",
    },
    {
      name: "Linga",
      contributors: "Frontend Developer",
      role: "Vice-President",
    },
    { name: "Samier", contributors: "Frontend Developer" },
    { name: "KK", contributors: "Backend Developer" },
    {
      name: "Akashya",
      contributors: "Support and Assistance",
      role: "Secretary",
    },
  ];

  creditsList.forEach((credit) => {
    const creditItem = document.createElement("p");
    creditItem.style.margin = "5px 0";
    creditItem.style.fontSize = "1.2em";
    creditItem.textContent = `${credit.name} - ${credit.contributors}`;
    if (credit.role) {
      creditItem.textContent += `, ${credit.role}`;
    }
    creditContainer.appendChild(creditItem);
  });

  document.body.appendChild(creditContainer);
}

export { renderCredits };
