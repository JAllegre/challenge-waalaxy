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
  justify-content: center;
  align-items: stretch;
`;

const MainPane: FC = () => {
  const [avatar, setAvatar] = useState([]);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    const socket = io(WS_BASE_URL);

    socket.on('connect', () => {
      console.log('Socket connected', socket.id);
    });

    socket.on('actions', (newActions) => {
      setActions(newActions?.length || []);
    });

    socket.on('avatar', (newAvatar) => {
      setAvatar(newAvatar);
    });
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
