// a react component representing a basic card with box shadow using styled-components
import React from 'react';
import styled from 'styled-components';

interface CardProps {
  children?: React.ReactNode;
}

const StyledCard = styled.div`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 16px;
  margin: 4px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  background-color: white;
`;

const Card: React.FC<CardProps> = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

export default Card;
