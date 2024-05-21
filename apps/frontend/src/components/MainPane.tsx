import { FC } from 'react';
import styled from 'styled-components';
import ActionViewer from './ActionViewer';
import AvatarEditor from './AvatarEditor';
import AvatarViewer from './AvatarViewer';

const StyledMainPane = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
`;

const MainPane: FC = () => {
  return (
    <StyledMainPane id="main-pane">
      <AvatarEditor />
      <ActionViewer />
      <AvatarViewer />
    </StyledMainPane>
  );
};

export default MainPane;
