/**
 * @jest-environment jsdom
 */

// Get around the requirement to load node-fetch locally when it's already available in a browser
import fetch from 'node-fetch';

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

import { fetchData, putData } from '../Assets/js/s3.js';
import { addSubscriber, removeSubscriber, checkSubscriber } from '../Assets/js/subscribe.js';

describe('subscription tests', () => {
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

describe('read and write tests', () => {
  test('check read', () => {
    fetchData();
  });

  test('check write', () => {
    putData();
  });
});