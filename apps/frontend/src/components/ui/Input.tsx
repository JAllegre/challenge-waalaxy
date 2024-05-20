import styled from 'styled-components';

const StyledNumberInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  max-width: 60px;
`;

type NumberInputProps = React.InputHTMLAttributes<HTMLInputElement>;
export default function NumberInput({ ...props }: NumberInputProps) {
  return <StyledNumberInput {...props} type="number" />;
}
