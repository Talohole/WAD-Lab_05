// Simple JavaScript for interactive components
document.addEventListener("DOMContentLoaded", function () {
  // Update slider values
  const sliders = document.querySelectorAll(".slider");
  sliders.forEach((slider) => {
    const valueDisplay = slider.nextElementSibling && slider.nextElementSibling.classList.contains('slider-value') ? slider.nextElementSibling : null;
    if (valueDisplay) {
      // fontSize slider displays 'px' not %
      valueDisplay.textContent = slider.id === 'fontSize' ? slider.value + "px" : slider.value + "%";
    }

    slider.addEventListener("input", function () {
      if (valueDisplay) {
        valueDisplay.textContent = this.id === 'fontSize' ? this.value + "px" : this.value + "%";
      }
    });
  });

  // Chip close functionality
  const chipCloses = document.querySelectorAll(".chip .close");
  chipCloses.forEach((close) => {
    close.addEventListener("click", function (e) {
      e.stopPropagation();
      this.parentElement.style.display = "none";
      showToast("Chip removed", "info");
    });
  });
});

// Accordion functionality
function toggleAccordion(element) {
  const content = element.nextElementSibling;
  const isActive = content.classList.contains("active");

  // Close all accordion items
  document.querySelectorAll(".accordion-content").forEach((item) => {
    item.classList.remove("active");
  });

  document.querySelectorAll(".accordion-header i").forEach((icon) => {
    icon.textContent = "expand_more";
  });

  // Open clicked item if it wasn't already active
  if (!isActive) {
    content.classList.add("active");
    const icon = element.querySelector("i");
    if (icon) icon.textContent = "expand_less";
  }
}

// Modal functionality
function openModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "none";
}

// Close modal when clicking outside the content
window.addEventListener("click", function (event) {
  const modal = document.getElementById("modal");
  if (modal && event.target === modal) {
    closeModal();
  }
});

