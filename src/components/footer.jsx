import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./footer.css";

/**
 * Footer Component - Site Navigation & Information
 * 
 * Sections:
 * - Core Obituary (main memorial pages - same page hash links)
 * - Service & Events (separate /events page)
 * - Multimedia & Guestbook
 */
export default function Footer() {
    // eslint-disable-next-line no-unused-vars
    const location = useLocation();
    
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
        { text: "Order of Service", link: "/events#order-of-service" },
        { text: "Hymns", link: "/events#hymns" },
        { text: "Funeral Details", link: "/events#funeral-details" },
        { text: "Wake Details", link: "/events#wake-details" },
    ];

    const multimedia = [
        { text: "Photo Gallery", link: "/gallery#photo-gallery-page" },
        { text: "Guest Book", link: "/gallery#guestbook" },
        { text: "Tributes", link: "/gallery#tributes" },
        { text: "Live Stream", link: "/gallery#live-stream" },
    ];

    // Handle navigation - works for both same-page hash links and cross-page links
    const handleNavClick = (e, link) => {
        // Check if it's a cross-page link (starts with /)
        if (link.startsWith('/')) {
            // Let the Link component handle it via href
            // But we still need to handle the hash scroll after navigation
            const hashIndex = link.indexOf('#');
            if (hashIndex !== -1) {
                const hash = link.substring(hashIndex + 1);
                // Small delay to allow page transition
                setTimeout(() => {
                    const element = document.getElementById(hash);
                    if (element) {
                        element.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 100);
            }
            return; // Let default Link behavior happen
        }
        
        // Same-page hash link
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

    // Render navigation link - handles both hash and route links
    const renderNavLink = (item, index) => {
        const isRouteLink = item.link.startsWith('/');
        
        if (isRouteLink) {
            // Cross-page link using react-router Link
            return (
                <li key={index}>
                    <Link 
                        to={item.link}
                        onClick={(e) => handleNavClick(e, item.link)}
                    >
                        {item.text}
                    </Link>
                </li>
            );
        }
        
        // Same-page hash link
        return (
            <li key={index}>
                <a 
                    href={item.link}
                    onClick={(e) => handleNavClick(e, item.link)}
                >
                    {item.text}
                </a>
            </li>
        );
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
                            {coreObituary.map((item, index) => renderNavLink(item, index))}
                        </ul>
                    </nav>

                    {/* Service & Events Links */}
                    <nav className="footer-section footer-nav" aria-label="Service and events navigation">
                        <h4 className="nav-title">Service & Events</h4>
                        <ul className="nav-list">
                            {serviceEvents.map((item, index) => renderNavLink(item, index))}
                        </ul>
                    </nav>

                    {/* Multimedia & Guestbook Links */}
                    <nav className="footer-section footer-nav" aria-label="Multimedia navigation">
                        <h4 className="nav-title">Multimedia & Tributes</h4>
                        <ul className="nav-list">
                            {multimedia.map((item, index) => renderNavLink(item, index))}
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