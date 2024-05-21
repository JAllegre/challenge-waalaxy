import { SetColorRequestBody, SetSizeRequestBody } from '@common/types';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/actions';

export const postSetColorAction = async (color: string): Promise<void> => {
  const url = `${BASE_URL}/color`;
  const data: SetColorRequestBody = { value: color };

  try {
    await axios.post(url, data);
    console.log('Color command sent successfully');
  } catch (error) {
    console.error('Error sending color command:', error);
  }
};

export const postSetSizeAction = async (size: number): Promise<void> => {
  const url = `${BASE_URL}/size`;
  const data: SetSizeRequestBody = { value: size };

  try {
    await axios.post(url, data);
    console.log('Size command sent successfully');
  } catch (error) {
    console.error('Error sending size command:', error);
  }
};
