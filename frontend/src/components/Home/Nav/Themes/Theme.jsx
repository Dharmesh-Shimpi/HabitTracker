// src/components/Theme/Theme.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setTheme,
	setFont,
	fetchThemes,
	fetchFonts,
} from '../../../../Redux/themes.redux';
import css from './Theme.module.css';

export function Theme() {
	const dispatch = useDispatch();
	const { themes, fonts, selectedTheme, selectedFont, status, error } =
		useSelector((state) => state.theme);
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchThemes());
			dispatch(fetchFonts());
		}
	}, [status, dispatch]);

	useEffect(() => {
		const theme = themes.find((theme) => theme.name === selectedTheme);
		if (theme) {
			document.documentElement.style.setProperty(
				'--background-image',
				theme.syntax,
			);
			document.documentElement.style.setProperty('--color', theme.color);
		}
	}, [selectedTheme, themes]);

	useEffect(() => {
		const font = fonts.find((font) => font.name === selectedFont);
		if (font) {
			document.documentElement.style.setProperty('--font-family', font.syntax);
		}
	}, [selectedFont, fonts]);

	function click() {
		setToggle((prev) => !prev);
	}

	function handleThemeChange(theme) {
		dispatch(setTheme(theme.name));
	}

	function handleFontChange(font) {
		dispatch(setFont(font.name));
	}

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<div
				className={css.themeDiv}
				onClick={click}>
				Fonts & Themes
			</div>
			<div className={toggle ? css.On : css.Off}>
				<div className={css.t}>
					<div className={css.text}>Theme</div>
					<ul>
						{themes.map((theme) => (
							<li
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
								key={font.name}
								onClick={() => handleFontChange(font)}>
								{font.name}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
