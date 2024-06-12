// src/api.js

import axios from 'axios';

const API_URL = 'https://hvl-eva-test.azurewebsites.net/api';
const JWT_SECRET = '5c46b60c-036d-4ed1-9c9e-0a78c51a6e62';

export const generateToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/generate_token`, {
      secret: JWT_SECRET,
    });
    return response.data.token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
};

export const getSecureData = async (token, endpoint) => {
  try {
    const response = await axios.get(`${API_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// New function to fetch organization units
export const fetchOrganizationUnits = async (token) => {
  return getSecureData(token, 'organization_units/orgtree');
};
