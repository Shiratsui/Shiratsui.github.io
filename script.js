const year = document.querySelector("#year");
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleText = document.querySelector(".theme-toggle-text");
const experienceTimeline = document.querySelector("#experience-timeline");

function formatDurationFrom(startValue, endDate = new Date()) {
  const [startYear, startMonth, startDay = 1] = startValue.split("-").map(Number);

  if (!startYear || !startMonth) {
    return "";
  }

  let monthTotal = (endDate.getFullYear() - startYear) * 12 + (endDate.getMonth() + 1 - startMonth);

  if (endDate.getDate() < startDay) {
    monthTotal -= 1;
  }

  monthTotal = Math.max(0, monthTotal);
  const years = Math.floor(monthTotal / 12);
  const months = monthTotal % 12;
  const parts = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  }

  if (months > 0 || parts.length === 0) {
    parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  }

  return parts.join(" ");
}

function parseLocalDate(value) {
  const [dateYear, dateMonth, dateDay = 1] = value.split("-").map(Number);

  return new Date(dateYear, dateMonth - 1, dateDay);
}

function formatDateRange(startValue, endValue) {
  const formatter = new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric"
  });
  const start = formatter.format(parseLocalDate(startValue));

  if (!endValue) {
    return `${start} - Present`;
  }

  return `${start} - ${formatter.format(parseLocalDate(endValue))}`;
}

function createTagList(skills, label) {
  const list = document.createElement("ul");
  list.className = "tags";
  list.setAttribute("aria-label", `${label} skills`);

  skills.forEach((skill) => {
    const item = document.createElement("li");
    item.textContent = skill;
    list.append(item);
  });

  return list;
}

function renderExperience(data) {
  if (!experienceTimeline) {
    return;
  }

  const companyBlock = document.createElement("div");
  companyBlock.className = "company-block reveal-item";

  const companyMark = document.createElement("div");
  companyMark.className = "company-mark";
  companyMark.setAttribute("aria-hidden", "true");
  companyMark.textContent = data.company.mark;

  const companyDetails = document.createElement("div");
  const companyName = document.createElement("h3");
  companyName.textContent = data.company.name;

  const companyDuration = document.createElement("p");
  companyDuration.textContent = `${data.company.type} - ${formatDurationFrom(data.company.durationStart)}`;

  companyDetails.append(companyName, companyDuration);
  companyBlock.append(companyMark, companyDetails);

  const timeline = document.createElement("ol");
  timeline.className = "timeline";
  timeline.setAttribute("aria-label", `${data.company.name} experience timeline`);

  data.roles.forEach((role) => {
    const item = document.createElement("li");
    item.className = "timeline-item reveal-item";

    const dot = document.createElement("div");
    dot.className = "timeline-dot";
    dot.setAttribute("aria-hidden", "true");

    const card = document.createElement("article");
    card.className = "timeline-card";

    const meta = document.createElement("div");
    meta.className = "timeline-meta";

    const range = document.createElement("span");
    range.textContent = formatDateRange(role.start, role.end);

    const location = document.createElement("span");
    location.textContent = role.location;

    const title = document.createElement("h3");
    title.textContent = role.title;

    const description = document.createElement("p");
    description.textContent = role.description;

    meta.append(range, location);
    card.append(meta, title, description, createTagList(role.skills, role.title));
    item.append(dot, card);
    timeline.append(item);
  });

  experienceTimeline.replaceChildren(companyBlock, timeline);
}

async function loadExperience() {
  if (!experienceTimeline) {
    return;
  }

  try {
    const response = await fetch("data/experience.json");

    if (!response.ok) {
      throw new Error(`Unable to load experience data: ${response.status}`);
    }

    const data = await response.json();
    renderExperience(data);
    setupRevealAnimations();
  } catch (error) {
    experienceTimeline.innerHTML = '<p class="timeline-status">Experience data could not be loaded. Run a local server or check data/experience.json.</p>';
  }
}

if (year) {
  year.textContent = new Date().getFullYear();
}

function setTheme(theme) {
  const isDark = theme === "dark";

  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    // Theme still applies for the current page view.
  }

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  }

  if (themeToggleText) {
    themeToggleText.textContent = isDark ? "Light" : "Dark";
  }
}

if (themeToggle) {
  setTheme(document.documentElement.dataset.theme || "light");

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme;
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

function setupRevealAnimations() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-item");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

loadExperience();
setupRevealAnimations();
