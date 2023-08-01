import "./themeToggle.scss";

interface ThemeToggleProps {
    themeChangeCallback: (themeClass: string) => void;
}

const ThemeToggle:React.FC<ThemeToggleProps> = ({themeChangeCallback}) => {
    return (
        <div className="ThemeToggle">
            <p className="ThemeToggle__label">THEME</p>
            <div className="ThemeToggle__toggle" onChange={(event: any) => themeChangeCallback(event.target.value)}>
                <label htmlFor="theme-1"><input type="radio" id="theme-1" name="theme" value="theme-1" defaultChecked/><span></span></label>
                <label htmlFor="theme-2"><input type="radio" id="theme-2" name="theme" value="theme-2"/><span></span></label>
                <label htmlFor="theme-3"><input type="radio" id="theme-3" name="theme" value="theme-3"/><span></span></label>
            </div >
        </div>
    );
}

export default ThemeToggle;