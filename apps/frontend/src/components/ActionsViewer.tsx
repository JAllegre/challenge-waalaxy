import { FC } from 'react';
import { ActionItem } from 'shared/types';
import Card from './ui/Card';

interface ActionViewerProps {
  actions: ActionItem[];
}

const ActionsViewer: FC<ActionViewerProps> = ({ actions }) => {
  return (
    <Card>
      <h2>Actions</h2>
      <ul>
        {!!actions?.length &&
          actions.map((action) => (
            <li key={action.id}>{JSON.stringify(action)}</li>
          ))}
      </ul>
    </Card>
  );
};

export default ActionsViewer;
