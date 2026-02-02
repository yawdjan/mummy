import React, { useState, useEffect, useCallback } from "react";
import { tributesAPI } from "../../api/memorialapi";
import "./tributes.css";

/**
 * Tributes Component - Family & Friends Tributes
 * 
 * Features:
 * - Category filtering (Family, Church, Colleagues, etc.)
 * - Featured tributes highlighting
 * - Fullscreen reading mode
 * - Submit new tributes
 * - Connected to backend API
 */

// Format date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

// Category configuration
const categories = [
    { id: 'all', label: 'All Tributes', icon: '💐' },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { id: 'church', label: 'Church Family', icon: '⛪' },
    { id: 'colleagues', label: 'Colleagues', icon: '💼' },
    { id: 'friends', label: 'Friends', icon: '🤝' },
    { id: 'general', label: 'Others', icon: '💝' },
];

// Single Tribute Card Component
const TributeCard = ({ tribute, onReadMore }) => {
    const isLong = tribute.message.length > 300;
    const preview = isLong ? tribute.message.slice(0, 300) + '...' : tribute.message;
    
    return (
        <article className={`tribute-card ${tribute.featured ? 'featured' : ''}`}>
            {tribute.featured && (
                <div className="featured-badge">
                    <span className="badge-icon">⭐</span>
                    <span>Featured</span>
                </div>
            )}
            
            <header className="tribute-header">
                <div className="tribute-avatar">
                    {tribute.image_url ? (
                        <img src={tribute.image_url} alt={tribute.name} />
                    ) : (
                        <span className="avatar-icon">
                            {tribute.relationship === 'Spouse' ? '💑' : 
                             tribute.relationship === 'Children' ? '👨‍👩‍👧‍👦' :
                             tribute.relationship === 'Church Family' ? '⛪' :
                             tribute.relationship === 'Colleagues' ? '💼' : '💝'}
                        </span>
                    )}
                </div>
                <div className="tribute-meta">
                    <h3 className="tribute-name">{tribute.name}</h3>
                    <p className="tribute-relationship">
                        {tribute.relationship_detail || tribute.relationship}
                    </p>
                    {tribute.location && (
                        <p className="tribute-location">📍 {tribute.location}</p>
                    )}
                </div>
            </header>
            
            {tribute.title && (
                <h4 className="tribute-title">"{tribute.title}"</h4>
            )}
            
            <div className="tribute-preview">
                <p>{preview}</p>
            </div>
            
            <footer className="tribute-footer">
                <time className="tribute-date" dateTime={tribute.created_at}>
                    {formatDate(tribute.created_at)}
                </time>
                <button 
                    className="read-more-btn"
                    onClick={() => onReadMore(tribute)}
                >
                    Read Full Tribute
                    <span className="btn-arrow">→</span>
                </button>
            </footer>
        </article>
    );
};

// Fullscreen Tribute Reader Modal
const TributeReader = ({ tribute, onClose, onPrev, onNext, hasPrev, hasNext }) => {
    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowLeft':
                    if (hasPrev) onPrev();
                    break;
                case 'ArrowRight':
                    if (hasNext) onNext();
                    break;
                default:
                    break;
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose, onPrev, onNext, hasPrev, hasNext]);
    
    return (
        <div className="tribute-reader-overlay" onClick={onClose}>
            <div className="tribute-reader" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button className="reader-close" onClick={onClose} aria-label="Close">
                    ✕
                </button>
                
                {/* Navigation */}
                <button 
                    className="reader-nav reader-prev"
                    onClick={onPrev}
                    disabled={!hasPrev}
                    aria-label="Previous tribute"
                >
                    ‹
                </button>
                <button 
                    className="reader-nav reader-next"
                    onClick={onNext}
                    disabled={!hasNext}
                    aria-label="Next tribute"
                >
                    ›
                </button>
                
                {/* Content */}
                <div className="reader-content">
                    <header className="reader-header">
                        <div className="reader-avatar">
                            {tribute.image_url ? (
                                <img src={tribute.image_url} alt={tribute.name} />
                            ) : (
                                <span className="avatar-icon">
                                    {tribute.relationship === 'Spouse' ? '💑' : 
                                     tribute.relationship === 'Children' ? '👨‍👩‍👧‍👦' :
                                     tribute.relationship === 'Church Family' ? '⛪' :
                                     tribute.relationship === 'Colleagues' ? '💼' : '💝'}
                                </span>
                            )}
                        </div>
                        <div className="reader-meta">
                            <h2 className="reader-name">{tribute.name}</h2>
                            <p className="reader-relationship">
                                {tribute.relationship_detail || tribute.relationship}
                            </p>
                        </div>
                    </header>
                    
                    {tribute.title && (
                        <h3 className="reader-title">"{tribute.title}"</h3>
                    )}
                    
                    <div className="reader-body">
                        {tribute.message.split('\n').map((paragraph, index) => (
                            paragraph.trim() && (
                                <p key={index}>{paragraph}</p>
                            )
                        ))}
                    </div>
                    
                    <footer className="reader-footer">
                        <time dateTime={tribute.created_at}>
                            {formatDate(tribute.created_at)}
                        </time>
                        <span className="reader-icon">🕊️</span>
                    </footer>
                </div>
            </div>
        </div>
    );
};

