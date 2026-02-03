/**
 * Enhanced About Section - Vanilla JS Implementation
 * Converts React/Framer Motion to pure JavaScript
 * Features: Parallax scrolling, decorative shapes, animated stats, staggered content
 */

class EnhancedAboutSection {
  constructor() {
    this.isInView = false;
    this.stats = [
      { value: "10+", label: "Projects" },
      { value: "5+", label: "Technologies" },
      { value: "100%", label: "Dedication" },
    ];
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.renderDecorativeShapes();
  }

  setupIntersectionObserver() {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) return;

    const options = {
      threshold: 0.1,
      rootMargin: '-100px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.isInView = true;
          this.animateAboutContent();
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(aboutSection);
  }

  animateAboutContent() {
    // Animate left side decorative
    const leftDecorative = document.querySelector('.about-decorative-left');
    if (leftDecorative) {
      leftDecorative.style.animation = `fadeInLeft 1s cubic-bezier(0.6, 0.05, 0.01, 0.99) forwards`;
    }

    // Animate section label
    const label = document.querySelector('.about-label');
    if (label) {
      setTimeout(() => {
        label.style.animation = `fadeUp 0.6s ease-out forwards`;
      }, 0);
    }

    // Animate title
    const title = document.querySelector('.about-title');
    if (title) {
      setTimeout(() => {
        title.style.animation = `fadeUp 0.6s ease-out forwards`;
      }, 100);
    }

    // Animate paragraphs
    document.querySelectorAll('.about-paragraph').forEach((p, index) => {
      setTimeout(() => {
        p.style.animation = `fadeUp 0.6s ease-out forwards`;
      }, 200 + index * 100);
    });

    // Animate stats with counting effect
    document.querySelectorAll('.about-stat-value').forEach((stat, index) => {
      setTimeout(() => {
        stat.style.animation = `scaleIn 0.5s ease-out forwards`;
        this.animateStatCounter(stat);
      }, 800 + index * 100);
    });

    // Animate code snippet
    const codeSnippet = document.querySelector('.about-code-snippet');
    if (codeSnippet) {
      setTimeout(() => {
        codeSnippet.style.animation = `scaleIn 0.5s ease-out 0.8s forwards`;
        codeSnippet.style.opacity = '0';
      }, 0);
    }

    // Animate experience badge
    const experienceBadge = document.querySelector('.about-experience-badge');
    if (experienceBadge) {
      setTimeout(() => {
        experienceBadge.style.animation = `scaleIn 0.6s ease-out 0.6s forwards`;
        experienceBadge.style.opacity = '0';
      }, 0);

      // Pulsing number animation
      const numberElement = experienceBadge.querySelector('.about-years-number');
      if (numberElement) {
        numberElement.style.animation = `pulse 2s ease-in-out infinite`;
        numberElement.style.animationDelay = '0.8s';
      }
    }
  }

  animateStatCounter(element) {
    const text = element.textContent.trim();
    const number = parseInt(text);
    
    if (isNaN(number)) return;

    let current = 0;
    const increment = Math.ceil(number / 30);
    const interval = setInterval(() => {
      current += increment;
      if (current >= number) {
        element.textContent = text;
        clearInterval(interval);
      } else {
        element.textContent = current;
      }
    }, 30);
  }

  renderDecorativeShapes() {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) return;

    // Find the decorative container
    const decorativeLeft = aboutSection.querySelector('.about-decorative-left');
    if (!decorativeLeft) return;

