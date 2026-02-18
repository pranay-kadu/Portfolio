/*===================== toggle icon navbar=====================*/

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
const myButton = document.querySelector(".btn");


menuIcon.onclick = () => {
  menuIcon.classList.toggle("fa-xmark");
  navbar.classList.toggle("active");
};

myButton.onclick = () => {
  window.open("img/MY-RESUME.pdf");
};


/**=========================================Read More ======================*/

const readMoreBtn = document.getElementById("readMoreBtn");
const moreText = document.getElementById("moreText");

readMoreBtn.onclick = () => {
  if (moreText.style.display === "none") {
    moreText.style.display = "inline";
    readMoreBtn.innerText = "Read less";
  } else {
    moreText.style.display = "none";
    readMoreBtn.innerText = "Read more";
  }
};

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
  strings: ["Full-Stack Developer", "Web Designer", "Youtuber"],
  typeSpeed: 70,
  backSpeed: 70,
  backDelay: 1000,
  loop: true,
});

/*================================ contact form ===================== */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        contactForm.reset();
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the message.");
    }
  });
}
