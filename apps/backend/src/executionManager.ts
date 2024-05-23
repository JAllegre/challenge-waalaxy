import actionController from './controllers/actionController';
import { refreshExecutionCredits } from './controllers/actions/actionKinds';

const ACTION_EXECUTION_INTERVAL = 15 * 1000; //15 sec
const RENEW_ACTION_KINDS_INTERVAL = 10 * 60 * 1000; //10min

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
