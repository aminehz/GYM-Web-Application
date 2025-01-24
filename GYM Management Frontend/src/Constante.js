export const AUTH_TOKEN = localStorage.getItem('token');
export const AUTH_USER = JSON.parse(localStorage.getItem('user'));
export const axiosHeader = {
  headers: { Authorization: `Basic ${AUTH_TOKEN}` },
};
