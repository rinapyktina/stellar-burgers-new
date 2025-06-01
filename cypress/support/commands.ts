/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
  interface Chainable<Subject> {
    addBun(name: string): Chainable<Subject>;
    addIngredient(name: string): Chainable<Subject>;
    addSauce(name: string): Chainable<Subject>;
  }
}

Cypress.Commands.add('addBun', (bunName) => {
  cy.get('[data-cy="Булки"]')
    .contains(bunName)
    .parentsUntil('[data-cy="Булки"]')
    .find('button')
    .click();
});

Cypress.Commands.add('addIngredient', (ingredientName) => {
  cy.get('[data-cy="Начинки"]')
    .contains(ingredientName)
    .parentsUntil('[data-cy="Начинки"]')
    .find('button')
    .click();
});

Cypress.Commands.add('addSauce', (sauceName) => {
  cy.get('[data-cy="Соусы"]')
    .contains(sauceName)
    .parentsUntil('[data-cy="Соусы"]')
    .find('button')
    .click();
});
