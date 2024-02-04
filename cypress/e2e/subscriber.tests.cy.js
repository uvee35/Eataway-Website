/*
* Cypress tests to handle the following scenarios:
* 1. Adding a new subscriber
* 2. Handling duplicate subscribers
* 3. Show splash screen after adding subscriber
* 4. Closing splash screen
*/

describe('Subscriber Tests', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5504/Eataway-Website/html/subscriber.html');
    });

    it('Adds a new subscriber', () => {
        cy.log('In add new subscriber test');
        cy.get('#subscriberName').type('John');
        cy.get('#addSubscriberForm').submit();
        cy.get('#splashScreen').should('be.visible');
        cy.get('#splashContent').should('contain', 'Congratulations on Subscribing!');
        cy.log('Out add new subscriber test');
    });

    it('Handles duplicate subscribers', () => {
        cy.log('In add duplicate subscriber test');

        // Add a subscriber
        cy.get('#subscriberName').type('Jane');
        cy.get('#addSubscriberForm').submit();
        cy.get('#splashScreen').should('be.visible');

        // Check the click moves us back to the index page
        cy.get('#closeSplashButton').scrollIntoView().click({ force: true });
        cy.url().should('eq', 'http://127.0.0.1:5504/Eataway-Website/index.html');

        // Try to add the same subscriber again
        cy.get('[data-cy=subscribe-link]').click();
        cy.get('#subscriberName').type('Jane');
        cy.get('#addSubscriberForm').submit();
        cy.get('#subscriptionResponse').should('contain', 'Jane is already a subscriber.');

        cy.log('Out add duplicate subscriber test');
    });

    it('Closes the splash screen', () => {
        cy.log('In close splash screen test');

        cy.get('#subscriberName').type('Emily');
        cy.get('#addSubscriberForm').submit();
        cy.get('#splashScreen').should('be.visible');
        
        // Check the click moves us back to the index page
        cy.get('#closeSplashButton').scrollIntoView().click({ force: true });
        cy.url().should('eq', 'http://127.0.0.1:5504/Eataway-Website/index.html');

        cy.log('Out close splash screen test');
    });
});
