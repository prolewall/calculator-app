import "./themeToggle.scss";

interface ThemeToggleProps {
  currentTheme: string;
  themeChangeCallback: (themeClass: string) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  currentTheme,
  themeChangeCallback,
}) => {
  return (
    <div className="ThemeToggle">
      <p className="ThemeToggle__label">THEME</p>
      <div className="ThemeToggle__toggle">
        <div className="ThemeToggle__toggle-labels">
          <label htmlFor="theme-1">1</label>
          <label htmlFor="theme-2">2</label>
          <label htmlFor="theme-3">3</label>
        </div>
        <div className="ThemeToggle__toggle-inputs">
          <input
            type="radio"
            id="theme-1"
            name="theme"
            value="theme-1"
            defaultChecked={currentTheme === "theme-1"}
            onChange={(event) => themeChangeCallback(event.target.value)}
          />
          <input
            type="radio"
            id="theme-2"
            name="theme"
            value="theme-2"
            defaultChecked={currentTheme === "theme-2"}
            onChange={(event) => themeChangeCallback(event.target.value)}
          />
          <input
            type="radio"
            id="theme-3"
            name="theme"
            value="theme-3"
            defaultChecked={currentTheme === "theme-3"}
            onChange={(event) => themeChangeCallback(event.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
