/// <reference types="cypress" />

import { searchKey } from "../../src/constants";
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

    cy.url().should("contain", `${searchKey}=${projectSearchKeyword}`);

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
    cy.url().should("not.contain", `${searchKey}=${projectSearchKeyword}`);

    // Should display a list of all projects
    for (const project of projects) {
      cy.findByText(project.name).should("be.visible");
    }
  });

  it("should handle searching for both name and project author", () => {
    // Should display a list of all projects on initial load
    for (const project of projects) {
      cy.findByText(project.name).should("be.visible");
    }

    const projectSearchKeywords = ["Rob", "Sam"];

    for (const projectSearchKeyword of projectSearchKeywords) {
      cy.findByRole("textbox", { name: /project search/i })
        .clear()
        .type(projectSearchKeyword)
        .should("have.value", projectSearchKeyword);

      cy.url().should("contain", `${searchKey}=${projectSearchKeyword}`);

      const filteredProjects = filter(
        projects,
        (project) =>
          project.name
            .toLowerCase()
            .includes(projectSearchKeyword.toLowerCase()) ||
          project.createdByUser
            .toLowerCase()
            .includes(projectSearchKeyword.toLowerCase())
      );

      // Should display a list of filtered project
      for (const project of filteredProjects) {
        cy.findByText(project.name).should("exist");
      }
    }
  });
});
