import React, { createContext, useContext, useState } from 'react';
import { themes, fontFamilies, fontSizes } from './theme.js';

const ThemeContext = createContext(); 

export const ThemeProvider = ({ children }) => {
  const [activeTheme, setActiveTheme] = useState('default');
  const [activeFont, setActiveFont] = useState('system');
  const [activeFontSize, setActiveFontSize] = useState('medium');

  const theme = themes[activeTheme];
  const fontFamily = fontFamilies[activeFont].value;
  const fontSize = fontSizes[activeFontSize].base;

  const value = {
    theme,
    fontFamily,
    fontSize,
    activeTheme,
    setActiveTheme, 
    activeFont,
    setActiveFont, 
    activeFontSize,
    setActiveFontSize,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
