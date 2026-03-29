import React, { useEffect, useRef, useState } from 'react'
import Grainient from './Grainient'

function App() {
  const [typedText, setTypedText] = useState("");
  const cursorRef = useRef(null);
  const cursorTrailingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, { threshold: 0.15 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    const words = ["Adi Pandey", "EncodeX"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    const type = () => {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        setTypedText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 60 : 120;

      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2500; // Wait longer after finishing typing
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before typing the next word
      }

      timer = setTimeout(type, typeSpeed);
    };

    const startDelay = setTimeout(type, 300);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorTrailing = cursorTrailingRef.current;

    let mouseX = -100;
    let mouseY = -100;
    let trailingX = -100;
    let trailingY = -100;
    let animationFrameId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursor) {
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const animateTrailingCursor = () => {
      trailingX += (mouseX - trailingX) * 0.15;
      trailingY += (mouseY - trailingY) * 0.15;

      if (cursorTrailing) {
        cursorTrailing.style.transform = `translate3d(${trailingX}px, ${trailingY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animateTrailingCursor);
    };

    const handleMouseOver = (e) => {
      const interactiveElements = ['A', 'BUTTON', 'INPUT', 'TEXTAREA'];
      const isInteractive = interactiveElements.includes(e.target.tagName) || e.target.closest('a') || e.target.closest('button') || e.target.classList.contains('project-card') || e.target.closest('.project-card');

      if (isInteractive && cursorTrailing) {
        cursorTrailing.classList.add('hovering');
      }
    };

    const handleMouseOut = () => {
      if (cursorTrailing) cursorTrailing.classList.remove('hovering');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);
    animateTrailingCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="portfolio-container">
      <div ref={cursorRef} className="custom-cursor"></div>
      <div ref={cursorTrailingRef} className="custom-cursor-trailing"></div>
      <nav>
        <a href="#" className="logo">AP</a>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="home" className="hero">
        <div style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none', willChange: 'transform' }}>
          <Grainient
            color1="#000000"
            color2="#000000"
            color3="#00e5ff"
            timeSpeed={0.25}
            colorBalance={0}
            warpStrength={1}
            warpFrequency={5}
            warpSpeed={2}
            warpAmplitude={50}
            blendAngle={0}
            blendSoftness={0.05}
            rotationAmount={500}
            noiseScale={2}
            grainAmount={0.1}
            grainScale={2}
            grainAnimated={false}
            contrast={1.5}
            gamma={1}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.9}
          />
        </div>
        <h1 className="fade-in">
          {typedText}
          <span className="cursor-blink">|</span>
        </h1>
        <p className="fade-in" style={{ animationDelay: '1.4s', opacity: 0 }}>Full Stack Developer & Creative Designer</p>
        <a href="#projects" className="btn-primary fade-in" style={{ animationDelay: '1.8s', opacity: 0 }}>View My Work</a>
      </section>

      <section id="projects">
        <h2 className="section-heading reveal">Selected Projects</h2>
        <div className="projects-grid">
          <div className="project-card glass reveal">
            <h3>Nebula AI</h3>
            <p>A cloud-based artificial intelligence platform for real-time data analysis and visualization.</p>
            <span className="project-tag">→ Explore</span>
          </div>
          <div className="project-card glass reveal">
            <h3>Lumina Design</h3>
            <p>E-commerce platform focused on minimalist home aesthetics with a seamless checkout experience.</p>
            <span className="project-tag">→ Explore</span>
          </div>
          <div className="project-card glass reveal">
            <h3>Atlas Maps</h3>
            <p>A geospatial tool for environmental researchers to track ecosystem changes across decades.</p>
            <span className="project-tag">→ Explore</span>
          </div>
        </div>
      </section>

      <section id="about" className="text-center">
        <h2 className="section-heading reveal">About Me</h2>
        <div className="glass about-content reveal" style={{ transitionDelay: '0.15s' }}>
          <p className="about-text">
            I am a passionate developer dedicated to building digital experiences that are both functional and beautiful.
            With an eye for detail and a background in both engineering and design, I bridge the gap between complex code
            and elegant user interfaces.
          </p>
        </div>
      </section>

      <section id="contact" className="text-center">
        <h2 className="section-heading reveal" style={{ marginBottom: '20px' }}>Get In Touch</h2>
        <p className="contact-text reveal" style={{ transitionDelay: '0.1s' }}>Interested in working together? Drop me a line.</p>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group reveal" style={{ transitionDelay: '0.2s' }}>
            <input type="text" placeholder="Your Name" required />
          </div>
          <div className="form-group reveal" style={{ transitionDelay: '0.3s' }}>
            <input type="email" placeholder="Your Email" required />
          </div>
          <div className="form-group reveal" style={{ transitionDelay: '0.4s' }}>
            <textarea placeholder="Your Message" rows="5" required></textarea>
          </div>
          <button type="submit" className="btn-primary reveal" style={{ transitionDelay: '0.5s', width: '100%', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-main)', fontSize: '1rem' }}>
            Send Message
          </button>
        </form>
      </section>

      <footer>
        <div className="social-links">
          <a href="https://github.com/Adbhut1234" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://www.linkedin.com/in/adbhut-pandey-4143443b4/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="https://x.com/encodexofficial" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
          </a>
        </div>
        <p>© 2026 Adi Pandey. Built with React & Vite.</p>
      </footer>
    </div>
  )
}

export default App
