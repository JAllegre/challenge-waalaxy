import { FC, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Avatar from './Avatar';
import Card from './ui/Card';

const BASE_URL = 'ws://localhost:3000';

const AvatarViewer: FC = () => {
  const [avatar, setAvatar] = useState([]);
  useEffect(() => {
    const socket = io(BASE_URL);

    // client-side
    socket.on('connect', () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on('disconnect', () => {
      console.log(socket.id); // undefined
    });

    socket.on('avatar', (newAvatar) => {
      console.log('sock newAvatar', newAvatar); // undefined
      if (!newAvatar) {
        return;
      }
      setAvatar(newAvatar);
    });
  }, []);
  return (
    <Card>
      <Avatar color={avatar.color} size={avatar.size} />
    </Card>
  );
};

export default AvatarViewer;
