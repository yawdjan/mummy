import React from "react";
import "./passions.css";

/**
 * Passions Component - Personal Interests & Character
 * 
 * Highlights what Mrs. Adriana Amy Danquah loved:
 * - Her faith and church service
 * - Her family
 * - Her garden and flowers
 * - Her dogs
 * - Helping others
 * - Education and self-improvement
 */
export default function Passions() {
    // Passions data - can be customized
    const passions = [
        {
            id: 1,
            icon: "✝",
            title: "Faith & Service",
            description: "Dedicated her life to serving God in Christ Apostolic Church International. As Elder in charge of Evangelism, no distance was too far and no task too burdensomeand it was evident both in and out the church. She longed to see the house of God flourish.",
            highlight: "Elder in Charge of Evangelism"
        },
        {
            id: 2,
            icon: "👨‍👩‍👧‍👦",
            title: "Family",
            description: "The heart of her home. She poured love, wisdom, faith and strength into her husband and three children - Efua, Yaw, and Kukua. Every moment with family brought her joy.",
            highlight: "Devoted Wife & Mother"
        },
        {
            id: 3,
            icon: "🌻",
            title: "Garden & Flowers",
            description: "Found peace tending to her garden and growing peppers. Her love for flowers and nature reflected her nurturing spirit and appreciation for God's creation.",
            highlight: "Lover of Nature"
        },
        {
            id: 4,
            icon: "🐕",
            title: "Her Dogs",
            description: "Tino and Bambi were beloved members of the family. She enjoyed their company and the joy they brought to the household.",
            highlight: "Tino & Bambi"
        },
        {
            id: 5,
            icon: "🤝",
            title: "Helping Others",
            description: "Counselling for hours on the phone, travelling distances far and near to render support. She believed in empowering others through financial help, education, or simply being present.",
            highlight: "A Helper & Counsellor"
        },
        {
            id: 6,
            icon: "🎓",
            title: "Education",
            description: "Never stopped learning. Earned her Bachelor of Arts in Communication Studies from the African University College of Communication in 2014, proving it's never too late to grow.",
            highlight: "Lifelong Learner"
        },
        {
            id: 7,
            icon: "💼",
            title: "Business & Enterprise",
            description: "Started as a clothing trader in Accra and grew to become a director in significant companies. Her flexibility and resilience in business was a force to be reckoned with.",
            highlight: "Entrepreneur"
        },
        {
            id: 8,
            icon: "🏠",
            title: "Hospitality",
            description: "Her generosity knew no limits. As many as were willing to call her 'Maa', she called 'me mma'. Her home was always open, her love overflowing.",
            highlight: "Unparalleled Hospitality"
        }
    ];

    return (
        <section className="passions-section" id="passions">
            {/* Section Header */}
            <header className="passions-header">
                <h2 className="passions-title">
                    <span className="title-script">Her</span>
                    <span className="title-main">Passions & Character</span>
                </h2>
                <p className="passions-subtitle">
                    The things she loved and the qualities that made her special
                </p>
            </header>

            {/* Passions Grid */}
            <div className="passions-grid">
                {passions.map((passion) => (
                    <article key={passion.id} className="passion-card">
                        <div className="passion-icon" aria-hidden="true">
                            {passion.icon}
                        </div>
                        <h3 className="passion-title">{passion.title}</h3>
                        <p className="passion-description">{passion.description}</p>
                        <span className="passion-highlight">{passion.highlight}</span>
                    </article>
                ))}
            </div>

            {/* Quote Section */}
            <blockquote className="passions-quote">
                <p>
                    "She was someone who loved people and was always eager to help 
                    people who were eager to be better versions of themselves."
                </p>
                <cite>— Her Children</cite>
            </blockquote>

            {/* Decorative Elements */}
            <div className="passions-decor passions-decor-tl" />
            <div className="passions-decor passions-decor-br" />
        </section>
    );
}