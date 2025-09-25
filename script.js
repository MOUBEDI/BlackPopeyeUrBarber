// Consolidated JavaScript without repetition
document.addEventListener("DOMContentLoaded", () => {
  // Form submission handler
  const form = document.querySelector("form");
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { "Accept": "application/json" },
      })
        .then((response) => {
if (response.ok) {
  popup.classList.add("active");
  form.reset();

          } else {
            alert("Oops! Something went wrong.");
          }
        })
        .catch(() => {
          alert("Oops! Network error.");
        });
    });
  }

  if (closePopup) {
    closePopup.addEventListener("click", () => {
      popup.classList.remove("active");
    });

    // Close popup on outside click
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.classList.remove("active");
      }
    });
  }

  // Mobile menu functionality
  const mobileMenu = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  const navbar = document.querySelector(".navbar");

  if (mobileMenu) {
    mobileMenu.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (navLinks && navLinks.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      navLinks.classList.remove("active");
    }

    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });

  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Intersection Observer for animations
  const animateOnScroll = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.2 }
  );

  // Observe elements for animation
  const elementsToAnimate = document.querySelectorAll(
    ".service-card, .testimonial, .why-card, .gallery-card"
  );
  elementsToAnimate.forEach((el) => animateOnScroll.observe(el));

  // Lazy load images
  const lazyLoadImages = () => {
    const images = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute("data-src");
            observer.unobserve(img);
          }
        }
      });
    });

    images.forEach((img) => {
      if (img.dataset.src) {
        imageObserver.observe(img);
      }
    });
  };

  lazyLoadImages();

  // Gallery modal functionality
  const galleryCards = document.querySelectorAll(".gallery-card");
  const modal = document.createElement("div");
  modal.className = "gallery-modal";
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">×</button>
      <img class="modal-image" src="" alt="">
    </div>
  `;
  document.body.appendChild(modal);

  const modalImage = modal.querySelector(".modal-image");
  const modalClose = modal.querySelector(".modal-close");

  galleryCards.forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      if (img) {
        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  modalClose.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Keyboard support for modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
});
