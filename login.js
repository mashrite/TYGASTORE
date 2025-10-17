// Particles
$('#particles').particleground({
    dotColor: 'rgba(255, 255, 255, 0.2)',
    lineColor: 'rgba(158, 78, 255, 0.2)',
    density: 12000,
    particleRadius: 4,
  });
  
  // Prevent Zoom
  document.addEventListener('gesturestart', e => e.preventDefault());
  document.addEventListener('wheel', e => { if(e.ctrlKey) e.preventDefault() }, { passive: false });
  
  // Login Logic
  const form = document.getElementById("loginForm");
  const notification = document.getElementById("notification");
  
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
  
    if (username === "tygafreefire@gmail.com" && password === "TYGASOLOS!") {
      showNotification("Login successful!", "success");
      setTimeout(() => {
        window.location.href = "admin.html";
      }, 1500);
    } else {
      showNotification("Incorrect username or password.", "error");
    }
  });
  
  function showNotification(message, type) {
    notification.textContent = message;
    notification.className = type;
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 4000);
  }

  
