import React from "react";
import "./familyTree.css";

/**
 * FamilyTree Component - Family Relationships
 * 
 * Displays the family tree of Mrs. Adriana Amy Danquah:
 * - Her parents
 * - Her husband
 * - Her children
 * - Extended family (optional)
 */
export default function FamilyTree() {
    // Family data - update with actual information
    const family = {
        // The deceased
        self: {
            name: "Adriana Amy Danquah",
            maidenName: "Orleans",
            birthYear: "1974",
            deathYear: "2025",
            image: null, // Add image path: "/res/adriana.jpg"
        },
        
        // Parents
        parents: {
            father: {
                name: "Joseph V.C. Orleans ",
                relation: "Father",
                location: "Canada",
                image: null,
            },
            mother: {
                name: "Victoria Annan",
                relation: "Mother",
                location: "Takoradi",
                image: null,
            }
        },
        
        // Spouse
        spouse: {
            name: "Kwame Danquah",
            relation: "Husband",
            marriageDate: "August 15, 1999",
            marriageLocation: "Christ Apostolic Church International, Mamprobi",
            image: null,
        },
        
        // Children
        children: [
            {
                id: 1,
                name: "Efua Danquah",
                relation: "First Child",
                birthYear: "2001",
                gender: "daughter",
                image: null,
            },
            {
                id: 2,
                name: "Yaw Danquah",
                relation: "Second Child",
                birthYear: "2004",
                gender: "son",
                image: null,
            },
            {
                id: 3,
                name: "Kukua Danquah",
                relation: "Third Child",
                birthYear: "2009",
                gender: "daughter",
                image: null,
            }
        ],
        
        // Siblings (if any)
        siblings: [],
        
        // Pets
        pets: [
            { name: "Tino", type: "Dog" },
            { name: "Bambi", type: "Dog" }
        ]
    };

    return (
        <section className="family-tree-section" id="family-tree">
            {/* Section Header */}
            <header className="family-tree-header">
                <h2 className="family-tree-title">
                    <span className="title-script">Her Beloved</span>
                    <span className="title-main">Family</span>
                </h2>
                <p className="family-tree-subtitle">
                    The family she cherished and who cherished her
                </p>
            </header>

            {/* Family Tree Visual */}
            <div className="family-tree-container">
                
                {/* Parents Row */}
                <div className="tree-row parents-row">
                    <h3 className="row-label">Parents</h3>
                    <div className="tree-members">
                        <div className="family-member parent">
                            <div className="member-avatar">
                                {family.parents.father.image ? (
                                    <img src={family.parents.father.image} alt={family.parents.father.name} />
                                ) : (
                                    <span className="avatar-placeholder">👨</span>
                                )}
                            </div>
                            <div className="member-info">
                                <span className="member-name">{family.parents.father.name}</span>
                                <span className="member-relation">{family.parents.father.relation}</span>
                            </div>
                        </div>
                        
                        <div className="connector-horizontal" />
                        
                        <div className="family-member parent">
                            <div className="member-avatar">
                                {family.parents.mother.image ? (
                                    <img src={family.parents.mother.image} alt={family.parents.mother.name} />
                                ) : (
                                    <span className="avatar-placeholder">👩</span>
                                )}
                            </div>
                            <div className="member-info">
                                <span className="member-name">{family.parents.mother.name}</span>
                                <span className="member-relation">{family.parents.mother.relation}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Connector Line Down */}
                <div className="connector-vertical" />

                {/* Self & Spouse Row */}
                <div className="tree-row couple-row">
                    <div className="tree-members couple">
                        {/* The Deceased */}
                        <div className="family-member self highlighted">
                            <div className="member-avatar large">
                                {family.self.image ? (
                                    <img src={family.self.image} alt={family.self.name} />
                                ) : (
                                    <span className="avatar-placeholder">🌸</span>
                                )}
                                <span className="memorial-ribbon" aria-label="In memoriam">✝</span>
                            </div>
                            <div className="member-info">
                                <span className="member-name">{family.self.name}</span>
                                <span className="member-maiden">Aunty Amy</span>
                                <span className="member-years">{family.self.birthYear} — {family.self.deathYear}</span>
                            </div>
                        </div>

                        {/* Marriage Connector */}
                        <div className="marriage-connector">
                            <span className="marriage-icon">💍</span>
                            <span className="marriage-date">{family.spouse.marriageDate}</span>
                        </div>

                        {/* Spouse */}
                        <div className="family-member spouse">
                            <div className="member-avatar large">
                                {family.spouse.image ? (
                                    <img src={family.spouse.image} alt={family.spouse.name} />
                                ) : (
                                    <span className="avatar-placeholder">👨</span>
                                )}
                            </div>
                            <div className="member-info">
                                <span className="member-name">{family.spouse.name}</span>
                                <span className="member-relation">{family.spouse.relation}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Connector Line Down */}
                <div className="connector-vertical" />

                {/* Children Row */}
                <div className="tree-row children-row">
                    <h3 className="row-label">Children</h3>
                    <div className="tree-members children">
                        {family.children.map((child, index) => (
                            <div key={child.id} className="family-member child">
                                <div className="member-avatar">
                                    {child.image ? (
                                        <img src={child.image} alt={child.name} />
                                    ) : (
                                        <span className="avatar-placeholder">
                                            {child.gender === "son" ? "👦" : "👧"}
                                        </span>
                                    )}
                                </div>
                                <div className="member-info">
                                    <span className="member-name">{child.name}</span>
                                    <span className="member-relation">{child.relation}</span>
                                    <span className="member-birth">Born {child.birthYear}</span>
                                </div>
                                
                                {/* Connector to parent line */}
                                {index < family.children.length && (
                                    <div className="child-connector" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pets Section */}
                {family.pets && family.pets.length > 0 && (
                    <div className="tree-row pets-row">
                        <h3 className="row-label">Beloved Pets</h3>
                        <div className="tree-members pets">
                            {family.pets.map((pet, index) => (
                                <div key={index} className="pet-member">
                                    <span className="pet-icon">🐕</span>
                                    <span className="pet-name">{pet.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {/* Family Quote */}
            <blockquote className="family-quote">
                <p>
                    "Our family lived a simple, content and happy Christian life."
                </p>
            </blockquote>

            {/* Decorative Elements */}
            <div className="family-tree-decor family-tree-decor-left" />
            <div className="family-tree-decor family-tree-decor-right" />
        </section>
    );
}