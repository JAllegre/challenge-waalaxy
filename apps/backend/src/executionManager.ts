import actionController from './controllers/actionController';
import { refreshExecutionCredits } from './controllers/actions/actionKinds';

const ACTION_EXECUTION_INTERVAL = 5 * 1000; //15 sec
const RENEW_ACTION_KINDS_INTERVAL = 10 * 60 * 1000; //10min

let actionExecutionIntervalHandle: NodeJS.Timeout | undefined = undefined;
let renewActionKindsIntervalHandle: NodeJS.Timeout | undefined = undefined;

export async function startExecutionPolling() {
  actionExecutionIntervalHandle = setInterval(async () => {
    actionController.executeNextAction();

    console.log('Polling for executions');
  }, ACTION_EXECUTION_INTERVAL);

  renewActionKindsIntervalHandle = setInterval(async () => {
    try {
      refreshExecutionCredits();
    } catch (error) {
      console.error(
        'executionManager.ts',
        'Error renewing action kinds: ',
        error
      );
    }
    console.log('Renewing action kinds');
  }, RENEW_ACTION_KINDS_INTERVAL);
}

export async function stoptExecutionPolling() {
  if (actionExecutionIntervalHandle) {
    clearInterval(actionExecutionIntervalHandle);
    actionExecutionIntervalHandle = undefined;
  }

  if (renewActionKindsIntervalHandle) {
    clearInterval(renewActionKindsIntervalHandle);
    renewActionKindsIntervalHandle = undefined;
  }
}
