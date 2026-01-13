import { createSlice } from '@reduxjs/toolkit';
import { palette } from "../../lib/theme/theme";

// Background effect options
export const BACKGROUND_EFFECTS = {
    PARTICLES: 'particles',
    GEOCLOUD: 'geocloud',
    FOG: 'fog',
    PATHS: 'paths',
    WAVES: 'waves',
    MATRIX: 'matrix',
    SHADER_LINES: 'shader_lines',
    FALLING_STARS: 'falling_stars',
    SUPERNOVA: 'supernova',
    NONE: 'none',
};

export const themeProviderSlice = createSlice({
    name: 'themeProvider',
    initialState: {
        theme: palette.light,
        current: "light",
        backgroundEffect: BACKGROUND_EFFECTS.PARTICLES, // default to particles
    },
    reducers: {
        toggleTheme: (state) => {
            state.current = (state.current == "light") ? "dark" : "light";
            state.theme = palette[state.current];
            document.body.style = `background: ${[palette[state.current].background]};`;
        },
        setBackgroundEffect: (state, action) => {
            state.backgroundEffect = action.payload;
        },
    },
});

export const { toggleTheme, setBackgroundEffect } = themeProviderSlice.actions;

// state exports
export const selectTheme = state => state.themeProvider.theme;
export const selectBackgroundEffect = state => state.themeProvider.backgroundEffect;

export default themeProviderSlice.reducer;

