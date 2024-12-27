import React, { useState, useEffect } from 'react';
import { Camera, Heart, Terminal, Map, Users, X } from 'lucide-react';
import styles from './App.module.css';

const LoadingOverlay = ({ isLoading }) => {
  const messages = [
    "Compiling love...",
    "Running final tests...",
    "Deploying forever.js...",
    "Checking compatibility... 100% match found!",
    "Initializing happiness...",
    "Merging hearts..."
  ];

  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setMessage(messages[Math.floor(Math.random() * messages.length)]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingContent}>
        <Terminal className={styles.loadingIcon} />
        <div className={styles.loadingText}>{message}</div>
      </div>
    </div>
  );
};

const NavProgress = ({ sections }) => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop - windowHeight / 3 &&
            scrollPosition < offsetTop + offsetHeight - windowHeight / 3) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <div className={styles.navDots}>
      {sections.map(section => (
        <div
          key={section}
          onClick={() => {
            document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`${styles.navDot} ${activeSection === section ? styles.navDotActive : styles.navDotInactive
            }`}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = new Date('2024-11-17T00:00:00');
      const difference = weddingDate - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <div className="pattern-circuit absolute inset-0 opacity-5" />
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Russi & Amrita</h1>
        <p className={styles.heroSubtitle}><s>are embarking on their forever journey</s></p>

        <div className={styles.heroDate}>are now married!</div>

        <div className={styles.countdown}>
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className={styles.countdownItem}>
              <div className={styles.countdownValue}>{value}</div>
              <div className={styles.countdownLabel}>{unit}</div>
            </div>
          ))}
        </div>

        <div className={styles.hashtag}>#DeployingHappiness</div>
      </div>

      <Heart className={styles.heartIcon} />
    </section>
  );
};

const Story = () => {
  return (
    <section id="story" className={styles.story}>
      <div className="pattern-circuit absolute inset-0 opacity-5" />
      <div className={`${styles.container} ${styles.storyContent}`}>
        <h2 className={styles.sectionTitle}>Our Story</h2>
        <div className={styles.prose}>
          <p>
            In the heart of Mumbai's corporate jungle, fate had a sense of irony.
            Capital Social - a place that's beautifully paradoxical, where suits meet sneakers
            and cocktails meet cutting-edge conversations - became our merge point. Who knew
            this fancy-meets-casual spot would write our git commit message to forever?
          </p>
          <p>
            Two minds, equally sharp but wonderfully different - where deep learning met
            distributed systems, and artificial intelligence danced with pure mathematics.
            Their shared love for deep tech and scientific pursuits was obvious, but their
            approaches to life's beautiful complexities couldn't have been more complementary.
          </p>
          <p>
            Their paths were like parallel threads in life's grand computation - his sanctuary
            was in mountain solitude with computers humming in the background, while she found
            joy in exploring the world's historic wonders. He dove deep into theoretical frameworks;
            she balanced profound technical expertise with an appreciation for life's finer experiences.
          </p>
          <p>
            Through years of continuous integration and continuous deployment (pun intended!),
            they discovered that life's best features come from merging different git branches.
            Today, they're ready to deploy their biggest production release yet - with zero
            downtime and 100% uptime promised! ❤️
          </p>
        </div>
      </div>
    </section>
  );
};

