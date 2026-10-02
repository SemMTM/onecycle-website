(() => {
  const body = document.body;
  const nav = document.querySelector('[data-nav]');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const closeNavigation = () => {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
    body.classList.remove('nav-open');
  };

  if (nav && navToggle) {
    navToggle.addEventListener('click', () => {
      const willOpen = navToggle.getAttribute('aria-expanded') === 'false';
      nav.classList.toggle('is-open', willOpen);
      navToggle.setAttribute('aria-expanded', String(willOpen));
      navToggle.setAttribute('aria-label', willOpen ? 'Close navigation' : 'Open navigation');
      body.classList.toggle('nav-open', willOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNavigation);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 850) closeNavigation();
    });
  }

  const revealHeading = document.querySelector('[data-word-reveal]');

  if (reduceMotion || !window.gsap || !window.ScrollTrigger) return;

  if (revealHeading) {
    const words = revealHeading.textContent.trim().split(/\s+/);
    revealHeading.innerHTML = words.map((word) => `<span class="word">${word}</span>`).join(' ');
    revealHeading.classList.add('is-scrub-ready');
  }

  gsap.registerPlugin(ScrollTrigger);

  const heroContent = document.querySelectorAll('.hero-content > *');
  if (heroContent.length) {
    gsap.from(heroContent, {
      y: 34,
      opacity: 0,
      duration: 1,
      stagger: 0.11,
      ease: 'power3.out'
    });
  }

  const heroOrbit = document.querySelector('.hero-orbit');
  if (heroOrbit) {
    gsap.from(heroOrbit, {
      scale: 0.82,
      opacity: 0,
      duration: 1.35,
      ease: 'power3.out'
    });
  }

  const internalHero = document.querySelector('.internal-hero-layout');
  if (internalHero) {
    gsap.from(internalHero.children, {
      y: 28,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out'
    });
  }

  gsap.utils.toArray('.reveal').forEach((element) => {
    gsap.from(element, {
      y: 34,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 86%'
      }
    });
  });

  if (revealHeading) {
    gsap.to(revealHeading.querySelectorAll('.word'), {
      color: '#0c1114',
      stagger: 0.08,
      ease: 'none',
      scrollTrigger: {
        trigger: revealHeading,
        start: 'top 80%',
        end: 'bottom 42%',
        scrub: true
      }
    });
  }

  gsap.utils.toArray('.service-row').forEach((row) => {
    gsap.from(row, {
      y: 24,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: row,
        start: 'top 86%'
      }
    });
  });

  const impactItems = document.querySelectorAll('.impact-grid article');
  const impactLayout = document.querySelector('.impact-grid');
  if (impactItems.length && impactLayout) {
    gsap.from(impactItems, {
      y: 24,
      opacity: 0,
      duration: 0.75,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: impactLayout,
        start: 'top 78%'
      }
    });
  }
})();
