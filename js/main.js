"use strict";

// Paste your EmailJS dashboard values here.
const EMAILJS_CONFIG = {
  serviceId: "service_rv7ruzb",
  publicKey: "yxGq46CLjAc4jSx8-",
  discountTemplateId: "template_pucorlq",
  eventTemplateId: "template_fk3oran"
};

function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const item = toggle.parentElement;
  const menu = document.getElementById(toggle.getAttribute("aria-controls"));
  let pinned = false;
  function openMenu(open) {
    if (!open) pinned = false;
    menu.hidden = !open;
    item.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }
  openMenu(false);
  item.addEventListener("pointerenter", event => {
    if (event.pointerType === "mouse") openMenu(true);
  });
  item.addEventListener("pointerleave", () => {
    if (!pinned && !menu.contains(document.activeElement)) openMenu(false);
  });
  toggle.addEventListener("click", () => {
    pinned = !pinned;
    openMenu(pinned);
  });
  menu.addEventListener("click", event => {
    if (event.target.closest("a")) openMenu(false);
  });
  document.addEventListener("click", event => {
    if (!item.contains(event.target)) openMenu(false);
  });
  item.addEventListener("focusout", event => {
    if (!item.contains(event.relatedTarget)) openMenu(false);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !menu.hidden) {
      openMenu(false);
      toggle.focus();
    }
  });
}

function setupGallery() {
  const thumbs = [...document.querySelectorAll("#gallery button.image")];
  const viewer = document.querySelector("#gallery-viewer");
  const preview = viewer.querySelector("img");
  let index = 0;
  function show(position) {
    index = (position + thumbs.length) % thumbs.length;
    preview.src = thumbs[index].querySelector("img").src;
    preview.alt = "Gallery image " + (index + 1);
    viewer.querySelector("[role=status]").textContent = (index + 1) + " / " + thumbs.length;
  }
  thumbs.forEach((button, position) => button.addEventListener("click", () => {
    show(position);
    viewer.showModal();
  }));
  viewer.querySelectorAll("[data-step]").forEach(button => {
    button.addEventListener("click", () => show(index + Number(button.dataset.step)));
  });
  viewer.querySelector(".close-viewer").addEventListener("click", () => viewer.close());
  viewer.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      show(index + (event.key === "ArrowLeft" ? -1 : 1));
    }
  });
}

function onFirstView(element, run) {
  if (!("IntersectionObserver" in window)) return run();
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      observer.disconnect();
      run();
    }
  });
  observer.observe(element);
}

function setupMetrics() {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const bars = document.querySelectorAll("[data-width]");
  if (!reduceMotion) {
    // Each track fills when it enters view, including on touch screens.
    bars.forEach(bar => {
      const track = bar.parentElement;
      track.classList.add("awaiting-fill");
      onFirstView(track, () => {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          track.classList.remove("awaiting-fill");
        }));
      });
    });
  }
  const numbers = document.querySelectorAll("[data-goal]");
  onFirstView(document.querySelector("#stats"), () => {
    const start = performance.now();
    function draw(now) {
      const fraction = reduceMotion ? 1 : Math.min(1, (now - start) / 1000);
      numbers.forEach(node => { node.textContent = Math.round(Number(node.dataset.goal) * fraction); });
      if (fraction < 1) requestAnimationFrame(draw);
    }
    draw(start);
  });
}

function setupEvent() {
  const timer = document.querySelector("#events .time");
  // Set data-event-date to an ISO date/time with timezone for a future event.
  const deadline = Date.parse(timer.dataset.eventDate);
  const units = [...timer.querySelectorAll(".unit span:first-child")];
  function tick() {
    const left = Math.floor((deadline - Date.now()) / 1000);
    if (!(left > 0)) {
      timer.textContent = Number.isFinite(deadline) ? "Session ended" : "Date to be announced";
      return;
    }
    const values = [Math.floor(left / 86400), Math.floor(left / 3600) % 24,
      Math.floor(left / 60) % 60, left % 60];
    units.forEach((unit, i) => { unit.textContent = String(values[i]).padStart(2, "0"); });
    setTimeout(tick, 1000);
  }
  tick();

  connectEmailForm(".subscribe form", ".email-status", EMAILJS_CONFIG.eventTemplateId,
    "Your event update request was sent to Tidewick Games.");
}

function setupRequests() {
  const form = document.querySelector("#discount form");
  const plan = form.elements.plan;
  document.querySelectorAll("#pricing .box > a").forEach(link => {
    link.addEventListener("click", () => {
      plan.value = link.parentElement.querySelector(".title").textContent.trim();
      plan.focus({ preventScroll: true });
    });
  });
  connectEmailForm("#discount form", ".request-status", EMAILJS_CONFIG.discountTemplateId,
    "Your discount request was sent to our production team.");
}

function connectEmailForm(selector, statusSelector, templateId, successMessage) {
  const form = document.querySelector(selector);
  const status = document.querySelector(statusSelector);
  const button = form.querySelector("[type=submit]");
  const label = button.value;
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (button.disabled) return;
    if (!EMAILJS_CONFIG.publicKey || !templateId) {
      status.textContent = "Email delivery for this form has not been configured yet.";
      return;
    }
    if (!window.emailjs) {
      status.textContent = "The email service could not load. Check your connection and reload.";
      return;
    }
    button.disabled = true;
    button.value = "Sending…";
    status.textContent = "";
    try {
      await window.emailjs.sendForm(EMAILJS_CONFIG.serviceId, templateId, form, {
        publicKey: EMAILJS_CONFIG.publicKey
      });
      status.textContent = successMessage;
      form.reset();
    } catch {
      status.textContent = "Your request could not be sent. Please try again in a moment.";
    } finally {
      button.disabled = false;
      button.value = label;
    }
  });
}

function setupFieldGuide() {
  const preview = document.querySelector("#videos .preview .info");
  preview.setAttribute("aria-live", "polite");
  const topics = document.querySelectorAll("#videos [data-note]");
  function select(topic) {
    topics.forEach(button => button.setAttribute("aria-pressed", String(button === topic)));
    preview.textContent = topic.dataset.note;
  }
  topics.forEach(button => button.addEventListener("click", () => select(button)));
  select(topics[0]);
}

setupFieldGuide();
setupNavigation();
setupGallery();
setupMetrics();
setupEvent();
setupRequests();
