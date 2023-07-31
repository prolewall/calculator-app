import "./themeToggle.scss";

const ThemeToggle:React.FC = () => {
    return (
        <div className="ThemeToggle">
            <p className="ThemeToggle__label">THEME</p>
            <div className="ThemeToggle__toggle">
                <label htmlFor="theme-1"><input type="radio" id="theme-1" name="theme" /><span></span></label>
                <label htmlFor="theme-2"><input type="radio" id="theme-2" name="theme" /><span></span></label>
                <label htmlFor="theme-3"><input type="radio" id="theme-3" name="theme" /><span></span></label>
            </div>
        </div>
    );
}

export default ThemeToggle;