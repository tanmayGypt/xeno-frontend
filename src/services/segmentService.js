import api from './api';

export const getSegments = async () => {
    try {
        const response = await api.get('/segments');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createSegment = async (segmentData) => {
    try {
        const response = await api.post('/segments', segmentData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const previewSegment = async (rules, ruleLogic) => {
    try {
        const response = await api.post('/segments/preview', { rules, ruleLogic });
        return response.data;
    } catch (error) {
        throw error;
    }
};