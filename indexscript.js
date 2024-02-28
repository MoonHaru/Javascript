"usestrict"
let products = [
  {
    nombre: 'Whisky Escocés',
    marca: 'Johnnie Walker',
    categoria: 'Licor',
    volumen: '750 ml',
    gradoAlcoholico: 40,
    precio: 50.99,  // Precio ficticio en dólares
    cantidad: 15
  },
  {
    nombre: 'Vodka',
    marca: 'Absolut',
    categoria: 'Licor',
    volumen: '700 ml',
    gradoAlcoholico: 40,
    precio: 25.50,  // Precio ficticio en dólares
    cantidad: 20
  },
  {
    nombre: 'Vino Tinto',
    marca: 'Concha y Toro',
    categoria: 'Vino',
    volumen: '750 ml',
    gradoAlcoholico: 13,
    precio: 12.75,  // Precio ficticio en dólares
    cantidad: 30
  },
  {
    nombre: 'Cerveza IPA',
    marca: 'Stone Brewing',
    categoria: 'Cerveza',
    volumen: '355 ml',
    gradoAlcoholico: 6.9,
    precio: 3.99,  // Precio ficticio en dólares
    cantidad: 50
  },
  {
    nombre: 'Ron',
    marca: 'Havana Club',
    categoria: 'Licor',
    volumen: '700 ml',
    gradoAlcoholico: 40,
    precio: 18.99,  // Precio ficticio en dólares
    cantidad: 25
  },
  {
    nombre: 'Ginebra',
    marca: 'Bombay Sapphire',
    categoria: 'Licor',
    volumen: '750 ml',
    gradoAlcoholico: 47,
    precio: 28.50,  // Precio ficticio en dólares
    cantidad: 18
  },
  {
    nombre: 'Tequila',
    marca: 'Patrón',
    categoria: 'Licor',
    volumen: '750 ml',
    gradoAlcoholico: 40,
    precio: 39.99,  // Precio ficticio en dólares
    cantidad: 22
  },
  {
    nombre: 'Champán',
    marca: 'Moët & Chandon',
    categoria: 'Vino Espumoso',
    volumen: '750 ml',
    gradoAlcoholico: 12,
    precio: 55.75,  // Precio ficticio en dólares
    cantidad: 12
  },
  {
    nombre: 'Sidra',
    marca: 'Strongbow',
    categoria: 'Cerveza de Sidra',
    volumen: '500 ml',
    gradoAlcoholico: 5,
    precio: 4.25,  // Precio ficticio en dólares
    cantidad: 40
  },
  {
    nombre: 'Licor de Café',
    marca: 'Kahlúa',
    categoria: 'Licor',
    volumen: '750 ml',
    gradoAlcoholico: 20,
    precio: 21.99,  // Precio ficticio en dólares
    cantidad: 15
  },
  // lista de productos generada por chatgpt
];
function precioiva(precio) {//calcula el precio mas iva
  return ((precio) * 1.19).toFixed(1);
}

function preciosuge(precio) {//calcula el precio sugerido
  return (((precio) * 1.19) * 1.25).toFixed(1);
}

