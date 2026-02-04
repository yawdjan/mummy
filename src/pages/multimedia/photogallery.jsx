/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from "react";
import "./photogallery.css";
import Guestbook from "./guestbook.jsx";
import Tributes from "./tributes.jsx";

/**
 * PhotoGallery Component - Horizontal Scrolling Memorial Gallery
 * 
 * Features:
 * - Horizontal scroll layout
 * - Drag to scroll support
 * - Scroll arrows navigation
 * - Fullscreen modal with navigation
 * - Video support
 * - Lazy loading
 * - Keyboard navigation
 */

// Sample media data - Replace with actual photos/videos
const generateSampleMedia = () => {
    const media = [];

    // Unsplash photo IDs for variety
    const unsplashIds = [
        'photo-1529156069898-49953e39b3ac', // Family gathering
        'photo-1511895426328-dc8714191300', // Celebration
        'photo-1516589091380-5d8e87df6999', // Happy moments
        'photo-1529333166437-7750a6dd5a70', // Family portrait
        'photo-1517457373958-b7bdd4587205', // Outdoor gathering
        'photo-1504439468489-c8920d796a29', // Church
        'photo-1523050854058-8df90110c9f1', // Graduation
        'photo-1469371670807-013ccf25f16a', // Wedding
        'photo-1507003211169-0a1dd7228f2d', // Portrait
        'photo-1494790108377-be9c29b29330', // Woman portrait
        'photo-1517841905240-472988babdf9', // Portrait
        'photo-1438761681033-6461ffad8d80', // Smiling woman
        'photo-1472099645785-5658abf4ff4e', // Man portrait
        'photo-1534528741775-53994a69daeb', // Portrait
        'photo-1501196354995-cbb51c65adc3', // Family
        'photo-1542596768-5d1d21f1cf98', // Portrait
        'photo-1544005313-94ddf0286df2', // Portrait
        'photo-1531746020798-e6953c6e8e04', // Portrait
        'photo-1500648767791-00dcc994a43e', // Portrait
        'photo-1506794778202-cad84cf45f1d', // Portrait
    ];

    // Generate 100 sample items
    for (let i = 1; i <= 100; i++) {
        const isVideo = i % 20 === 0; // Every 20th item is a video
        const photoId = unsplashIds[i % unsplashIds.length];

        // Vary the sizes for visual interest
        const sizes = ['small', 'medium', 'large', 'tall', 'wide'];
        const size = sizes[i % sizes.length];

        if (isVideo) {
            media.push({
                id: i,
                type: 'video',
                thumbnail: `https://images.unsplash.com/${photoId}?w=400&h=300&fit=crop`,
                src: 'https://www.w3schools.com/html/mov_bbb.mp4',
                caption: `Video Memory ${Math.ceil(i / 20)}`,
                date: `${2015 + Math.floor(Math.random() * 10)}`,
                size: 'medium',
            });
        } else {
            media.push({
                id: i,
                type: 'photo',
                thumbnail: `https://images.unsplash.com/${photoId}?w=600&h=400&fit=crop&q=80`,
                src: `https://images.unsplash.com/${photoId}?w=1920&h=1080&fit=crop&q=90`,
                caption: `Memory #${i}`,
                date: `${2015 + Math.floor(Math.random() * 10)}`,
                size: size,
            });
        }
    }

    return media;
};

// Lazy loaded media item component
const MediaItem = ({ item, index, onClick, isVisible }) => {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    // Base URL for your VPS
    const BASE_URL = "http://192.168.100.100:5050";

    return (
        <div
            className={`gallery-item ${item.type} ${item.size} ${loaded ? 'loaded' : 'loading'}`}
            onClick={() => onClick(index)}
        // ... accessibility props
        >
            {!loaded && !error && <div className="item-skeleton"><div className="skeleton-shimmer" /></div>}

            {isVisible && (
                item.type === 'photo' ? (
                    <img
                        src={`${BASE_URL}${item.thumbnail}`}
                        alt={item.caption}
                        loading="lazy"
                        onLoad={() => setLoaded(true)}
                        onError={() => setError(true)}
                        style={{ opacity: loaded ? 1 : 0 }}
                    />
                ) : (
                    /* VIDEO THUMBNAIL TRICK */
                    <video
                        src={`${BASE_URL}${item.src}#t=0.1`} // #t=0.1 tells browser to load the first second
                        onLoadedData={() => setLoaded(true)}
                        onError={() => setError(true)}
                        style={{ opacity: loaded ? 1 : 0, objectFit: 'cover', width: '100%', height: '100%' }}
                        muted
                        playsInline
                        preload="metadata"
                    />
                )
            )}

            {item.type === 'video' && (
                <div className="video-indicator">
                    <span className="play-icon">▶</span>
                </div>
            )}

            <div className="item-overlay">
                <span className="item-caption">{item.caption}</span>
                <span className="item-date">{item.date}</span>
            </div>
        </div>
    );
};

