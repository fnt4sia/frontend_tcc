import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bpwindonesia-be-938071808488.europe-west1.run.app/api',
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post(
          'https://bpwindonesia-be-938071808488.europe-west1.run.app/api/users/refresh-token',
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshRes.data.accessToken;
        localStorage.setItem('access_token', newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // retry original request
      } catch (err) {
        console.error('Refresh failed', err);
        localStorage.clear();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;