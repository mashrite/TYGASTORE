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
  
  // Back4App Credentials
  const APP_ID = "Dns4OAHKlwFOqnNVSsxPrM21RgPFw3q0hiv8mfWL";
  const JS_KEY = "5usj4euoHY8Ac2cJPNfFoHcfwMGn1LOSL78JmXfF";
  const API_URL = "https://parseapi.back4app.com/classes/Product";
  
  const form = document.getElementById("productForm");
  const list = document.getElementById("productList");
  const editIndex = document.getElementById("editIndex");
  const cancelEdit = document.getElementById("cancelEdit");
  
  let products = []; // Local cache
  
  function renderProducts() {
    list.innerHTML = "";
    products.forEach((p, index) => {
      const card = document.createElement("div");
      card.className = "plan-card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}" style="width:100%; height:180px; object-fit:cover; border-radius:12px; margin-bottom:15px;">
        <h3 class="plan-name">${p.name}</h3>
        <div class="plan-price">${p.price}</div>
        <p style="margin-bottom:15px;">${p.desc}</p>
        <button onclick="editProduct(${index})" class="btn btn-primary" style="margin-right:10px;">Edit</button>
        <button onclick="deleteProduct(${index})" class="btn btn-outline">Delete</button>
      `;
      list.appendChild(card);
    });
  }
  
  function loadProducts() {
    fetch(API_URL, {
      headers: {
        "X-Parse-Application-Id": APP_ID,
        "X-Parse-JavaScript-Key": JS_KEY
      }
    })
      .then(res => res.json())
      .then(data => {
        products = data.results;
        renderProducts();
      })
      .catch(err => console.error("Failed to load products:", err));
  }
  
  function deleteProduct(index) {
    const id = products[index].objectId;
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "X-Parse-Application-Id": APP_ID,
        "X-Parse-JavaScript-Key": JS_KEY
      }
    })
      .then(() => {
        products.splice(index, 1);
        renderProducts();
      })
      .catch(err => console.error("Failed to delete product:", err));
  }
  
  function deleteAllProducts() {
    if (!confirm("Are you sure you want to delete all products?")) return;
    products.forEach((p, index) => deleteProduct(index));
  }
  
  function editProduct(index) {
    const p = products[index];
    document.getElementById("productName").value = p.name;
    document.getElementById("productPrice").value = p.price;
    document.getElementById("productImage").value = p.image;
    document.getElementById("productDesc").value = p.desc;
    editIndex.value = index;
    cancelEdit.style.display = "inline-block";
  }
  
  cancelEdit.addEventListener("click", () => {
    form.reset();
    editIndex.value = "";
    cancelEdit.style.display = "none";
  });
  
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const newProduct = {
      name: document.getElementById("productName").value.trim(),
      price: document.getElementById("productPrice").value.trim(),
      image: document.getElementById("productImage").value.trim(),
      desc: document.getElementById("productDesc").value.trim()
    };
  
    const index = editIndex.value;
  
    if (index === "") {
      // Add new product
      fetch(API_URL, {
        method: "POST",
        headers: {
          "X-Parse-Application-Id": APP_ID,
          "X-Parse-JavaScript-Key": JS_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
      })
        .then(res => res.json())
        .then(data => {
          newProduct.objectId = data.objectId;
          products.push(newProduct);
          form.reset();
          renderProducts();
        })
        .catch(err => console.error("Failed to add product:", err));
    } else {
      // Update existing product
      const id = products[index].objectId;
      fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "X-Parse-Application-Id": APP_ID,
          "X-Parse-JavaScript-Key": JS_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
      })
        .then(() => {
          products[index] = { ...newProduct, objectId: id };
          form.reset();
          cancelEdit.click();
          renderProducts();
        })
        .catch(err => console.error("Failed to update product:", err));
    }
  });
  
  loadProducts();
  