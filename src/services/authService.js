import api from './api';

export const loginWithGoogle = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
};

export const getCurrentUser = async () => {
    try {
        const response = await api.get('/auth/current');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        await api.get('/auth/logout');
        localStorage.removeItem('token');
    } catch (error) {
        throw error;
    }
};