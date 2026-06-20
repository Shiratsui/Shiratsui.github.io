const year = document.querySelector("#year");
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleText = document.querySelector(".theme-toggle-text");
const revealElements = document.querySelectorAll(".reveal, .reveal-item");
const dynamicDurations = document.querySelectorAll("[data-duration-start]");

if (year) {
  year.textContent = new Date().getFullYear();
}

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

dynamicDurations.forEach((duration) => {
  const formatted = formatDurationFrom(duration.dataset.durationStart);

  if (formatted) {
    duration.textContent = formatted;
  }
});

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

if ("IntersectionObserver" in window) {
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
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
