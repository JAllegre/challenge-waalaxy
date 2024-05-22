import axios from 'axios';
import { SetColorRequestBody, SetSizeRequestBody } from 'shared/types';
import { API_BASE_URL } from '../constants';

const ACTIONS_API = `${API_BASE_URL}/actions`;

export const postSetColorAction = async (color: string): Promise<void> => {
  try {
    const url = `${ACTIONS_API}/color`;
    const data: SetColorRequestBody = { value: color };

    await axios.post(url, data);
  } catch (error) {
    console.error('Error sending color command:', error);
  }
};

export const postSetSizeAction = async (size: number): Promise<void> => {
  try {
    const url = `${ACTIONS_API}/size`;
    const data: SetSizeRequestBody = { value: size };

    await axios.post(url, data);
  } catch (error) {
    console.error('Error sending size command:', error);
  }
};
