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

  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach((item) => {
    const activate = () => {
      accordionItems.forEach((otherItem) => otherItem.classList.remove('is-active'));
      item.classList.add('is-active');
    };

    item.addEventListener('mouseenter', activate);
    item.addEventListener('focus', activate);
    item.addEventListener('click', activate);
  });

  const revealHeading = document.querySelector('[data-word-reveal]');

  if (reduceMotion || !window.gsap || !window.ScrollTrigger) return;

  if (revealHeading) {
    const words = revealHeading.textContent.trim().split(/\s+/);
    revealHeading.innerHTML = words.map((word) => `<span class="word">${word}</span>`).join(' ');
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
      opacity: 1,
      stagger: 0.08,
      ease: 'none',
      scrollTrigger: {
        trigger: revealHeading,
        start: 'top 82%',
        end: 'bottom 42%',
        scrub: true
      }
    });
  }

  gsap.utils.toArray('.capability-panel').forEach((panel) => {
    gsap.from(panel, {
      y: 45,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: panel,
        start: 'top 86%'
      }
    });
  });

  const processCards = gsap.utils.toArray('.process-card');
  if (processCards.length && window.innerWidth > 820) {
    processCards.forEach((card, index) => {
      gsap.set(card, { transformOrigin: 'top center' });
      if (index < processCards.length - 1) {
        gsap.to(card, {
          scale: 0.94 + index * 0.018,
          ease: 'none',
          scrollTrigger: {
            trigger: processCards[index + 1],
            start: 'top 80%',
            end: 'top 34%',
            scrub: true
          }
        });
      }
    });
  }

  const impactItems = document.querySelectorAll('.impact-list article');
  const impactLayout = document.querySelector('.impact-layout');
  if (impactItems.length && impactLayout) {
    gsap.from(impactItems, {
      x: 40,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: impactLayout,
        start: 'top 78%'
      }
    });
  }
})();
