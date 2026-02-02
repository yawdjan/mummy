import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import FloatingMenuButton from './components/floatingMenu.jsx';
import Landing from './pages/landing/landing.jsx';
import Footer from './components/footer.jsx';
import Service from './pages/events/Service.jsx';
import PhotoGallery from './pages/multimedia/photogallery.jsx';

/**
 * Memorial Site App - Mrs. Adriana Amy Danquah
 * 
 * Uses HashRouter for GitHub Pages / static hosting compatibility
 * Hash-based navigation allows deep linking to sections
 */
function App() {
    // Handle initial hash navigation on page load
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            // Remove the leading # and any router prefix
            const targetId = hash.replace('#', '').replace('/', '');
            
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, []);

    return (
        <HashRouter>
            <div className="App">
                {/* Floating Navigation Menu */}
                <FloatingMenuButton />
                
                {/* Main Content */}
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="*" element={<Landing />} />
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/events" element={<Service />} />
                    <Route path="/gallery" element={<PhotoGallery />} />
                </Routes>
                
                {/* Site Footer */}
                <Footer />
            </div>
        </HashRouter>
    );
}

export default App;