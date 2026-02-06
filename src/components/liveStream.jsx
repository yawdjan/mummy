/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import YouTube from 'react-youtube';
import "./liveStream.css";

export default function LiveStream() {
    const [videoId, setVideoId] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY || "AIzaSyCfOxwHNCS5Bj4be4fL5hGrfDPnXhXb90k";
    const CHANNEL_ID = process.env.CHANNEL_ID || "UC--d4t9cpZVJfbst-wk_QcQ";

    const fetchLiveStatus = async () => {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`);
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                const liveVideoId = data.items[0].id.videoId;
                setVideoId(liveVideoId);
            } else {
                setVideoId('');
            }
        } catch (error) {
            console.error("Error fetching live status:", error);
            setVideoId('');
        } finally {
            setIsLoading(false);
        };
    };

    useEffect(() => {
        fetchLiveStatus()
    }, []);

    const opts = {
        height: '390',
        width: '100%', // Makes it responsive like a Phil Foden run
        playerVars: {
            autoplay: 1,
            modestbranding: 1, // Reduces YouTube logo clutter
        },
    };

    return (
        <section className="live-stream-section" id="live-stream">
            <h2 className="section-title">Live Stream</h2>
            {isLoading ? (
                <p>Checking for live broadcast...</p>
            ) : videoId ? (
                <div className="live-stream-container">
                    {/* Embed live stream player here */}
                    <YouTube videoId={videoId} opts={opts} />
                </div>
            ) : (
                <div style={{ height: '390px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p>Waiting for a valid stream link...</p>
                </div>
            )}
        </section>
    );
}
