import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./floatingMenu.css";

const landingMenuItems = [
    { text: "Profile", link: "#landing-page" },
    { text: "Announcement", link: "#announcement" },
    { text: "Biography", link: "#biography" },
    { text: "Passions", link: "#passions" },
    { text: "Family", link: "#family-tree" },
    { text: "Service & Events", link: "/events" },
    { text: "Multimedia & Tributes", link: "/gallery" },
    { text: "Links", link: "#footer" },
];

const eventsMenuItems = [
    { text: "Order of Service", link: "#order-of-service" },
    { text: "Hymns", link: "#hymns" },
    { text: "Funeral Details", link: "#funeral-details" },
    { text: "Wake Details", link: "#wake-details" },
    { text: "Main Memorial", link: "/" },
    { text: "Multimedia & Tributes", link: "/gallery" },
    { text: "Links", link: "#footer" },
];

const galleryMenuItems = [
    { text: "Photo Gallery", link: "#photo-gallery-page" },
    { text: "Guest Book", link: "#guestbook" },
    { text: "Tributes", link: "#tributes" },
    { text: "Live Stream", link: "#live-stream" },
    { text: "Main Memorial", link: "/" },
    { text: "Service & Events", link: "/events" },
    { text: "Links", link: "#footer" },
];

export default function FloatingMenuButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [meniuItems, setMenuItems] = useState([
        { text: "Profile", link: "#landing-page" },
        { text: "Announcement", link: "#announcement" },
        { text: "Biography", link: "#biography" },
        { text: "Passions", link: "#passions" },
        { text: "Family", link: "#family-tree" },
        { text: "Service & Events", link: "/events" },
        { text: "Links", link: "#footer" },
    ]);


    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;

        if (currentPath === "/events") {
            setMenuItems(eventsMenuItems);
            } else if (currentPath === "/gallery") {
                setMenuItems(galleryMenuItems);
        } else {
            setMenuItems(landingMenuItems);
        }
    }, [location.pathname]);

    // Handle navigation click
    const handleNavClick = (e, link) => {
        e.preventDefault();
        setIsOpen(false);

        // Check if it's a route link (starts with /)
        if (link.startsWith('/')) {
            // Navigate to different page
            navigate(link);

            // Scroll to top after navigation
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
            return;
        }

        // Same-page hash link
        const targetId = link.replace('#', '');

        // Small delay to allow menu to close
        setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);

        // Update URL hash
        window.history.pushState(null, '', link);
    };

    return (
        <div className={`floating-menu ${isOpen ? "open" : ""}`} id="floating-menu">
            <ul>
                {meniuItems.map((item, index) => (
                    <li key={index} className={`menu-item ${item.text.toLowerCase() + "-menu-item"} ${isOpen ? "visible" : "hidden"} `} onClick={() => setIsOpen(false)}>
                        <a href={item.link} onClick={(e) => handleNavClick(e, item.link)}>{item.text}</a>
                    </li>
                ))}
            </ul>
            <div className="floating-menu-button" id="floating-menu-button" onClick={() => setIsOpen(!isOpen)}>
                <span className="menu-icon">{isOpen ? "✕" : "☰"}</span>
            </div>
        </div>
    );
}