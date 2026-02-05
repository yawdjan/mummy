import React, { useState, useEffect, useCallback } from "react";
import "./slideshow.css";

/**
 * Slideshow Component - Memorial Photo Gallery
 * 
 * Features:
 * - Auto-advancement with pause on hover
 * - Manual navigation with dots and arrows
 * - Smooth fade transitions
 * - Responsive design
 * - Touch/swipe support ready
 */
export default function Slideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Slideshow images - replace src with actual image paths
    const slides = [
        {
            id: 1,
            src: "/res/2019-09-20_b0b4d33f-da2f-ec4d-2e69-632f23455d64-main.jpg",
            alt: "Memorial photo 1",
            caption: "A Beautiful Soul"
        },
        {
            id: 2,
            src: "/res/20241226_155052.jpg",
            alt: "Memorial photo 2",
            caption: "Cherished Memories"
        },
        {
            id: 3,
            src: "/res/IMG_20200705_0058.jpg",
            alt: "Memorial photo 3",
            caption: "Forever in Our Hearts"
        }
    ];

    // Go to next slide
    const nextSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setTimeout(() => setIsTransitioning(false), 600);
    }, [slides.length, isTransitioning]);

    // Go to previous slide
    const prevSlide = useCallback(() => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
        setTimeout(() => setIsTransitioning(false), 600);
    }, [slides.length, isTransitioning]);

    // Go to specific slide
    const goToSlide = (index) => {
        if (isTransitioning || index === currentIndex) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 600);
    };

    // Auto-advance slides
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [isPaused, nextSlide]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") prevSlide();
            if (e.key === "ArrowRight") nextSlide();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [nextSlide, prevSlide]);

    return (
        <section 
            className="slideshow-section" 
            id="slideshow-section"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Section Title */}
            <div className="slideshow-header">
                <h2 className="slideshow-title">Precious Memories</h2>
                <div className="slideshow-divider">
                    <span className="divider-flower">✿</span>
                </div>
            </div>

            {/* Slideshow Container */}
            <div className="slideshow-container">
                {/* Slides */}
                <div className="slides-wrapper">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`slide ${index === currentIndex ? "active" : ""}`}
                        >
                            {/* Image with gold frame */}
                            <div className="slide-frame">
                                <div 
                                    className="slide-image"
                                    style={{ backgroundImage: `url(${slide.src})` }}
                                    role="img"
                                    aria-label={slide.alt}
                                />
                            </div>
                            
                            {/* Caption */}
                            <p className="slide-caption">{slide.caption}</p>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button 
                    className="slide-arrow slide-arrow-prev"
                    onClick={prevSlide}
                    aria-label="Previous slide"
                >
                    <span>‹</span>
                </button>
                <button 
                    className="slide-arrow slide-arrow-next"
                    onClick={nextSlide}
                    aria-label="Next slide"
                >
                    <span>›</span>
                </button>

                {/* Progress Dots */}
                <div className="slide-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`slide-dot ${index === currentIndex ? "active" : ""}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Decorative elements */}
            <div className="slideshow-decor slideshow-decor-left" />
            <div className="slideshow-decor slideshow-decor-right" />
        </section>
    );
}