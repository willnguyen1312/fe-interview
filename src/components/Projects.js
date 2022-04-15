import React from "react";
import styled from "styled-components/macro";

import { projects } from "../data";
import { useUrlSearchParams } from "../hooks";
import { formatDate } from "../utils";

function ProjectListItem({
  name,
  template,
  target,
  createdByUser,
  createdDate,
}) {
  return (
    <div
      style={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        border: "1px solid #ccc",
        marginTop: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p>{name}</p>
        <p>{template}</p>
      </div>

      <p>Target: {target}</p>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <p>
          CREATED: {createdByUser} &bull; {formatDate(createdDate)}
        </p>
      </div>
    </div>
  );
}

export default function Projects() {
  const { value, set } = useUrlSearchParams();

  const projectSearchKeyword = value.project ?? "";

  const filteredProjects = React.useMemo(() => {
    if (!projectSearchKeyword || typeof projectSearchKeyword !== "string") {
      return projects;
    }

    return projects.filter((project) =>
      project.name.includes(projectSearchKeyword)
    );
  }, [projectSearchKeyword]);

  function handleOnProjectSearchKeywordChange(event) {
    set("project", event.target.value);
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
              <ProjectListItem
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
