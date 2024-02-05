function helloWorld() {
  return "Hello world!";
  }

function getPathPrefix() {
    console.log('Current Path:', window.location.pathname);

    // Check if the path is root or ends with index.html
    const isRootOrIndex = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html');

    // Set and return pathPrefix based on the current page
    const pathPrefix = isRootOrIndex ? 'html/' : '';

    // Debugging
    console.log('Path Prefix:', pathPrefix);

    return pathPrefix;
}

document.addEventListener('DOMContentLoaded', function () {
  const pathPrefix = getPathPrefix();

  // Fetch header
  fetch(pathPrefix + 'header.html')
      .then(response => response.text())
      .then(content => {
        document.getElementById('header-container').innerHTML = content;
        updateLinkPaths();
      })
      .catch(error => console.error('Error loading header:', error));
});

document.addEventListener('DOMContentLoaded', function () {
  const pathPrefix = getPathPrefix();

  // Fetch footer
  fetch(pathPrefix + 'footer.html')
      .then(response => response.text())
      .then(content => {
          document.getElementById('footer-container').innerHTML = content;
      })
      .catch(error => console.error('Error loading footer:', error));
});

// Manage links relative to root
function updateLinkPaths() {
  // Check if the current page is in the html directory
  const isInHtmlDirectory = window.location.pathname.includes('/html/');
  const links = document.querySelectorAll('.dynamic-link');

  links.forEach(link => {
      let href = link.getAttribute('href');
      // Special handling for the link back to index.html
      if (link.classList.contains('navbar-brand')) {
          link.setAttribute('href', isInHtmlDirectory ? '../index.html' : 'index.html');
      } else if (!isInHtmlDirectory) {
          // Update other links only if we are in the root
          link.setAttribute('href', 'html/' + href);
      }
  });
}
