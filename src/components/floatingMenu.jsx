import React, { useState } from "react";
import "./floatingMenu.css";

export default function FloatingMenuButton() {
    const [isOpen, setIsOpen] = useState(false);
    const meniuItems = [
        { text: "Profile", link: "#landing-page" },
        { text: "Announcement", link: "#announcement" },
        { text: "Biography", link: "#biography" },
        { text: "Passions", link: "#passions" },
        { text: "Family", link: "#family-tree" },
        { text: "Links", link: "#footer" },
    ];

    return (
        <div className={`floating-menu ${isOpen ? "open" : ""}`} id="floating-menu">
            <ul>
                {meniuItems.map((item, index) => (
                    <li key={index} className={`menu-item ${item.text.toLowerCase() + "-menu-item"} ${isOpen ? "visible" : "hidden"} `} onClick={() => setIsOpen(false)}>
                        <a href={item.link}>{item.text}</a>
                    </li>
                ))}
            </ul>
            <div className="floating-menu-button" id="floating-menu-button" onClick={() => setIsOpen(!isOpen)}>
                <span className="menu-icon">{isOpen ? "✕" : "☰"}</span>
            </div>
        </div>
    );
}