function carritoSum(carrito) {
  let totalsum = 0;
  for (let car of carrito) {
    totalsum = car.fnal + totalsum;
  }
  return totalsum;
}
function checkAva(quanti, id) {
  if (carrito.length > 0 && carrito.some(p => p.productID == id)) {
    let obj = carrito.find(p => p.productID == id);
    const req = parseInt(quanti) + parseInt(obj.quantiIng);
    if (products[id].cantidad > req) {
      return true;
    } else {
      return false;
    }
  } else {
    if (products[id].cantidad > quanti) {
      return true
    } else {
      return false
    }
  }
}
function pushing() {//funcion de agregar al carrito
  const id = document.getElementById("ID").value - 1;
  const quanti = document.getElementById("quant").value;
  if (id + 1 > 0 && quanti > 0) {
    const id = document.getElementById("ID").value - 1;
    const quanti = document.getElementById("quant").value;
    const finalPri = (precioiva(products[id].precio) * quanti);
    document.getElementById("precio").innerHTML = "Precio total item = " + finalPri.toFixed(1)
    const exist = carrito.some(pro => pro.productID === id)//checkea si el prodcto ya existe
    const ava = checkAva(quanti, id);//checkea disponibilidad
    if (exist && ava) {
      let obj = carrito.find(p => p.productID == id);
      obj.quantiIng = parseInt(obj.quantiIng) + parseInt(quanti);
      obj.fnal = obj.fnal + finalPri;
    }
    else if (!exist && ava) {
      const obj = {
        productID: id,
        productoIng: products[id].nombre,
        quantiIng: quanti,
        fnal: finalPri
      }
      carrito.push(obj);
    }
    else {
      alert("Producto fuera del stock requerido");
    }
    const total = carritoSum(carrito);
    document.getElementById("precioCarrito").innerText = "Precio Carrito = " + total.toFixed(1);
    console.log(carrito);
  } else {
    alert("Ingrese cantidades validas");
  }
  document.getElementById("quant").value = '';
  document.getElementById("ID").value = '';

}
function updateStock() {//imprime en el documento todos los campos y todos los productos
  let i = 1;
  for (let product of products) {
    document.write("<ul><li><h3>ID: " + i + "</h3></li>");
    document.write("<ul><li><h3>Nombre: " + product.nombre + "</h3></li>");
    document.write("<li><h3>Marca: " + product.marca + "</h3></li>");
    document.write("<li><h3>Categoria: " + product.categoria + "</h3></li>");
    document.write("<li><h3>Volumen: " + product.volumen + "</h3></li>");
    document.write("<li><h3>Grado: " + product.gradoAlcoholico + "</h3></li>");
    document.write("<li><h3>Precio: " + product.precio + "</h3></li>");
    document.write("<li><h3>Precio IVA: " + precioiva(product.precio) + "</h3></li>");
    document.write("<li><h3>Precio Sugerido: " + preciosuge(product.precio) + "</h3></li>");
    document.write("<li><h3 id='CantidadStock " + i + "'>Stock: " + product.cantidad + "</h3></li></ul><br>");
    i++;
  }
}
function out() {
  for (let car of carrito) {
    const id = car.productID;
    products[id].cantidad = products[id].cantidad - car.quantiIng;
    document.getElementById("CantidadStock " + (id + 1)).innerHTML = "<li><h3 id='CantidadStock " + (id + 1) + "'>Stock: " + products[id].cantidad + "</h3></li></ul><br>";

  }
  carrito = [];
  document.getElementById("quant").value = '';
  document.getElementById("ID").value = '';
}
function stocking() {
  const ingName = document.getElementById("IDIng").value;
  const exist = products[ingName-1];
  if (exist && ingName != "") {
    alert("producto ya existe agregando cantidad a stock");
    exist.cantidad = parseInt(exist.cantidad) + parseInt(document.getElementById("cantidadIng").value);
    console.log(exist);
    updateStockpar(ingName-1);
  } else if(!exist && ingName != ""){
    console.log("hola");
    const obj = {
      nombre: document.getElementById("nombreIng").value,
      marca: document.getElementById("marcaIng").value,
      categoria: document.getElementById("cateIng").value,
      volumen: document.getElementById("volIng").value,
      gradoAlcoholico: document.getElementById("gradoIng").value,
      precio: document.getElementById("precioIng").value,  // Precio ficticio en dólares
      cantidad: document.getElementById("cantidadIng").value
    }
    products.push(obj);
    updateFP();
  }else{
    alert("valores validos porfavor");
  }

}

function updateFP() {
  console.log(products.length);
  const aux = document.getElementById("CantidadStock " + (products.length-1));
  aux.insertAdjacentHTML("beforeend","<ul><li><h3>ID: " + products.length + "</h3></li>");
  aux.insertAdjacentHTML("beforeend","<ul><li><h3>Nombre: " + products[products.length - 1].nombre + "</h3></li>");
  aux.insertAdjacentHTML("beforeend","<li><h3>Marca: " + products[products.length - 1].marca + "</h3></li>");
  aux.insertAdjacentHTML("beforeend","<li><h3>Categoria: " + products[products.length - 1].categoria + "</h3></li>");
  aux.insertAdjacentHTML("beforeend","<li><h3>Volumen: " + products[products.length - 1].volumen + "</h3></li>");
  aux.insertAdjacentHTML("beforeend","<li><h3>Grado: " + products[products.length - 1].gradoAlcoholico + "</h3></li>");
  aux.insertAdjacentHTML("beforeend","<li><h3>Precio: " + products[products.length - 1].precio + "</h3></li>");
  aux.insertAdjacentHTML("beforeend","<li><h3>Precio IVA: " + precioiva(products[products.length - 1].precio) + "</h3></li>");
  aux.insertAdjacentHTML("beforeend","<li><h3>Precio Sugerido: " + preciosuge(products[products.length - 1].precio) + "</h3></li>");
  aux.insertAdjacentHTML("beforeend","<li><h3 id='CantidadStock " + products.length + "'>Stock: " + products[products.length - 1].cantidad + "</h3></li></ul><br>");
}

function updateStockpar(index){
  document.getElementById("CantidadStock " + (index+1)).innerHTML = "<li><h3 id='CantidadStock " + (index + 1) + "'>Stock: " + products[index].cantidad + "</h3></li></ul><br>";
}

carrito = []
updateStock();


