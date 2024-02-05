/*
* Cypress tests to handle the following scenarios:
* 1. Links from index
* 2. Header and footer
*/

describe('Links Tests', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5504/Eataway-Website/');
    });

    it('Links to receipe', () => {
        cy.log('In links to receipe test');

        cy.get('[data-cy=recipe-link]')
        .should('exist')
        .should('have.attr', 'href', 'html/receipe.html')
        .click();

        cy.get('[data-cy=recipe-link]').click();
        cy.url().should('eq', 'http://127.0.0.1:5504/Eataway-Website/html/receipe.html');
        cy.go('back');
        cy.url().should('eq', 'http://127.0.0.1:5504/Eataway-Website/');
    });
});
