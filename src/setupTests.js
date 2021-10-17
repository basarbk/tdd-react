// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import i18n from './locale/i18n';
import storage from './state/storage';
afterEach(() => {
  act(() => {
    i18n.changeLanguage('en');
  });
  storage.clear();
});
