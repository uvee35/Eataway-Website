/*
* Cypress tests to handle the following scenarios:
* 1. Links from index
* 2. Header and footer
*/

describe('Links Tests', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5504/Eataway-Website/');
    });

    it('Links to forum', () => {
        cy.log('In links to forum test');

        cy.get('[data-cy=forum-link]')
        .should('exist')
        .should('have.attr', 'href', 'html/forum.html')
        .click();

        cy.url().should('eq', 'http://127.0.0.1:5504/Eataway-Website/html/forum.html');
        cy.go('back');
        cy.url().should('eq', 'http://127.0.0.1:5504/Eataway-Website/');
    });
});
