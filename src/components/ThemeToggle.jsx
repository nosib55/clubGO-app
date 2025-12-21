const ThemeToggle = () => {
  const toggleTheme = () => {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme");

    html.setAttribute(
      "data-theme",
      current === "dark" ? "light" : "dark"
    );
  };

  return (
    <button onClick={toggleTheme} className="btn btn-ghost btn-sm">
      🌙 / ☀️
    </button>
  );
};

export default ThemeToggle;