    decorativeLeft.innerHTML = `
      <div class="relative h-96 md:h-[500px]">
        <!-- Rotating border square -->
        <div class="about-shape-1 absolute top-0 left-0 w-64 h-64 border border-indigo-600/30 rounded-3xl"
             style="animation: rotateShape1 8s linear infinite"></div>

        <!-- Glass square -->
        <div class="about-shape-2 absolute top-10 left-10 w-64 h-64 rounded-3xl"
             style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); animation: rotateShape2 10s linear infinite"></div>

        <!-- Gradient square with scale -->
        <div class="about-shape-3 absolute top-20 left-20 w-64 h-64 rounded-3xl"
             style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.1) 50%, transparent 100%); backdrop-filter: blur(8px); animation: scaleShape 6s ease-in-out infinite"></div>

        <!-- Code snippet -->
        <div class="about-code-snippet absolute top-40 left-40 p-4 rounded-xl font-mono text-xs text-slate-400"
             style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1)">
          <div class="flex gap-2 mb-2">
            <span class="w-2 h-2 rounded-full bg-red-500"></span>
            <span class="w-2 h-2 rounded-full bg-yellow-500"></span>
            <span class="w-2 h-2 rounded-full bg-green-500"></span>
          </div>
          <code>
            <span class="text-indigo-400">const</span> passion = <span class="text-green-400">"∞"</span>;
          </code>
        </div>

        <!-- Experience badge -->
        <div class="about-experience-badge absolute bottom-0 right-0 px-8 py-6 rounded-2xl hover:scale-105 transition-transform duration-300"
             style="background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1)">
          <p class="about-years-number text-5xl font-bold text-indigo-600 mb-1">2+</p>
          <p class="text-slate-400 text-sm">Years of Learning</p>
        </div>
      </div>
    `;
  }

  setupScrollAnimations() {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) return;

    window.addEventListener('scroll', () => {
      this.updateParallaxEffects();
    }, { passive: true });
  }

  updateParallaxEffects() {
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) return;

    const rect = aboutSection.getBoundingClientRect();
    const scrollProgress = 1 - (rect.top / window.innerHeight);

    if (scrollProgress >= -1 && scrollProgress <= 2) {
      // Parallax for shapes
      const shape1 = aboutSection.querySelector('.about-shape-1');
      const shape2 = aboutSection.querySelector('.about-shape-2');

      if (shape1) {
        const offsetY = scrollProgress * 100;
        const rotation = scrollProgress * 10;
        shape1.style.transform = `translateY(${offsetY}px) rotate(${rotation}deg)`;
      }

      if (shape2) {
        const offsetY = scrollProgress * -50;
        const rotation = scrollProgress * -5;
        shape2.style.transform = `translateY(${offsetY}px) rotate(${rotation}deg)`;
      }
    }
  }
}

// CSS Animations for About Section
const aboutAnimationsStyle = document.createElement('style');
aboutAnimationsStyle.textContent = `
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-80px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes rotateShape1 {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes rotateShape2 {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-360deg);
    }
  }

  @keyframes scaleShape {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
    }
  }

  #about {
    position: relative;
    overflow: hidden;
  }

  .about-decorative-left {
    opacity: 0;
    will-change: transform;
  }

  .about-label,
  .about-title,
  .about-paragraph {
    opacity: 0;
    will-change: transform;
  }

  .about-stat-value {
    opacity: 0;
    will-change: transform;
  }

  .about-code-snippet {
    will-change: transform;
  }

  .about-experience-badge {
    will-change: transform;
  }

  .about-years-number {
    will-change: transform;
  }

  .about-shape-1,
  .about-shape-2,
  .about-shape-3 {
    will-change: transform;
  }

  /* Glassmorphism effect */
  .about-code-snippet,
  .about-experience-badge {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Gradient text effect */
  .about-title .text-gradient {
    background: linear-gradient(90deg, rgb(99, 102, 241) 0%, rgb(34, 211, 238) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Line animation for section label */
  .about-label-line {
    display: inline-block;
    width: 32px;
    height: 1px;
    background: rgb(99, 102, 241);
    transform-origin: left;
    animation: scaleX 0.6s ease-out 0.5s forwards;
    opacity: 0;
  }

  @keyframes scaleX {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }
`;

document.head.appendChild(aboutAnimationsStyle);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new EnhancedAboutSection();
  });
} else {
  new EnhancedAboutSection();
}
