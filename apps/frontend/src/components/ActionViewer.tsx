import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Card from './ui/Card';

const BASE_URL = 'ws://localhost:3000';

export default function ActionViewer() {
  const [actions, setActions] = useState([]);
  useEffect(() => {
    const socket = io(BASE_URL);

    // client-side
    socket.on('connect', () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on('disconnect', () => {
      console.log(socket.id); // undefined
    });

    socket.on('queue', (m) => {
      setActions(m);
      console.log('sock message', m); // undefined
    });
  }, []);
  return (
    <Card>
      <h2>Actions</h2>
      <ul>
        {actions.map((action, i) => (
          <li key={i}>{JSON.stringify(action)}</li>
        ))}
      </ul>
    </Card>
  );
}
