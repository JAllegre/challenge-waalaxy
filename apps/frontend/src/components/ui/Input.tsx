import { FC, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledNumberInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  max-width: 60px;
`;

type NumberInputProps = InputHTMLAttributes<HTMLInputElement>;

const NumberInput: FC<NumberInputProps> = ({ ...props }) => {
  return <StyledNumberInput {...props} type="number" />;
};

export default NumberInput;
