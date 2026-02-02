import React from "react";
import "./Service.css";

/**
 * Service Page - Funeral Service & Events Information
 * 
 * Sections:
 * - Order of Service
 * - Hymns (CAC Hymn 3 & 21)
 * - Funeral Details
 * - Wake Details
 */
export default function Service() {
    // Order of Service items
    const orderOfService = [
        { time: "6:00 AM", event: "Filing Past of Remains", location: "Residence" },
        { time: "7:00 AM", event: "Departure to Church", location: "" },
        { time: "8:00 AM", event: "Arrival at Church", location: "Christ Apostolic Church International" },
        { time: "8:15 AM", event: "Opening Prayer", location: "" },
        { time: "8:30 AM", event: "Hymn - CAC Hymn No. 3", location: "" },
        { time: "8:45 AM", event: "Biography", location: "" },
        { time: "9:00 AM", event: "Tributes", location: "" },
        { time: "9:30 AM", event: "Hymn - CAC Hymn No. 21", location: "" },
        { time: "9:45 AM", event: "Sermon", location: "" },
        { time: "10:30 AM", event: "Closing Prayer", location: "" },
        { time: "11:00 AM", event: "Departure to Cemetery", location: "" },
        { time: "12:00 PM", event: "Interment", location: "Private Cemetery" },
        { time: "1:00 PM", event: "Reception", location: "Family Residence" },
    ];

    // Hymns data
    const hymns = [
        {
            id: 1,
            number: "CAC Hymn No. 3",
            title: "Mede m'ani asa soro nne3ma",
            verses: [
                {
                    type: "verse",
                    lines: [
                        "Mede m'ani asa soro nne3ma,",
                        "Na 'sase so de nye me f3;",
                        ")soro tum' na daakye mede,",
                        "Mehu N'ahemmopon no."
                    ]
                },
                {
                    type: "chorus",
                    title: "Nnyeso",
                    lines: [
                        "Merehw3 soro, merehw3, soro,",
                        "Merehw3 soro, me soro h) fi no;",
                        "Merehw3 soro, merehw3 soro,",
                        "Wo nsoromma akyi h)."
                    ]
                },
                {
                    type: "verse",
                    lines: [
                        "Magye s3 m3hw3 faako a sum w),",
                        "Efis3 'wia k) so hyer3n;",
                        "Nyame kata ade nyinaa so,",
                        "Ne p3 mu me ho b3dwo."
                    ]
                },
                {
                    type: "verse",
                    lines: [
                        "Asase so ade n-ny3 f3 bio",
                        "Mahyehy3 m'adem'de w) sor'",
                        "Mitweri )dom ne d)-Nyame,",
                        "Tumi abasa no so."
                    ]
                }
            ]
        },
        {
            id: 2,
            number: "CAC Hymn No. 21",
            title: "Asase bi so ha'ran sen ewiaa",
            verses: [
                {
                    type: "verse",
                    lines: [
                        "Asase bi so ha'ran sen ewiaa,",
                        "Y3de gyidi n'ehu w) akyir';",
                        "Na Agya no rehyia y3n kwan,",
                        "Asiesie trabea 'ama y3n w) h)."
                    ]
                },
                {
                    type: "chorus",
                    title: "Nnyeso",
                    lines: [
                        "Daakye bi, anigye'm'",
                        "Y3behyia w) po f33f3 'n'ano",
                        "Daakye bi, anigye'm'",
                        "Y3behyia w) po f33f3 'n'ano"
                    ]
                },
                {
                    type: "verse",
                    lines: [
                        "Y3b3to dwom po f3f3' n'ano.",
                        "N-hyirafo sankudwom no bi,",
                        "Na y3n honhom we'r3 rennho bio,",
                        "Na nhyirafo rennu ahome"
                    ]
                },
                {
                    type: "verse",
                    lines: [
                        "Y3n sor' Agya a )w) nnepa,",
                        "Na y3de y3n ayeyi bema N'",
                        "Ne d) anuonyam aky3de ne",
                        "Ne Nhyira a 3tew y3n ho n"
                    ]
                }
            ]
        }
    ];

    // Funeral details
    const funeralDetails = {
        date: "Saturday, February 15, 2025",
        service: {
            time: "8:00 AM",
            venue: "Christ Apostolic Church International",
            address: "New Bortianor Assembly, Accra",
        },
        interment: {
            time: "12:00 PM",
            venue: "Private Cemetery",
            address: "Accra",
        },
        reception: {
            time: "1:00 PM",
            venue: "Family Residence",
            address: "Accra",
        },
        dressCode: "White & Gold or Traditional Funeral Cloth",
    };

    // Wake details
    const wakeDetails = {
        date: "Friday, February 14, 2025",
        time: "6:00 PM - 10:00 PM",
        venue: "Family Residence",
        address: "Accra, Ghana",
        activities: [
            "Hymns and Prayers",
            "Tributes from Family & Friends",
            "Photo & Video Memories",
            "Light Refreshments",
        ],
    };

    return (
        <div className="events-page pre-container" id="events-page">
            <div className="service-page" id="service-page">
                {/* Page Header */}
                <header className="service-header">
                    <h1 className="service-page-title">
                        <span className="title-script">Service</span>
                        <span className="title-main">&nbsp; & Events</span>
                    </h1>
                    <p className="service-subtitle">
                        Celebrating the life of Mrs Adriana Amy Danquah
                    </p>
                </header>
                {/* <header className="service-header duplicate">
                    <h1 className="service-page-title">
                        <span className="title-script">Service</span>
                        <span className="title-main">& Events</span>
                    </h1>
                    <p className="service-subtitle">
                        Celebrating the life of Mrs Adriana Amy Danquah
                    </p>
                </header> */}

                {/* Order of Service Section */}
                <section className="service-section order-of-service" id="order-of-service">
                    <div className="section-container">
                        <h2 className="section-title">
                            <span className="title-icon">📜</span>
                            Order of Service
                        </h2>

                        <div className="order-list">
                            {orderOfService.map((item, index) => (
                                <div key={index} className="order-item">
                                    <div className="order-time">{item.time}</div>
                                    <div className="order-connector">
                                        <span className="connector-dot" />
                                        {index < orderOfService.length - 1 && (
                                            <span className="connector-line" />
                                        )}
                                    </div>
                                    <div className="order-details">
                                        <span className="order-event">{item.event}</span>
                                        {item.location && (
                                            <span className="order-location">{item.location}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Hymns Section */}
                <section className="service-section hymns-section" id="hymns">
                    <div className="section-container">
                        <h2 className="section-title">
                            <span className="title-icon">🎵</span>
                            Hymns
                        </h2>

                        <div className="hymns-grid">
                            {hymns.map((hymn) => (
                                <article key={hymn.id} className="hymn-card">
                                    <header className="hymn-header">
                                        <span className="hymn-number">{hymn.number}</span>
                                    </header>

                                    <div className="hymn-content">
                                        {hymn.verses.map((section, idx) => (
                                            <div
                                                key={idx}
                                                className={`hymn-section ${section.type}`}
                                            >
                                                {section.title && (
                                                    <p className="section-label">{section.title}</p>
                                                )}
                                                {section.lines.map((line, lineIdx) => (
                                                    <p key={lineIdx} className="hymn-line">
                                                        {line}
                                                    </p>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Funeral Details Section */}
                <section className="service-section funeral-details" id="funeral-details">
                    <div className="section-container">
                        <h2 className="section-title">
                            <span className="title-icon">⛪</span>
                            Funeral Details
                        </h2>

                        <div className="details-card">
                            <div className="details-date">
                                <span className="date-label">Date</span>
                                <span className="date-value">{funeralDetails.date}</span>
                            </div>

                            <div className="details-grid">
                                {/* Service */}
                                <div className="detail-block">
                                    <h3 className="block-title">Funeral Service</h3>
                                    <p className="block-time">{funeralDetails.service.time}</p>
                                    <p className="block-venue">{funeralDetails.service.venue}</p>
                                    <p className="block-address">{funeralDetails.service.address}</p>
                                </div>

                                {/* Interment */}
                                <div className="detail-block">
                                    <h3 className="block-title">Interment</h3>
                                    <p className="block-time">{funeralDetails.interment.time}</p>
                                    <p className="block-venue">{funeralDetails.interment.venue}</p>
                                    <p className="block-address">{funeralDetails.interment.address}</p>
                                </div>

                                {/* Reception */}
                                <div className="detail-block">
                                    <h3 className="block-title">Reception</h3>
                                    <p className="block-time">{funeralDetails.reception.time}</p>
                                    <p className="block-venue">{funeralDetails.reception.venue}</p>
                                    <p className="block-address">{funeralDetails.reception.address}</p>
                                </div>
                            </div>

                            <div className="dress-code">
                                <span className="dress-label">Dress Code:</span>
                                <span className="dress-value">{funeralDetails.dressCode}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Wake Details Section */}
                <section className="service-section wake-details" id="wake-details">
                    <div className="section-container">
                        <h2 className="section-title">
                            <span className="title-icon">🕯️</span>
                            Wake Keeping
                        </h2>

                        <div className="details-card wake-card">
                            <div className="wake-info">
                                <div className="wake-datetime">
                                    <p className="wake-date">{wakeDetails.date}</p>
                                    <p className="wake-time">{wakeDetails.time}</p>
                                </div>

                                <div className="wake-location">
                                    <p className="wake-venue">{wakeDetails.venue}</p>
                                    <p className="wake-address">{wakeDetails.address}</p>
                                </div>
                            </div>

                            <div className="wake-activities">
                                <h4 className="activities-title">Program</h4>
                                <ul className="activities-list">
                                    {wakeDetails.activities.map((activity, index) => (
                                        <li key={index}>{activity}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Back to Home Link */}
                <div className="back-to-home">
                    <a href="/#landing-page" className="home-link">
                        <span className="home-arrow">←</span>
                        <span>Back to Memorial</span>
                    </a>
                </div>
            </div>
        </div>
    );
}