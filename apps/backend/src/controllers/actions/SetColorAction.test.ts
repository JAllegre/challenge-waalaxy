import * as avatar from '../../db/avatar';
import { MAX_EXECUTION_CREDITS } from '../../utils/constants';
import SetColorAction from './SetColorAction';

//jest.mock('../../db/avatar.ts');
describe('SetColorAction', () => {
  let setColorAction: SetColorAction;

  const updateAvatarColorMock = jest
    .spyOn(avatar, 'updateAvatarColor')
    .mockImplementation((_c) => Promise.resolve());
  updateAvatarColorMock.mockResolvedValue(undefined);

  beforeEach(() => {
    setColorAction = new SetColorAction();
  });

  it('should update the avatar color in the database', async () => {
    const data = { color: 'blue' };

    const result = await setColorAction.execute(data);

    expect(updateAvatarColorMock).toHaveBeenCalledWith(data.color);
    expect(result).toBe(true);
  });

  it('should return false if updating too many times (MAX_EXECUTION_CREDITS)', async () => {
    const data = { color: 'red' };

    const allExecutionPromises: Promise<boolean>[] = [];
    for (let i = 0; i < MAX_EXECUTION_CREDITS; i++) {
      allExecutionPromises.push(setColorAction.execute(data));
    }
    await Promise.all(allExecutionPromises);
    const result = await setColorAction.execute(data);

    expect(updateAvatarColorMock).toHaveBeenCalledWith(data.color);
    expect(result).toBe(false);
  });
});
