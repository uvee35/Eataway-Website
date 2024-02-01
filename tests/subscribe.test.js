/**
 * @jest-environment jsdom
 */

import { addSubscriber, removeSubscriber, checkSubscriber } from '../Assets/subscribe.js';

describe('string tests', () => {
  test('check subscriber', () => {
    let party1 = "John";
    let party2 = "Jane"; 

    expect(checkSubscriber(party1)).toBe(false);
    expect(checkSubscriber(party2)).toBe(true);
  });

  test('remove subscriber', () => {
    let party = "Bob";
    removeSubscriber(party);
    expect(checkSubscriber(party)).toBe(false);
  });

  test('add subscriber', () => {
    let party = "Alice";
    addSubscriber(party, true);
    expect(checkSubscriber(party)).toBe(true);
  });
});