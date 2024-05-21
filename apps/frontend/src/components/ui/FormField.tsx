import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

const StyledFormField = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const FormField: FC<PropsWithChildren> = ({ children }) => {
  return <StyledFormField>{children}</StyledFormField>;
};

export default FormField;
