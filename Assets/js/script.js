function helloWorld() {
  return "Hello world!";
  }

document.addEventListener('DOMContentLoaded', function () {
  // Fetch header
  fetch('header.html')
      .then(response => response.text())
      .then(content => {
          document.getElementById('header-container').innerHTML = content;
      })
      .catch(error => console.error('Error loading header:', error));
});

document.addEventListener('DOMContentLoaded', function () {
  // Fetch footer
  fetch('footer.html')
      .then(response => response.text())
      .then(content => {
          document.getElementById('footer-container').innerHTML = content;
      })
      .catch(error => console.error('Error loading footer:', error));
});