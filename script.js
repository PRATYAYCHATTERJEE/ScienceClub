document.addEventListener("DOMContentLoaded", function () {


let lastScroll = 0;
const navbar = document.querySelector(".navbar");
const scrollThreshold = 15; // prevents flicker

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Ignore tiny scrolls (important for smooth UX)
  if (Math.abs(currentScroll - lastScroll) < scrollThreshold) return;

  if (currentScroll > lastScroll && currentScroll > 80) {
    // 🔻 scroll down → hide
    navbar.classList.add("hide");
    navbar.classList.remove("show");
  } else {
    // 🔺 scroll up → show
    navbar.classList.remove("hide");
    navbar.classList.add("show");
  }

  lastScroll = currentScroll;
});



  /* =========================
     HERO GIF ROTATION
  ========================== */
const items = document.querySelectorAll(".fade-item");

window.addEventListener("scroll", () => {

  const scrollY = window.scrollY;
  const hero = document.querySelector(".hero");

  if(scrollY > 80){

    hero.classList.add("fade-text");

    items.forEach((item, i) => {
      item.style.transitionDelay = `${i * 0.08}s`;
    });

  } else {

    hero.classList.remove("fade-text");

    items.forEach(item => {
      item.style.transitionDelay = "0s";
    });
  }

});


window.addEventListener("load", () => {
  document.body.classList.remove("loading");
  document.body.classList.add("loaded");
});


window.addEventListener("load", () => {
  const hero = document.querySelector(".hero");

  setTimeout(() => {
    hero.classList.add("loaded");
  }, 200); // small delay for smooth start
});

  /* =========================
     MUSIC CONTROL
  ========================== */
  const music = document.getElementById("bgMusic");
  const toggleBtn = document.getElementById("musicToggle");

  window.addEventListener("load", () => {
    if (music) {
      music.play().catch(() => {});
    }
  });

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (music.paused) {
        music.play();
        toggleBtn.innerText = "🔊";
      } else {
        music.pause();
        toggleBtn.innerText = "🎵";
      }
    });
  }


  /* =========================
     SECTION SCROLL ANIMATION
  ========================== */
  const sections = document.querySelectorAll(".section");

  window.addEventListener("scroll", () => {
    sections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        section.classList.add("active");
      }
    });
  });


  /* =========================
     MOBILE NAVBAR
  ========================== */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// Toggle menu
hamburger.addEventListener("click", (e) => {
  e.stopPropagation(); // 🔥 prevent immediate close
  navLinks.classList.toggle("show");
});

// ✅ Close when clicking anywhere
document.addEventListener("click", () => {
  navLinks.classList.remove("show");
});

// ✅ Prevent closing when clicking inside menu
navLinks.addEventListener("click", (e) => {
  e.stopPropagation();
});

// ✅ Close when clicking any link
const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});
  /* =========================
     EVENT DROPDOWN
  ========================== */
window.toggleEvent = function (header) {
  const card = header.closest(".event-card");
  const dropdown = card.querySelector(".event-dropdown");

  if (card.classList.contains("active")) {
    dropdown.style.maxHeight = "0px";
    card.classList.remove("active");
  } else {

    document.querySelectorAll(".event-card").forEach(c => {
      c.classList.remove("active");
      c.querySelector(".event-dropdown").style.maxHeight = "0px";
    });

    card.classList.add("active");
    dropdown.style.maxHeight = dropdown.scrollHeight + "px";
  }
};


  /* =========================
     STATS CARD FADE-IN
  ========================== */

// Split text into words
document.querySelectorAll(".reveal-text p").forEach((p) => {
  const words = p.innerText.split(" ");
  p.innerHTML = words
    .map(word => `<span>${word}&nbsp;</span>`)
    .join("");
});

const textSections = document.querySelectorAll(".reveal-text");

function handleTextReveal() {
  const windowHeight = window.innerHeight;

  textSections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top < windowHeight - 100 && rect.bottom > 100) {
      section.classList.add("active");

      // Animate words one by one
      const spans = section.querySelectorAll("span");
      spans.forEach((span, index) => {
        span.style.transitionDelay = `${index * 0.03}s`;
      });

    } else {
      section.classList.remove("active");

      // Reset delay so animation can replay
      const spans = section.querySelectorAll("span");
      spans.forEach((span) => {
        span.style.transitionDelay = "0s";
      });
    }
  });
}





window.addEventListener("scroll", handleTextReveal);
window.addEventListener("load", handleTextReveal);

  
const elements = document.querySelectorAll(
  '.reveal-card, .stat-card, .about-card'
);
const groups = document.querySelectorAll('.stats-container, .about-top');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      const cards = entry.target.querySelectorAll('.reveal-card');

      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('show');
        }, index * 180); // 🔥 stagger delay
      });

      observer.unobserve(entry.target); // run once
    }
  });
}, { threshold: 0.2 });

