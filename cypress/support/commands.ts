/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      generateSchedule(): Chainable<void>;
      startRace(): Chainable<void>;
      pauseRace(): Chainable<void>;
      resumeRace(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("generateSchedule", () => {
  cy.contains("button", /generate schedule/i).click();
});

Cypress.Commands.add("startRace", () => {
  cy.contains("button", /start races/i).click();
});

Cypress.Commands.add("pauseRace", () => {
  cy.contains("button", /pause race/i).click();
});

Cypress.Commands.add("resumeRace", () => {
  cy.contains("button", /resume race/i).click();
});

export {};
