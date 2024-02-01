let url = 'https://s3.amazonaws.com/edx.js.bucket/subscribers.json';
let subscribers = [];

// Getter and setter for subscribers array
function getSubscribers() {
  return subscribers;
}

function setSubscribers(newSubscribers) {
  subscribers.splice(0, subscribers.length);
  subscribers.push(...newSubscribers);
}

// Other functions
async function fetchData() {
    console.log('Trying to fetch subscribers');

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      subscribers = await response.json();
      console.log(subscribers);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

// Run fetch data to initialize on load
fetchData();

async function putData() {
  console.log('Trying to put subscribers');
  console.log(subscribers);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(subscribers),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Upload successful');
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  }

export { fetchData, putData, getSubscribers, setSubscribers };