groups.forEach(group => observer.observe(group));

  /* =========================
     COUNTER ANIMATION
  ========================== */
  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        const counter = entry.target;
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = target / 100;

        const updateCount = () => {
          if (count < target) {
            count += increment;
            counter.innerText = Math.floor(count);
            requestAnimationFrame(updateCount);
          } else {
            counter.innerText = target + "+";
          }
        };

        updateCount();
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

});

const timeline = document.querySelector(".timeline");
const progressLine = document.querySelector(".timeline-progress");
const marker = document.querySelector(".timeline-marker");
const rocket = document.querySelector(".rocket-container");

let lastScroll = window.scrollY;

let currentY = 0;
let targetY = 0;

function animateRocket(){

currentY += (targetY - currentY) * 0.08;   // smooth movement

rocket.style.top = currentY + "px";
marker.style.top = currentY + "px";

requestAnimationFrame(animateRocket);

}

animateRocket();

window.addEventListener("scroll", () => {

const rect = timeline.getBoundingClientRect();
const windowHeight = window.innerHeight;

if(rect.top < windowHeight && rect.bottom > 0){

const totalHeight = timeline.offsetHeight;

let progress = (windowHeight - rect.top) / (rect.height + windowHeight);

progress = Math.max(0, Math.min(1, progress));

targetY = progress * totalHeight;

progressLine.style.height = progress * 100 + "%";

/* detect scroll direction */

let currentScroll = window.scrollY;

if(currentScroll > lastScroll){
rocket.style.transform = "translateX(-50%) rotate(180deg)";
}else{
rocket.style.transform = "translateX(-50%) rotate(0deg)";
}

lastScroll = currentScroll;

}

});
const items = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeLightbox = document.querySelector(".close-lightbox");

let current = 0;
let autoSlide;

/* ================= UPDATE GALLERY ================= */
function updateGallery() {
  const total = items.length;

  items.forEach(item => {
    item.classList.remove("far-left","left","active","right","far-right");
  });

  const farLeft = (current - 2 + total) % total;
  const left = (current - 1 + total) % total;
  const right = (current + 1) % total;
  const farRight = (current + 2) % total;

  items[current].classList.add("active");
  items[left].classList.add("left");
  items[right].classList.add("right");
  items[farLeft].classList.add("far-left");
  items[farRight].classList.add("far-right");
}


// ================= SCROLL REVEAL =================

/* ================= NAVIGATION ================= */
function nextSlide() {
  current = (current + 1) % items.length;
  updateGallery();
}

function prevSlide() {
  current = (current - 1 + items.length) % items.length;
  updateGallery();
}

updateGallery();

/* ================= AUTO SLIDE ================= */
function startAuto() {
  autoSlide = setInterval(nextSlide, 4000);
}

function stopAuto() {
  clearInterval(autoSlide);
}

startAuto();

/* ================= DRAG (DESKTOP) ================= */
let startX = 0;

document.addEventListener("mousedown", e => {
  startX = e.clientX;
  stopAuto();
});

document.addEventListener("mouseup", e => {
  let diff = e.clientX - startX;

  if (diff > 50) prevSlide();
  if (diff < -50) nextSlide();

  startAuto();
});

/* ================= TOUCH (MOBILE) ================= */
document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  stopAuto();
});

document.addEventListener("touchend", e => {
  let diff = e.changedTouches[0].clientX - startX;

  if (diff > 50) prevSlide();
  if (diff < -50) nextSlide();

  startAuto();
});

/* ================= LIGHTBOX ================= */
items.forEach((item) => {
  item.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = item.querySelector("img").src;
  });
});

closeLightbox.onclick = () => {
  lightbox.style.display = "none";
};

lightbox.onclick = e => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = "none";
  }
};

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

/* Button Clicks */
nextBtn.addEventListener("click", () => {
  stopAuto();
  nextSlide();
  startAuto();
});

prevBtn.addEventListener("click", () => {
  stopAuto();
  prevSlide();
  startAuto();
});






document.addEventListener("DOMContentLoaded",function(){

const tabs=document.querySelectorAll(".tab-btn");
const grids=document.querySelectorAll(".team-grid");
const slider=document.querySelector(".tab-slider");
const teamTitle=document.querySelector(".team-title");
const teamTabs=document.querySelector(".team-tabs");

/* ================= CARD ANIMATION ================= */

function animateCards(){

const cards = document.querySelectorAll(".team-grid.active .team-card");

/* RESET animation for ALL cards */

cards.forEach(card=>{
card.classList.remove("show");
});

/* force browser reflow so animation can restart */

void document.body.offsetHeight;

/* play animation again */

cards.forEach((card,i)=>{

setTimeout(()=>{
card.classList.add("show");
}, i * 110);

});

}

/* ================= TAB SWITCH ================= */

tabs.forEach((tab,index)=>{

tab.addEventListener("click",()=>{

tabs.forEach(btn=>btn.classList.remove("active"));
tab.classList.add("active");

grids.forEach(grid=>grid.classList.remove("active"));

if(index===0){
document.getElementById("faculty").classList.add("active");
}

if(index===1){
document.getElementById("students").classList.add("active");
}

if(index===2){
document.getElementById("committee").classList.add("active");
}

/* move slider */

slider.style.width=tab.offsetWidth+"px";
slider.style.left=tab.offsetLeft+"px";

/* re-run animation */

animateCards();

});

});

/* ================= SCROLL REVEAL ================= */

const teamSection=document.querySelector(".team-section");

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

teamTitle.classList.add("show");
teamTabs.classList.add("show");

animateCards();

}

});

},{threshold:.3});

