/*
* Cypress tests to handle the following scenarios:
* 1. Links from index
* 2. Header and footer
*/

describe('Links Tests', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5504/Eataway-Website/');
    });

    it('Links to planner', () => {
        cy.log('In links to planner test');

        cy.get('[data-cy=planner-link]')
        .should('exist')
        .should('have.attr', 'href', 'html/mealplanner.html')
        .click();

        cy.get('[data-cy=planner-link]').click();
        cy.url().should('eq', 'http://127.0.0.1:5504/Eataway-Website/html/mealplanner.html');
        cy.go('back');
        cy.url().should('eq', 'http://127.0.0.1:5504/Eataway-Website/');
    });
});
