const year = document.querySelector("#year");
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleText = document.querySelector(".theme-toggle-text");

if (year) {
  year.textContent = new Date().getFullYear();
}

function setTheme(theme) {
  const isDark = theme === "dark";

  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);

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
