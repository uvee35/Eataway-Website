let url = 'https://s3.amazonaws.com/edx.js.bucket/subscribers.json';
let subscribers = [];

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

async function putData() {
  console.log('Trying to put subscribers');

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

// New getSubscribers method
async function getSubscribers() {
    if (subscribers.length === 0) {
      await fetchData();
    }
    return subscribers;
}

export { fetchData, putData, getSubscribers };