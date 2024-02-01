/**
 * @jest-environment jsdom
 */

import { helloWorld } from '../Assets/js/script.js';

describe('string tests', () => {
  test('check string', () => {
    expect(helloWorld()).toBe("Hello world!");
  });
});