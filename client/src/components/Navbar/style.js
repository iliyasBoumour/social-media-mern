import styled from 'styled-components';
import { Container } from '@material-ui/core';
import GraphicEqOutlinedIcon from '@material-ui/icons/GraphicEqOutlined';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';

export const Nav = styled.nav`
  background: #0f1626;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
  margin-bottom: 1rem;
`;

export const NavbarContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

export const NavLogo = styled(Link)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  height: 100%;
  &:hover {
    color: #fff;
  }
`;

export const NavIcon = styled(GraphicEqOutlinedIcon)`
  margin-right: 0.5rem;
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 960px) {
    display: block;

    font-size: 2.5rem;
    cursor: pointer;
    color: #fff;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-bottom: 0;
  padding: 0;

  @media screen and (max-width: 960px) {
    display: ${({ click }) => (click ? 'flex' : 'none')};
    flex-direction: row;
    top: 65px;
    position: absolute;
    right: 0;
    background: #0f1626;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

export const NavItem = styled.li`
  /* height: 80px; */
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;
  justify-content: center;

  &:hover {
    color: #fff;
  }

  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
  }
`;

export const NotifItem = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  height: 100%;
  justify-content: center;
  cursor: pointer;
  @media screen and (max-width: 960px) {
    text-align: center;
    padding: 2rem;
    width: 100%;
  }
`;

export const StyledAvatar = styled(Avatar)`
  width: 30px;
  height: 30px;
`;
