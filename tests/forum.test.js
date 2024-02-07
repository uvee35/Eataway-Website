/**
 * @jest-environment jsdom
 */

import { fetchData, putData } from '../Assets/js/s3-forum.js';
import { addPost, removePost, checkPost } from '../Assets/js/forum.js';

describe('forum post tests', () => {
  test('check post', () => {
    let party1 = "John";
    let post1 = "My homemade Lasagna recipe includes layers of savory meat sauce, ricotta cheese, and mozzarella. It's a family favorite for Sunday dinners!";
    let party2 = "Jane"; 
    let post2 = "Whenever I prepare Linguine with Clam Sauce, I use fresh clams and a splash of white wine for an authentic taste of the sea. Perfection!";

    expect(checkPost(party1)).toContain("Lasagne");
    expect(checkPost(party2)).toContain("Linguine");
  });

  test('remove post', () => {
    let party = "Bob";
    removePost(party);
    expect(checkPost(party)).toBe(false);
  });

  test('add subscriber', () => {
    let party = "Alice";
    let post = "My Mediterranean Orzo Salad combines orzo pasta, cherry tomatoes, cucumbers, and feta cheese, all tossed in a zesty lemon vinaigrette.";
    addPost(party, post);
    expect(checkPost(party)).toContain("Orzo");
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