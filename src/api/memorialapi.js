/**
 * Memorial API Service
 * 
 * Handles all API calls to the backend server
 * for Guestbook and Tributes functionality
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://192.168.100.100:5050/api';

// Generate or retrieve session ID for heart tracking
const getSessionId = () => {
    let sessionId = localStorage.getItem('memorial_session_id');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('memorial_session_id', sessionId);
    }
    return sessionId;
};

// ============================================
// GUESTBOOK API
// ============================================

export const guestbookAPI = {
    /**
     * Get all guestbook messages
     * @param {Object} options - Query options
     * @param {number} options.limit - Number of messages to fetch
     * @param {number} options.offset - Offset for pagination
     * @param {string} options.sort - Sort order (newest, oldest, popular)
     */
    getMessages: async ({ limit = 20, offset = 0, sort = 'newest' } = {}) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/guestbook?limit=${limit}&offset=${offset}&sort=${sort}`
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching guestbook messages:', error);
            throw error;
        }
    },

    /**
     * Get a single guestbook message by ID
     * @param {number} id - Message ID
     */
    getMessage: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/guestbook/${id}`);
            
            if (!response.ok) {
                throw new Error('Message not found');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching message:', error);
            throw error;
        }
    },

    /**
     * Submit a new guestbook message
     * @param {Object} messageData - Message data
     * @param {string} messageData.name - Sender's name
     * @param {string} messageData.email - Sender's email (optional)
     * @param {string} messageData.relationship - Relationship to deceased
     * @param {string} messageData.location - Sender's location (optional)
     * @param {string} messageData.message - The message content
     */
    submitMessage: async (messageData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/guestbook`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to submit message');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error submitting message:', error);
            throw error;
        }
    },

    /**
     * Add a heart/like to a message
     * @param {number} messageId - Message ID to heart
     */
    heartMessage: async (messageId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/guestbook/${messageId}/heart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sessionId: getSessionId() }),
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to heart message');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error hearting message:', error);
            throw error;
        }
    },
};

// ============================================
// TRIBUTES API
// ============================================

export const tributesAPI = {
    /**
     * Get all tributes
     * @param {Object} options - Query options
     * @param {string} options.category - Filter by category
     * @param {boolean} options.featured - Filter for featured only
     * @param {number} options.limit - Number of tributes to fetch
     * @param {number} options.offset - Offset for pagination
     */
    getTributes: async ({ category, featured, limit = 50, offset = 0 } = {}) => {
        try {
            let url = `${API_BASE_URL}/tributes?limit=${limit}&offset=${offset}`;
            
            if (category && category !== 'all') {
                url += `&category=${category}`;
            }
            
            if (featured) {
                url += `&featured=true`;
            }
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Failed to fetch tributes');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching tributes:', error);
            throw error;
        }
    },

    /**
     * Get a single tribute by ID
     * @param {number} id - Tribute ID
     */
    getTribute: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/tributes/${id}`);
            
            if (!response.ok) {
                throw new Error('Tribute not found');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching tribute:', error);
            throw error;
        }
    },

    /**
     * Submit a new tribute
     * @param {Object} tributeData - Tribute data
     */
    submitTribute: async (tributeData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/tributes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tributeData),
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to submit tribute');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error submitting tribute:', error);
            throw error;
        }
    },

    /**
     * Get list of tribute categories with counts
     */
    getCategories: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/tributes/categories/list`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },
};

// ============================================
// STATS API
// ============================================

export const statsAPI = {
    /**
     * Get overall statistics
     */
    getStats: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/stats`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch stats');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching stats:', error);
            throw error;
        }
    },
};

// Export all APIs
const api = {
    guestbook: guestbookAPI,
    tributes: tributesAPI,
    stats: statsAPI,
};

export default api;