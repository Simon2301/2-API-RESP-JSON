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
        fs.writeFile('./data/datos.json', JSON.stringify(datos)) //writeFile permite escribir datos || JSON.stringify convierte un objeto JS en JSON

    } catch (error) {
        console.log(error)

    }
}

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});

app.get('/productos', (req, res) => {
    res.send('Listado de productos')
})

app.post('/productos', (req, res) => {
    res.send('Guardando nuevo producto')
})

app.put('/productos/:id', (req, res) => {
    res.send('Actualizar producto por id')
})

app.delete('/productos/:id', (req, res) => {
    res.send('Eliminando Producto')
})

app.get('/productos/:id', (req, res) => {
    res.send('Buscar producto por ID')
})