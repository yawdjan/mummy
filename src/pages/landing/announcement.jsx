import React from "react";
import "./announcement.css";

/**
 * Announcement Component - Memorial Obituary Announcement
 * 
 * Displays the formal obituary announcement with:
 * - Ornate gold-framed portrait
 * - Full name, nickname, maiden name
 * - Age at passing
 * - Date and location of passing
 */
export default function Announcement() {
    // Obituary details - update these with actual information
    const deceased = {
        title: "Mrs",
        firstName: "Adriana",
        middleName: "Amy",
        lastName: "Danquah",
        maidenName: "Orleans", 
        nickname: "Aunty Amy",
        
        // Dates
        birthDate: " September, 1974", // Update with actual date
        deathDate: " November 11th, 2025", // Update with actual date
        age: 51, // Update with actual age
        
        // Location
        deathLocation: " Telford, United Kingdom", // Update with actual location
    };

    return (
        <section className="announcement-section" id="announcement">
            {/* Background cross watermark */}
            <div className="announcement-cross" aria-hidden="true" />
            
            {/* Main content container */}
            <div className="announcement-content">
                
                {/* Portrait with ornate frame */}
                <div className="portrait-container">
                    <div className="portrait-frame">
                        <div 
                            className="portrait-image"
                            role="img"
                            aria-label={`Portrait of ${deceased.title} ${deceased.firstName} ${deceased.middleName} ${deceased.lastName}`}
                            // Add actual image path here:
                            // style={{ backgroundImage: 'url(/res/portrait.jpg)' }}
                        />
                    </div>
                    
                    {/* Decorative corner flourishes */}
                    <div className="frame-flourish frame-flourish-tl" />
                    <div className="frame-flourish frame-flourish-tr" />
                    <div className="frame-flourish frame-flourish-bl" />
                    <div className="frame-flourish frame-flourish-br" />
                </div>

                {/* Name and details */}
                <div className="announcement-details">
                    
                    {/* Full Name */}
                    <h1 className="announcement-name">
                        <span className="name-title">{deceased.title}</span>
                        <span className="name-first">{deceased.firstName}</span>
                        <span className="name-full">{deceased.middleName} {deceased.lastName}</span>
                    </h1>

                    {/* Maiden Name */}
                    {deceased.maidenName && (
                        <p className="announcement-maiden">
                            ({deceased.maidenName})
                        </p>
                    )}

                    {/* Nickname */}
                    {deceased.nickname && (
                        <p className="announcement-nickname">
                            "{deceased.nickname}"
                        </p>
                    )}

                    {/* Age */}
                    <p className="announcement-age">
                        Aged {deceased.age} years
                    </p>

                    {/* Divider */}
                    <div className="announcement-divider">
                        <span className="divider-ornament">✦</span>
                    </div>

                    {/* Life Dates */}
                    <div className="announcement-dates">
                        <div className="date-group">
                            <span className="date-label">Sunrise</span>
                            <span className="date-value">{deceased.birthDate}</span>
                        </div>
                        <div className="date-group">
                            <span className="date-label">Sunset</span>
                            <span className="date-value">{deceased.deathDate}</span>
                        </div>
                    </div>

                    {/* Location of Passing */}
                    <p className="announcement-location">
                        <span className="location-label">in</span>
                        <span className="location-value">{deceased.deathLocation}</span>
                    </p>

                </div>
            </div>

            {/* Decorative floral elements */}
            <div className="announcement-decor announcement-decor-left" />
            <div className="announcement-decor announcement-decor-right" />
        </section>
    );
}