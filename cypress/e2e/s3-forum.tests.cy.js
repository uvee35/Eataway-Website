describe('S3 Interaction Tests', () => {
    // Mock data
    const mockPosts = [
      { name: 'Linda', post: "My homemade Lasagna recipe includes layers of savory meat sauce, ricotta cheese, and mozzarella. It's a family favorite for Sunday dinners!" },
      { name: 'Paul', post: "Whenever I prepare Linguine with Clam Sauce, I use fresh clams and a splash of white wine for an authentic taste of the sea. Perfection!" }
    ];
  
    beforeEach(() => {
      // Mock fetch for the GET request
      cy.intercept('GET', 'https://s3.amazonaws.com/edx.js.bucket/forum1.json', {
        statusCode: 200,
        body: mockPosts,
      }).as('getPosts1');
  
      // Mock fetch for the PUT request
      cy.intercept('PUT', 'https://s3.amazonaws.com/edx.js.bucket/forum1.json', {
        statusCode: 200,
      }).as('putPosts1');
    });
  
    it('fetches posts successfully', () => {
      // Assuming you have a function to call fetchData in your app
      cy.visit('http://127.0.0.1:5504/Eataway-Website/html/forum1.html');
      cy.wait('@getPosts1');
      cy.get('#posts1List').should('contain', 'Linda');
    });
  
    it('updates posts successfully', () => {
      // Update posts and check PUT request
      cy.visit('http://127.0.0.1:5504/Eataway-Website/html/forum1.html');
      cy.get('#updateButton').click();
      cy.wait('@putPosts1').its('request.body').should('deep.equal', mockPosts);
    });
  });
  