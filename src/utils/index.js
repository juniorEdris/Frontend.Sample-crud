import Axios from 'axios';
import { TailSpin } from "react-loader-spinner";


export const DOMAIN = `http://localhost:5000/`;

let BaseApi = Axios.create({
  baseURL: DOMAIN,
});

export const API = () => {
  const authToken = localStorage.getItem('accessToken');
  if (authToken) {
    BaseApi.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  }
  return BaseApi;
};


export const getUser = (state = '') => {
    let user = state;
    const AT = localStorage.getItem('accessToken');
    return user ? user : AT;
};

export const LoadingComponent = () => {
    return <div className="mt-4 col-12 flex justify-content-center align-items-center ">
            <TailSpin ariaLabel="loading-indicator"  height="100" width="100" color='#007aff' />
        </div>;
};

export const btnLoading = () => {
    return <div className="spinner-border text-light" role="status">
        <span className="sr-only">Loading...</span>
    </div>;
};

