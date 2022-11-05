describe("empty spec", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get(".title").contains("SNAP TRADING");
    expect(true).to.equal(true);
  });
});

export {};
