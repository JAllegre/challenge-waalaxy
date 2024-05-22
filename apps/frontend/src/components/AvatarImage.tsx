import { FC } from 'react';
import styled from 'styled-components';
import waalaxyHead from '../assets/waalaxy-head.png';
import { DEFAULT_AVATAR_COLOR, DEFAULT_AVATAR_SIZE } from '../constants';

interface StyledAvatarProps {
  color?: string;
  size?: number;
}

type AvatarProps = StyledAvatarProps;

const StyledAvatarImage = styled.div<StyledAvatarProps>`
  background-color: ${(props) => props.color || DEFAULT_AVATAR_COLOR};
  width: ${(props) => props.size || DEFAULT_AVATAR_SIZE}px;
  height: ${(props) => props.size || DEFAULT_AVATAR_SIZE}px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const AvatarImage: FC<AvatarProps> = ({ color, size }) => {
  return (
    <StyledAvatarImage id="avatar" color={color} size={size}>
      <StyledImage src={waalaxyHead} alt="avatar" />
    </StyledAvatarImage>
  );
};

export default AvatarImage;
