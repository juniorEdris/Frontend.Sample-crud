import { TailSpin } from "react-loader-spinner";

export const getUser = (state = '') => {
    let user = state;
    const AT = localStorage.getItem('accessToken');
    return user ? user : AT;
};

export const LoadingComponent = () => {
    return <div className="mt-4 col-12 flex justify-content-center align-items-center ">
            <TailSpin ariaLabel="loading-indicator"  height="100" width="100" color='#007aff' />
        </div>;
}