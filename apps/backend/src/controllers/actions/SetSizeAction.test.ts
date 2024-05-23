import * as avatar from '../../db/avatar';
import { MAX_EXECUTION_CREDITS } from '../../utils/constants';
import SetSizeAction from './SetSizeAction';

describe('SetSizeAction', () => {
  let setSizeAction: SetSizeAction;

  const updateAvatarSizeMock = jest
    .spyOn(avatar, 'updateAvatarSize')
    .mockImplementation((_c) => Promise.resolve());
  updateAvatarSizeMock.mockResolvedValue(undefined);

  beforeEach(() => {
    setSizeAction = new SetSizeAction();
  });

  it('should update the avatar size in the database', async () => {
    const data = { size: 'blue' };

    const result = await setSizeAction.execute(data);

    expect(updateAvatarSizeMock).toHaveBeenCalledWith(data.size);
    expect(result).toBe(true);
  });

  it('should return false if updating too many times (MAX_EXECUTION_CREDITS)', async () => {
    const data = { size: 'red' };

    const allExecutionPromises: Promise<boolean>[] = [];
    for (let i = 0; i < MAX_EXECUTION_CREDITS; i++) {
      allExecutionPromises.push(setSizeAction.execute(data));
    }
    await Promise.all(allExecutionPromises);
    const result = await setSizeAction.execute(data);

    expect(updateAvatarSizeMock).toHaveBeenCalledWith(data.size);
    expect(result).toBe(false);
  });
});
