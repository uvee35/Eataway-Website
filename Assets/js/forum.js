import { fetchData, getForum, putData } from "./s3-forum.js";
import { displayForumPosts } from "./articles.js";

function addPost(key, value) {
  return new Promise((resolve, reject) => {
    const forum = getForum(); 

    // Check if the post already exists
    const existingPost = forum.find(post => post.name === key);
    if (existingPost) {
      console.log(`${key} already posted.`);
      resolve(false);
      return;
    }

    console.log("Adding post");

    // Add the new post
    forum.push({ name: key, post: value });

    console.log(`${key} added a post.`);
    console.log(getForum());

    // Write the new JSON to S3
    putData().then(() => {
      console.log('Data updated in S3');
      resolve(true);
    }).catch(error => {
      console.error('Error updating data:', error);
      reject(error);
    });
  });
}

function removePost(name) {
  for (let i = 0; i < getForum().length; i++) {
    if (getForum()[i][0] === name) {
      getForum().splice(i, 1);
      console.log(`${name} has been removed from forum posts.`);
      return;
    }
  }

  console.log(`${name} was not found in forum posts.`);
}

function checkPost(name) {
  for (const post of getForum()) {
    if (post[0] === name) {
      console.log(`${name} has post ${post[1]}.`);
      return post[1];
    }
  }

  console.log(`${name} has no forum posts.`);
  return false;
}

function handleAddPost(event) {
  event.preventDefault(); // Prevent default form submission

  const nameInput = document.getElementById('name');
  const postInput = document.getElementById('comment-text');
  const response = document.getElementById('postResponse');

  // input fields
  const name = nameInput.value;
  const post = postInput.value;

  addPost(name, post).then(isNewPost => {
    if (isNewPost) {
      console.log(name + " posts " + post);
    } else {
      response.textContent = `${name} has already posted.`;
    }

    // Clear input fields
    nameInput.value = '';
    postInput.value = '';
  });
}

// Event listener
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('comment-form');
  if (form) {
      form.addEventListener('submit', handleAddPost);
  }

  fetchData(displayForumPosts); 
});

export { addPost, removePost, checkPost };