import { ActionItem, Avatar } from '@shared/types';
import { FC, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { WS_BASE_URL } from '../constants';
import ActionsViewer from './ActionsViewer';
import AvatarEditor from './AvatarEditor';
import AvatarViewer from './AvatarViewer';

const StyledMainPane = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  min-height: 80vh;
  align-items: stretch;
  padding: 0 20px;
`;

const MainPane: FC = () => {
  const [avatar, setAvatar] = useState<Avatar>();
  const [actions, setActions] = useState<ActionItem[]>([]);

  useEffect(() => {
    const socket = io(WS_BASE_URL);

    socket.on('connect', () => {
      console.log('Socket connected', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected', socket.id);
    });

    socket.on('wsc-actions', (newActions) => {
      setActions(newActions?.length ? newActions : []);
    });

    socket.on('wsc-avatar', (newAvatar) => {
      setAvatar(newAvatar);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <StyledMainPane id="main-pane">
      <AvatarEditor />
      <ActionsViewer actions={actions} />
      <AvatarViewer avatar={avatar} />
    </StyledMainPane>
  );
};

export default MainPane;
