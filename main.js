
async function fetchHTML(options){
    let {url, success} = options;
    try {
      let res = await fetch(url, {headers: {'Content-Type': "text/html; charset=utf-8"}});
      let html = await res.text();
      success(html);
    } catch (error) {
      console.log(error)
    }
}

let $header = document.querySelector('.header');
let $footer = document.querySelector('.footer');

function carga_articulos_destacados(){
	let productos_destacados = document.querySelector("#productos_destacados")
	let item

	for(x in db_articulos) {
		if (db_articulos[x].destacado == 1){
			item = crear_item_producto(db_articulos[x])
			productos_destacados.appendChild(item)
		}
	}
}


function carga_detalle_articulo() {
	let prodId = getParameterByName('id')

	let articulo = db_articulos.find( articulo => articulo.codigo === prodId );
	let res = create_item_detail(articulo)

	let item_detail = document.querySelector('#item-detail')
	item_detail.appendChild(res)
}


function carga_articulos(){
	let productos = document.querySelector("#productos_all")
	let item
	let div

	div = document.createElement('div')
	div.className = 'productos'

	for(x in db_articulos) {

		if(x % 4 == 0 && x > 2){
			div = document.createElement('div')
			div.className = 'productos'
		}
		item = crear_item_producto(db_articulos[x])
		div.appendChild(item)
		productos.appendChild(div)
		
	}
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function crear_item_producto(articulo){

	let item = document.createElement('div')
	let img = document.createElement('img')
	let title = document.createElement('p')
	let price = document.createElement('p')
	let link = document.createElement('a')

	item.className = "item"

	img.src = "images/" + articulo.imagen
	
	let text = document.createTextNode(articulo.nombre);
	title.className = "title"
	title.appendChild(text)

	text = document.createTextNode("$ " + articulo.precio);
	price.className = "price"
	price.appendChild(text)

	text = document.createTextNode("Ver");
	link.className = "btn-ver"
	link.href = `producto.html?id=${articulo.codigo}`
	link.appendChild(text)

	item.appendChild(img)
	item.appendChild(title)
	item.appendChild(price)
	item.appendChild(link)

	return item
}

function create_item_detail(articulo) {
	let producto = document.createElement('div')
	producto.className = "producto"

	let divImage = document.createElement('div')
	let img = document.createElement('img')
	
	img.src = `images/${articulo.imagen}`
	divImage.className = "image"
	divImage.appendChild(img)

	let text = document.createTextNode(`$ ${articulo.precio}`)

	let detalle = document.createElement('div')
	let price = document.createElement('p')
	let title = document.createElement('p')
	let breve = document.createElement('p')

	let desc = document.createElement('small')
	let envio = document.createElement('p')

	let btn = document.createElement('button')

	detalle.className = "detalle"
	price.className = "pprice"
	price.appendChild(text)

	text = document.createTextNode(articulo.nombre)
	title.className = "ptitle"
	title.appendChild(text)

	text = document.createTextNode(articulo.breve)
	breve.className = "pbreve"
	breve.appendChild(text)

	desc.innerHTML = "<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis arcu sed libero lacinia vestibulum. Mauris gravida aliquet ante quis tincidunt. Vivamus sagittis nunc massa, at finibus metus pellentesque eget. Sed magna erat, tristique sit amet leo sit amet, aliquet euismod eros. Aliquam auctor nunc ipsum. Duis at tincidunt ipsum, at porta nibh. In tincidunt diam fringilla odio rhoncus, nec efficitur augue molestie. Nullam eleifend rhoncus est non facilisis.<br><br>"

	text = document.createTextNode('Envio Gratis!')
	envio.className = "envio"
	envio.appendChild(text)

	text = document.createTextNode('Comprar')
	btn.className = "btn-comprar"
	btn.appendChild(text)

	detalle.appendChild(price)
	detalle.appendChild(title)
	detalle.appendChild(breve)
	detalle.appendChild(desc)
	detalle.appendChild(envio)
	detalle.appendChild(btn)

	producto.appendChild(divImage)
	producto.appendChild(detalle)

	return producto
}

fetchHTML({
	url: 'header.html',
	success: (header) => {
		$header.innerHTML = header;
	}
});

fetchHTML({
	url: 'footer.html',
	success: (footer) => $footer.innerHTML = footer
});

// carga_articulos_destacados()