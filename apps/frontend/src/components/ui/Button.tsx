import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

type ButtonProps = HTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button`
  padding: 50px;
  cursor: pointer;
`;

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
