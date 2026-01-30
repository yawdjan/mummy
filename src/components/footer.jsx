import React from "react";
import "./footer.css";

/**
 * Footer Component - Site Navigation & Information
 * 
 * Sections:
 * - Core Obituary (main memorial pages)
 * - Service & Events (funeral details)
 * - Multimedia & Guestbook
 * - Contact/Share
 */
export default function Footer() {
    // Navigation sections
    const coreObituary = [
        { text: "Profile", link: "#landing-page" },
        { text: "Announcement", link: "#announcement" },
        { text: "Biography", link: "#biography" },
        { text: "Passions", link: "#passions" },
        { text: "Family Tree", link: "#family-tree" },
        { text: "QR Code", link: "#qr-page" },
    ];

    const serviceEvents = [
        { text: "Order of Service", link: "#order-of-service" },
        { text: "Hymns", link: "#hymns" },
        { text: "Funeral Details", link: "#funeral-details" },
        { text: "Wake Details", link: "#wake-details" },
    ];

    const multimedia = [
        { text: "Photo Gallery", link: "#slideshow-section" },
        { text: "Guest Book", link: "#guestbook" },
        { text: "Video Tributes", link: "#video-tributes" },
        { text: "Tributes", link: "#tributes" },
    ];

    // Scroll to section smoothly
    const handleNavClick = (e, link) => {
        e.preventDefault();
        const targetId = link.replace('#', '');
        const element = document.getElementById(targetId);
        
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Update URL hash
        window.history.pushState(null, '', link);
    };

    return (
        <footer className="site-footer" id="footer">
            {/* Memorial Banner */}
            <div className="footer-banner">
                <p className="banner-text">
                    In Loving Memory of the Late
                    <span className="banner-name">Mrs Adriana Amy Danquah</span>
                </p>
            </div>

            {/* Main Footer Content */}
            <div className="footer-content">
                {/* Logo / Memorial Info */}
                <div className="footer-section footer-memorial">
                    <div className="memorial-badge">
                        <span className="badge-cross">✝</span>
                    </div>
                    <h3 className="memorial-name">Mrs Adriana Amy Danquah</h3>
                    <p className="memorial-dates">1970 — 2024</p>
                    <p className="memorial-quote">"To live is Christ and to die is gain"</p>
                    <p className="memorial-verse">— Philippians 1:21</p>
                </div>

                {/* Navigation Columns */}
                <div className="footer-nav-columns">
                    {/* Core Obituary Links */}
                    <nav className="footer-section footer-nav" aria-label="Core obituary navigation">
                        <h4 className="nav-title">The Obituary</h4>
                        <ul className="nav-list">
                            {coreObituary.map((item, index) => (
                                <li key={index}>
                                    <a 
                                        href={item.link}
                                        onClick={(e) => handleNavClick(e, item.link)}
                                    >
                                        {item.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Service & Events Links */}
                    <nav className="footer-section footer-nav" aria-label="Service and events navigation">
                        <h4 className="nav-title">Service & Events</h4>
                        <ul className="nav-list">
                            {serviceEvents.map((item, index) => (
                                <li key={index}>
                                    <a 
                                        href={item.link}
                                        onClick={(e) => handleNavClick(e, item.link)}
                                    >
                                        {item.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Multimedia & Guestbook Links */}
                    <nav className="footer-section footer-nav" aria-label="Multimedia navigation">
                        <h4 className="nav-title">Multimedia & Tributes</h4>
                        <ul className="nav-list">
                            {multimedia.map((item, index) => (
                                <li key={index}>
                                    <a 
                                        href={item.link}
                                        onClick={(e) => handleNavClick(e, item.link)}
                                    >
                                        {item.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p className="copyright">
                        © {new Date().getFullYear()} In Loving Memory of Mrs Adriana Amy Danquah
                    </p>
                    <p className="created-by">
                        Created with ❤️ by the Danquah Family
                    </p>
                </div>

                {/* Back to Top Button */}
                <button 
                    className="back-to-top"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="Back to top"
                >
                    <span className="top-arrow">↑</span>
                    <span className="top-text">Top</span>
                </button>
            </div>

            {/* Decorative Elements */}
            <div className="footer-decor footer-decor-left" aria-hidden="true" />
            <div className="footer-decor footer-decor-right" aria-hidden="true" />
        </footer>
    );
}