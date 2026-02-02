import React, { useState, useEffect, useCallback } from "react";
import { guestbookAPI } from "../../api/memorialapi";
import "./guestbook.css";

/**
 * Guestbook Component - Carousel Style
 * 
 * Features:
 * - Shows 3 messages at a time
 * - Scroll navigation with prev/next buttons
 * - Dot indicators for page position
 * - Fetch messages from backend
 * - Submit new messages
 * - Heart/like messages
 */

// Format date to relative time or formatted date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));

    if (diffMinutes < 60) {
        return diffMinutes <= 1 ? 'Just now' : `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
        return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else {
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }
};

// Get initials from name
const getInitials = (name) => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

// Single Message Card Component
const MessageCard = ({ message, onHeart }) => {
    const [expanded, setExpanded] = useState(false);
    const [hasHearted, setHasHearted] = useState(false);
    const [hearts, setHearts] = useState(message.hearts || 0);
    const [isHearting, setIsHearting] = useState(false);

    const isLongMessage = message.message.length > 200;

    // Check if already hearted (from localStorage)
    useEffect(() => {
        const heartedMessages = JSON.parse(localStorage.getItem('hearted_messages') || '[]');
        if (heartedMessages.includes(message.id)) {
            setHasHearted(true);
        }
    }, [message.id]);

    const handleHeart = async () => {
        if (hasHearted || isHearting) return;

        setIsHearting(true);
        try {
            const result = await onHeart(message.id);
            setHearts(result.hearts);
            setHasHearted(true);

            // Store in localStorage
            const heartedMessages = JSON.parse(localStorage.getItem('hearted_messages') || '[]');
            heartedMessages.push(message.id);
            localStorage.setItem('hearted_messages', JSON.stringify(heartedMessages));
        } catch (error) {
            if (error.message.includes('Already')) {
                setHasHearted(true);
            }
        } finally {
            setIsHearting(false);
        }
    };

    return (
        <article className="message-card">
            <div className="message-header">
                <div className="message-avatar">
                    <span className="avatar-initials">{getInitials(message.name)}</span>
                </div>
                <div className="message-meta">
                    <h4 className="message-name">{message.name}</h4>
                    <div className="message-info">
                        <span className="message-relationship">{message.relationship}</span>
                        {message.location && (
                            <>
                                <span className="info-separator">•</span>
                                <span className="message-location">{message.location}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className={`message-content ${expanded ? 'expanded' : ''}`}>
                <p>
                    {isLongMessage && !expanded
                        ? `${message.message.slice(0, 200)}...`
                        : message.message
                    }
                </p>
                {isLongMessage && (
                    <button
                        className="read-more-btn"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'Show less' : 'Read more'}
                    </button>
                )}
            </div>

            <div className="message-footer">
                <time className="message-date" dateTime={message.created_at}>
                    {formatDate(message.created_at)}
                </time>
                <button
                    className={`heart-btn ${hasHearted ? 'hearted' : ''} ${isHearting ? 'loading' : ''}`}
                    onClick={handleHeart}
                    disabled={hasHearted || isHearting}
                    aria-label={hasHearted ? 'Already liked' : 'Like this message'}
                >
                    <span className="heart-icon">{hasHearted ? '❤️' : '🤍'}</span>
                    <span className="heart-count">{hearts}</span>
                </button>
            </div>
        </article>
    );
};

// Main Guestbook Component
export default function Guestbook() {
    const [messages, setMessages] = useState([]);
    const [totalMessages, setTotalMessages] = useState(0);
    const [totalHearts, setTotalHearts] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Carousel state
    const [currentPage, setCurrentPage] = useState(0);
    const MESSAGES_PER_VIEW = 3;

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        relationship: '',
        location: '',
        message: '',
    });

    // Relationship options
    const relationships = [
        "Family Member",
        "Extended Family",
        "Church Member",
        "Church Leader",
        "Friend",
        "Family Friend",
        "Colleague",
        "Neighbor",
        "Acquaintance",
        "Other",
    ];

    // Calculate pagination
    const totalPages = Math.ceil(messages.length / MESSAGES_PER_VIEW);
    const startIndex = currentPage * MESSAGES_PER_VIEW;
    const visibleMessages = messages.slice(startIndex, startIndex + MESSAGES_PER_VIEW);

    // Fetch all messages from API
    const fetchMessages = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await guestbookAPI.getMessages({
                limit: 100, // Fetch all messages
                offset: 0,
                sort: 'newest'
            });

            setMessages(data.messages);
            setTotalMessages(data.total);

            // Calculate total hearts
            const hearts = data.messages.reduce((sum, msg) => sum + (msg.hearts || 0), 0);
            setTotalHearts(hearts);

        } catch (err) {
            setError('Failed to load messages. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    // // Navigation handlers
    const goToPrevious = () => {
        setCurrentPage(prev => Math.max(0, prev - 1));
    };

    const goToNext = () => {
        setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
    };

    const goToPage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const newMessage = await guestbookAPI.submitMessage(formData);

            // Add to messages list at the beginning
            setMessages(prev => [newMessage, ...prev]);
            setTotalMessages(prev => prev + 1);

            // Go to first page to see new message
            setCurrentPage(0);

            // Reset form
            setFormData({
                name: '',
                email: '',
                relationship: '',
                location: '',
                message: '',
            });

            setIsFormOpen(false);
            setSubmitSuccess(true);

            // Clear success message after 5 seconds
            setTimeout(() => setSubmitSuccess(false), 5000);

        } catch (err) {
            setSubmitError(err.message || 'Failed to submit message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle heart click
    const handleHeart = async (messageId) => {
        const result = await guestbookAPI.heartMessage(messageId);
        setTotalHearts(prev => prev + 1);
        return result;
    };

    return (
        <div className="guestbook-section" id="guestbook">
            {/* Section Header */}
            <header className="guestbook-header">
                <h2 className="guestbook-title">
                    <span className="title-script">Guest</span>
                    <span className="title-main">Book</span>
                </h2>
                <p className="guestbook-subtitle">
                    Share your memories, condolences, and tributes
                </p>

                {/* Stats */}
                <div className="guestbook-stats">
                    <div className="stat">
                        <span className="stat-icon">💬</span>
                        <span className="stat-count">{totalMessages}</span>
                        <span className="stat-label">Messages</span>
                    </div>
                    <div className="stat">
                        <span className="stat-icon">❤️</span>
                        <span className="stat-count">{totalHearts}</span>
                        <span className="stat-label">Hearts</span>
                    </div>
                </div>
            </header>

            {/* Success Message */}
            {submitSuccess && (
                <div className="submit-success">
                    <span className="success-icon">✓</span>
                    <p>Thank you for your message. It has been added to the guestbook.</p>
                </div>
            )}

            {/* Error Message */}
            {submitError && (
                <div className="submit-error">
                    <span className="error-icon">!</span>
                    <p>{submitError}</p>
                </div>
            )}

            {/* Add Message Button / Form */}
            <div className="guestbook-form-container">
                {!isFormOpen ? (
                    <button
                        className="open-form-btn"
                        onClick={() => setIsFormOpen(true)}
                    >
                        <span className="btn-icon">✍️</span>
                        <span>Leave a Message</span>
                    </button>
                ) : (
                    <form className="guestbook-form" onSubmit={handleSubmit}>
                        <div className="form-header">
                            <h3>Share Your Condolences</h3>
                            <button
                                type="button"
                                className="close-form-btn"
                                onClick={() => setIsFormOpen(false)}
                                aria-label="Close form"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="name">Your Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email (Optional)</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="relationship">Relationship *</label>
                                <select
                                    id="relationship"
                                    name="relationship"
                                    value={formData.relationship}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select relationship</option>
                                    {relationships.map((rel, index) => (
                                        <option key={index} value={rel}>{rel}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">Location (Optional)</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder="City, Country"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label htmlFor="message">Your Message *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Share your memories, condolences, or tribute..."
                                    rows={5}
                                    required
                                    minLength={10}
                                    maxLength={1000}
                                />
                                <span className={`char-count ${formData.message.length > 900 ? 'warning' : ''}`}>
                                    {formData.message.length}/1000
                                </span>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() => setIsFormOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <span>Submit Message</span>
                                        <span className="btn-icon">🕊️</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="loading-state">
                    <span className="spinner large"></span>
                    <p>Loading messages...</p>
                </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
                <div className="error-state">
                    <span className="error-icon">⚠️</span>
                    <p>{error}</p>
                    <button onClick={fetchMessages}>Try Again</button>
                </div>
            )}

            {/* Messages Carousel */}
            {!isLoading && !error && messages.length > 0 && (
                <div className="messages-carousel">


                    {/* Messages Container */}
                    <div className="messages-container">
                        <div className="messages-grid">
                            {visibleMessages.map((message) => (
                                <MessageCard
                                    key={message.id}
                                    message={message}
                                    onHeart={handleHeart}
                                />
                            ))}
                        </div>
                    </div>


                </div>
            )}
            {/* Pagination Dots */}
            {!isLoading && !error && totalPages > 1 && (
                <div className="carousel-pagination">
                    {/* Previous Button */}
                    <button
                        className={`carousel-nav carousel-prev ${currentPage === 0 ? 'disabled' : ''}`}
                        onClick={goToPrevious}
                        disabled={currentPage === 0}
                        aria-label="Previous messages"
                    >
                        ‹
                    </button>
                    <div className="pagination-dots">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`pagination-dot ${index === currentPage ? 'active' : ''}`}
                                onClick={() => goToPage(index)}
                                aria-label={`Go to page ${index + 1}`}
                            />
                        ))}
                    </div>
                    <span className="pagination-info">
                        {currentPage + 1} of {totalPages}
                    </span>
                    {/* Next Button */}
                    <button
                        className={`carousel-nav carousel-next ${currentPage >= totalPages - 1 ? 'disabled' : ''}`}
                        onClick={goToNext}
                        disabled={currentPage >= totalPages - 1}
                        aria-label="Next messages"
                    >
                        ›
                    </button>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && messages.length === 0 && (
                <div className="empty-state">
                    <span className="empty-icon">📝</span>
                    <p>No messages yet. Be the first to leave a tribute.</p>
                </div>
            )}

            {/* Decorative Elements */}
            <div className="guestbook-decor guestbook-decor-left" aria-hidden="true" />
            <div className="guestbook-decor guestbook-decor-right" aria-hidden="true" />
        </div>
    );
}