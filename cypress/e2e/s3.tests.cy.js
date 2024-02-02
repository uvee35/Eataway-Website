describe('S3 Interaction Tests', () => {
    // Mock data
    const mockSubscribers = [
      { name: 'john@example.com', status: false },
      { name: 'jane@example.com', status: true }
    ];
  
    beforeEach(() => {
      // Mock fetch for the GET request
      cy.intercept('GET', 'https://s3.amazonaws.com/edx.js.bucket/subscribers.json', {
        statusCode: 200,
        body: mockSubscribers,
      }).as('getSubscribers');
  
      // Mock fetch for the PUT request
      cy.intercept('PUT', 'https://s3.amazonaws.com/edx.js.bucket/subscribers.json', {
        statusCode: 200,
      }).as('putSubscribers');
    });
  
    it('fetches subscribers successfully', () => {
      // Assuming you have a function to call fetchData in your app
      cy.visit('http://127.0.0.1:5504/Eataway-Website/html/subscriber.html');
      cy.wait('@getSubscribers');
      cy.get('#subscribersList').should('contain', 'john@example.com'); // Assuming you render subscribers in an element with ID 'subscribersList'
    });
  
    it('updates subscribers successfully', () => {
      // Update subscribers and check PUT request
      cy.visit('http://127.0.0.1:5504/Eataway-Website/html/subscriber.html');
      cy.get('#updateButton').click(); // Assuming you have a button to update subscribers
      cy.wait('@putSubscribers').its('request.body').should('deep.equal', mockSubscribers);
    });
  });
  