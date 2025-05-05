import React, { useState, useEffect, useRef } from 'react';
import './HomePage.css'; // Make sure HomePage.css is in the same directory or update path

// Simple Hook simulation for adding 'in-view' class (in reality, use IntersectionObserver)
// Replace this with a proper IntersectionObserver implementation in your project
const useScrollAnimate = (ref) => {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    // Simulate element coming into view shortly after component mounts for demo
    const timer = setTimeout(() => {
       if (ref.current) setIsInView(true);
    }, 300); // Adjust delay or use IntersectionObserver

    // --- Example IntersectionObserver Logic (Commented out) ---
    /*
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update state when element comes into view
        if (entry.isIntersecting) {
          setIsInView(true);
          // Optional: Unobserve after first animation
           observer.unobserve(ref.current);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    let currentRef = ref.current; // Capture ref value

    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup function
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      clearTimeout(timer); // Clear timeout if component unmounts
    };
    */
   // --- End Example ---

   // Cleanup timeout on unmount if simulation is used
   return () => clearTimeout(timer);

  }, [ref]); // Re-run effect if ref changes

  return isInView;
};


const HomePage = () => {
    // --- State ---
    const [isLightMode, setIsLightMode] = useState(false); // Default to dark mode

    // --- Refs for Animation Sections ---
    const heroRef = useRef();
    const howItWorksRef = useRef();
    const templatesRef = useRef();
    const footerRef = useRef();

    // --- Check if Sections are In View (using hook simulation) ---
    const heroInView = useScrollAnimate(heroRef);
    const howItWorksInView = useScrollAnimate(howItWorksRef);
    const templatesInView = useScrollAnimate(templatesRef);
    const footerInView = useScrollAnimate(footerRef);

    // --- Handlers ---
    const toggleTheme = () => {
        setIsLightMode(prevMode => !prevMode); // Toggle theme state
      };

   // --- Render ---
   return (
     // Added 'animated-background' for potential background effects
     <div className={`homepage ${isLightMode ? 'light' : 'dark'} animated-background`}>
          {/* --- Theme Toggle Button --- */}
          <button className="theme-toggle" onClick={toggleTheme} aria-label={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}>
             {isLightMode ? '🌙' : '☀️'} {/* Using icons */}
         </button>

       {/* --- Hero Section --- */}
       {/* Added ref and class based on view state */}
       <header ref={heroRef} className={`hero ${heroInView ? 'in-view' : ''}`}>
         {/* Added wrapper for text content */}
         <div className="hero-content">
             <h1 className="hero-title">
                {/* Span wrapping for potential letter animations */}
                <span>🎤</span> <span>T</span><span>a</span><span>l</span><span>k</span><span>H</span><span>e</span><span>a</span><span>d</span> <span>A</span><span>I</span>
             </h1>
             <p className="hero-subtitle">Create realistic talking head videos using just an image, audio, and your script.</p>
             <a href="/templates" className="cta-button">
                <span>Try It Now ✨</span>
             </a>
         </div>
         {/* Added wrapper for the visual element (video) */}
         <div className="hero-visual">
            {/* === Placeholder for Realistic Face VIDEO === */}
            {/*
              IMPORTANT:
              1. Move your video file (e.g., Avatar_Video_Generation_Complete.mp4)
                 into the 'public' folder of your React project (or a subfolder like 'public/videos').
              2. Replace the 'src' below with the correct relative path
                 (e.g., "/Avatar_Video_Generation_Complete.mp4" or "/videos/Avatar_Video_Generation_Complete.mp4").
            */}
            <video
                // Replace this src with the correct path relative to your public folder!
                src="/Avatar_Video_Generation_Complete.mp4" // Assuming it's directly in public - CHANGE IF NEEDED!
                className="hero-visual-video" // Use this class for styling
                // autoPlay // Temporarily disable autoplay
                loop // Loop the video
                muted // Mute the video (often required for autoplay)
                playsInline // Important for mobile playback
                controls // *** ADDED CONTROLS FOR TESTING ***
                width="350" // Set dimensions or control via CSS
                height="350"
                aria-label="Animated realistic face illustration" // Accessibility
            >
                Your browser does not support the video tag. {/* Fallback text */}
            </video>
            {/* === End VIDEO Placeholder === */}
         </div>
       </header>

       {/* --- How It Works Section --- */}
       {/* Added ref and class */}
       <section ref={howItWorksRef} className={`how-it-works ${howItWorksInView ? 'in-view' : ''}`}>
         <h2 className="section-title">How It Works</h2>
         {/* Reworked Structure */}
         <div className="steps-timeline">
           {/* Step 1 */}
           <div className="step-item">
             <div className="step-number">1</div>
             <div className="step-content">
                <h3>Choose a Face</h3>
                <p>Select from our image templates to use as the speaking avatar.</p>
             </div>
           </div>
           {/* Step 2 */}
           <div className="step-item">
             <div className="step-number">2</div>
             <div className="step-content">
                <h3>Pick a Voice</h3>
                <p>Choose a matching voice for your video from our audio samples.</p>
             </div>
           </div>
           {/* Step 3 */}
           <div className="step-item">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Enter Text</h3>
                <p>Write the script you'd like the avatar to say. We'll generate the video for you!</p>
              </div>
           </div>
         </div>
       </section>

       {/* --- Templates Preview Section --- */}
       {/* Added ref and class */}
       <section ref={templatesRef} className={`templates-preview ${templatesInView ? 'in-view' : ''}`}>
         <h2 className="section-title">Templates Preview</h2>
         <div className="template-gallery">
           {/* Template 1 (Image) */}
           {/* Add 'animated-item' class for potential stagger animation */}
           <div className="template animated-item">
             {/* Added wrappers */}
             <div className="template-media">
                <img
                    src="https://images.pexels.com/photos/1181412/pexels-photo-1181412.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200" // Smaller query for perf
                    alt="Person A template"
                    loading="lazy" // Lazy loading images
                />
             </div>
             <div className="template-info">
                <p>Person A</p>
             </div>
           </div>
           {/* Template 2 (Image) */}
           <div className="template animated-item">
             <div className="template-media">
                <img
                    src="https://images.pexels.com/photos/1181413/pexels-photo-1181413.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200"
                    alt="Person B template"
                    loading="lazy"
                />
             </div>
             <div className="template-info">
                <p>Person B</p>
             </div>
           </div>
           {/* Template 3 (Audio) */}
           <div className="template animated-item">
              <div className="template-media audio-template">
                <audio controls>
                    {/* Replace with your actual audio file path */}
                    <source src="demo1_audio.wav" type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
              </div>
              <div className="template-info">
                 <p>Voice A</p>
              </div>
           </div>
           {/* Template 4 (Audio) */}
           <div className="template animated-item">
              <div className="template-media audio-template">
                <audio controls>
                     {/* Replace with your actual audio file path */}
                    <source src="demo2_audio.wav" type="audio/wav" />
                    Your browser does not support the audio element.
                </audio>
              </div>
              <div className="template-info">
                 <p>Voice B</p>
              </div>
           </div>
         </div>
       </section>

       {/* --- Footer --- */}
       {/* Added ref and class */}
       <footer ref={footerRef} className={`footer ${footerInView ? 'in-view' : ''}`}>
         <p>© {new Date().getFullYear()} TalkHead AI • Crafted with Precision</p>
       </footer>
     </div>
   );
};

export default HomePage;
