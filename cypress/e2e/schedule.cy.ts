describe("Schedule Generation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads the app with main panels visible", () => {
    // Verify core UI elements are present
    cy.get(".dashboard").should("exist");
    cy.contains("Horse List").should("be.visible");
    cy.contains("Race Track").should("be.visible");
    cy.contains("Schedule").should("be.visible");
    cy.contains("Results").should("be.visible");
  });

  it("shows generate schedule button on load", () => {
    cy.contains("button", /generate schedule/i).should("be.visible");
  });

  it("start button is disabled before generating schedule", () => {
    cy.contains("button", /start races/i).should("be.disabled");
  });

  it("generates schedule when clicking generate button", () => {
    cy.generateSchedule();

    // Verify 6 laps are created
    cy.contains("First Lap").should("exist");
    cy.contains("Second Lap").should("exist");
    cy.contains("Third Lap").should("exist");
    cy.contains("Fourth Lap").should("exist");
    cy.contains("Fifth Lap").should("exist");
    cy.contains("Sixth Lap").should("exist");
  });

  it("enables start button after generating schedule", () => {
    cy.generateSchedule();
    cy.contains("button", /start races/i).should("not.be.disabled");
  });

  it("shows 20 horses in the horse list", () => {
    // Horse list should have 20 horses
    cy.get(".horse-list-table tbody tr").should("have.length", 20);
  });
});
