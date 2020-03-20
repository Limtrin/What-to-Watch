import axios from "axios";

const Error = {
  UNAUTHORIZED: 401
};


export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const returnSuccess = (response) => {
    return response;
  };

  const returnFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();
      throw err;
    }
  };

  api.interceptors.response.use(returnSuccess, returnFail);

  return api;
};

export default createAPI;
