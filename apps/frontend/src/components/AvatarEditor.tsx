import { ChangeEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import { DEFAULT_COLOR, DEFAULT_SIZE } from '../constants';
import Avatar from './Avatar';
import Card from './ui/Card';
import FormField from './ui/FormField';
import NumberInput from './ui/Input';

const StyledActionBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export function AvatarEditor() {
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [size, setSize] = useState(DEFAULT_SIZE);

  const handleColorChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setColor(event.target.value);
    },
    []
  );

  const handleSizeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSize(parseInt(event.target.value, 10));
    },
    []
  );

  return (
    <Card>
      <Avatar color={color} size={size} />
      <StyledActionBar id="editor-action-bar">
        <FormField>
          <label htmlFor="editor-input-color">Color:</label>
          <input
            id="editor-input-color"
            name="editor-input-color"
            type="color"
            value={color}
            onChange={handleColorChange}
          />
        </FormField>
        <FormField>
          <label htmlFor="editor-input-size">Size:</label>
          <NumberInput
            id="editor-input-size"
            name="editor-input-size"
            min="0"
            max="800"
            value={size}
            onChange={handleSizeChange}
          />
        </FormField>
      </StyledActionBar>
    </Card>
  );
}