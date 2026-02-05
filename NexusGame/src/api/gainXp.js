import axiosClient from '../AxiosClient.js'
export const gainXpAction = async (actionName) => {
  try {
    const response = await axiosClient.post('/claim-reward', {action: actionName});
    console.log('Du lieu diem:',response.data);
    return response.data;
  }
  catch (err) {
    console.log(err);
  }
}