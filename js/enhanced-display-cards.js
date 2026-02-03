/**
 * Enhanced Display Cards - Premium React Component Converted to Vanilla JS
 * Features: Animated card stack, hover effects, grayscale toggle, sparkles icon
 * Dependencies: None (pure vanilla JS + Tailwind CSS)
 */

class DisplayCard {
  constructor(props = {}) {
    this.icon = props.icon || this.createSparklesIcon();
    this.title = props.title || "Featured";
    this.description = props.description || "Discover amazing content";
    this.date = props.date || "Just now";
    this.className = props.className || "";
    this.iconClassName = props.iconClassName || "text-blue-500";
    this.titleClassName = props.titleClassName || "text-blue-500";
  }

  createSparklesIcon() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "size-4 text-blue-300");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");

    const paths = [
      "M12 3v6m0 6v6M9 12h6M3 12h6m12 0h-6",
      "M8.5 8.5l4 4m0 0l4 4M12.5 16.5l4-4m0 0l-4-4",
    ];

    // Create a star-like sparkles effect
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "12");
    circle.setAttribute("cy", "12");
    circle.setAttribute("r", "1");
    circle.setAttribute("fill", "currentColor");
    svg.appendChild(circle);

    const points = [
      { x: 12, y: 2 },
      { x: 12, y: 22 },
      { x: 2, y: 12 },
      { x: 22, y: 12 },
    ];

    points.forEach((point) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", point.x);
      circle.setAttribute("cy", point.y);
      circle.setAttribute("r", "0.8");
      circle.setAttribute("fill", "currentColor");
      svg.appendChild(circle);
    });

    return svg;
  }

  render() {
    const card = document.createElement("div");

    // Build Tailwind classes
    const baseClasses = [
      "relative flex h-36 w-[22rem]",
      "-skew-y-[8deg] select-none flex-col justify-between",
      "rounded-xl border-2 bg-muted/70 backdrop-blur-sm",
      "px-4 py-3 transition-all duration-700",
      "hover:border-white/20 hover:bg-muted",
      "before:absolute before:w-[100%] before:rounded-xl before:h-[100%] before:content-[''] before:left-0 before:top-0",
      "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem]",
      "after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']",
    ];

    card.className = [...baseClasses, this.className]
      .filter(Boolean)
      .join(" ");

    // Header with icon and title
    const header = document.createElement("div");
    header.className = "flex items-center gap-2";

    const iconContainer = document.createElement("span");
    iconContainer.className = "relative inline-block rounded-full bg-blue-800 p-1";

    const icon = this.icon.cloneNode(true);
    iconContainer.appendChild(icon);
    header.appendChild(iconContainer);

    const titleEl = document.createElement("p");
    titleEl.className = `text-lg font-medium ${this.titleClassName}`;
    titleEl.textContent = this.title;
    header.appendChild(titleEl);

    card.appendChild(header);

    // Description
    const description = document.createElement("p");
    description.className = "flex items-center gap-2 whitespace-nowrap text-lg";
    description.textContent = this.description;
    card.appendChild(description);

    // Date
    const date = document.createElement("p");
    date.className = "flex items-center gap-2 text-muted-foreground";
    date.textContent = this.date;
    card.appendChild(date);

    return card;
  }
}

class DisplayCards {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) {
      console.error(`Container ${containerSelector} not found`);
      return;
    }

    this.options = {
      cards: options.cards || this.getDefaultCards(),
      ...options,
    };

    this.init();
  }

  getDefaultCards() {
    return [
      {
        title: "Featured Project",
        description: "Stunning portfolio design",
        date: "Recently launched",
        className: `relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 bg-slate-800/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20`,
      },
    ];
  }

  init() {
    // Create wrapper (single card, centered layout)
    const wrapper = document.createElement("div");
    wrapper.className = `flex justify-center items-center 
      opacity-100 animate-in fade-in-0 duration-700`;

    // Render single card
    this.options.cards.forEach((cardProps) => {
      const card = new DisplayCard(cardProps);
      wrapper.appendChild(card.render());
    });

    // Clear container and add wrapper
    this.container.innerHTML = "";
    this.container.appendChild(wrapper);

    this.setupAnimations();
  }

  setupAnimations() {
    const cards = this.container.querySelectorAll("[style*='grid-area']");

    cards.forEach((card, index) => {
      // Add staggered animation delay
      card.style.animationDelay = `${index * 0.15}s`;

      // Enhanced hover effect with scale
      card.addEventListener("mouseenter", () => {
        card.style.transform = card.classList.contains("hover:-translate-y-10")
          ? "translateY(-40px)"
          : card.classList.contains("translate-x-16")
            ? "translateX(64px) translateY(40px)"
            : "translateX(128px) translateY(80px)";
        card.style.zIndex = 10 - index; // Bring to front on hover
      });

      card.addEventListener("mouseleave", () => {
        const classList = Array.from(card.classList);
        let resetTransform = "translate(0, 0)";

        if (classList.some((c) => c.includes("translate-x-32"))) {
          resetTransform = "translateX(128px) translateY(80px)";
        } else if (classList.some((c) => c.includes("translate-x-16"))) {
          resetTransform = "translateX(64px) translateY(40px)";
        }

        card.style.transform = resetTransform;
        card.style.zIndex = 3 - index;
      });
    });
  }

  // Public methods for customization
  addCard(cardProps) {
    this.options.cards.push(cardProps);
    this.init();
  }

  removeCard(index) {
    this.options.cards.splice(index, 1);
    this.init();
  }

  updateCard(index, cardProps) {
    this.options.cards[index] = { ...this.options.cards[index], ...cardProps };
    this.init();
  }

  setCards(cards) {
    this.options.cards = cards;
    this.init();
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Auto-initialize if element with id "display-cards" exists
  const displayCardsContainer = document.getElementById("display-cards");
  if (displayCardsContainer) {
    new DisplayCards("#display-cards");
  }
});

// Export for manual initialization
if (typeof module !== "undefined" && module.exports) {
  module.exports = { DisplayCard, DisplayCards };
}
