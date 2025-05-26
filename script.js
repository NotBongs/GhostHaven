function copyIP(btn) {
  const ip = document.getElementById('server-ip').innerText;

  navigator.clipboard.writeText(ip).then(() => {
    const originalContent = btn.innerHTML;

    // Change button to clipboard emoji
    btn.innerHTML = '📋';

    setTimeout(() => {
      btn.innerHTML = originalContent;
    }, 1000);
  });
}

function DiscordLink() {
  window.open("https://discord.gg/wQGTfudGeP", "_blank", "noopener,noreferrer");
}

function goToWiki() {
  window.location.href = 'wiki.html';
}

function setupLogoClick() {
  const logo = document.getElementById('logo');
  if (!logo) return;

  logo.style.cursor = 'pointer'; // change cursor to clickable
  logo.addEventListener('click', () => {
    window.location.href = 'index.html'; // redirect to homepage
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setupLogoClick(); // if you're using the clickable logo
  loadWikiData();
});

// Call this function when the page loads
window.addEventListener('DOMContentLoaded', setupLogoClick);

function populateTable(sectionId, entries) {
  const tbody = document.getElementById(sectionId);
  if (!tbody) return;

  tbody.innerHTML = '';
  entries.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="title">${entry.title}</td>
      <td class="description">${entry.description}</td>
    `;
    tbody.appendChild(row);
  });
}

function populateFAQ(entries) {
  const container = document.getElementById('faq-container');
  if (!container) return;

  container.innerHTML = '';
  entries.forEach(entry => {
    const faqItem = document.createElement('div');
    faqItem.classList.add('faq-item');
    faqItem.innerHTML = `
      <h3>${entry.question}</h3>
      <p>${entry.answer}</p>
    `;
    container.appendChild(faqItem);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  // Populate tables from wikiData object
  populateTable('commands-body', wikiData.commands);
  populateTable('mobs-body', wikiData.mobs);
  populateTable('features-body', wikiData.features);
  populateTable('items-body', wikiData.items);
  populateFAQ(wikiData.faq);
});

// Particles
const canvas = document.getElementById("dust");
const ctx = canvas.getContext("2d");
let particles = [];
const PARTICLE_COUNT = 120;
const MAX_SPEED = 0.5;
const PARTICLE_RADIUS = 3;

// Resize canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Create particles with color property (orange or white)
function createParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: PARTICLE_RADIUS * (0.7 + Math.random() * 0.6),
      dx: (Math.random() - 0.5) * MAX_SPEED,
      dy: (Math.random() - 0.5) * MAX_SPEED,
      color: Math.random() < 0.5 ? "orange" : "white", // 50% chance each
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    // Move particle
    p.x += p.dx;
    p.y += p.dy;

    // Bounce off edges
    if (p.x <= 0 || p.x >= canvas.width) p.dx *= -1;
    if (p.y <= 0 || p.y >= canvas.height) p.dy *= -1;

    // Slight random velocity change for natural drifting
    p.dx += (Math.random() - 0.5) * 0.02;
    p.dy += (Math.random() - 0.5) * 0.02;

    // Limit max speed
    p.dx = Math.max(Math.min(p.dx, MAX_SPEED), -MAX_SPEED);
    p.dy = Math.max(Math.min(p.dy, MAX_SPEED), -MAX_SPEED);

    // Set gradient based on particle color
    let gradient;
    if (p.color === "orange") {
      gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
      gradient.addColorStop(0, "rgba(253, 171, 12, 0.6)");
      gradient.addColorStop(0.7, "rgba(253, 171, 12, 0.1)");
      gradient.addColorStop(1, "rgba(253, 171, 12, 0)");
    } else {
      gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.6)");
      gradient.addColorStop(0.7, "rgba(255, 255, 255, 0.1)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    }

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

createParticles();
animateParticles();