// Fullscreen Modal Component
const FullscreenModal = ({
    media,
    currentIndex,
    onClose,
    onPrev,
    onNext,
    onIndexChange
}) => {
    const videoRef = useRef(null);
    // const touchStartX = useRef(0);
    // const touchEndX = useRef(0);

    const currentItem = media[currentIndex];

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowLeft':
                    onPrev();
                    break;
                case 'ArrowRight':
                    onNext();
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
    }, [onClose, onPrev, onNext]);

    // // Handle touch swipe
    // const handleTouchStart = (e) => {
    //     touchStartX.current = e.touches[0].clientX;
    // };

    // const handleTouchMove = (e) => {
    //     touchEndX.current = e.touches[0].clientX;
    // };

    // const handleTouchEnd = () => {
    //     const diff = touchStartX.current - touchEndX.current;
    //     const threshold = 50;

    //     if (diff > threshold) {
    //         onNext();
    //     } else if (diff < -threshold) {
    //         onPrev();
    //     }
    // };

    return (
        <div
            className="fullscreen-modal"
            onClick={onClose}
        // onTouchStart={handleTouchStart}
        // onTouchMove={handleTouchMove}
        // onTouchEnd={handleTouchEnd}
        >
            {/* Close button */}
            <button
                className="modal-close"
                onClick={onClose}
                aria-label="Close fullscreen view"
            >
                ✕
            </button>

            {/* Navigation arrows */}
            <button
                className="modal-nav modal-prev"
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                aria-label="Previous image"
                disabled={currentIndex === 0}
            >
                ‹
            </button>

            <button
                className="modal-nav modal-next"
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                aria-label="Next image"
                disabled={currentIndex === media.length - 1}
            >
                ›
            </button>

            {/* Media content */}
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                {currentItem.type === 'photo' ? (
                    <img
                        src={`http://192.168.100.100:5050${currentItem.src}`}
                        alt={currentItem.caption}
                        className="modal-image"
                    />
                ) : (
                    <div className="modal-video-container">
                        <video
                            ref={videoRef}
                            src={`http://192.168.100.100:5050${currentItem.src}`}
                            className="modal-video"
                            controls
                            autoPlay
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}

                {/* Caption */}
                <div className="modal-caption">
                    <span className="caption-text">{currentItem.caption}</span>
                    <span className="caption-date">{currentItem.date}</span>
                    <span className="caption-counter">
                        {currentIndex + 1} / {media.length}
                    </span>
                </div>
            </div>

            {/* Thumbnail strip */}
            <div className="modal-thumbnails">
                <div className="thumbnails-track">
                    {media.slice(
                        Math.max(0, currentIndex - 5),
                        Math.min(media.length, currentIndex + 6)
                    ).map((item, idx) => {
                        const actualIndex = Math.max(0, currentIndex - 5) + idx;
                        if (item.type !== 'photo') {
                            return (
                                <button
                                    key={item.id}
                                    className={`thumbnail-item ${actualIndex === currentIndex ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onIndexChange(actualIndex);
                                    }}
                                >
                                    <img src={`http://192.168.100.100:5050${item.src}#t=0.1`} alt="" />
                                </button>
                            );
                        } else {
                            return (
                                <button
                                    key={item.id}
                                    className={`thumbnail-item ${actualIndex === currentIndex ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onIndexChange(actualIndex);
                                    }}
                                >
                                    <img src={`http://192.168.100.100:5050${item.thumbnail}`} alt="" />
                                </button>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default function PhotoGallery() {
    const [media, setMedia] = useState([]);
    const [visibleCount, setVisibleCount] = useState(20); // Pagination limit
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const [filter, setFilter] = useState('all');
    // ... your existing scroll logic states ...
    const scrollContainerRef = useRef(null);

    // DYNAMIC FETCHING LOGIC
    useEffect(() => {
        const loadMedia = async () => {
            try {
                const response = await fetch('http://192.168.100.100:5050/api/media');
                const data = await response.json();
                setMedia(data);
            } catch (error) {
                console.error("Failed to scout media:", error);
            } finally {
                setLoading(false);
            }
        };
        loadMedia();
    }, []);

    const filteredMedia = media.filter(item => {
        if (filter === 'all') return true;
        return item.type === (filter === 'photos' ? 'photo' : 'video');
    });

    // Handle "Load More" as user scrolls or clicks
    const loadMore = () => setVisibleCount(prev => prev + 20);

    // Update arrow visibility based on scroll position
    const updateArrows = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setShowLeftArrow(scrollLeft > 10);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }, []);

    // Scroll handlers
    const handleScroll = () => {
        updateArrows();
    };

    // Arrow click handlers
    const scrollByAmount = (direction) => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const scrollAmount = container.clientWidth * 0.8;
        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    };

    // Mouse drag handlers
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
        scrollContainerRef.current.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5; // Scroll speed multiplier
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };


    const handleMouseUp = () => {
        setIsDragging(false);
        if (scrollContainerRef.current) {
            scrollContainerRef.current.style.cursor = 'grab';
        }
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            scrollContainerRef.current.style.cursor = 'grab';
        }
    };

    // Initialize arrow visibility
    useEffect(() => {
        updateArrows();
        window.addEventListener('resize', updateArrows);
        return () => window.removeEventListener('resize', updateArrows);
    }, [updateArrows, filteredMedia]);

    // Navigation handlers
    const openFullscreen = useCallback((index) => {
        if (!isDragging) {
            setSelectedIndex(index);
        }
    }, [isDragging]);


    const closeFullscreen = useCallback(() => {
        setSelectedIndex(null);
    }, []);

    const goToPrev = useCallback(() => {
        setSelectedIndex(prev => Math.max(0, prev - 1));
    }, []);

    const goToNext = useCallback(() => {
        setSelectedIndex(prev => Math.min(filteredMedia.length - 1, prev + 1));
    }, [filteredMedia.length]);

    const goToIndex = useCallback((index) => {
        setSelectedIndex(index);
    }, []);


    // Stats
    const photoCount = media.filter(m => m.type === 'photo').length;
    const videoCount = media.filter(m => m.type === 'video').length;

    if (loading) return <div className="loading-state">Gathering memories...</div>;

    return (
        <div className="pre-photo-gallery-page">
            <div className="photo-gallery-page" id="photo-gallery-page">

                {/* Gallery Header */}
                <header className="gallery-header">
                    <h2 className="gallery-title">
                        <span className="title-script">Precious</span>
                        <span className="title-main">Memories</span>
                    </h2>
                    <p className="gallery-subtitle">
                        A collection of cherished moments with Mrs Adriana Amy Danquah
                    </p>

                    {/* Stats */}
                    <div className="gallery-stats">
                        <span className="stat">
                            <span className="stat-icon">📷</span>
                            <span className="stat-count">{photoCount}</span>
                            <span className="stat-label">Photos</span>
                        </span>
                        <span className="stat">
                            <span className="stat-icon">🎬</span>
                            <span className="stat-count">{videoCount}</span>
                            <span className="stat-label">Videos</span>
                        </span>
                    </div>

                    {/* Filter tabs */}
                    <div className="gallery-filters">
                        <button
                            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={`filter-btn ${filter === 'photos' ? 'active' : ''}`}
                            onClick={() => setFilter('photos')}
                        >
                            Photos
                        </button>
                        <button
                            className={`filter-btn ${filter === 'videos' ? 'active' : ''}`}
                            onClick={() => setFilter('videos')}
                        >
                            Videos
                        </button>
                    </div>
                </header>

                {/* Horizontal Scroll Gallery */}
                <div className="gallery-container">
                    {/* Left Arrow */}
                    <button
                        className={`scroll-arrow scroll-arrow-left ${showLeftArrow ? 'visible' : ''}`}
                        onClick={() => scrollByAmount('left')}
                        aria-label="Scroll left"
                    >
                        ‹
                    </button>

                    <div className="gallery-container">
                        <div
                            className={`gallery-scroll ${isDragging ? 'dragging' : ''}`}
                            ref={scrollContainerRef}
                            onScroll={handleScroll}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="gallery-track">
                                {/* ONLY RENDER THE VISIBLE SLICE */}
                                {filteredMedia.slice(0, visibleCount).map((item, index) => (
                                    <MediaItem
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        onClick={(idx) => setSelectedIndex(idx)}
                                        isVisible={true}
                                    />
                                ))}

                                {visibleCount < filteredMedia.length && (
                                    <button className="load-more-card" onClick={loadMore}>
                                        <span>+</span>
                                        <p>Load More</p>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Arrow */}
                    <button
                        className={`scroll-arrow scroll-arrow-right ${showRightArrow ? 'visible' : ''}`}
                        onClick={() => scrollByAmount('right')}
                        aria-label="Scroll right"
                    >
                        ›
                    </button>
                </div>

                {/* Scroll hint */}
                <p className="scroll-hint">
                    <span className="hint-icon">👆</span>
                    Drag or use arrows to explore • Click to expand
                </p>

                {/* Empty state */}
                {filteredMedia.length === 0 && (
                    <div className="gallery-empty">
                        <span className="empty-icon">📷</span>
                        <p>No {filter === 'videos' ? 'videos' : 'photos'} found</p>
                    </div>
                )}

                {/* Fullscreen Modal Logic */}
                {selectedIndex !== null && (
                    <FullscreenModal
                        media={filteredMedia}
                        currentIndex={selectedIndex}
                        onClose={() => setSelectedIndex(null)}
                        onPrev={() => setSelectedIndex(s => Math.max(0, s - 1))}
                        onNext={() => setSelectedIndex(s => Math.min(filteredMedia.length - 1, s + 1))}
                        onIndexChange={(idx) => setSelectedIndex(idx)}
                    />
                )}
            </div>
            {/* Guestbook Section */}
            <Guestbook />
            {/* Tributes Section */}
            <Tributes />
        </div>
    );
}