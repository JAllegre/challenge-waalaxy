import { ActionItem, ActionType, RemainingCredits } from '@shared/types';
import { FC, useMemo } from 'react';
import styled from 'styled-components';
import Card from './ui/Card';

interface ActionViewerProps {
  actions?: ActionItem[];
  remainingCredits?: RemainingCredits;
}

const StyledListItem = styled.li`
  list-style: none;
  border: 1px solid #ccc;
  padding: 4px 6px;
  margin: 4px 0;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const CardContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ActionsViewer: FC<ActionViewerProps> = ({
  actions,
  remainingCredits,
}) => {
  const actionItems = actions?.map((action) => {
    const actionDisplay = `(${String(action.id).padStart(2, '0')}) ${
      ActionType[action.type]
    } - ${Object.values(JSON.parse(action.data)).join(',')}`;

    return <StyledListItem key={action.id}>{actionDisplay}</StyledListItem>;
  });

  const remainingCreditsDisplay = useMemo(() => {
    if (!remainingCredits) {
      return '';
    }
    return Object.entries(remainingCredits)
      .map(
        ([actionType, credits]) =>
          `${ActionType[Number(actionType)]} : ${credits}`
      )
      .join(' , ');
  }, [remainingCredits]);
  return (
    <Card>
      <CardContent>
        <StyledTitleBox>
          <h2>Actions Queue</h2>
          <p>Credits: {remainingCreditsDisplay}</p>
        </StyledTitleBox>
        <ul>{actionItems}</ul>
      </CardContent>
    </Card>
  );
};

export default ActionsViewer;
