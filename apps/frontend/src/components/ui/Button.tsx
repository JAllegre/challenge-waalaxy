import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

type ButtonProps = HTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button`
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: var(--primary-color);
  color: red;
  font-weight: bold;
`;

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