// Tribute Form Modal
const TributeForm = ({ onClose, onSubmit, isSubmitting }) => {
    const [formData, setFormData] = useState({
        name: '',
        relationship: '',
        relationship_detail: '',
        location: '',
        title: '',
        message: '',
        category: 'general',
    });
    
    const relationshipOptions = [
        "Spouse",
        "Children",
        "Sibling",
        "Parent",
        "Extended Family",
        "Church Family",
        "Church Leader",
        "Colleague",
        "Friend",
        "Neighbor",
        "Other",
    ];
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };
    
    return (
        <div className="tribute-form-overlay" onClick={onClose}>
            <div className="tribute-form-modal" onClick={(e) => e.stopPropagation()}>
                <div className="form-modal-header">
                    <h3>Submit Your Tribute</h3>
                    <button 
                        className="close-modal-btn" 
                        onClick={onClose}
                        aria-label="Close form"
                    >
                        ✕
                    </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="tribute-name">Your Name *</label>
                            <input
                                type="text"
                                id="tribute-name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="tribute-relationship">Relationship *</label>
                            <select
                                id="tribute-relationship"
                                name="relationship"
                                value={formData.relationship}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select relationship</option>
                                {relationshipOptions.map((rel, index) => (
                                    <option key={index} value={rel}>{rel}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="tribute-detail">Relationship Detail (Optional)</label>
                            <input
                                type="text"
                                id="tribute-detail"
                                name="relationship_detail"
                                value={formData.relationship_detail}
                                onChange={handleChange}
                                placeholder="e.g., 'Her eldest daughter'"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="tribute-location">Location (Optional)</label>
                            <input
                                type="text"
                                id="tribute-location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="City, Country"
                            />
                        </div>
                        
                        <div className="form-group full-width">
                            <label htmlFor="tribute-title">Tribute Title (Optional)</label>
                            <input
                                type="text"
                                id="tribute-title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., 'To My Beloved Mother'"
                            />
                        </div>
                        
                        <div className="form-group full-width">
                            <label htmlFor="tribute-message">Your Tribute *</label>
                            <textarea
                                id="tribute-message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Share your memories, stories, and tributes..."
                                rows={10}
                                required
                                minLength={50}
                            />
                            <span className="char-hint">
                                Minimum 50 characters. Tell your story - there's no maximum limit.
                            </span>
                        </div>
                        
                        <div className="form-group full-width">
                            <label htmlFor="tribute-category">Category</label>
                            <select
                                id="tribute-category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="family">Family</option>
                                <option value="church">Church Family</option>
                                <option value="colleagues">Colleagues</option>
                                <option value="friends">Friends</option>
                                <option value="general">Other</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-modal-actions">
                        <button 
                            type="button" 
                            className="cancel-btn"
                            onClick={onClose}
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
                                    Submit Tribute
                                    <span>💐</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Main Tributes Component
export default function Tributes() {
    const [tributes, setTributes] = useState([]);
    const [totalTributes, setTotalTributes] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedTribute, setSelectedTribute] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    
    // Fetch tributes from API
    const fetchTributes = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const data = await tributesAPI.getTributes({
                category: activeCategory === 'all' ? null : activeCategory,
                limit: 50
            });
            
            setTributes(data.tributes);
            setTotalTributes(data.total);
        } catch (err) {
            setError('Failed to load tributes. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [activeCategory]);
    
    // Initial fetch and refetch on category change
    useEffect(() => {
        fetchTributes();
    }, [fetchTributes]);
    
    // Handle reading a tribute
    const handleReadMore = (tribute) => {
        const index = tributes.findIndex(t => t.id === tribute.id);
        setSelectedTribute(tribute);
        setSelectedIndex(index);
    };
    
    // Navigation in reader
    const goToPrevTribute = () => {
        if (selectedIndex > 0) {
            const newIndex = selectedIndex - 1;
            setSelectedIndex(newIndex);
            setSelectedTribute(tributes[newIndex]);
        }
    };
    
    const goToNextTribute = () => {
        if (selectedIndex < tributes.length - 1) {
            const newIndex = selectedIndex + 1;
            setSelectedIndex(newIndex);
            setSelectedTribute(tributes[newIndex]);
        }
    };
    
    // Close reader
    const closeReader = () => {
        setSelectedTribute(null);
        setSelectedIndex(null);
    };
    
    // Handle form submission
    const handleSubmitTribute = async (formData) => {
        setIsSubmitting(true);
        
        try {
            const newTribute = await tributesAPI.submitTribute(formData);
            
            // Add to list if in current category or all
            if (activeCategory === 'all' || activeCategory === formData.category) {
                setTributes(prev => [newTribute, ...prev]);
                setTotalTributes(prev => prev + 1);
            }
            
            setShowForm(false);
            setSubmitSuccess(true);
            
            setTimeout(() => setSubmitSuccess(false), 5000);
        } catch (err) {
            alert(err.message || 'Failed to submit tribute. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Get featured tributes
    const featuredTributes = tributes.filter(t => t.featured);
    const regularTributes = tributes.filter(t => !t.featured);
    
    return (
        <div className="tributes-section" id="tributes">
            {/* Section Header */}
            <header className="tributes-header">
                <h2 className="tributes-title">
                    <span className="title-script">Heartfelt</span>
                    <span className="title-main">Tributes</span>
                </h2>
                <p className="tributes-subtitle">
                    Words of love and remembrance from family, friends, and loved ones
                </p>
                
                {/* Stats */}
                <div className="tributes-stats">
                    <span className="stat-count">{totalTributes}</span>
                    <span className="stat-label">Tributes Shared</span>
                </div>
            </header>
            
            {/* Success Message */}
            {submitSuccess && (
                <div className="submit-success">
                    <span className="success-icon">✓</span>
                    <p>Thank you for your beautiful tribute. It has been added to the collection.</p>
                </div>
            )}
            
            {/* Add Tribute Button */}
            <button 
                className="add-tribute-btn"
                onClick={() => setShowForm(true)}
            >
                <span className="btn-icon">💐</span>
                <span>Share Your Tribute</span>
            </button>
            
            {/* Category Filters */}
            <div className="category-filters">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        <span className="cat-icon">{cat.icon}</span>
                        <span className="cat-label">{cat.label}</span>
                    </button>
                ))}
            </div>
            
            {/* Loading State */}
            {isLoading && (
                <div className="loading-state">
                    <span className="spinner large"></span>
                    <p>Loading tributes...</p>
                </div>
            )}
            
            {/* Error State */}
            {error && !isLoading && (
                <div className="error-state">
                    <span className="error-icon">⚠️</span>
                    <p>{error}</p>
                    <button onClick={fetchTributes}>Try Again</button>
                </div>
            )}
            
            {/* Tributes Grid */}
            {!isLoading && !error && (
                <>
                    {/* Featured Tributes */}
                    {featuredTributes.length > 0 && activeCategory === 'all' && (
                        <section className="featured-tributes">
                            <h3 className="section-label">Featured Tributes</h3>
                            <div className="tributes-grid featured-grid">
                                {featuredTributes.map(tribute => (
                                    <TributeCard
                                        key={tribute.id}
                                        tribute={tribute}
                                        onReadMore={handleReadMore}
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                    
                    {/* Regular Tributes */}
                    <section className="regular-tributes">
                        {activeCategory === 'all' && featuredTributes.length > 0 && (
                            <h3 className="section-label">More Tributes</h3>
                        )}
                        <div className="tributes-grid">
                            {regularTributes.map(tribute => (
                                <TributeCard
                                    key={tribute.id}
                                    tribute={tribute}
                                    onReadMore={handleReadMore}
                                />
                            ))}
                        </div>
                    </section>
                    
                    {/* Empty State */}
                    {tributes.length === 0 && (
                        <div className="empty-state">
                            <span className="empty-icon">💐</span>
                            <p>No tributes in this category yet.</p>
                            <button onClick={() => setShowForm(true)}>
                                Be the first to share
                            </button>
                        </div>
                    )}
                </>
            )}
            
            {/* Tribute Reader Modal */}
            {selectedTribute && (
                <TributeReader
                    tribute={selectedTribute}
                    onClose={closeReader}
                    onPrev={goToPrevTribute}
                    onNext={goToNextTribute}
                    hasPrev={selectedIndex > 0}
                    hasNext={selectedIndex < tributes.length - 1}
                />
            )}
            
            {/* Tribute Form Modal */}
            {showForm && (
                <TributeForm
                    onClose={() => setShowForm(false)}
                    onSubmit={handleSubmitTribute}
                    isSubmitting={isSubmitting}
                />
            )}
            
            {/* Decorative Elements */}
            <div className="tributes-decor tributes-decor-left" aria-hidden="true" />
            <div className="tributes-decor tributes-decor-right" aria-hidden="true" />
        </div>
    );
}