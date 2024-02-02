describe('Subscribers Test', () => {
    it('successfully adds a subscriber on form submission', () => {
      cy.visit('http://127.0.0.1:5504/Eataway-Website/html/subscriber.html');
      cy.get('#subscriberName').type('Alice');
      cy.get('#addSubscriberForm').submit();
  
      // Spy on console.log
      cy.window().then((win) => {
        cy.spy(win.console, 'log').as('consoleLog');
      });
  
      // Check if the console log has the expected output
      cy.get('@consoleLog').should('be.calledWith', 'Alice added as a subscriber.');
    });
  });