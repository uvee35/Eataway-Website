let url = 'https://s3.amazonaws.com/edx.js.bucket/forum.json';
let forum = [];

// Getter and setter for subscribers array
function getForum() {
  return forum;
}

function setForum(newForum) {
  forum.splice(0, forum.length);
  forum.push(...newForum);
}

// Other functions
async function fetchData(callback) {
    console.log('Trying to fetch forum');

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      forum = await response.json();
      console.log(forum);

      if(callback) {
        callback(); // Call the callback function after data is fetched
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

// Run fetch data to initialize on load
fetchData();

async function putData() {
  console.log('Trying to put forum post');
  console.log(forum);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(forum),
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

export { fetchData, putData, getForum, setForum };