// Initialize Lucide Icons
lucide.createIcons();

// Register GSAP ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger);

// ==========================================================================
// 1. SCROLL PROGRESS & DECRYPTION VALUE
// ==========================================================================
function updateScrollProgress() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const percent = Math.min(Math.round((scrollTop / docHeight) * 100), 100);
    
    // Update progress bar width
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = `${percent}%`;
    }
    
    // Update label percent text
    const progressPercent = document.getElementById('progress-percent');
    if (progressPercent) {
        progressPercent.textContent = `${percent}%`;
    }
}
window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('resize', updateScrollProgress);

// Dynamically sync video audio states on scroll
function handleScrollMuting() {
    if (typeof audioInitialized !== 'undefined' && audioInitialized) {
        updateMuteUI();
        if (typeof syncDeckControls === 'function') {
            syncDeckControls();
        }
    }
}
window.addEventListener('scroll', handleScrollMuting);

// ==========================================================================
// 2. HERO VIDEO SCROLLING PARALLAX & GLITCH EFFECT
// ==========================================================================
// Zoom, blur, and fade out background video as user scrolls down
if (window.innerWidth > 768) {
    gsap.to(".video-background-container", {
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        scale: 1.15,
        filter: "blur(6px)",
        opacity: 0.15,
        y: 60
    });
}

// Fade out hero content slightly faster than the background
gsap.to(".hero-content", {
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "60% top",
        scrub: true
    },
    opacity: 0,
    y: -40
});

// ==========================================================================
// 3. NAVIGATION MANAGEMENT (DESKTOP & MOBILE Hamburger)
// ==========================================================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
const menuToggle = document.querySelector('.menu-toggle');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

// Scroll Spy to highlight active section in Navbar
function scrollSpy() {
    let current = '';
    const scrollPos = window.scrollY + 200; // offset for header

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === current) {
            link.classList.add('active');
        }
    });
}
window.addEventListener('scroll', scrollSpy);

// Mobile Hamburger toggle
if (menuToggle && mobileNavDrawer) {
    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.classList.toggle('open');
        mobileNavDrawer.classList.toggle('open');
        if (isOpen) {
            document.body.classList.add('hud-locked');
        } else {
            document.body.classList.remove('hud-locked');
        }
    });
}

// Nav link hover & click audio hooks
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        if (typeof sysAudio !== 'undefined') sysAudio.playHover();
    });
    link.addEventListener('click', () => {
        if (typeof sysAudio !== 'undefined') sysAudio.playClick();
    });
});

mobileLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        if (typeof sysAudio !== 'undefined') sysAudio.playHover();
    });
    link.addEventListener('click', () => {
        if (typeof sysAudio !== 'undefined') sysAudio.playClick();
    });
});

// Close mobile menu on nav link click
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        mobileNavDrawer.classList.remove('open');
        document.body.classList.remove('hud-locked');
        
        // Update active class immediately
        mobileLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ==========================================================================
// 4. OPERATOR DOSSIER TABS & ANIMATED SPECS
// ==========================================================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and tabs
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        const targetContent = document.getElementById(`tab-${tabId}`);
        
        if (targetContent) {
            targetContent.classList.add('active');
            
            // If specs tab is selected, trigger progress bar fill animations
            if (tabId === 'specs') {
                animateSpecBars();
            }
        }
    });
});

function animateSpecBars() {
    const fills = document.querySelectorAll('.spec-bar-fill');
    fills.forEach(fill => {
        // Reset to 0 then animate to style value
        const targetWidth = fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => {
            fill.style.width = targetWidth;
        }, 50);
    });
}

// Automatically animate specs if in viewport (backup ScrollTrigger)
ScrollTrigger.create({
    trigger: "#dossier",
    start: "top 40%",
    onEnter: () => {
        const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
        if (activeTab === 'specs') {
            animateSpecBars();
        }
    }
});

