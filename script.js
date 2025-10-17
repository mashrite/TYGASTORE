// Particles Effect
$('#particles').particleground({
    dotColor: 'rgba(255, 255, 255, 0.2)',
    lineColor: 'rgba(158, 78, 255, 0.2)',
    density: 12000,
    particleRadius: 4,
  });
  
  // Notification for messages (if needed)
  const params = new URLSearchParams(window.location.search);
  const msg = params.get("msg");
  
  if (msg) {
    showNotification(decodeURIComponent(msg));
  }
  
  function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.innerHTML = `<i class="fas fa-exclamation-circle"></i> &nbsp; ${message}`;
    notification.style.display = 'block';
    notification.classList.add("error");
  
    setTimeout(() => {
      notification.style.display = 'none';
    }, 5000);
  }
  
  // Prevent Zoom
  document.addEventListener('gesturestart', e => e.preventDefault());
  document.addEventListener('wheel', e => { if(e.ctrlKey) e.preventDefault() }, { passive: false });
  