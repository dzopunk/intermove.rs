const questions = document.querySelectorAll(".process__moving_list");

questions.forEach(function (question) {
  const btn = question.querySelector(".process__moving_list-item--btn");

  question.addEventListener("click", function () {
    questions.forEach(function (item) {
      if (item !== question) {
        item.classList.remove("show-text");
      }
    });

    question.classList.toggle("show-text");
  });
});

const swiper = new Swiper(".swiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 40,
  centeredSlides: true,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
      centeredSlides: false,
    },
    1254: {
      slidesPerView: 3,
    },
    1920: {
      slidesPerView: 4,
      spaceBetween: 40,
      centeredSlides: false,
    },
  },
});

//////cards//////
var cards = document.querySelectorAll(".card__wrapper");

cards.forEach((card) => {
  card.addEventListener("click", function () {
    card.classList.toggle("is-flipped");
  });
});

//////menu/////
const menuBtn = document.querySelector(".landing__nav_icons");
const menu = document.querySelector(".landing__nav_menu");
const icon = document.querySelectorAll(".landing__nav_icon");

menuBtn.addEventListener("click", function (e) {
  icon.forEach(function (btn) {
    btn.classList.toggle("hide-menu");
  });

  menu.classList.toggle("show-menu");
});

menu.addEventListener("click", function (e) {
  menu.classList.remove("show-menu");
  icon.forEach(function (btn) {
    btn.classList.toggle("hide-menu");
  });
});

/////smooth scroll in/////
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2,
};
const appearOnSroll = new IntersectionObserver(function (
  entries,
  appearOnSroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnSroll.unobserve(entry.target);
    }
  });
},
appearOptions);
faders.forEach((fader) => {
  appearOnSroll.observe(fader);
});

////sticky navbar////

const landing = document.querySelector(".landing");
const navBar = document.querySelector(".landing__nav");
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navBar.classList.add("sticky");
  else navBar.classList.remove("sticky");
};
const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.5,
});
observer.observe(landing);

/////language/////

const menuLang = document.querySelector(".langmenu");
menuLang.addEventListener("click", function (e) {
  const change = e.target.attributes.value.value;
  const langbtn = document.querySelectorAll(".langbtn");
  langbtn.forEach((btn) => {
    btn.classList.toggle("active");
  });
  document.body.setAttribute("lang", change);
});

/////send mail////
document.forms.contact.addEventListener("submit", function (e) {

  let data = new FormData(e.target);

  let request = new XMLHttpRequest();
  request.open("POST", "mail.php");
  request.send(data);
  request.onload = () => {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
    document.getElementById("message").value = "Hvala na interesovanju. Vaša poruka je poslata..";

    const myTimeout = setTimeout(function () {
       document.getElementById("message").value = "";
    }, 4000);
  };
  e.preventDefault();
});

document.forms.contacteng.addEventListener("submit", function (e) {

  let data = new FormData(e.target);

  let request = new XMLHttpRequest();
  request.open("POST", "mail.php");
  request.send(data);
  request.onload = () => {
    document.getElementById("name-en").value = "";
    document.getElementById("email-en").value = "";
    document.getElementById("subject-en").value = "";
    document.getElementById("message-en").value = "";
    
document.getElementById("message-en").value = "Thank you for your feedback. Your message is sent.";
    const myTimeout = setTimeout(function () {
       document.getElementById("message-en").value = "";
    
    }, 4000);
  };
  e.preventDefault();
});

////lazy///
document.addEventListener("DOMContentLoaded", function () {
  const lazyloadImages = document.querySelectorAll(".lazy");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove("lazy");
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image);
    });
  } else {
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll(".lazy");

    function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function () {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function (img) {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
          }
        });
        if (lazyloadImages.length == 0) {
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
      }, 20);
    }

    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  }
});