// ==========================================================================
// 5. DECLASSIFIED MISSION ARCHIVES BINDER & TRANSITION SCAN
// ==========================================================================
const missionDossiers = [
    {
        name: "OPERATION RED FOREST",
        subtitle: "AL MAZRAH MISSILE // OVERNIGHT RAID",
        date: "OCTOBER 25",
        location: "AFGHANISTAN",
        threat: "HIGH",
        status: "SUCCESS",
        objectives: "TF-141 hunts an Iranian Quds Force officer, Hassan Zyani, in Afghanistan. Ghost leads an overnight raid on a desert base to stop Hassan from launching a US-made cruise missile.",
        summary: "The team fights through Al-Qatala insurgents and destroys the missile under heavy fire, securing the compound and stopping local launcher telemetry.",
        transcript: "“We’re a team… no one fights alone. This happened on my watch – I can’t fix it alone.”"
    },
    {
        name: "OPERATION DESERT CARTEL",
        subtitle: "LAS ALMAS CARTEL // STRONGHOLD ASSAULT",
        date: "NOVEMBER 03",
        location: "LAS ALMAS, MEXICO",
        threat: "EXTREME",
        status: "SUCCESS",
        objectives: "Tracking Hassan’s trail to Mexico, Ghost and Soap join Mexican Special Forces in a jungle cartel stronghold. They fight through cartel soldiers (and rogue army elements) to capture Zyani.",
        summary: "The mission ends in a tense standoff in the desert, interrogating Hassan for critical intelligence on hidden missiles and regional smuggling tunnels.",
        transcript: "“Watch your arse – you’ve got exactly zero allies down there. Keep your blood in you… you’ll need every drop.”"
    },
    {
        name: "OPERATION PRISON BREAK",
        subtitle: "BLACK-SITE PENITENTIARY // COVERT INFILTRATION",
        date: "NOVEMBER 12",
        location: "CLASSIFIED BLACK-SITE",
        threat: "HIGH",
        status: "SUCCESS",
        objectives: "After a corrupt general’s betrayal, Ghost assembles a strike team including Alejandro Vargas, Laswell, Price, and Gaz to infiltrate a high-security black-site prison.",
        summary: "In a daring night raid, they breach the compound, free captured allies, and execute a high-speed vehicle escape under heavy pressure.",
        transcript: "“This happened on my watch – I can’t fix it alone. People you know can hurt you the most.”"
    },
    {
        name: "OPERATION GHOST TEAM ASSAULT",
        subtitle: "HQ SIEGE // JTF-GHOST TASKING",
        date: "NOVEMBER 16",
        location: "LAS ALMAS HQ",
        threat: "EXTREME",
        status: "SUCCESS",
        objectives: "With Commander Graves on the run, Ghost helps form JTF-Ghost Team. They launch a coordinated daylight assault on a fortified headquarters.",
        summary: "Ghost provides cover fire and tactical pathing as Soap moves to neutralize the commander, effectively dismantling the shadow faction leadership.",
        transcript: "“That’ll do! Stay frosty. We’re teammates – friendship’s not in the field manual.”"
    },
    {
        name: "OPERATION MIDNIGHT OIL RIG",
        subtitle: "GULF MISSILE DEFENSE // SEABORNE ASSAULT",
        date: "NOVEMBER 19",
        location: "GULF OF MEXICO",
        threat: "EXTREME",
        status: "SUCCESS",
        objectives: "Using intelligence extracted from Valeria Garza, Ghost leads a covert naval assault under cover of stormy seas and zero illumination.",
        summary: "The assault team boards a hostile oil rig, defuses security clusters, and destroys a hidden ballistic missile cache before its launch window opens.",
        transcript: "“Keep your blood in you… you’ll need every drop. Don’t ask for backup when the fire starts.”"
    },
    {
        name: "OPERATION ISLAND EXTRACTION",
        subtitle: "ROMANOVA SAFEHOUSE // COVER RECON",
        date: "DECEMBER 05",
        location: "PRIVATE ISLAND",
        threat: "MEDIUM",
        status: "SUCCESS",
        objectives: "Intelligence marks the private island retreat of Milena Romanova (Makarov’s financier). Ghost and Soap execute a stealth landing.",
        summary: "Ghost provides sniper overwatch from high cliffs as the team breaches a beachfront villa to secure target files and financial telemetry data.",
        transcript: "“Tell me something I don’t know. Friendship’s not in the field manual.”"
    },
    {
        name: "OPERATION DAM DEFENSE",
        subtitle: "VERDANSK RESERVOIR // AMBUSH & DEFUSE",
        date: "DECEMBER 24",
        location: "VERDANSK DAM",
        threat: "HIGH",
        status: "SUCCESS",
        objectives: "Enemy saboteurs rig the main reservoir dam in rural Verdansk. Ghost, Farah, and Gaz organize an immediate counter-ambush at nightfall.",
        summary: "Ghost coordinates sniper cover from the ridge while Soap and the ground team race across the frozen structure to defuse multi-stage explosives.",
        transcript: "“Stay frosty. In our unit, everyone covers each other – we survive together.”"
    },
    {
        name: "OPERATION VERDANSK HEIST",
        subtitle: "AIRPORT INTERDICTION // ASSET RETRIEVAL",
        date: "JANUARY 15",
        location: "VERDANSK TERMINAL",
        threat: "EXTREME",
        status: "SUCCESS",
        objectives: "Amid widespread civil collapse, Ghost leads a tactical strike unit to retrieve a stolen nuclear reactor core from an occupied airport terminal.",
        summary: "Secures core under heavy fire. When the Armistice initiative collapses, Ghost coordinates a tight defensive perimeter and secures a live extraction.",
        transcript: "“People you know can hurt you the most. Trust is a luxury we don't have down here.”"
    },
    {
        name: "OPERATION CHICAGO STANDOFF",
        subtitle: "CONGRESSIONAL PLAZA // SNIPER COUNTER",
        date: "FEBRUARY 02",
        location: "CHICAGO, IL",
        threat: "CRITICAL",
        status: "SUCCESS",
        objectives: "In the campaign's climax, Ghost positions himself on an adjacent skyscraper to lay a sniper trap for Hassan Zyani.",
        summary: "As Hassan prepares to detonate the missile payload targeting Washington, Ghost takes the critical shot, eliminating the target and ending the crisis.",
        transcript: "“We’re teammates – friendship’s not in the field manual. One shot, one threat ended.”"
    },
    {
        name: "OPERATION ARMISTICE EVACUATION",
        subtitle: "FOG STREET EXTRACTION // COVERT PUSH",
        date: "MARCH 11",
        location: "VERDANSK CITY",
        threat: "CRITICAL",
        status: "ACTIVE",
        objectives: "As Verdansk falls to massive insurgent numbers, Ghost manages the tactical withdrawal and evacuation of key international personnel.",
        summary: "Guides survivors through dense fog and burning blocks. Ghost radios Captain Price to warn of internal betrayals and request reinforcement.",
        transcript: "“What has two legs and bleeds? Half a dog. Don’t ask. Just keep moving.”"
    }
];

const missionTabBtns = document.querySelectorAll('.mission-tab-btn');

