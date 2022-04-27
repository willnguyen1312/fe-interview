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

    const searchKeyword = "il";
    cy.findByRole("textbox", { name: /project search/i })
      .type(searchKeyword)
      .should("have.value", searchKeyword);

    const queryPart = new URLSearchParams(`${searchKey}=${searchKeyword}`);
    cy.url().should("contain", queryPart);

    const filteredProjects = filter(projects, (project) =>
      project.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    // Should display a list of filtered project
    for (const project of filteredProjects) {
      cy.findByText(project.name).should("be.visible");
    }

    cy.reload();

    // Should initialize search box with value from URL
    cy.findByRole("textbox", { name: /project search/i })
      .should("have.value", searchKeyword)
      .and("be.visible");

    // Should continue to display a list of filtered project
    for (const project of filteredProjects) {
      cy.findByText(project.name).should("be.visible");
    }

    const hiddenProjects = filter(
      projects,
      (project) =>
        !project.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    // Should not display the rest of projects
    for (const project of hiddenProjects) {
      cy.findByText(project.name).should("not.exist");
    }

    cy.findByRole("textbox", { name: /project search/i }).clear();
    cy.url().should("not.contain", `${searchKey}=${searchKeyword}`);

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

    const searchKeywords = ["Rob Tinn", "Sam"];

    for (const searchKeyword of searchKeywords) {
      cy.findByRole("textbox", { name: /project search/i })
        .clear()
        .type(searchKeyword)
        .should("have.value", searchKeyword);

      const queryPart = new URLSearchParams(`${searchKey}=${searchKeyword}`);
      cy.url().should("contain", queryPart.toString());

      const filteredProjects = filter(
        projects,
        (project) =>
          project.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          project.createdByUser
            .toLowerCase()
            .includes(searchKeyword.toLowerCase())
      );

      // Should display a list of filtered project
      for (const project of filteredProjects) {
        cy.findByText(project.name).should("exist");
      }
    }
  });
});
