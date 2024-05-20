import styled from 'styled-components';

const StyledFormField = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export default function FormField({ children }: { children: React.ReactNode }) {
  return <StyledFormField>{children}</StyledFormField>;
}
