import styled from "styled-components/macro";

export default function Sidebar() {
  return <Wrapper>{/* Future content */}</Wrapper>;
}

const Wrapper = styled.div`
  grid-area: sidebar;
  display: flex;
  flex-direction: column;
  padding-top: 40px;

  align-items: center;
  list-style: none;
  width: 40px;
  height: 100vh;
  background: lightblue;

  a {
    color: black;
    cursor: pointer;
    text-decoration: none;
  }

  a:visited {
    color: black;
  }

  a:not(:last-child) {
    margin: 15px;
  }
`;
