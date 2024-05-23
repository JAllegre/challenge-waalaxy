import { ActionItem, ActionKind } from '@shared/types';
import { FC } from 'react';
import Card from './ui/Card';

interface ActionViewerProps {
  actions?: ActionItem[];
}

const ActionsViewer: FC<ActionViewerProps> = ({ actions }) => {
  console.log('***ju***ActionsViewer.tsx/10', 'actions:', actions);

  const actionItems = actions?.map((action) => {
    let actionStr = '';
    switch (action.kind) {
      case ActionKind.SetColor:
        actionStr = 'SetColor';
        break;
      case ActionKind.SetSize:
        actionStr = 'SetSize';
        break;
      default:
        actionStr = 'Unknown';
        break;
    }
    return <li key={action.id}>{actionStr}</li>;
  });

  return (
    <Card>
      <h2>Actions Queue</h2>
      <ul>{actionItems}</ul>
    </Card>
  );
};

export default ActionsViewer;
