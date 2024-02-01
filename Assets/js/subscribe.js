import { getSubscribers, putData } from "./s3.js";

function addSubscriber(key, value) {
  return new Promise((resolve, reject) => {
    const subscribers = getSubscribers(); 

    // Check if the subscriber already exists
    const existingSubscriber = subscribers.find(subscriber => subscriber.name === key);
    if (existingSubscriber) {
      console.log(`${key} is already a subscriber.`);
      resolve(false);
      return;
    }

    console.log("Adding subscribers");

    // Add the new subscriber
    subscribers.push({ name: key, status: value });

    console.log(`${key} added as a subscriber.`);
    console.log(getSubscribers());

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

function removeSubscriber(name) {
  for (let i = 0; i < getSubscribers().length; i++) {
    if (getSubscribers()[i][0] === name) {
      getSubscribers().splice(i, 1);
      console.log(`${name} has been removed from subscribers.`);
      return;
    }
  }

  console.log(`${name} was not found in subscribers.`);
}

function checkSubscriber(name) {
  for (const subscriber of getSubscribers()) {
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
  const response = document.getElementById('subscriptionResponse');

  if (nameInput && nameInput.value) {
    addSubscriber(nameInput.value, true).then(isNewSubscriber => {
      if (isNewSubscriber) {
          showSplashScreen();
        } else {
          response.textContent = `${nameInput.value} is already a subscriber.`;
        }
      nameInput.value = ''; // Clear input
    });
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('addSubscriberForm');
  if (form) {
    form.addEventListener('submit', handleAddSubscriber);
  }

  const closeBtn = document.getElementById('closeSplashButton');
  if (closeBtn) {
      closeBtn.addEventListener('click', closeSplash);
  }
});

function showSplashScreen() {
  document.getElementById('splashScreen').style.display = 'block';
};

function closeSplash() {
  document.getElementById('splashScreen').style.display = 'none';

  // Redirect to index.html
  window.location.href = '../index.html';
};

export { addSubscriber, removeSubscriber, checkSubscriber, closeSplash };