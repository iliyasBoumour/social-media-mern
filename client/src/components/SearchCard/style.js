import styled from 'styled-components';

export const Card = styled.div`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 300px;
  border-radius: 5px;
  height: 400px;
  box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.75);
  margin-top: 10px;
  transform: translateX(-4.5%);
  overflow-y: scroll;
  z-index: 2000;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ab987a;
  }
`;