missionTabBtns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        if (typeof sysAudio !== 'undefined') sysAudio.playHover();
    });

    btn.addEventListener('click', (e) => {
        if (btn.classList.contains('active')) return;
        
        if (typeof sysAudio !== 'undefined') sysAudio.playScan();
        
        // Update active tab buttons
        missionTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const idx = parseInt(btn.getAttribute('data-mission-idx'));
        const data = missionDossiers[idx];
        
        if (data) {
            const laser = document.querySelector('.dossier-laser');
            const paper = document.querySelector('.dossier-paper');
            
            // GSAP scanning transition animations
            gsap.killTweensOf(laser);
            gsap.killTweensOf(paper);
            
            gsap.timeline()
                .to(laser, { top: '0%', opacity: 1, duration: 0 })
                .to(laser, { top: '100%', opacity: 0.8, duration: 0.4, ease: "power1.inOut" })
                .to(laser, { opacity: 0, duration: 0.15 });
                
            gsap.timeline()
                .to(paper, { opacity: 0.3, filter: "blur(2px)", duration: 0.15 })
                .to(paper, { opacity: 1, filter: "blur(0px)", duration: 0.25, onStart: () => {
                    // Update content
                    document.getElementById('m-folder-title').textContent = data.name;
                    document.getElementById('m-folder-subtitle').textContent = data.subtitle;
                    document.getElementById('m-meta-date').textContent = data.date;
                    document.getElementById('m-meta-location').textContent = data.location;
                    
                    const threatEl = document.getElementById('m-meta-threat');
                    threatEl.textContent = data.threat;
                    if (data.threat === 'CRITICAL' || data.threat === 'EXTREME') {
                        threatEl.className = 'value text-red';
                    } else if (data.threat === 'HIGH') {
                        threatEl.className = 'value text-orange';
                    } else {
                        threatEl.className = 'value text-green';
                    }
                    
                    const statusEl = document.getElementById('m-meta-status');
                    statusEl.textContent = data.status;
                    statusEl.className = `value status-badge ${data.status}`;
                    
                    document.getElementById('m-objectives').textContent = data.objectives;
                    document.getElementById('m-summary').textContent = data.summary;
                    document.getElementById('m-transcript').textContent = data.transcript;
                    
                    // Re-render Lucide icons
                    if (window.lucide) {
                        window.lucide.createIcons();
                    }
                }});
        }
    });
});

// ==========================================================================
// 6. CCTV COMMAND MONITOR & FEEDS
// ==========================================================================
const feedItems = document.querySelectorAll('.feed-item');
const cctvPlayer = document.getElementById('cctv-player');
const activeCamLabel = document.getElementById('active-cam-num');
const staticFlash = document.querySelector('.monitor-static-flash');

feedItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        if (typeof sysAudio !== 'undefined') sysAudio.playHover();
    });

    item.addEventListener('click', () => {
        if (item.classList.contains('active')) return;
        
        if (typeof sysAudio !== 'undefined') {
            sysAudio.playClick();
            sysAudio.playStatic();
        }

        // Toggle active list item
        feedItems.forEach(f => f.classList.remove('active'));
        item.classList.add('active');

        // Capture new source and camera label
        const videoSrc = item.getAttribute('data-video');
        const camLabel = item.getAttribute('data-cam');

        // CCTV reconnect static flash visual effect
        gsap.killTweensOf(staticFlash);
        gsap.timeline()
            .to(staticFlash, { opacity: 0.85, duration: 0.05 })
            .to(staticFlash, { opacity: 0.1, duration: 0.05 })
            .to(staticFlash, { opacity: 0.6, duration: 0.04 })
            .to(staticFlash, { opacity: 0, duration: 0.15, onStart: () => {
                // Update source on main video player mid-flash
                if (cctvPlayer) {
                    cctvPlayer.src = videoSrc;
                    cctvPlayer.load();
                    cctvPlayer.muted = !audioInitialized || sysAudio.isMuted;
                    cctvPlayer.play().catch(e => console.log("CCTV Autoplay policy check:", e));
                }
                if (activeCamLabel) {
                    activeCamLabel.textContent = camLabel;
                }
            }});
    });
});

// Sync CCTV sidebar feeds hover-looping state (un-muting is blocked, just play loops)
feedItems.forEach(item => {
    const video = item.querySelector('.feed-thumbnail video');
    if (video) {
        item.addEventListener('mouseenter', () => {
            video.play().catch(e => {});
        });
        item.addEventListener('mouseleave', () => {
            video.pause();
        });
    }
});

// ==========================================================================
// 7. WEAPON BLUEPRINT SHOWCASE (ARMORY)
// ==========================================================================
const weaponButtons = document.querySelectorAll('.weapon-sel-btn');
const wpnName = document.getElementById('wpn-name');
const wpnClass = document.getElementById('wpn-class');
const wpnDesc = document.getElementById('wpn-desc');
const wpnImg = document.getElementById('wpn-img');
const wpnCal = document.getElementById('wpn-meta-cal');
const wpnCap = document.getElementById('wpn-meta-cap');
const wpnWt = document.getElementById('wpn-meta-wt');

// Weapons detailed data structure referencing generated blueprints
const weaponData = {
    acr: {
        name: "ACR 5.56 TACTICAL",
        class: "PRIMARY // ASSAULT RIFLE",
        desc: "Custom configured modular assault rifle. Features suppressor integration for flash reduction, heavy optical targeting, and laser targeting module. Configured specifically for long covert incursions.",
        stats: { firepower: 82, accuracy: 90, range: 76, mobility: 68 },
        caliber: "5.56×45mm NATO",
        mag: "30 RDS",
        weight: "3.6 KG",
        img: "asset/acr_blueprint.png"
    },
    knife: {
        name: "TACTICAL COMBAT KNIFE",
        class: "MELEE // CLOSE QUARTERS WEAPON",
        desc: "High-grade carbon steel tactical combat knife. Double-edged blade engineered for silent takedowns, lightweight, anti-reflective matte coating. Absolute reliability in close-quarters stealth operations.",
        stats: { firepower: 95, accuracy: 98, range: 5, mobility: 99 },
        caliber: "N/A (CQC)",
        mag: "UNLIMITED",
        weight: "0.28 KG",
        img: "asset/knife_blueprint.png"
    },
    pistol: {
        name: "USP .45 SIDEARM",
        class: "SECONDARY // HANDGUN",
        desc: "Semi-automatic tactical handgun equipped with quick-detach silencer. Combines high caliber stopping power with near-silent acoustic signature. Essential secondary sidearm for high-value target extractions.",
        stats: { firepower: 58, accuracy: 85, range: 35, mobility: 92 },
        caliber: ".45 ACP",
        mag: "12 RDS",
        weight: "1.1 KG",
        img: "asset/usp_blueprint.png"
    }
};

