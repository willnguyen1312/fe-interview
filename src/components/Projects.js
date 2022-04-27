import React from "react";
import styled from "styled-components/macro";

import { Project } from "./Project";

import { projects } from "../data";
import { useUrlSearchParams } from "../hooks";
import { filter } from "../utils";
import { searchKey } from "../constants";

export default function Projects() {
  const { value, set } = useUrlSearchParams();

  const projectSearchKeyword = value[searchKey] ?? "";

  const filteredProjects = React.useMemo(() => {
    if (!projectSearchKeyword || typeof projectSearchKeyword !== "string") {
      return projects;
    }

    const result = filter(
      projects,
      (project) =>
        project.name
          .toLowerCase()
          .includes(projectSearchKeyword.toLowerCase()) ||
        project.createdByUser
          .toLowerCase()
          .includes(projectSearchKeyword.toLowerCase())
    );

    return result;
  }, [projectSearchKeyword]);

  function handleOnProjectSearchKeywordChange(event) {
    set(searchKey, event.target.value);
  }

  return (
    <Wrapper $area="content">
      <Title $area="title">Projects</Title>
      <Search
        aria-label="project search"
        value={projectSearchKeyword}
        onChange={handleOnProjectSearchKeywordChange}
        $area="search"
        placeholder="Start typing to search..."
      />
      <ProjectsList $area="projects">
        {filteredProjects.length > 0 &&
          filteredProjects.map(
            ({ createdByUser, createdDate, id, name, target, template }) => (
              <Project
                key={id}
                createdByUser={createdByUser}
                createdDate={createdDate}
                name={name}
                target={target}
                template={template}
              />
            )
          )}

        {filteredProjects.length === 0 && (
          <p>Sorry, there is no items matched your current search 🥲</p>
        )}
      </ProjectsList>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  grid-area: ${({ $area }) => $area};
  display: grid;
  grid-template-areas:
    "title"
    "search"
    "projects";
  grid-template-rows: 70px 30px auto;
`;

const Title = styled.h1`
  grid-area: ${({ $area }) => $area};
`;

const Search = styled.input`
  grid-area: ${({ $area }) => $area};
  margin: 0 20px;
`;

const ProjectsList = styled.article`
  grid-area: ${({ $area }) => $area};
  margin: 20px;
`;
