

function carga_articulos_destacados(){
	let productos_destacados = document.querySelector("#productos_destacados")
	let item

	for(x in db_articulos) {
		if (db_articulos[x].destacado == 1){
			console.log(db_articulos[x].codigo + db_articulos[x].descripcion)
			item = crear_item_producto(db_articulos[x])

			productos_destacados.appendChild(item)
		}
	}
}

function crear_item_producto(articulo){

	let item = document.createElement('div')
	let img = document.createElement('img')
	let title = document.createElement('p')
	let price = document.createElement('p')
	let link = document.createElement('a')

	item.className = "item"

	img.src = "images/" + articulo.imagen
	
	let text = document.createTextNode(articulo.descripcion);
	title.className = "title"
	title.appendChild(text)

	text = document.createTextNode("$ " + articulo.precio);
	price.className = "price"
	price.appendChild(text)

	text = document.createTextNode("Ver");
	link.className = "btn-ver"
	link.href = "producto.html"
	link.appendChild(text)

	item.appendChild(img)
	item.appendChild(title)
	item.appendChild(price)
	item.appendChild(link)

	return item
}

carga_articulos_destacados()