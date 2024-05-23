import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import styled from 'styled-components';
import MainPane from './components/MainPane';
import './main.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') ?? document.body
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTitle = styled.h1`
  color: white;
  padding: 6px;
`;

root.render(
  <StrictMode>
    <Container id="main-container">
      <StyledTitle>Waalaxy challenge</StyledTitle>
      <MainPane />
    </Container>
  </StrictMode>
);
