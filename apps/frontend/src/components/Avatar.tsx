import { FC } from 'react';
import styled from 'styled-components';
import waalaxyHead from '../assets/waalaxy-head.png';
import { DEFAULT_COLOR, DEFAULT_SIZE } from '../constants';

interface StyledAvatarProps {
  color?: string;
  size?: number;
}

type AvatarProps = StyledAvatarProps;

const StyledAvatar = styled.div<StyledAvatarProps>`
  background-color: ${(props) => props.color || DEFAULT_COLOR};
  width: ${(props) => props.size || DEFAULT_SIZE}px;
  height: ${(props) => props.size || DEFAULT_SIZE}px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Avatar: FC<AvatarProps> = ({ color, size }) => {
  return (
    <StyledAvatar id="avatar" color={color} size={size}>
      <StyledImage src={waalaxyHead} alt="avatar" />
    </StyledAvatar>
  );
};

export default Avatar;
