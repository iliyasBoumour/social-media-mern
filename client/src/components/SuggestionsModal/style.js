import styled from 'styled-components';

export const Body = styled.div`
  max-height: 80vh;
  min-height: 50vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ab987a;
  }
`;
