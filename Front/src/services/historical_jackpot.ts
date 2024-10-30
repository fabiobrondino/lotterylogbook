import api from './api';

export const fetchLastResult = async () => {
  const response = await api.get('/history/result');
  return response.data;
};

export const fetchSpecificResult = async (referenceDate: Date) => {
  const response = await api.post('/history/results', {
    reference_date: referenceDate,
  });
  return response.data;
};

export const setLastResult = async (result: {
  number: number[];
  star: number[];
  reference_date: Date;
}) => {
  const response = await api.post('/history/', { result });
  return response.data;
};
