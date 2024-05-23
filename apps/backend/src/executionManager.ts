import actionController from './controllers/actionController';
import { refreshExecutionCredits } from './controllers/actions/actionTypes';
import {
  ACTION_EXECUTION_INTERVAL,
  RENEW_ACTION_TYPES_INTERVAL,
} from './utils/constants';

let actionExecutionIntervalHandle: NodeJS.Timeout | undefined = undefined;
let renewActionTypesIntervalHandle: NodeJS.Timeout | undefined = undefined;

export function startExecutionPolling() {
  actionExecutionIntervalHandle = setInterval(async () => {
    try {
      await actionController.executeNextAction();
    } catch (error) {
      console.error('Error while executeNextAction: ', error);
    }
  }, ACTION_EXECUTION_INTERVAL);

  renewActionTypesIntervalHandle = setInterval(async () => {
    try {
      refreshExecutionCredits();
    } catch (error) {
      console.error('Error while refreshExecutionCredits: ', error);
    }
  }, RENEW_ACTION_TYPES_INTERVAL);
}

export function stoptExecutionPolling() {
  if (actionExecutionIntervalHandle) {
    clearInterval(actionExecutionIntervalHandle);
    actionExecutionIntervalHandle = undefined;
  }

  if (renewActionTypesIntervalHandle) {
    clearInterval(renewActionTypesIntervalHandle);
    renewActionTypesIntervalHandle = undefined;
  }
}
