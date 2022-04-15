import React from "react";
import styled from "styled-components/macro";

export default function Projects() {
  return (
    <Wrapper>
      <span>Display projects here...</span>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  grid-area: ${({ $area }) => $area};
  display: grid;
  grid-template-areas:
    "title"
    "projects";
  grid-template-rows: 40px auto;
`;
