import { putData, getSubscribers } from "./s3.js";

let subscribers = getSubscribers();

function addSubscriber(key, value) {
  // Check if the subscriber already exists
  for (let i = 0; i < subscribers.length; i++) {
    if (subscribers[i][0] === key) {
      console.log(`${key} is already a subscriber.`);
      return;
    }
  }

  console.log("Adding subscribers");
  console.log(subscribers);

  // Add the new subscriber by async promise
  subscribers.then(x => {
    // Manipulate the resolved array as needed
    x.push({ name: key, status: value });
  
    // Now, the resolvedArray contains the new data
    console.log(x);
  });

  console.log(`${key} added as a subscriber.`);

  // Write to S3
  putData();
}

function removeSubscriber(name) {
  for (let i = 0; i < subscribers.length; i++) {
    if (subscribers[i][0] === name) {
      subscribers.splice(i, 1);
      console.log(`${name} has been removed from subscribers.`);
      return;
    }
  }

  console.log(`${name} was not found in subscribers.`);
}

function checkSubscriber(name) {
  for (const subscriber of subscribers) {
    if (subscriber[0] === name) {
      console.log(`${name} is ${subscriber[1] ? 'an active' : 'not an active'} subscriber.`);
      return subscriber[1];
    }
  }

  console.log(`${name} is not a subscriber.`);
  return false;
}

function handleAddSubscriber(event) {
  event.preventDefault(); // Prevent default form submission

  const nameInput = document.getElementById('subscriberName');
  if (nameInput && nameInput.value) {
    addSubscriber(nameInput.value, true);
    nameInput.value = ''; // Clear input
  }
}

// Event listener for the form submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addSubscriberForm');
  if (form) {
    form.addEventListener('submit', handleAddSubscriber);
  }
});

export { addSubscriber, removeSubscriber, checkSubscriber };