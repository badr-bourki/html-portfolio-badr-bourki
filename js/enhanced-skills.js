/**
 * Enhanced Skills Section - Vanilla JS Implementation
 * Converts React/Framer Motion to pure JavaScript with CSS animations
 * Features: Staggered card animations, progress bars, hover effects, floating orbs
 */

class EnhancedSkillsSection {
  constructor() {
    this.skills = [
      {
        name: "HTML",
        level: 95,
        description: "Semantic markup & accessibility",
        color: "from-orange-500 to-red-500",
        icon: '<svg viewBox="0 0 24 24" class="w-8 h-8" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>',
      },
      {
        name: "CSS",
        level: 90,
        description: "Modern layouts & animations",
        color: "from-blue-500 to-cyan-500",
        icon: '<svg viewBox="0 0 24 24" class="w-8 h-8" fill="currentColor"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/></svg>',
      },
      {
        name: "Tailwind CSS",
        level: 85,
        description: "Utility-first styling",
        color: "from-cyan-500 to-teal-500",
        icon: '<svg viewBox="0 0 24 24" class="w-8 h-8" fill="currentColor"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/></svg>',
      },
      {
        name: "JavaScript",
        level: 80,
        description: "ES6+ & DOM manipulation",
        color: "from-yellow-500 to-amber-500",
        icon: '<svg viewBox="0 0 24 24" class="w-8 h-8" fill="currentColor"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/></svg>',
      },
      {
        name: "Git & GitHub",
        level: 75,
        description: "Version control & collaboration",
        color: "from-gray-600 to-gray-800",
        icon: '<svg viewBox="0 0 24 24" class="w-8 h-8" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
      },
      {
        name: "React",
        level: 60,
        description: "Currently learning",
        color: "from-cyan-400 to-blue-500",
        icon: '<svg viewBox="0 0 24 24" class="w-8 h-8" fill="currentColor"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/></svg>',
      },
    ];

    this.hoveredIndex = null;
    this.init();
  }

  init() {
    const skillsContainer = document.querySelector('#skills');
    if (!skillsContainer) return;

    // Render skills grid
    this.renderSkillsGrid(skillsContainer);
    
    // Setup Intersection Observer for animations
    this.setupIntersectionObserver();
    
    // Setup scroll animations for background
    this.setupScrollAnimations();
  }

  renderSkillsGrid(container) {
    const skillsGridContainer = container.querySelector('[class*="grid-cols"]');
    if (!skillsGridContainer) return;

    skillsGridContainer.innerHTML = this.skills.map((skill, index) => `
      <div class="skill-card-enhanced group relative p-8 cursor-pointer transition-all duration-300 hover:scale-105" 
           data-skill-index="${index}"
           style="--skill-index: ${index}">
        <!-- Icon Container -->
        <div class="skill-icon mb-6 transition-all duration-500 text-foreground/60 group-hover:text-primary 
                    group-hover:scale-125 group-hover:animate-pulse">
          ${skill.icon}
        </div>

        <!-- Name & Description -->
        <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          ${skill.name}
        </h3>
        <p class="text-muted-foreground text-sm mb-6">${skill.description}</p>

        <!-- Progress Bar Container -->
        <div class="relative">
          <div class="h-2 bg-muted/50 rounded-full overflow-hidden">
            <div class="skill-progress-bar h-full bg-gradient-to-r ${skill.color} rounded-full relative origin-left"
                 style="--skill-level: ${skill.level}%; --animation-delay: ${index * 0.1 + 0.5}s">
              <div class="shimmer-effect absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>
          </div>
          <span class="skill-percentage absolute -top-7 right-0 text-sm font-medium text-muted-foreground 
                        group-hover:text-primary transition-colors">
            ${skill.level}%
          </span>
        </div>
      </div>
    `).join('');

    // Add hover event listeners
    document.querySelectorAll('.skill-card-enhanced').forEach((card, index) => {
      card.addEventListener('mouseenter', () => this.handleCardHover(index, true));
      card.addEventListener('mouseleave', () => this.handleCardHover(index, false));
      card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
    });
  }

  handleCardHover(index, isHovering) {
    this.hoveredIndex = isHovering ? index : null;
  }

  handleMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  }

  setupIntersectionObserver() {
    const skillsContainer = document.querySelector('#skills');
    if (!skillsContainer) return;

    const options = {
      threshold: 0.1,
      rootMargin: '-100px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Trigger skill card animations
          this.animateSkillCards();
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(skillsContainer);
  }

  animateSkillCards() {
    const cards = document.querySelectorAll('.skill-card-enhanced');
    const progressBars = document.querySelectorAll('.skill-progress-bar');

    cards.forEach((card, index) => {
      // Stagger animation
      setTimeout(() => {
        card.style.animation = `fadeUp 0.6s ease-out forwards`;
        card.style.animationDelay = `${index * 0.1}s`;
      }, 0);
    });

    progressBars.forEach((bar) => {
      const level = parseFloat(bar.style.getPropertyValue('--skill-level'));
      bar.style.animation = `fillProgressBar ${1}s ease-out forwards`;
      bar.style.animationDelay = bar.style.getPropertyValue('--animation-delay');
      bar.style.width = level + '%';
    });
  }

  setupScrollAnimations() {
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) return;

    window.addEventListener('scroll', () => this.updateBackgroundParallax(), { passive: true });
  }

  updateBackgroundParallax() {
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) return;

    const rect = skillsSection.getBoundingClientRect();
    const scrollProgress = 1 - (rect.top / window.innerHeight);
    
    if (scrollProgress >= -1 && scrollProgress <= 2) {
      const offset = scrollProgress * -100;
      const bgElement = skillsSection.querySelector('[class*="absolute"][class*="inset-0"]');
      if (bgElement) {
        bgElement.style.transform = `translateY(${offset}px)`;
      }
    }
  }
}

// CSS Animations for Skills
const skillsAnimationsStyle = document.createElement('style');
skillsAnimationsStyle.textContent = `
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(50px) rotateX(-15deg);
    }
    to {
      opacity: 1;
      transform: translateY(0) rotateX(0);
    }
  }

  @keyframes fillProgressBar {
    from {
      width: 0 !important;
    }
    to {
      width: var(--skill-level) !important;
    }
  }

  @keyframes shimmer {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(200%);
    }
  }

  .shimmer-effect {
    animation: shimmer 2s infinite;
    animation-delay: 3s;
  }

  .skill-card-enhanced {
    perspective: 1000px;
    position: relative;
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(10px);
    transition: all 0.3s cubic-bezier(0.6, 0.05, 0.01, 0.99);
  }

  .skill-card-enhanced:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    transform: translateY(-8px) rotateY(5deg);
  }

  .skill-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .skill-progress-bar {
    will-change: width;
    position: relative;
  }

  .skill-card-enhanced .skill-percentage {
    opacity: 0;
    animation: fadeIn 0.6s ease-out forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Floating orbs animation */
  @keyframes floatOrbsLeft {
    0%, 100% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(30px, -20px);
    }
  }

  @keyframes floatOrbsRight {
    0%, 100% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(-30px, 30px);
    }
  }

  .skills-orb-left {
    animation: floatOrbsLeft 10s ease-in-out infinite;
  }

  .skills-orb-right {
    animation: floatOrbsRight 12s ease-in-out infinite;
  }
`;

document.head.appendChild(skillsAnimationsStyle);

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new EnhancedSkillsSection();
  });
} else {
  new EnhancedSkillsSection();
}