weaponButtons.forEach(btn => {
    // hover sounds
    btn.addEventListener('mouseenter', () => {
        if (typeof sysAudio !== 'undefined') sysAudio.playHover();
    });

    btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) return;

        if (typeof sysAudio !== 'undefined') sysAudio.playClick();

        weaponButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const key = btn.getAttribute('data-weapon');
        const data = weaponData[key];

        if (data && wpnImg) {
            // Animate blueprint image fade out and slide out
            gsap.killTweensOf(wpnImg);
            gsap.timeline()
                .to(wpnImg, { opacity: 0, x: -25, scale: 0.92, filter: "blur(4px)", duration: 0.18, ease: "power1.in", onComplete: () => {
                    // Update content elements
                    wpnName.textContent = data.name;
                    wpnClass.textContent = data.class;
                    wpnDesc.textContent = data.desc;
                    wpnImg.setAttribute('src', data.img);
                    wpnImg.setAttribute('alt', data.name);
                    
                    if (wpnCal) wpnCal.textContent = `CALIBER: ${data.caliber}`;
                    if (wpnCap) wpnCap.textContent = `MAG_CAP: ${data.mag}`;
                    if (wpnWt) wpnWt.textContent = `WEIGHT: ${data.weight}`;
                }})
                .to(wpnImg, { x: 25, scale: 1.08, duration: 0 }) // shift to the right to animate slide-in
                .to(wpnImg, { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", duration: 0.32, ease: "power2.out" });

            // Animate stats progress bars and text numbers
            animateWeaponStats(data.stats);
        }
    });
});

function animateWeaponStats(stats) {
    const categories = ['firepower', 'accuracy', 'range', 'mobility'];
    categories.forEach(cat => {
        const bar = document.getElementById(`wpn-stat-${cat}-bar`);
        const val = document.getElementById(`wpn-stat-${cat}-val`);
        const targetPercent = stats[cat];

        if (bar && val) {
            // Animate width of the bar
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = `${targetPercent}%`;
            }, 50);

            // Stagger numerical count up logic
            let currentVal = 0;
            const step = Math.ceil(targetPercent / 15);
            const countInterval = setInterval(() => {
                currentVal += step;
                if (currentVal >= targetPercent) {
                    val.textContent = `${targetPercent}%`;
                    clearInterval(countInterval);
                } else {
                    val.textContent = `${currentVal}%`;
                }
            }, 30);
        }
    });
}

// ==========================================================================
// CINEMATIC SCROLLING & ENTRANCE EFFECTS
// ==========================================================================
// Section headers entrance animations
const sectionHeaders = document.querySelectorAll('.section-header');
sectionHeaders.forEach(header => {
    gsap.fromTo(header,
        { opacity: 0, y: 30 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: header,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play reverse play reverse"
            }
        }
    );
});

// Cinematic fade-in, fade-out, scale, and glow for the dossier photo card
gsap.fromTo(".dossier-photo-card",
    {
        opacity: 0,
        scale: 0.85,
        filter: "drop-shadow(0 0 0px rgba(0, 255, 68, 0))"
    },
    {
        opacity: 1,
        scale: 1,
        filter: "drop-shadow(0 0 25px rgba(0, 255, 68, 0.45))",
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#dossier",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
        }
    }
);

// Fade-in and fade-out for dossier info column
gsap.fromTo(".dossier-info",
    { opacity: 0, x: 40 },
    {
        opacity: 1,
        x: 0,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#dossier",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
        }
    }
);

// Fade-in and fade-out for missions layout
gsap.fromTo(".dossier-layout",
    { opacity: 0, y: 40 },
    {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#missions",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
        }
    }
);

// Fade-in and fade-out for CCTV grid
gsap.fromTo(".cctv-dashboard",
    { opacity: 0, y: 40 },
    {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#cctv",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
        }
    }
);

// Fade-in and fade-out for Action COD Feed container
gsap.fromTo(".full-screen-video-container",
    { opacity: 0, scale: 0.96 },
    {
        opacity: 1,
        scale: 1,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#action-feed",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
        }
    }
);

// Armory Weapons Showcase entrance triggers (play/reverse)
gsap.from(".weapons-selector", {
    scrollTrigger: {
        trigger: "#weapons",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse"
    },
    opacity: 0,
    x: -30,
    duration: 0.7,
    ease: "power2.out"
});

gsap.from(".weapon-blueprint-card", {
    scrollTrigger: {
        trigger: "#weapons",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse"
    },
    opacity: 0,
    x: 30,
    duration: 0.7,
    ease: "power2.out",
    onStart: () => {
        const activeBtn = document.querySelector('.weapon-sel-btn.active');
        if (activeBtn) {
            const key = activeBtn.getAttribute('data-weapon');
            if (weaponData[key]) {
                animateWeaponStats(weaponData[key].stats);
            }
        }
    }
});

// ==========================================================================
// 8. SERVICE TIMELINE SCROLL TRIGGER REVEALS
// ==========================================================================
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    const marker = item.querySelector('.timeline-marker');
    const content = item.querySelector('.timeline-content-wrapper');

    if (content) {
        gsap.from(content, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse"
            },
            opacity: 0,
            x: -40,
            duration: 0.6,
            ease: "power2.out"
        });
    }

    if (marker) {
        gsap.from(marker, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play reverse play reverse"
            },
            scale: 0,
            duration: 0.4,
            ease: "back.out(2)"
        });
    }
});

