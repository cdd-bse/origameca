const buttonAlta = document.querySelector('#btn_altas')
const buttonModificar = document.querySelector('#btn_cambios')
const buttonBaja = document.querySelector('#btn_bajas')
const buttonListar = document.querySelector('#btn_listado')

function hideAllSections() {
    const sections = document.querySelectorAll('section')
    sections.forEach((section) => {
        if (!section.classList.contains('hidden')){
            section.classList.add('hidden')
        }
    })
}

buttonAlta.addEventListener('click', function () {
    hideAllSections()
    let element = document.querySelector('.main_altas')
    element.classList.toggle('hidden')
})

buttonModificar.addEventListener('click', function () {
    hideAllSections()
    let element = document.querySelector('.main_cambios')
    element.classList.toggle('hidden')
})
buttonBaja.addEventListener('click', function () {
    hideAllSections()
    let element = document.querySelector('.main_bajas')
    element.classList.toggle('hidden')
})

let productosListados = false;
buttonListar.addEventListener('click', function () {
    hideAllSections()
    let element = document.querySelector('.main_listado')
    element.classList.toggle('hidden')
    if (!productosListados) {
        listarProductos(); // Llamar a la función solo la primera vez
        productosListados = true; // Actualizar la variable para indicar que los productos ya se cargaron
    }
})


const URL = "https://nOlguin22.pythonanywhere.com/"

// altas

document.getElementById('formulario-altas').addEventListener('submit', function (event) {
    event.preventDefault() // Evitamos que se recargue la página

    // Obtenemos los valores del formulario
    var codigo = document.getElementById('codigo').value
    var descripcion = document.getElementById('descripcion').value
    var cantidad = document.getElementById('cantidad').value
    var precio = document.getElementById('precio').value

    // Creamos un objeto con los datos del producto
    var producto = {
        codigo: codigo,
        descripcion: descripcion,
        cantidad: cantidad,
        precio: precio
    }
    console.log(producto)
    // Realizamos la solicitud POST al servidor
    fetch(URL + 'productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    })
        .then(function (response) {
            if (response.ok) {
                return response.json() // Parseamos la respuesta JSON
            } else {
                throw new Error('Error al agregar el producto.')
            }
        })
        .then(function (data) {
            alert('Producto agregado correctamente.')
            document.getElementById('codigo').value = ""
            document.getElementById('descripcion').value = ""
            document.getElementById('cantidad').value = ""
            document.getElementById('precio').value = ""
        })
        .catch(function (error) {
            console.log('Error:', error)
            alert('Error al agregar el producto.')
        })
})

// bajas

const appBajas = Vue.createApp({
    data() {
        return {
            productos: []
        }
    },
    methods: {
        obtenerProductos() {
            const URL = "https://nOlguin22.pythonanywhere.com/"

            fetch(URL + 'productos')
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Error al obtener los productos.')
                    }
                })
                .then(data => {
                    this.productos = data
                })
                .catch(error => {
                    console.log('Error:', error)
                    alert('Error al obtener los productos.')
                })
        },
        eliminarProducto(codigo) {
            const URL = "https://nOlguin22.pythonanywhere.com/"

            fetch(URL + `productos/${codigo}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        // Eliminar el producto de la lista después de eliminarlo en el servidor
                        this.productos = this.productos.filter(producto => producto.codigo !== codigo)
                        console.log('Producto eliminado correctamente.')
                    }
                })
                .catch(error => {
                    console.log('Error:', error)
                    alert('Error al eliminar el producto.')
                })
        }
    },
    mounted() {
        this.obtenerProductos()
    }
})
appBajas.mount('#bajas_section')

// modificar

const appCambios = Vue.createApp({
    data() {
        return {
            codigo: '',
            mostrarDatosProducto: false,
            descripcion: '',
            cantidad: '',
            precio: ''
        }
    },
    methods: {
        obtenerProducto() {
            fetch(URL + 'productos/' + this.codigo)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Error al obtener los datos del producto.')
                    }
                })
                .then(data => {
                    this.descripcion = data.descripcion
                    this.cantidad = data.cantidad
                    this.precio = data.precio
                    this.mostrarDatosProducto = true
                })
                .catch(error => {
                    alert('Error al obtener los datos del producto.')
                })
        },
        guardarCambios() {
            const producto = {
                codigo: this.codigo,
                descripcion: this.descripcion,
                cantidad: this.cantidad,
                precio: this.precio
            }

            fetch(URL + 'productos/' + this.codigo, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error('Error al guardar los cambios del producto.')
                    }
                })
                .then(data => {
                    alert('Cambios guardados correctamente.')
                    location.reload()
                })
                .catch(error => {
                    alert('Error al guardar los cambios del producto.')
                })
        }
    }
})
appCambios.mount('.main_cambios')

// listado

function getProducts() {
    const sectionIsShowed = document.querySelector('.main_listado')
    if (!sectionIsShowed.classList.contains('hidden')) {
        listarProductos()
    };
}

function listarProductos(){
    fetch(URL + 'productos')
            .then(function (response) {
                if (response.ok) {
                    return response.json() // Parseamos la respuesta JSON
                } else {
                    throw new Error('Error al obtener los productos.')
                }
            })
            .then(function (data) {
                var tablaProductos = document.getElementById('tablaProductos')

                // Iteramos sobre los productos y agregamos filas a la tabla
                data.forEach(function (producto) {
                    var fila = document.createElement('tr')
                    fila.innerHTML = '<td>' + producto.codigo + '</td>' +
                        '<td>' + producto.descripcion + '</td>' +
                        '<td align="right">' + producto.cantidad + '</td>' +
                        '<td align="right">&nbsp; &nbsp;&nbsp; &nbsp;' + producto.precio + '</td>'
                    tablaProductos.appendChild(fila)
                })
            })
            .catch(function (error) {
                console.log('Error:', error)
                alert('Error al obtener los productos.')
            })
}