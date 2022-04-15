import styled from "styled-components/macro";

const NavBar = styled.nav`
  grid-area: navbar;
  display: flex;
  align-items: center;
  list-style: none;
  height: 40px;
  background: lightgray;

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

export default NavBar;