// Fade-in and fade-out for Decryption Terminal frame on scroll
gsap.fromTo(".terminal-frame",
    { opacity: 0, y: 40 },
    {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#terminal",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
        }
    }
);

// ==========================================================================
// 9. COMMAND TERMINAL DECRYPTION DECK
// ==========================================================================
const btnDecrypt = document.getElementById('btn-decrypt-quote');
const terminalText = document.getElementById('terminal-text');

// Stoic Ghost Quotes Pool
const quotes = [
    "We’re a team… This happened on my watch – I can’t fix it alone.",
    "Keep your blood in you… you’ll need every drop.",
    "Watch your arse – you’ve got exactly zero allies down there.",
    "People you know can hurt you the most.",
    "We’re teammates – friendship’s not in the field manual.",
    "What has two legs and bleeds? Half a dog. Don’t ask.",
    "Tell me something I don’t know.",
    "Stay frosty.",
    "That’ll do!",
    "In our unit, everyone covers each other – we survive together.",
    "Trust is a luxury we don't have down here.",
    "We don’t make noise… but when we strike, it’s impossible to ignore."
];

let lastQuoteIndex = 0;

function typeText(element, text, speed = 25) {
    element.innerHTML = "> ";
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, speed);
}

if (btnDecrypt && terminalText) {
    btnDecrypt.addEventListener('mouseenter', () => {
        if (typeof sysAudio !== 'undefined') sysAudio.playHover();
    });

    btnDecrypt.addEventListener('click', () => {
        if (typeof sysAudio !== 'undefined') {
            sysAudio.playUIConfirm();
        }

        // Pick new random quote (ensure it doesn't repeat the previous one)
        let randIndex = lastQuoteIndex;
        while (randIndex === lastQuoteIndex) {
            randIndex = Math.floor(Math.random() * quotes.length);
        }
        lastQuoteIndex = randIndex;
        const selectedQuote = quotes[randIndex];

        // Terminal style decryption visual effect
        let scrambleCount = 0;
        const scrambleInterval = setInterval(() => {
            const chars = '!@#$%^&*()_+{}[]|:;<>?,./';
            let scrambledText = '';
            for (let i = 0; i < selectedQuote.length; i++) {
                if (Math.random() > 0.3) {
                    scrambledText += chars.charAt(Math.floor(Math.random() * chars.length));
                } else {
                    scrambledText += selectedQuote.charAt(i);
                }
            }
            terminalText.textContent = `> [DECRYPTING: ${scrambledText.substring(0, 30)}...]`;
            
            // Play a rapid tactical decoding sound pattern
            if (typeof sysAudio !== 'undefined' && scrambleCount % 2 === 0) {
                sysAudio.playHover();
            }

            scrambleCount++;

            if (scrambleCount > 10) {
                clearInterval(scrambleInterval);
                typeText(terminalText, selectedQuote);
            }
        }, 55);
    });
}

// ==========================================================================
// 10. REAL-TIME UTC TELEMETRY & FOOTER SYSTEM CLOCK
// ==========================================================================
setInterval(() => {
    const now = new Date();
    const isoString = now.toISOString();
    
    // CCTV format: UTC hh:mm:ss.ms
    const cctvTimeElement = document.getElementById('cctv-timestamp');
    if (cctvTimeElement) {
        const msStr = String(now.getMilliseconds()).padStart(3, '0').substring(0, 2);
        cctvTimeElement.textContent = `UTC ${isoString.slice(11, 19)}.${msStr}`;
    }

    // System time footer clock: TIME: hh:mm:ss UTC
    const sysTimeElement = document.getElementById('system-time');
    if (sysTimeElement) {
        sysTimeElement.textContent = `TIME: ${isoString.slice(11, 19)} UTC`;
    }
}, 100);

// ==========================================================================
// 11. TAC-AUDIO SYNTHESIS SYSTEM (Web Audio API)
// ==========================================================================
class TacticalAudioSystem {
    constructor() {
        this.ctx = null;
        this.isMuted = true;
        this.ambientOsc = null;
        this.ambientGain = null;
        this.masterGain = null;
        this.noiseBuffer = null;
    }

