import actionController from './controllers/actionController';
import { refreshExecutionCredits } from './controllers/actions/actionKinds';
import {
  ACTION_EXECUTION_INTERVAL,
  RENEW_ACTION_KINDS_INTERVAL,
} from './utils/constants';

let actionExecutionIntervalHandle: NodeJS.Timeout | undefined = undefined;
let renewActionKindsIntervalHandle: NodeJS.Timeout | undefined = undefined;

export function startExecutionPolling() {
  actionExecutionIntervalHandle = setInterval(async () => {
    try {
      await actionController.executeNextAction();
    } catch (error) {
      console.error('Error while executeNextAction: ', error);
    }
  }, ACTION_EXECUTION_INTERVAL);

  renewActionKindsIntervalHandle = setInterval(async () => {
    try {
      refreshExecutionCredits();
    } catch (error) {
      console.error('Error while refreshExecutionCredits: ', error);
    }
  }, RENEW_ACTION_KINDS_INTERVAL);
}

export function stoptExecutionPolling() {
  if (actionExecutionIntervalHandle) {
    clearInterval(actionExecutionIntervalHandle);
    actionExecutionIntervalHandle = undefined;
  }

  if (renewActionKindsIntervalHandle) {
    clearInterval(renewActionKindsIntervalHandle);
    renewActionKindsIntervalHandle = undefined;
  }
}
