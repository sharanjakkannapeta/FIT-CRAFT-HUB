async function addProduct(){
  await fetch("/api/products",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      name:name.value,
      price:price.value,
      image:image.value
    })
  });
  alert("Added");
}

async function loadOrders(){
  const res=await fetch("/api/orders");
  const data=await res.json();

  let html="";
  data.forEach(o=>{
    html+=`<p>${o._id} - ${o.status}</p>`;
  });

  document.getElementById("orders").innerHTML=html;
}

loadOrders();
async function loadOrders(){
  const res = await fetch("/api/orders");
  const data = await res.json();

  let html = "";

  data.forEach(o=>{
    html += `
      <div>
        <p>ID: ${o._id}</p>
        <p>Name: ${o.customer.name}</p>
        <p>Status: ${o.status}</p>

        <select onchange="updateStatus('${o._id}', this.value)">
          <option>Order Placed</option>
          <option>Shipped</option>
          <option>Out for Delivery</option>
          <option>Delivered</option>
        </select>
      </div>
    `;
  });

  document.getElementById("orders").innerHTML = html;
}
async function updateStatus(id, status){
  await fetch("/api/orders/" + id,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({status})
  });

  alert("Status Updated ✅");
}