    init() {
        if (this.ctx) return;
        
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
        
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
        
        // Render 0.5s white noise for CCTV transition static
        const bufferSize = this.ctx.sampleRate * 0.5;
        this.noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = this.noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.ctx) {
            const targetGain = this.isMuted ? 0 : 0.8;
            this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.15);
            if (!this.isMuted && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        }
        return this.isMuted;
    }

    startAmbient() {
        if (!this.ctx || this.ambientOsc) return;

        this.ambientOsc = this.ctx.createOscillator();
        this.ambientGain = this.ctx.createGain();
        
        this.ambientOsc.type = 'sine';
        this.ambientOsc.frequency.setValueAtTime(55, this.ctx.currentTime); // 55Hz hum
        
        const lpFilter = this.ctx.createBiquadFilter();
        lpFilter.type = 'lowpass';
        lpFilter.frequency.setValueAtTime(120, this.ctx.currentTime);
        
        this.ambientGain.gain.setValueAtTime(0.08, this.ctx.currentTime); // low hum
        
        this.ambientOsc.connect(lpFilter);
        lpFilter.connect(this.ambientGain);
        this.ambientGain.connect(this.masterGain);
        
        this.ambientOsc.start(0);
    }

    playHover() {
        if (!this.ctx || this.isMuted) return;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1600, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1100, this.ctx.currentTime + 0.05);
        
        gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start();
        osc.stop(this.ctx.currentTime + 0.06);
    }

    playClick() {
        if (!this.ctx || this.isMuted) return;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(950, this.ctx.currentTime);
        osc.frequency.setValueAtTime(1750, this.ctx.currentTime + 0.02);
        
        gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start();
        osc.stop(this.ctx.currentTime + 0.09);
    }

    playScan() {
        if (!this.ctx || this.isMuted) return;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(280, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.25);
        osc.frequency.exponentialRampToValueAtTime(750, this.ctx.currentTime + 0.4);
        
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.07, this.ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start();
        osc.stop(this.ctx.currentTime + 0.41);
    }

    playStatic() {
        if (!this.ctx || this.isMuted || !this.noiseBuffer) return;
        
        const source = this.ctx.createBufferSource();
        source.buffer = this.noiseBuffer;
        
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(900, this.ctx.currentTime);
        filter.Q.setValueAtTime(2.0, this.ctx.currentTime);
        
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);
        
        source.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        
        source.start();
        source.stop(this.ctx.currentTime + 0.23);
    }

    playUIConfirm() {
        if (!this.ctx || this.isMuted) return;
        
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(800, this.ctx.currentTime);
        
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1200, this.ctx.currentTime + 0.05);
        
        gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.04, this.ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.22);
        
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.masterGain);
        
        osc1.start();
        osc1.stop(this.ctx.currentTime + 0.22);
        
        osc2.start(this.ctx.currentTime + 0.05);
        osc2.stop(this.ctx.currentTime + 0.22);
    }
}

const sysAudio = new TacticalAudioSystem();