const Venue = () => {
  return (
    <section id="venue" className={styles.venue}>
      <div className={styles.container}>
        {/* <h2 className={styles.sectionTitle}>Venues</h2> */}

        <div className={styles.venueGrid}>
          {/* Wedding Venue */}
          <div className={styles.venueCard}>
            <h3 className={styles.venueName}>Wedding</h3>
            <div className={styles.venueInfo}>
              <h4 className={styles.venueTitle}>Airport City Hotel</h4>
              <div className={styles.venueAddress}>
                <p>Khalisha Kota, Birati</p>
                <p>North Dumdum, Kolkata</p>
              </div>
            </div>

            <div className={styles.venueMap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.9880575613606!2d88.43282477610424!3d22.654233879433654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89e56ad8e69f1%3A0x3cab1511477c16f5!2sAirport%20City%20Hotel%2C%20Banquet%20Hall%20(Weddingz.in%20Partner)!5e0!3m2!1sen!2ssg!4v1730403694167!5m2!1sen!2ssg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Reception Venue */}
          <div className={styles.venueCard}>
            <h3 className={styles.venueName}>Reception</h3>
            <div className={styles.venueInfo}>
              <h4 className={styles.venueTitle}>Kanha Banquets</h4>
              <div className={styles.venueAddress}>
                <p>Synthesis Business Park, Plot No CBD/1, 9th Floor, Wing A</p>
                <p>New Town, beside Mothers Wax Museum, Action Area I, Newtown, Kolkata</p>
              </div>
            </div>

            <div className={styles.venueMap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.4414370472605!2d88.46978797610295!3d22.599985079472177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275b3337338cf%3A0x21e77463eece3f64!2sKanha%20banquet!5e0!3m2!1sen!2ssg!4v1730544571815!5m2!1sen!2ssg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '1',
    notes: '',
    attending: null
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section id="rsvp" className={styles.rsvp}>
      <div className={styles.rsvpForm}>
        <div className={styles.formHeader}>
          <Terminal className="w-5 h-5 mr-2" />
          <div>ISSUE #17112024: Attendance Confirmation Required</div>
        </div>

        <form onSubmit={handleSubmit} className={styles.formContent}>
          <div className={styles.formGroup}>
            <div className={styles.attendanceButtons}>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, attending: true }))}
                className={`${styles.attendanceButton} ${formData.attending === true ? styles.attendingYes : ''
                  }`}
              >
                Attending
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, attending: false }))}
                className={`${styles.attendanceButton} ${formData.attending === false ? styles.attendingNo : ''
                  }`}
              >
                Unable to Attend
              </button>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Name *</label>
              <input
                type="text"
                required
                className={styles.formInput}
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="console.log(yourName)"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email *</label>
              <input
                type="email"
                required
                className={styles.formInput}
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Number of Guests</label>
              <select
                className={styles.formInput}
                value={formData.guests}
                onChange={e => setFormData(prev => ({ ...prev, guests: e.target.value }))}
              >
                {[1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Additional Notes</label>
              <textarea
                className={styles.formInput}
                rows="4"
                value={formData.notes}
                onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="/* Any special requirements or wishes */"
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </div>
        </form>

        {isSubmitted && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded font-mono">
            ✓ Issue successfully submitted! Thank you for your response.
          </div>
        )}
      </div>
    </section>
  );
};

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const photos = [
    {
      id: 0,
      src: "/assets/us/IMG_0360.png",
      commit: "Initial commit 🎉",
      author: "Russi"
    },
    {
      id: 1,
      src: "/assets/us/IMG_0331.png",
      commit: "Pandemic is upon us 🤧",
      author: "Russi"
    },
    {
      id: 2,
      src: "/assets/us/IMG20231016171929.jpg",
      commit: "Well fed and happy 🍲",
      author: "Russi"
    },
    {
      id: 3,
      src: "/assets/us/IMG20240120165514.jpg",
      commit: "The city exploration 🌻",
      author: "Russi"
    },
    {
      id: 4,
      src: "/assets/us/IMG_3841.png",
      commit: "The early morning airport drop 🌅",
      author: "Russi"
    },
    {
      id: 5,
      src: "/assets/us/IMG_3893.png",
      commit: "The Durga Puja vibes 🙏",
      author: "Russi"
    },
  ];

  return (
    <section id="gallery" className={styles.gallery}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Git Commit History: Our Journey</h2>

        <div className={styles.galleryGrid}>
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={styles.galleryItem}
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.src}
                alt={photo.commit}
                className={styles.galleryImage}
              />
              <div className={styles.galleryInfo}>
                <div className={styles.commitHash}>commit {photo.id}</div>
                <div className={styles.commitMessage}>{photo.commit}</div>
                <div className={styles.commitMeta}>
                  {/* <div>Date: {photo.date}</div> */}
                  {/* <div>Author: {photo.author}</div> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedPhoto && (
          <div className={styles.modal} onClick={() => setSelectedPhoto(null)}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setSelectedPhoto(null)}
                className={styles.modalClose}
              >
                <X className="w-6 h-6" />
              </button>
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.commit}
                className={styles.modalImage}
              />
              <div className={styles.modalInfo}>
                <div className={styles.commitHash}>
                  commit {selectedPhoto.id}
                </div>
                <div className={styles.commitMessage}>{selectedPhoto.commit}</div>
                <div className={styles.commitMeta}>
                  <div>Date: {selectedPhoto.date}</div>
                  <div>Author: {selectedPhoto.author}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const Footer = () => {
  const [terminalText, setTerminalText] = useState('');
  const fullText = '$ git commit -m "Forever together" && git push\n\n 💕💕💕💕💕💕💕 Comitted!';

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTerminalText(fullText.slice(0, index));
        index++;
      } else {
        setTimeout(() => {
          index = 0;
        }, 3000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footerWaves}>
      </div>

      <div className={styles.footerContent}>
        <div className={styles.footerTerminal}>
          <div className={styles.terminalHeader}>
            <span className={styles.terminalDot}></span>
            <span className={styles.terminalDot}></span>
            <span className={styles.terminalDot}></span>
          </div>
          <div className={styles.terminalBody}>
            <div className={styles.terminalText}>
              {terminalText}
              <span className={styles.cursor}>_</span>
            </div>
          </div>
        </div>

        <div className={styles.footerInfo}>
          <div className={styles.footerHashtag}>#DeployingHappiness</div>
          <div className={styles.footerDate}>🧿 🧿</div>
          <div className={styles.footerCredit}>
            <Heart className={styles.footerHeart} />
            <span>Russi & Amrita</span>
          </div>
        </div>

        <div className={styles.footerLinks}>
          <a href="#hero" className={styles.footerLink}>Home</a>
          <a href="#story" className={styles.footerLink}>Our Story</a>
          <a href="#venue" className={styles.footerLink}>Venue</a>
          <a href="#rsvp" className={styles.footerLink}>RSVP</a>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const sections = ['hero', 'story', 'venue', 'rsvp', 'gallery'];

  useEffect(() => {
    // Load fonts
    const fonts = [
      'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap',
      'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap'
    ];

    fonts.forEach(font => {
      const link = document.createElement('link');
      link.href = font;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    });

    // Simulate initial loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const themes = {
    default: {
      '--primary': '#9f101d',       // Deep Bengali red
      '--primary-dark': '#570a0b',  // Darker red
      '--primary-light': '#9f101d', // Light pink
      '--secondary': '#D4AF37',     // Royal gold
      '--secondary-light': '#FFF8E7',// Light gold
    }
  };

  const toggleTheme = (themeName) => {
    const root = document.documentElement;
    Object.entries(themes[themeName]).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  toggleTheme("default");

  return (
    <div className={styles.app}>
      <LoadingOverlay isLoading={isLoading} />
      <NavProgress sections={sections} />

      {/* <div className={styles.themeSwitcher}>
        {Object.keys(themes).map(theme => (
          <button
            key={theme}
            onClick={() => toggleTheme(theme)}
            className={styles.themeButton}
          >
            {theme}
          </button>
        ))}
      </div> */}

      {!isLoading && (
        <>
          <Hero />
          <Story />
          <Venue />
          <RSVP />
          <PhotoGallery />
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;
