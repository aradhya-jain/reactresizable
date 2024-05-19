import axios from 'axios';

const API_URL = 'http://localhost:4040/api'; // Update this if your backend is hosted elsewhere

interface Data {
  id: string;
  name: string;
}

interface Count {
  add: number;
  update: number;
}

export const addData = async (data: Data): Promise<void> => {
  try {
    await axios.post(`${API_URL}/add`, data);
  } catch (error) {
    console.error("There was an error adding the data!", error);
  }
};

export const updateData = async (id: string, data: Partial<Data>): Promise<void> => {
  try {
    await axios.put(`${API_URL}/update/${id}`, data);
  } catch (error) {
    console.error("There was an error updating the data!", error);
  }
};

export const getCount = async (): Promise<Count> => {
  try {
    const response = await axios.get<Count>(`${API_URL}/count`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the count!", error);
    return { add: 0, update: 0 };
  }
};