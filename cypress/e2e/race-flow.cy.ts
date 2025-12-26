describe("Race Flow", { testIsolation: false }, () => {
  before(() => {
    cy.visit("/");
    cy.generateSchedule();
  });

  it("shows no results initially", () => {
    cy.contains("No results available").should("exist");
  });

  it("shows countdown after starting race", () => {
    cy.startRace();

    // Countdown should appear
    cy.contains("Get ready!").should("be.visible");
  });

  it("can pause during countdown", () => {
    cy.pauseRace();

    cy.contains("Race Paused").should("be.visible");
  });

  it("can resume after pause", () => {
    cy.resumeRace();

    cy.contains("Race Paused").should("not.exist");
  });

  it("shows results after first lap completes", () => {

    // Wait for countdown (3 seconds) + race to complete
    // Using a longer timeout for the race to finish
    cy.contains("No results available", { timeout: 30000 }).should("not.exist");

    // First lap results should appear
    cy.contains("First Lap").should("exist");

    // Verify position numbers appear (1st place)
    cy.contains("1").should("exist");
  });

  it("completes full race and shows finished message", () => {
    // Wait for all 6 laps to complete (might take ~60 seconds)
    cy.contains("Race Finished!", { timeout: 120000 }).should("be.visible");

    // All lap results should exist
    cy.contains("First Lap").should("exist");
    cy.contains("Sixth Lap").should("exist");
  });
});
