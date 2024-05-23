import { Avatar } from '@shared/types';
import { FC } from 'react';
import AvatarImage from './AvatarImage';
import Card from './ui/Card';

interface AvatarViewerProps {
  avatar?: Avatar;
}

const AvatarViewer: FC<AvatarViewerProps> = ({ avatar }) => {
  return (
    <Card>
      <AvatarImage color={avatar?.color} size={avatar?.size} />
    </Card>
  );
};

export default AvatarViewer;
