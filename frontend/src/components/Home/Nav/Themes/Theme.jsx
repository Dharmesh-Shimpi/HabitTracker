import React, { useState } from 'react';
import { themes, fonts } from '../../../../Redux/themes.redux';
import css from './Theme.module.css';

export function Theme() {
	const [selectedTheme, setSelectedTheme] = useState(themes[0]);
	const [selectedFont, setSelectedFont] = useState(fonts[1]); // Default to 'Poppins'

	function handleThemeChange(theme) {
		setSelectedTheme(theme);
		document.documentElement.style.setProperty(
			'--background-image',
			theme.syntax,
		);
		document.documentElement.style.setProperty('--color', theme.color);
	}

	function handleFontChange(font) {
		setSelectedFont(font);
		document.documentElement.style.setProperty('--font-family', font.syntax);
	}

	const [toggle, setToggle] = useState(false);

	const click = () => {
		setToggle(!toggle);
	};

	return (
		<>
			<div
				className={css.themeDiv}
				onClick={click}>
				Fonts & Themes
			</div>
			<div className={toggle ? css.On : css.Off}>
				<div className={css.t}>
					<div className={css.text}>Theme</div>
					<ul className={css.ul}>
						{themes.map((theme) => (
							<li
								className={css.li}
								key={theme.name}
								onClick={() => handleThemeChange(theme)}>
								{theme.name}
							</li>
						))}
					</ul>
				</div>
				<div className={css.t}>
					<div className={css.text}>Font</div>
					<ul>
						{fonts.map((font) => (
							<li
								className={css.li}
								key={font.name}
								onClick={() => handleFontChange(font)}>
								{font.name}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}

export default Theme;