// Sync mute status & button iconography
function updateMuteUI() {
    const btnToggleMute = document.getElementById('btn-toggle-mute');
    if (btnToggleMute) {
        if (sysAudio.isMuted) {
            btnToggleMute.classList.remove('unmuted');
            btnToggleMute.innerHTML = '<i data-lucide="volume-x"></i>';
        } else {
            btnToggleMute.classList.add('unmuted');
            btnToggleMute.innerHTML = '<i data-lucide="volume-2"></i>';
        }
    }

    // Sync HTML5 video audio track state
    const heroVid = document.querySelector('.hero-video');
    const cctvPlayer = document.getElementById('cctv-player');
    const actionVid = document.getElementById('action-video');
    
    if (!audioInitialized || sysAudio.isMuted) {
        if (heroVid) heroVid.muted = true;
        if (cctvPlayer) cctvPlayer.muted = true;
        if (actionVid) actionVid.muted = true;
    } else {
        const scrollPos = window.scrollY + window.innerHeight / 2;
        let activeSection = 'hero';
        
        const sectionsList = document.querySelectorAll('section[id]');
        sectionsList.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                activeSection = section.getAttribute('id');
            }
        });
        
        if (activeSection === 'hero') {
            if (heroVid) heroVid.muted = false;
            if (cctvPlayer) cctvPlayer.muted = true;
            if (actionVid) actionVid.muted = true;
        } else if (activeSection === 'cctv') {
            if (heroVid) heroVid.muted = true;
            if (cctvPlayer) cctvPlayer.muted = false;
            if (actionVid) actionVid.muted = true;
        } else if (activeSection === 'action-feed') {
            if (heroVid) heroVid.muted = true;
            if (cctvPlayer) cctvPlayer.muted = true;
            if (actionVid) actionVid.muted = false;
        } else {
            // Mute all videos if in other text/dossier sections
            if (heroVid) heroVid.muted = true;
            if (cctvPlayer) cctvPlayer.muted = true;
            if (actionVid) actionVid.muted = true;
        }
    }

    // Sync Action Video feed mute button
    const btnActionMute = document.getElementById('btn-action-mute');
    if (btnActionMute) {
        const isMuted = !actionVid || actionVid.muted;
        if (isMuted) {
            btnActionMute.innerHTML = '<i data-lucide="volume-x" class="action-btn-icon"></i>';
        } else {
            btnActionMute.innerHTML = '<i data-lucide="volume-2" class="action-btn-icon"></i>';
        }
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

let audioInitialized = false;

function initAudioOnInteraction(e) {
    if (audioInitialized) return;
    
    sysAudio.init();
    
    if (sysAudio.ctx.state === 'suspended') {
        sysAudio.ctx.resume();
    }
    
    if (!sysAudio.isMuted) {
        sysAudio.startAmbient();
        sysAudio.playUIConfirm();
    }
    
    audioInitialized = true;
    if (e) {
        e.justInitializedAudio = true;
    }
    
    // Set high quality default volume for video background in hero
    const heroVid = document.querySelector('.hero-video');
    if (heroVid) {
        heroVid.volume = 0.8;
    }
    
    updateMuteUI();
    if (typeof syncDeckControls === 'function') {
        syncDeckControls();
    }
    
    // Remove engagement listeners
    document.removeEventListener('click', initAudioOnInteraction);
    document.removeEventListener('scroll', initAudioOnInteraction);
}

// Load audio preferences from local storage
const storedMute = localStorage.getItem('hud-mute');
if (storedMute === 'false') {
    sysAudio.isMuted = false;
} else if (storedMute === 'true') {
    sysAudio.isMuted = true;
} else {
    // Default setting: unmuted on user action
    sysAudio.isMuted = false;
}

// Attach gesture and scrolling triggers
document.addEventListener('click', initAudioOnInteraction);
document.addEventListener('scroll', initAudioOnInteraction);

// Bind header controls
document.addEventListener('DOMContentLoaded', () => {
    // Setup Cinematic Init Overlay
    const initOverlay = document.getElementById('hud-init-overlay');
    const initBtn = document.getElementById('btn-init-terminal');
    if (initOverlay && initBtn) {
        initBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Initialize Audio
            initAudioOnInteraction(e);
            
            // Hide the overlay
            initOverlay.classList.add('hidden');
            document.body.classList.remove('hud-locked');
            
            // Play system confirm sound
            if (typeof sysAudio !== 'undefined') {
                sysAudio.playUIConfirm();
            }

            // Explicitly play all main videos upon interaction to bypass mobile autoplay blocks
            const heroVid = document.querySelector('.hero-video');
            const cctvPlayer = document.getElementById('cctv-player');
            const actionVid = document.getElementById('action-video');

            if (heroVid) {
                heroVid.play().catch(err => console.log("Hero video play error:", err));
            }
            if (cctvPlayer) {
                cctvPlayer.play().catch(err => console.log("CCTV video play error:", err));
            }
            if (actionVid) {
                actionVid.play().catch(err => console.log("Action video play error:", err));
            }
        });
    }

    updateMuteUI();
    const btnToggleMute = document.getElementById('btn-toggle-mute');
    if (btnToggleMute) {
        btnToggleMute.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (!audioInitialized) {
                sysAudio.init();
                audioInitialized = true;
            }
            
            const isMutedNow = sysAudio.toggleMute();
            localStorage.setItem('hud-mute', isMutedNow ? 'true' : 'false');
            
            if (!isMutedNow) {
                sysAudio.startAmbient();
                sysAudio.playUIConfirm();
            }
            
            updateMuteUI();
        });
    }

    // Action COD Feed controls binding
    const btnActionPlay = document.getElementById('btn-action-play');
    const btnActionMute = document.getElementById('btn-action-mute');
    const actionVid = document.getElementById('action-video');
    const progressFill = document.getElementById('action-video-progress');

    if (actionVid) {
        // Fallback handler if primary video source fails to load
        actionVid.addEventListener('error', () => {
            console.log("Action video failed to load, trying local fallback...");
            const fallbackPath = "asset/library/GhostAction-1.mp4";
            if (!actionVid.src.includes(fallbackPath)) {
                actionVid.src = fallbackPath;
                actionVid.load();
                actionVid.play().catch(e => console.log("Fallback playback failed:", e));
            }
        });

        // Sync initial play status
        if (btnActionPlay) {
            btnActionPlay.innerHTML = actionVid.paused ? '<i data-lucide="play" class="action-btn-icon"></i>' : '<i data-lucide="pause" class="action-btn-icon"></i>';
            if (window.lucide) window.lucide.createIcons();
        }

        // Time update progress bar
        actionVid.addEventListener('timeupdate', () => {
            if (progressFill) {
                const percent = (actionVid.currentTime / actionVid.duration) * 100;
                progressFill.style.width = `${percent}%`;
            }
        });

        // Click play button
        if (btnActionPlay) {
            btnActionPlay.addEventListener('click', (e) => {
                e.stopPropagation();
                if (actionVid.paused) {
                    actionVid.play();
                    btnActionPlay.innerHTML = '<i data-lucide="pause" class="action-btn-icon"></i>';
                } else {
                    actionVid.pause();
                    btnActionPlay.innerHTML = '<i data-lucide="play" class="action-btn-icon"></i>';
                }
                if (window.lucide) window.lucide.createIcons();
                if (typeof sysAudio !== 'undefined') sysAudio.playClick();
            });
        }

        // Mute toggle inside Action Feed Section
        if (btnActionMute) {
            btnActionMute.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!audioInitialized) {
                    sysAudio.init();
                    audioInitialized = true;
                }
                const isMutedNow = sysAudio.toggleMute();
                localStorage.setItem('hud-mute', isMutedNow ? 'true' : 'false');
                
                if (!isMutedNow) {
                    sysAudio.startAmbient();
                    sysAudio.playUIConfirm();
                }
                updateMuteUI();
            });
        }
    }

    // ==========================================================================
    // TACTICAL MEDIA DECK WIDGET CONTROLLER
    // ==========================================================================
    const mediaDeck = document.getElementById('media-deck-widget');
    const btnToggleDeck = document.getElementById('btn-toggle-deck');
    const btnCloseDeck = document.getElementById('btn-close-deck');
    
    // Retrieve videos
    const getTargetVideo = (target) => {
        if (target === 'hero') return document.querySelector('.hero-video');
        if (target === 'intel') return document.getElementById('cctv-player');
        if (target === 'archive') return document.getElementById('action-video');
        return null;
    };
    
    // Open Deck
    if (btnToggleDeck && mediaDeck) {
        btnToggleDeck.addEventListener('click', (e) => {
            e.stopPropagation();
            mediaDeck.classList.remove('media-deck-collapsed');
            mediaDeck.classList.add('media-deck-expanded');
            if (typeof sysAudio !== 'undefined') sysAudio.playUIConfirm();
            syncDeckControls();
        });
    }
    
    // Close Deck
    if (btnCloseDeck && mediaDeck) {
        btnCloseDeck.addEventListener('click', (e) => {
            e.stopPropagation();
            mediaDeck.classList.remove('media-deck-expanded');
            mediaDeck.classList.add('media-deck-collapsed');
            if (typeof sysAudio !== 'undefined') sysAudio.playClick();
        });
    }
    
    // Sync UI elements to video states
    window.syncDeckControls = function() {
        const targets = ['hero', 'intel', 'archive'];
        
        targets.forEach(target => {
            const vid = getTargetVideo(target);
            const channelEl = document.getElementById(`chan-${target}`);
            if (!vid || !channelEl) return;
            
            const btnPlay = channelEl.querySelector('.btn-play');
            const btnMute = channelEl.querySelector('.btn-mute');
            const btnLoop = channelEl.querySelector('.btn-loop');
            
            // Sync Play/Pause
            if (btnPlay) {
                if (vid.paused) {
                    btnPlay.classList.add('paused');
                    btnPlay.innerHTML = '<i data-lucide="play"></i>';
                } else {
                    btnPlay.classList.remove('paused');
                    btnPlay.innerHTML = '<i data-lucide="pause"></i>';
                }
            }
            
            // Sync Mute
            if (btnMute) {
                if (vid.muted) {
                    btnMute.classList.add('active');
                    btnMute.innerHTML = '<i data-lucide="volume-x"></i>';
                } else {
                    btnMute.classList.remove('active');
                    btnMute.innerHTML = '<i data-lucide="volume-2"></i>';
                }
            }
            
            // Sync Loop
            if (btnLoop) {
                if (vid.loop) {
                    btnLoop.classList.add('active');
                } else {
                    btnLoop.classList.remove('active');
                }
            }
            
            // Sync Visualizer Active (only if playing and not muted and has volume)
            if (!vid.paused && !vid.muted && vid.volume > 0) {
                channelEl.classList.add('playing-active');
            } else {
                channelEl.classList.remove('playing-active');
            }
        });
        
        // Refresh icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    };
    
    // Bind Controls
    const chanBtns = document.querySelectorAll('.chan-btn');
    chanBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const target = btn.getAttribute('data-target');
            const vid = getTargetVideo(target);
            if (!vid) return;
            
            // Ensure audio is initialized on click if not already
            if (!audioInitialized && typeof initAudioOnInteraction === 'function') {
                initAudioOnInteraction(e);
            }
            
            if (btn.classList.contains('btn-play')) {
                if (vid.paused) {
                    vid.play().then(() => syncDeckControls()).catch(err => console.log(err));
                } else {
                    vid.pause();
                }
            } else if (btn.classList.contains('btn-mute')) {
                vid.muted = !vid.muted;
                // If unmuting hero video, set volume high
                if (!vid.muted && target === 'hero') {
                    vid.volume = 0.8;
                }
            } else if (btn.classList.contains('btn-loop')) {
                vid.loop = !vid.loop;
            }
            
            if (typeof sysAudio !== 'undefined') {
                sysAudio.playClick();
            }
            syncDeckControls();
        });
    });
    
    // Add page-level click to mute hero background video if active
    document.addEventListener('click', (e) => {
        // Ignore if clicking within the media deck widget
        if (e.target.closest('#media-deck-widget')) return;
        
        const heroVid = getTargetVideo('hero');
        if (heroVid && !heroVid.muted) {
            // Prevent muting immediately on the first click that initializes audio
            if (e.justInitializedAudio) return;
            
            heroVid.muted = true;
            if (typeof sysAudio !== 'undefined') {
                sysAudio.playStatic();
            }
            syncDeckControls();
        }
    });

    // Also sync the volume controls when videos trigger event listeners
    const videos = [getTargetVideo('hero'), getTargetVideo('intel'), getTargetVideo('archive')];
    videos.forEach(v => {
        if (v) {
            v.addEventListener('play', () => syncDeckControls());
            v.addEventListener('pause', () => syncDeckControls());
            v.addEventListener('volumechange', () => syncDeckControls());
        }
    });
    
    // ==========================================================================
    // 12. MEMORIES LIGHTBOX CONTROLLER
    // ==========================================================================
    const memoryContainers = document.querySelectorAll('.memory-image-container');
    const memoryLightbox = document.getElementById('memory-lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxFilename = document.getElementById('lightbox-filename');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const btnCloseLightbox = document.getElementById('btn-close-lightbox');

    if (memoryContainers.length > 0 && memoryLightbox) {
        memoryContainers.forEach(container => {
            container.addEventListener('click', (e) => {
                e.stopPropagation();
                const img = container.querySelector('.memory-img');
                if (!img) return;

                // Extract filename
                const imgSrc = img.getAttribute('src');
                const filename = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
                
                // Get description text from parent card
                const card = container.closest('.memory-card');
                const desc = card ? card.querySelector('.memory-desc').textContent : img.getAttribute('alt');

                // Update lightbox content
                if (lightboxImg) {
                    lightboxImg.setAttribute('src', imgSrc);
                    lightboxImg.setAttribute('alt', img.getAttribute('alt'));
                }
                if (lightboxFilename) {
                    lightboxFilename.textContent = filename.toUpperCase();
                }
                if (lightboxCaption) {
                    lightboxCaption.textContent = desc;
                }

                // Open Lightbox
                memoryLightbox.classList.add('active');

                // Audio effect
                if (typeof sysAudio !== 'undefined') {
                    sysAudio.playUIConfirm();
                }
            });
        });

        // Close functions
        const closeLightbox = () => {
            memoryLightbox.classList.remove('active');
            if (lightboxImg) {
                lightboxImg.setAttribute('src', ''); // Clear src to prevent flash of old image
            }
            if (typeof sysAudio !== 'undefined') {
                sysAudio.playClick();
            }
        };

        if (btnCloseLightbox) {
            btnCloseLightbox.addEventListener('click', (e) => {
                e.stopPropagation();
                closeLightbox();
            });
        }

        memoryLightbox.addEventListener('click', (e) => {
            // Close only if clicking outside the container frame itself
            if (!e.target.closest('.lightbox-content-frame') && !e.target.closest('.lightbox-hud-top') && !e.target.closest('.lightbox-hud-bottom')) {
                closeLightbox();
            }
        });

        // ESC Key to Close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && memoryLightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // GSAP ScrollTrigger for Memories Grid Cards (triggered individually for device compatibility)
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.utils.toArray(".memory-card").forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 40,
                duration: 0.6,
                ease: "power2.out"
            });
        });
    }

    // Refresh ScrollTrigger calculations after full page assets load
    window.addEventListener('load', () => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    });
    
    // Initial sync
    setTimeout(syncDeckControls, 500);
});
