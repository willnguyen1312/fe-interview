/// <reference types="cypress" />

import { projects } from "../../src/data";

describe("Project list app", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should work for typical user work flow", () => {
    // Should display a list of all projects on initial load
    for (const project of projects) {
      cy.findByText(project.name);
    }

    const projectSearchKeyword = "il";
    cy.findByLabelText(/project search/i).type(projectSearchKeyword);

    const filteredProjects = projects.filter((project) =>
      project.name.includes(projectSearchKeyword)
    );

    // Should display a list of filtered project
    for (const project of filteredProjects) {
      cy.findByText(project.name);
    }

    cy.reload();

    // Should initialize search box with value from URL
    cy.findByLabelText(/project search/i).should(
      "have.value",
      projectSearchKeyword
    );

    // Should continue to display a list of filtered project
    for (const project of filteredProjects) {
      cy.findByText(project.name);
    }
  });
});