// Toast functionality
function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) return;
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
                <div>${message}</div>
                <span class="toast-close" role="button" aria-label="Close toast">&times;</span>
            `;

  toastContainer.appendChild(toast);

  // Show toast with animation
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Close on click of x
  toast.querySelector(".toast-close").addEventListener("click", function () {
    toast.classList.remove("show");
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.classList.remove("show");
      setTimeout(() => {
        if (toast.parentElement) {
          toast.parentElement.removeChild(toast);
        }
      }, 300);
    }
  }, 5000);
}

// Tab functionality
function openTab(evt, tabId) {
  // Hide all tab panes
  document.querySelectorAll(".tab-pane").forEach((pane) => {
    pane.style.display = "none";
  });

  // Remove active class from all tab links
  document.querySelectorAll(".tab-link").forEach((link) => {
    link.classList.remove("active");
  });

  // Show the selected tab pane
  const pane = document.getElementById(tabId);
  if (pane) pane.style.display = "block";

  // Add active class to the clicked tab link
  if (evt && evt.currentTarget) evt.currentTarget.classList.add("active");
}

// Dropdown functionality
function toggleDropdown(button) {
  const dropdownMenu = button.nextElementSibling;
  if (!dropdownMenu) return;
  dropdownMenu.classList.toggle("show");
  // stop propagation so global click handler doesn't close it immediately
  event && event.stopPropagation && event.stopPropagation();
}

// Global click listener to close dropdowns when clicking outside
document.addEventListener("click", function (e) {
  document.querySelectorAll(".dropdown-menu.show").forEach((menu) => {
    if (!menu.parentElement.contains(e.target)) {
      menu.classList.remove("show");
    }
  });
});

// Chip functionality
function toggleChip(chip) {
  chip.classList.toggle("active");
  const isActive = chip.classList.contains("active");
  showToast(
    `Chip ${isActive ? "activated" : "deactivated"}`,
    isActive ? "success" : "info"
  );
}

function removeChip(event, chip) {
  event.stopPropagation();
  chip.style.display = "none";
  showToast("Chip removed", "info");
}

// Switch functionality
function toggleSwitch(name, isChecked) {
  showToast(
    `${name} ${isChecked ? "enabled" : "disabled"}`,
    isChecked ? "success" : "info"
  );
}

// List item functionality
function selectListItem(item) {
  document.querySelectorAll(".list-item").forEach((li) => {
    li.style.backgroundColor = "";
  });
  item.style.backgroundColor = "rgba(67, 97, 238, 0.1)";
  showToast(`Selected: ${item.querySelector("span").textContent}`, "success");
}

// Form functionality
function handleFormSubmit(event) {
  event.preventDefault();
  showToast("Form submitted successfully!", "success");

  // Reset form
  event.target.reset();
}

// Table functionality
function editItem(button) {
  const row = button.parentElement.parentElement;
  const name = row.cells[0].textContent;
  showToast(`Editing: ${name}`, "info");
}

function deleteItem(button) {
  const row = button.parentElement.parentElement;
  const name = row.cells[0].textContent;
  row.style.opacity = "0.5";
  setTimeout(() => {
    if (row.parentElement) row.parentElement.removeChild(row);
  }, 400);
  showToast(`Deleted: ${name}`, "warning");
}

function sortTable(columnIndex) {
  showToast(`Sorting by column ${columnIndex + 1}`, "info");
}

// Alert functionality
function closeAlert(alert) {
  alert.style.display = "none";
}

function showAlert(type) {
  let message = "";
  switch (type) {
    case "success":
      message = "This is a success message!";
      break;
    case "warning":
      message = "This is a warning message!";
      break;
    case "info":
      message = "This is an info message!";
      break;
  }
  showToast(message, type);
}

// Progress bar functionality
function animateProgress(id, targetWidth) {
  const progressBar = document.getElementById(id);
  progressBar.style.width = targetWidth + "%";
  showToast(`Progress updated to ${targetWidth}%`, "success");
}

// Pagination functionality
function changePage(page) {
  showToast(`Navigating to page ${page}`, "info");
}

// Breadcrumb functionality
function navigateBreadcrumb(page) {
  showToast(`Navigating to ${page}`, "info");
}

// Navigation functionality
function setActiveNav(item) {
  document.querySelectorAll(".nav-item").forEach((navItem) => {
    navItem.classList.remove("active");
  });
  item.classList.add("active");
  showToast(`Navigating to ${item.textContent}`, "info");
}

// Update slider value display
function updateSliderValue(slider, valueId) {
  const el = document.getElementById(valueId);
  if (el) el.textContent = slider.value + "%";
}

// Update opacity based on slider
function updateOpacity(value) {
  document.querySelectorAll(".section").forEach((section) => {
    section.style.opacity = value / 100;
  });
}

// Customization panel functionality
function togglePanel() {
  const panel = document.getElementById("customPanel");
  const pullTab = document.getElementById("panelPullTab");
  if (!panel) return;
  panel.classList.toggle("open");

  // Show/hide pull tab based on panel state
  if (panel.classList.contains("open")) {
    if (pullTab) pullTab.style.display = "none";
  } else {
    setTimeout(() => {
      if (pullTab) pullTab.style.display = "flex";
    }, 300); // Match the panel transition time
  }
}

// Handle keyboard shortcuts
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const panel = document.getElementById("customPanel");
    if (panel && panel.classList.contains("open")) {
      togglePanel();
    }
  }
});

// Handle click outside to close customization panel
document.addEventListener("click", function (event) {
  const panel = document.getElementById("customPanel");
  const panelToggle = document.querySelector(".panel-toggle");
  const pullTab = document.getElementById("panelPullTab");

  if (!panel) return;
  if (pullTab && pullTab.contains(event.target)) {
    return;
  }
  if (
    panel.classList.contains("open") &&
    !panel.contains(event.target) &&
    event.target !== panelToggle &&
    !panelToggle.contains(event.target)
  ) {
    togglePanel();
  }
});

// Add touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener(
  "touchstart",
  function (event) {
    touchStartX = event.changedTouches[0].screenX;
  },
  false
);

document.addEventListener(
  "touchend",
  function (event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  },
  false
);

function handleSwipe() {
  const panel = document.getElementById("customPanel");
  const swipeThreshold = 50; // minimum distance for swipe
  if (!panel) return;

  // Right to left swipe (close panel)
  if (
    panel.classList.contains("open") &&
    touchStartX - touchEndX > swipeThreshold
  ) {
    togglePanel();
  }

  // Left to right swipe (open panel)
  if (
    !panel.classList.contains("open") &&
    touchEndX - touchStartX > swipeThreshold &&
    touchStartX < 50
  ) {
    togglePanel();
  }
}

// Initialize panel state on page load
document.addEventListener("DOMContentLoaded", function () {
  const panel = document.getElementById("customPanel");
  const pullTab = document.getElementById("panelPullTab");

  // Initial clock update
  updateClock();
  // Update clock every second
  setInterval(updateClock, 1000);

  // Generate calendar
  generateCalendar();

  if (pullTab && !panel.classList.contains("open")) {
    pullTab.style.display = "flex";
  }

  // Make sure the default color option is active if present
  const defaultColorOption = document.querySelector('.color-option[style*="#4361ee"]');
  if (defaultColorOption) defaultColorOption.classList.add('active');
});

// Improved changeColor to avoid relying on an event object
function changeColor(variable, color, el) {
  if (!variable || !color) return;
  try {
    document.documentElement.style.setProperty(`--${variable}`, color);
  } catch (err) {
    // ignore if invalid
  }

  // Update active color indicator
  document.querySelectorAll(".color-option").forEach((option) => {
    option.classList.remove("active");
  });

  // If an element reference was passed, use it; otherwise try to find matching color-option by style
  if (el && el.classList) {
    el.classList.add("active");
  } else {
    const found = Array.from(document.querySelectorAll('.color-option')).find(o => {
      const bg = (o.style.backgroundColor || '').replace(/\s/g,'').toLowerCase();
      const c = (color || '').replace(/\s/g,'').toLowerCase();
      return bg === c || bg.indexOf(c.replace('#','')) !== -1 || window.getComputedStyle(o).backgroundColor === color;
    });
    if (found) found.classList.add('active');
  }

  showToast(`Color changed to ${color}`, "success");
}

function changeTheme(theme) {
  let primary, secondary, light, dark, bodyBg, cardBg, textColor, borderColor;

  switch (theme) {
    case "dark":
      primary = "#7b68ee";
      secondary = "#4cc9f0";
      light = "#2d3748";
      dark = "#f8f9fa";
      bodyBg = "#121212";
      cardBg = "#1e1e1e";
      textColor = "#e2e8f0";
      borderColor = "#4a5568";
      break;
    case "blue":
      primary = "#0077b6";
      secondary = "#00b4d8";
      light = "#caf0f8";
      dark = "#03045e";
      bodyBg = "#f5f7ff";
      cardBg = "#ffffff";
      textColor = "#212529";
      borderColor = "#e9ecef";
      break;
    case "green":
      primary = "#2a9d8f";
      secondary = "#e9c46a";
      light = "#e9f5db";
      dark = "#264653";
      bodyBg = "#f5f7ff";
      cardBg = "#ffffff";
      textColor = "#212529";
      borderColor = "#e9ecef";
      break;
    default: // light
      primary = "#4361ee";
      secondary = "#3a0ca3";
      light = "#f8f9fa";
      dark = "#212529";
      bodyBg = "#f5f7ff";
      cardBg = "#ffffff";
      textColor = "#212529";
      borderColor = "#e9ecef";
  }

  // Set all theme-related CSS variables
  document.documentElement.style.setProperty("--primary", primary);
  document.documentElement.style.setProperty("--secondary", secondary);
  document.documentElement.style.setProperty("--light", light);
  document.documentElement.style.setProperty("--dark", dark);
  document.documentElement.style.setProperty("--body-bg", bodyBg);
  document.documentElement.style.setProperty("--card-bg", cardBg);
  document.documentElement.style.setProperty("--text-color", textColor);
  document.documentElement.style.setProperty("--border-color", borderColor);

  if (theme === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }

  showToast(`Theme changed to ${theme}`, "success");
}

function changeFontSize(size) {
  const s = parseInt(size, 10) || 16;
  document.documentElement.style.fontSize = s + "px";
  const el = document.getElementById("fontSizeValue");
  if (el) el.textContent = s + "px";
}

function changeBorderRadius(radius) {
  const r = parseInt(radius, 10) || 5;
  document.documentElement.style.setProperty("--border-radius", r + "px");
  const el = document.getElementById("borderRadiusValue");
  if (el) el.textContent = r + "px";
}

function resetStyles() {
  // Reset CSS variables to default values
  document.documentElement.style.setProperty("--primary", "#4361ee");
  document.documentElement.style.setProperty("--secondary", "#3a0ca3");
  document.documentElement.style.setProperty("--light", "#f8f9fa");
  document.documentElement.style.setProperty("--dark", "#212529");
  document.documentElement.style.setProperty("--body-bg", "#f5f7ff");
  document.documentElement.style.setProperty("--card-bg", "#ffffff");
  document.documentElement.style.setProperty("--text-color", "#212529");
  document.documentElement.style.setProperty("--border-color", "#e9ecef");

  // Remove dark theme class
  document.body.classList.remove("dark-theme");

  // Reset font size to default (16px)
  document.documentElement.style.fontSize = "16px";
  const fs = document.getElementById("fontSize");
  if (fs) fs.value = "16";
  const fsVal = document.getElementById("fontSizeValue");
  if (fsVal) fsVal.textContent = "16px";

  // Reset border radius to default (5px)
  document.documentElement.style.setProperty("--border-radius", "5px");
  const br = document.getElementById("borderRadius");
  if (br) br.value = "5";
  const brVal = document.getElementById("borderRadiusValue");
  if (brVal) brVal.textContent = "5px";

  // Reset theme selector
  const themeSelect = document.getElementById("themeSelect");
  if (themeSelect) themeSelect.value = "light";

  // Remove active state from color options
  document.querySelectorAll(".color-option").forEach((option) => {
    option.classList.remove("active");
  });

  // Add active class to the default primary color option
  const defaultColorOption = document.querySelector(
    '.color-option[style*="#4361ee"]'
  );
  if (defaultColorOption) {
    defaultColorOption.classList.add("active");
  }

  showToast("Styles reset to default", "success");
}

let clockType = "digital";

// Function to set clock type
function setClockType(type) {
  clockType = type;

  // Update toggle buttons
  const dt = document.getElementById("digitalToggle");
  const at = document.getElementById("analogToggle");
  if (dt) dt.classList.toggle("active", type === "digital");
  if (at) at.classList.toggle("active", type === "analog");

  // Show/hide appropriate clock display
  const analogContainer = document.getElementById("analog-clock-container");
  const digitalClock = document.getElementById("clock");

  if (type === "digital") {
    if (analogContainer) analogContainer.style.display = "none";
    if (digitalClock) digitalClock.style.display = "block";
  } else {
    if (analogContainer) analogContainer.style.display = "flex";
    if (digitalClock) digitalClock.style.display = "none";
    drawAnalogClock(); // Initial draw
  }
}

// Clock and date function
function updateClock() {
  const now = new Date();

  if (clockType === "digital") {
    const timeString = now.toLocaleTimeString();
    const clockEl = document.getElementById("clock");
    if (clockEl) clockEl.textContent = timeString;
  } else {
    drawAnalogClock();
  }

  // Update date in both modes
  const dateString = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dateEl = document.getElementById("date");
  if (dateEl) dateEl.textContent = dateString;
}

// Function to draw analog clock
function drawAnalogClock() {
  const canvas = document.getElementById("analog-clock");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const radius = canvas.height / 2;

  // Clear canvas and reset transform
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw clock face
  ctx.beginPath();
  ctx.arc(radius, radius, radius * 0.9, 0, 2 * Math.PI);
  ctx.fillStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--card-bg").trim() || "#fff";
  ctx.fill();

  // Draw clock border
  ctx.beginPath();
  ctx.arc(radius, radius, radius * 0.9, 0, 2 * Math.PI);
  ctx.strokeStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "#4361ee";
  ctx.lineWidth = radius * 0.05;
  ctx.stroke();

  // Draw hour markers
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI) / 6;
    ctx.beginPath();
    const innerRadius = radius * 0.8;
    const outerRadius = radius * 0.9;
    ctx.moveTo(
      radius + innerRadius * Math.sin(angle),
      radius - innerRadius * Math.cos(angle)
    );
    ctx.lineTo(
      radius + outerRadius * Math.sin(angle),
      radius - outerRadius * Math.cos(angle)
    );
    ctx.lineWidth = radius * 0.02;
    ctx.strokeStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--dark").trim() || "#212529";
    ctx.stroke();
  }

  // Draw center point
  ctx.beginPath();
  ctx.arc(radius, radius, radius * 0.05, 0, 2 * Math.PI);
  ctx.fillStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "#4361ee";
  ctx.fill();

  // Get current time
  const now = new Date();
  const hour = now.getHours() % 12;
  const minute = now.getMinutes();
  const second = now.getSeconds();

  // Draw hour hand
  const hourAngle = ((hour + minute / 60) * Math.PI) / 6;
  drawHand(ctx, hourAngle, radius * 0.5, radius * 0.05);

  // Draw minute hand
  const minuteAngle = ((minute + second / 60) * Math.PI) / 30;
  drawHand(ctx, minuteAngle, radius * 0.7, radius * 0.04);

  // Draw second hand
  const secondAngle = (second * Math.PI) / 30;
  ctx.beginPath();
  ctx.moveTo(radius, radius);
  ctx.lineTo(
    radius + radius * 0.8 * Math.sin(secondAngle),
    radius - radius * 0.8 * Math.cos(secondAngle)
  );
  ctx.strokeStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--warning").trim() || "#f72585";
  ctx.lineWidth = radius * 0.01;
  ctx.stroke();
}

// Function to draw clock hands
function drawHand(ctx, angle, length, width) {
  const radius = ctx.canvas.height / 2;
  ctx.beginPath();
  ctx.moveTo(radius, radius);
  ctx.lineTo(
    radius + length * Math.sin(angle),
    radius - length * Math.cos(angle)
  );
  ctx.lineWidth = width;
  ctx.strokeStyle = window.getComputedStyle(document.documentElement).getPropertyValue("--dark").trim() || "#212529";
  ctx.stroke();
}

// Calendar function
function generateCalendar() {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const currentDay = now.getDate();

  // Set the current month name
  const monthName = now.toLocaleString("default", { month: "long" });
  const currentMonthEl = document.getElementById("current-month");
  if (currentMonthEl) currentMonthEl.textContent = `${monthName} ${year}`;

  const calendarElement = document.getElementById("mini-calendar");
  if (!calendarElement) return;
  calendarElement.innerHTML = "";

  // Add day names
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  dayNames.forEach((day) => {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day day-name";
    dayElement.textContent = day;
    calendarElement.appendChild(dayElement);
  });

  // Get first day of month and total days
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Add empty spaces for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.className = "calendar-day empty";
    calendarElement.appendChild(emptyDay);
  }

  // Add days of the month
  for (let day = 1; day <= totalDays; day++) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";
    dayElement.textContent = day;

    // Highlight current day
    if (day === currentDay) {
      dayElement.classList.add("current");
    }

    calendarElement.appendChild(dayElement);
  }
}

// Mood tracking function
function trackMood(emoji) {
  const responses = {
    "😄": "Great to see you happy today!",
    "🙂": "Looking good! Have a nice day.",
    "😐": "Hope your day gets better soon.",
    "😢": "Sorry you're feeling down.",
    "😤": "Take a deep breath, things will improve.",
  };

  const resp = document.getElementById("mood-response");
  if (resp) resp.textContent = responses[emoji];
  showToast(`Mood set to ${emoji}`, "success");
}