observer.observe(teamSection);

});








document.addEventListener("DOMContentLoaded", function () {

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

      /* CLOSE ALL OTHER FAQS */
      faqItems.forEach(i => {
        if(i !== item){
          i.classList.remove("active");
          i.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      /* TOGGLE CURRENT FAQ */
      item.classList.toggle("active");

      if(item.classList.contains("active")){
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }

    });
  });

});

const faqs = document.querySelectorAll(".faq-item");

faqs.forEach(faq => {
  faq.addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});


 /* =========================
    Event  ANIMATION
  ========================== */

document.addEventListener("DOMContentLoaded", function () {

  /* ================= SCROLL ANIMATION ================= */

  const eventElements = document.querySelectorAll(".events-hidden");
  const eventImage = document.querySelector(".events-image-hidden");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("events-show");
      }
    });
  }, { threshold: 0.2 });

  eventElements.forEach(el => observer.observe(el));

  if (eventImage) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("events-image-show");
        }
      });
    }, { threshold: 0.3 });

    imageObserver.observe(eventImage);
  }


  /* ================= PREMIUM ACCORDION ================= */

  const cards = document.querySelectorAll(".event-card");

  cards.forEach(card => {

    card.addEventListener("click", function (e) {

      // Prevent link clicks from toggling card
      if (e.target.tagName === "A") return;

      // Close all other cards
      cards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove("active");
        }
      });

      // Toggle current card
      card.classList.toggle("active");

    });

  });

});




document.addEventListener("DOMContentLoaded", function () {

  const trackerSection = document.querySelector(".event-track");
  const trackerItems = document.querySelectorAll(".tracker-item");
  const progressLine = document.querySelector(".timeline-progress");
  const floatingImages = document.querySelectorAll(".floating-image");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        trackerSection.classList.add("tracker-show");

        progressLine.classList.add("grow");

        trackerItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("show");
          }, index * 300);
        });

        floatingImages.forEach((img, index) => {
          setTimeout(() => {
            img.classList.add("show");
          }, 500 + index * 300);
        });

      }
    });
  }, { threshold: 0.3 });

  observer.observe(trackerSection);

});


document.addEventListener("DOMContentLoaded", function () {

  const timelineItems = document.querySelectorAll(".timeline-item");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }

    });
  }, {
    threshold: 0.2
  });

  timelineItems.forEach(item => {
    observer.observe(item);
  });

});

const tabs = document.querySelectorAll(".tab-btn");
const slider = document.querySelector(".tab-slider");
const grids = document.querySelectorAll(".team-grid");

let currentLeft = 0;
let currentWidth = 0;

function moveSlider(tab){

const rect = tab.getBoundingClientRect();
const parent = tab.parentElement.getBoundingClientRect();

const targetLeft = rect.left - parent.left;
const targetWidth = rect.width;

/* stretch animation */

const stretchWidth = Math.abs(targetLeft - currentLeft) + targetWidth;

slider.style.left = Math.min(currentLeft,targetLeft) + "px";
slider.style.width = stretchWidth + "px";

/* settle animation */

setTimeout(()=>{

slider.style.left = targetLeft + "px";
slider.style.width = targetWidth + "px";

currentLeft = targetLeft;
currentWidth = targetWidth;

},180);

}

tabs.forEach((tab,index)=>{

tab.addEventListener("click",()=>{

tabs.forEach(t=>t.classList.remove("active"));
tab.classList.add("active");

moveSlider(tab);

/* switch sections */

grids.forEach(g=>g.classList.remove("active"));
grids[index].classList.add("active");

});

});

/* initial position */

window.onload = ()=>{

const activeTab = document.querySelector(".tab-btn.active");

const rect = activeTab.getBoundingClientRect();
const parent = activeTab.parentElement.getBoundingClientRect();

currentLeft = rect.left - parent.left;
currentWidth = rect.width;

slider.style.left = currentLeft + "px";
slider.style.width = currentWidth + "px";

};


const revealElements = document.querySelectorAll(".faq-reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("show");

      // stop observing after animation runs once
      observer.unobserve(entry.target);

    }

  });

},{
  threshold: 0.25
});

revealElements.forEach(el=>{
  revealObserver.observe(el);
});


/* ===== MEMBERSHIP IMAGE OPENING ===== */

const astro = document.querySelector(".reveal-astro");

const astroObserver = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){
astro.classList.add("show");
}

});

},{threshold:0.3});

astroObserver.observe(astro);

/* ===== MEMBERSHIP OPENING EFFECT ===== */

const membershipSection = document.querySelector(".membership-section");

const membershipObserver = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
membershipSection.classList.add("open");
}

});

},{
threshold:0.4
});

membershipObserver.observe(membershipSection);


