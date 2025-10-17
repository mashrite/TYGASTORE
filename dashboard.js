// Particles Effect
$('#particles').particleground({
  dotColor: 'rgba(255, 255, 255, 0.2)',
  lineColor: 'rgba(158, 78, 255, 0.2)',
  density: 12000,
  particleRadius: 4,
});

// Prevent Zoom
document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('wheel', e => { if(e.ctrlKey) e.preventDefault() }, { passive: false });

// WhatsApp Contact Form
function sendWhatsApp(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();
  const phone = "2348059112336";
  const url = `https://wa.me/${phone}?text=Hello%2C%20my%20name%20is%20${encodeURIComponent(name)}.%20${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Load Products from Back4App
function renderProductsFromBack4App() {
  fetch("https://parseapi.back4app.com/classes/Product", {
    headers: {
      "X-Parse-Application-Id": "Dns4OAHKlwFOqnNVSsxPrM21RgPFw3q0hiv8mfWL",
      "X-Parse-JavaScript-Key": "5usj4euoHY8Ac2cJPNfFoHcfwMGn1LOSL78JmXfF"
    }
  })
    .then(res => res.json())
    .then(data => {
      const products = data.results;
      const list = document.getElementById("productList");
      list.innerHTML = "";

      products.forEach(p => {
        const card = document.createElement("div");
        card.className = "plan-card";
        card.innerHTML = `
          <img src="${p.image}" alt="${p.name}" style="width:100%; height:180px; object-fit:cover; border-radius:12px; margin-bottom:15px;">
          <h3 class="plan-name">${p.name}</h3>
          <div class="plan-price">${p.price}</div>
          <p style="margin-bottom:15px;">${p.desc}</p>
          <a href="https://wa.me/2348059112336?text=I%20want%20to%20buy%20${encodeURIComponent(p.name)}" class="btn btn-outline">Buy Now</a>
        `;
        list.appendChild(card);
      });
    })
    .catch(err => console.error("Failed to load products:", err));
}

renderProductsFromBack4App();
