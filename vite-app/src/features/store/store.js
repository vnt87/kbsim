import { configureStore } from '@reduxjs/toolkit';
import themeProviderReducer from '../themeProvider/themeProviderSlice';
import keySimulatorReducer from '../keySimulator/keySimulatorSlice';
import typingTestReducer from '../typingTest/typingTestSlice';

const themeMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith('themeProvider/')) {
    const theme = (({ themeProvider }) => ({ themeProvider }))(store.getState());
    localStorage.setItem('theme', JSON.stringify(theme))
  }
  return result;
};

const themeRehydrate = () => {
  if (localStorage.getItem('theme') !== null) {
    try {
      return JSON.parse(localStorage.getItem('theme')); // re-hydrate the store
    } catch (e) {
      console.warn("Failed to rehydrate theme from localStorage:", e);
      localStorage.removeItem('theme');
    }
  }
};

export default configureStore({
  reducer: {
    themeProvider: themeProviderReducer,
    keySimulator: keySimulatorReducer,
    typingTest: typingTestReducer,
  },
  preloadedState: themeRehydrate(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(themeMiddleware)
});
