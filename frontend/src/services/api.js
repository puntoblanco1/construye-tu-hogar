// API URL - Railway URL
const API_URL = process.env.REACT_APP_API_URL || 'https://terrific-upliftment-production.up.railway.app';

// Create Lead (من Contact Form → Notion)
export const createLead = async (leadData) => {
  try {
    const response = await fetch(`${API_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
};

// Health Check
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    return { status: 'ERROR', notion_connected: false };
  }
};
