import api from './api';

export const getCampaigns = async () => {
    try {
        const response = await api.get('/campaigns');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createCampaign = async (campaignData) => {
    try {
        const response = await api.post('/campaigns', campaignData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCampaignById = async (id) => {
    try {
        const response = await api.get(`/campaigns/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};