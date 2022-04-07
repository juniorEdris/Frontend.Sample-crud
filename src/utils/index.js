export const getUser = (state = '') => {
    let user = state;
    const AT = localStorage.getItem('accessToken');
    return user ? user : AT;
};