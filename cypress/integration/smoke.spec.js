/// <reference types="cypress" />

import { projects } from "../../src/data";
import { filter } from "../../src/utils";

describe("Project list app", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should work for typical user work flow", () => {
    // Should display a list of all projects on initial load
    for (const project of projects) {
      cy.findByText(project.name).should("be.visible");
    }

    const projectSearchKeyword = "il";
    cy.findByRole("textbox", { name: /project search/i })
      .type(projectSearchKeyword)
      .should("have.value", projectSearchKeyword);

    cy.url().should("contain", `project=${projectSearchKeyword}`);

    const filteredProjects = filter(projects, (project) =>
      project.name.toLowerCase().includes(projectSearchKeyword.toLowerCase())
    );

    // Should display a list of filtered project
    for (const project of filteredProjects) {
      cy.findByText(project.name).should("be.visible");
    }

    cy.reload();

    // Should initialize search box with value from URL
    cy.findByRole("textbox", { name: /project search/i })
      .should("have.value", projectSearchKeyword)
      .and("be.visible");

    // Should continue to display a list of filtered project
    for (const project of filteredProjects) {
      cy.findByText(project.name).should("be.visible");
    }

    const hiddenProjects = filter(
      projects,
      (project) =>
        !project.name.toLowerCase().includes(projectSearchKeyword.toLowerCase())
    );

    // Should not display the rest of projects
    for (const project of hiddenProjects) {
      cy.findByText(project.name).should("not.exist");
    }

    cy.findByRole("textbox", { name: /project search/i }).clear();
    cy.url().should("not.contain", `project=${projectSearchKeyword}`);

    // Should display a list of all projects
    for (const project of projects) {
      cy.findByText(project.name).should("be.visible");
    }
  });
});
