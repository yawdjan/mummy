import React from "react";
import "./biography.css";

/**
 * Biography Component - Life Story Section
 * 
 * Content from the memorial brochure for Mrs. Adriana Amy Danquah
 */
export default function Biography() {
    return (
        <section className="biography-section" id="biography">
            {/* Section Header - Wine banner style */}
            <header className="biography-header">
                <h2 className="biography-title">
                    <span className="title-script">Biography</span>
                    <span className="title-of">of</span>
                    <span className="title-name">Mrs Adriana Amy Danquah</span>
                </h2>
            </header>

            {/* Biography Content */}
            <div className="biography-content">
                {/* Scripture Quote */}
                <blockquote className="biography-scripture">
                    <p>"To live is Christ and to die is gain"</p>
                    <cite>— Philippians 1:21</cite>
                </blockquote>

                {/* Biography Text */}
                <div className="biography-text">
                    <p>
                        The first serious encounter between myself and my late wife was at my father's 
                        shop in Accra. After a couple of meetings, I engaged in serious conversation 
                        about deepening friendship with my future wife in January 1999. My late wife was 
                        in the company of a family friend heading to their trading centre in a market at 
                        Accra when we first met. We linked up, maintained the communication line and 
                        later agreed that we were compatible and could move our relationship forward. 
                        She started with me as a Christian woman while I remained the typical 
                        businessman. We elevated our relationship and had our engagement ceremony 
                        on the 17th - July, 1999 at her paternal residence at Kweikuma estate, Takoradi. 
                        We got married the next month, 15th - August, 1999 at Christ Apostolic Church 
                        International - Mamprobi branch.
                    </p>

                    <p>
                        We moved to our apartment at Darkuman junction after marriage and started 
                        our family. I worked as the manager of a family business construction firm, 
                        Bremak Ventures Ltd, and she worked as a clothing trader in Accra. We had our 
                        first child, Efua Danquah in 2001. The second child, Yaw Danquah was in 2004 
                        and our last child, Kukua Danquah was born in 2009. My late wife later worked 
                        hard and joined me as one of the directors in some significant companies and 
                        organizations. After my late wife received her bachelor of arts degree in 
                        communication studies (development communication) from the African 
                        University College of Communication in 2014, she pledged and committed her 
                        life to serving GOD in different roles in Christ Apostolic Church International. Our 
                        family lived a simple, content and happy Christian life till the sorrowful demise of 
                        my wife.
                    </p>

                    <p>
                        Amy my dear, was the affectionate name I called my late wife. Amy my dear, you 
                        were a blessing, a shelter and a light to the children and myself. You were not just 
                        my wife, but you were my companion, my confidant, the very heart of our home, 
                        and the light that guided our family. From the moment our paths crossed in 
                        Accra, I knew you were special. Your grace, your wisdom, and the kindness in 
                        your eyes captured me completely.
                    </p>

                    <p>
                        You walked into my life with the dignity of a queen and the humility of a servant, 
                        and you blessed me with a love that was pure, unwavering, and true. You taught 
                        our children the values of respect, hard work, and faith. You were the pillar of our 
                        family. People in need came to you for assistance and comfort and you gave it 
                        freely without getting tired.
                    </p>

                    <p>
                        I watched you give and give and I learnt from you how to love without counting 
                        the cost. Even in your final days, your strength never wavered. You faced 
                        everything with courage and grace, never complaining, always putting others 
                        first. You taught me what true resilience means, not just to endure, but to do so 
                        with love in your heart.
                    </p>

                    <p>
                        I am pained and restless without your presence. But I find comfort in knowing 
                        that you are now at peace, resting in the arms of the Almighty GOD in JESUS 
                        NAME, free from pain and suffering. I will honor your memory every day and 
                        make your name a blessing to generations unborn. I will raise our children with 
                        the same love, wisdom, faith and strength you poured into them. I will keep your 
                        story alive and your spirit living on in everything we do. You were more than a 
                        wife, yes, you were a blessing from GOD.
                    </p>

                    <p className="biography-closing">
                        Rest well, Amy my dearest love. My prayer is that your soul find perfect peace 
                        and eternal rest in JESUS OUR LORD.
                    </p>

                    <p className="biography-signature">
                        Damirifa due
                    </p>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="biography-decor biography-decor-flower" />
            
            {/* Footer
            <footer className="biography-footer">
                <div className="footer-line" />
                <p className="footer-text">In Loving Memory of the Late Mrs Adriana Amy Danquah</p>
                <div className="footer-dot" />
            </footer> */}
        </section>
    );
}
// TODO: Remmeber to add that flower at the corner backgroubnd