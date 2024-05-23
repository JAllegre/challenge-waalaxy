import { ActionItem, ActionKind } from '@shared/types';
import { FC } from 'react';
import styled from 'styled-components';
import Card from './ui/Card';

interface ActionViewerProps {
  actions?: ActionItem[];
}

const StyledListItem = styled.li`
  list-style: none;
  border: 1px solid #ccc;
  padding: 5px 10px;
  margin: 4px 0;
  border-radius: 4px;
`;
const ActionsViewer: FC<ActionViewerProps> = ({ actions }) => {
  const actionItems = actions?.map((action) => {
    const actionDisplay = `${ActionKind[action.kind]} ( ${Object.values(
      JSON.parse(action.data)
    ).join(',')} )`;

    return <StyledListItem key={action.id}>{actionDisplay}</StyledListItem>;
  });

  return (
    <Card>
      <h2>Actions Queue</h2>
      <ul>{actionItems}</ul>
    </Card>
  );
};

export default ActionsViewer;
