import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 16px;
  margin: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  align-items: center;
  background-color: white;
  flex: 1;
`;

const Card: FC<PropsWithChildren> = ({ children }) => {
  return <StyledCard className="ui-card">{children}</StyledCard>;
};

export default Card;
