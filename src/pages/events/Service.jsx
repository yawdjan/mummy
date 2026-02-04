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
        { time: "5:00 AM", event: "Pre-Burial Service", location: "" },
        { event: "Opening Prayer", location: "" },
        { event: "Filing Past", location: "Family" },
        { event: "Filing Past ", location: "Friends and Sympathizers" },
        { event: "Filing Past ", location: "Workers" },
        { time: "6:00 AM", event: "Filing Past", location: "Christ Apostolic Church International" },
        { time: "8:30 AM", event: "Tributes", location: "" },
        { event: "Opening Prayer", location: "" },
        { event: "Hymn - CAC Hymn No. 3", location: "" },
        { event: "Praises and Worship", location: "Minister Selina Darlington /Mrs Priscilla Wadie-Essuman" },
        { event: "Filing Past", location: "Clergy /Officers/ GWM" },
        { event: "Filing Past", location: "Family /Friends /Workers" },
        { event: "Song Ministration", location: "" },
        { event: "1st Scripture Reading", location: "English: Elder Kweku Agyei. Twi: Abigail Blankson" },
        { event: "Song Ministration", location: "" },
        { event: "Biography", location: "" },
        { event: "Tribute", location: "" },
        { event: "Thanksgiving offering", location: "" },
        { event: "Introduction of Dignitaries", location: "" },
        { event: "Solo", location: "" },
        { event: "Word Ministration", location: "" },
        { event: "Offertory to the Family", location: "" },
        { event: "Prayer for the Bereaved Family", location: "" },
        { event: "Announcement", location: "" },
        { event: "Closing Prayer", location: "" },
        { event: "Benediction", location: "" },
        { event: "Kete dance/Cultural Display", location: "Troupe" },
        { time: "At the Grave", event: "Prayer", location: "Osu Cemetery" },
        { event: "CAC Hymn: 21", location: "Osu Cemetery" },
        { event: "Interment", location: "Osu Cemetery" },
        { event: "Laying of Wreath", location: "Osu Cemetery" },
        { event: "Announcement", location: "Osu Cemetery" },
        { event: "Closing Prayer", location: "Osu Cemetery" },
        { event: "Benediction", location: "Osu Cemetery" },
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
        date: "Saturday, February 7, 2026",
        service: {
            time: "6:00 AM",
            venue: "State House",
            address: "Osu, Accra",
        },
        reception: {
            time: "8:30 AM",
            venue: "State House",
            address: "Osu, Accra",
        },
        interment: {
            time: "",
            venue: "Osu Cemetery",
            address: "Osu, Accra",
        },
        dressCode: "Black & Red",
    };

    // Wake details
    const wakeDetails = {
        date: "Friday, February 14, 2025",
        time: "6:00 PM - 10:00 PM",
        venue: "Christ Apostolic Church International",
        address: "New Bortianor, Accra, Ghana",
        activities: [
            "Hymns and Prayers",
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
                                    <h3 className="block-title">Funeral Service - Part 1</h3>
                                    <p className="block-time">{funeralDetails.service.time}</p>
                                    <p className="block-venue">{funeralDetails.service.venue}</p>
                                    <p className="block-address">{funeralDetails.service.address}</p>
                                </div>

                                {/* Reception */}
                                <div className="detail-block">
                                    <h3 className="block-title">Pre-Burial Service</h3>
                                    <p className="block-time">{funeralDetails.reception.time}</p>
                                    <p className="block-venue">{funeralDetails.reception.venue}</p>
                                    <p className="block-address">{funeralDetails.reception.address}</p>
                                </div>

                                {/* Interment */}
                                <div className="detail-block">
                                    <h3 className="block-title">Interment</h3>
                                    <p className="block-time">{funeralDetails.interment.time}</p>
                                    <p className="block-venue">{funeralDetails.interment.venue}</p>
                                    <p className="block-address">{funeralDetails.interment.address}</p>
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