//modulos
const express = require('express');
const fs = require('fs') //Permite trabajar con archivos (file system) incluida con node, no se instala
const app = express();
const port = 3000;

//Middleware
app.use(express.json())

//Función para leer los datos del archivo .json

const leerDatos = () => {
    try {   //intenta convertir cadena, si no funciona nos muestra por consol el error (catch)
        const datos = fs.readFileSync('./data/datos.json')

        return JSON.parse(datos); // Convierte una cadena JSON en un objeto JavaScript
        // console.log(JSON.parse(datos)) probar si funciona y despues llamar funcion
    } catch (error) {
        console.log(error)
    }
}
//leerDatos()
const escribirDatos = (datos) => {
    try {
        fs.writeFileSync('./data/datos.json', JSON.stringify(datos)) //writeFile permite escribir datos || JSON.stringify convierte un objeto JS en JSON

    } catch (error) {
        console.log(error)

    }
}

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});

app.get('/productos', (req, res) => {
   // res.send('Listado de productos')
   const datos= leerDatos();
   res.json(datos.productos);
})

app.get('/productos/:id', (req, res) => {
    //res.send('Buscar producto por ID')
    const datos = leerDatos();
    const prodEncontrado= datos.productos.find ((p) => p.id == req.params.id)
    if (!prodEncontrado) { // ! (no) o diferente
        return res.status(404).json(`No se encuentra el producto`)
    }
    res.json({
        mensaje: "producto encontrado",
        producto: prodEncontrado
    })
})

app.post('/productos', (req, res) => {
    //res.send('Guardando nuevo producto')
    const datos= leerDatos();
    nuevoProducto = { id: datos.productos.length + 1, ...req.body }     //Genera un ID y agrega una copia de req.body
    datos.productos.push(nuevoProducto)
    escribirDatos(datos);
    res.json({"mensaje":'Nuevo producto agregado',
            producto: nuevoProducto});
    })


app.put('/productos/:id', (req, res) => {
    res.send('Actualizar producto por id')
})

app.delete('/productos/:id', (req, res) => {
    res.send('Eliminando Producto')
})

