import "./themeToggle.scss";

interface ThemeToggleProps {
    currentTheme: string;
    themeChangeCallback: (themeClass: string) => void;
}

const ThemeToggle:React.FC<ThemeToggleProps> = ({currentTheme, themeChangeCallback}) => {
    return (
        <div className="ThemeToggle">
            <p className="ThemeToggle__label">THEME</p>
            <div className="ThemeToggle__toggle">
                <label htmlFor="theme-1"><input type="radio" id="theme-1" name="theme" value="theme-1" defaultChecked={currentTheme === "theme-1"} onChange={(event) => themeChangeCallback(event.target.value)}/><span></span></label>
                <label htmlFor="theme-2"><input type="radio" id="theme-2" name="theme" value="theme-2" defaultChecked={currentTheme === "theme-2"} onChange={(event) => themeChangeCallback(event.target.value)}/><span></span></label>
                <label htmlFor="theme-3"><input type="radio" id="theme-3" name="theme" value="theme-3" defaultChecked={currentTheme === "theme-3"} onChange={(event) => themeChangeCallback(event.target.value)}/><span></span></label>
            </div >
        </div>
    );
}

export default ThemeToggle;