/*===================== toggle icon navbar=====================*/

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
menuIcon.onclick = () => {
  menuIcon.classList.toggle("fa-xmark");
  navbar.classList.toggle("active");
};


/**=========================================Read More ======================*/

const readMoreBtn = document.getElementById("readMoreBtn");
const moreText = document.getElementById("moreText");

if (readMoreBtn && moreText) {
  readMoreBtn.onclick = () => {
    if (moreText.style.display === "none") {
      moreText.style.display = "inline";
      readMoreBtn.innerText = "Read less";
    } else {
      moreText.style.display = "none";
      readMoreBtn.innerText = "Read more";
    }
  };
}

/*============================ scroll section active link========================= */

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        const activeLink = document.querySelector("header nav a[href*=" + id + "]");
        if (activeLink) {
            activeLink.classList.add("active");
        }
      });
    }
  });

  /*================================== sticky navbar ===============================*/
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  /*=============================== remove toggle icon and navbar================================ */

  /*menuIcon.classList.remove("fa-xmark");
  navbar.classList.remove("active");*/
};

/**=========================== scroll reveal============================ */

ScrollReveal({
  distance: "80px",
  duration: 2000,
  delay: 200,
});
ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container, .portfolio-box, .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-contact h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-contact p, .about-content", { origin: "right" });

/**================================ typed JS ===================== */

const typed = new Typed(".multiple-text", {
  strings: ["Full-Stack Developer", "Web Designer", "Frontend Developer"],
  typeSpeed: 70,
  backSpeed: 70,
  backDelay: 1000,
  loop: true,
});

/*================================ Contact Form ===================== */
(function () {
  const form      = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn  = document.getElementById("submitBtn");
  const btnText    = document.getElementById("btnText");
  const btnLoader  = document.getElementById("btnLoader");

  // ── Helpers ──────────────────────────────────────────────────
  function showModal(success, title, message) {
    document.getElementById("modalIcon").textContent    = success ? "✅" : "❌";
    document.getElementById("modalTitle").textContent   = title;
    document.getElementById("modalMessage").textContent = message;
    const modal = document.getElementById("contactModal");
    modal.style.display = "flex";
    // close on backdrop click
    modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };
  }

  function setError(fieldId, msg) {
    const el = document.getElementById(fieldId);
    const err = document.getElementById("err-" + fieldId);
    if (el)  el.classList.toggle("invalid", !!msg);
    if (err) err.textContent = msg || "";
  }

  function clearErrors() {
    ["fullName","email","subject","message"].forEach(id => setError(id, ""));
  }

  function validate(data) {
    let valid = true;
    if (!data.fullName || data.fullName.trim().length < 2) {
      setError("fullName", "Full name is required (min 2 characters)."); valid = false;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRe.test(data.email.trim())) {
      setError("email", "Enter a valid email address."); valid = false;
    }
    if (!data.subject || data.subject.trim().length < 3) {
      setError("subject", "Subject is required (min 3 characters)."); valid = false;
    }
    if (!data.message || data.message.trim().length < 10) {
      setError("message", "Message is required (min 10 characters)."); valid = false;
    }
    return valid;
  }

  function setLoading(loading) {
    submitBtn.disabled      = loading;
    btnText.style.display   = loading ? "none"   : "inline";
    btnLoader.style.display = loading ? "inline" : "none";
  }

  // ── Submit Handler ───────────────────────────────────────────
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();

    const data = {
      fullName: document.getElementById("fullName").value,
      email:    document.getElementById("email").value,
      subject:  document.getElementById("subject").value,
      message:  document.getElementById("message").value,
    };

    if (!validate(data)) return;

    setLoading(true);
    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        form.reset();
        clearErrors();
        showModal(true, "Message Sent! 🎉", "Thanks for reaching out! I'll get back to you as soon as possible.");
      } else {
        const msg = json.errors ? json.errors.join("\n") : "Something went wrong.";
        showModal(false, "Send Failed", msg);
      }
    } catch (err) {
      showModal(false, "Network Error", "Could not connect to the server. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  });
})();


/*================================ Particle Canvas ===================== */
(function () {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const PARTICLE_COUNT = 100;
  const COLOR = "89, 178, 244";
  const particles = [];

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.r = Math.random() * 2.5 + 1.2;
      this.opacity = Math.random() * 0.5 + 0.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${COLOR}, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${COLOR}, ${0.28 * (1 - dist / 180)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(animate);
  }
  animate();
})();

/*================================ Theme Toggle ===================== */
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
    // Load saved theme
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        themeToggle.classList.replace("fa-moon", "fa-sun");
    }

    // Toggle and save
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        
        if (document.body.classList.contains("light-mode")) {
            themeToggle.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("portfolio-theme", "light");
        } else {
            themeToggle.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("portfolio-theme", "dark");
        }
    });
}
