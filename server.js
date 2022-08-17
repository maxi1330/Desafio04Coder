/* ---------------------- Modulos ----------------------*/
const express = require('express');

//Instancia de Server
const app = express();
const routerProductos = require('./routes/productos.routes.js');

/* ---------------------- Middlewares ---------------------- */
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

/* ---------------------- Rutas ----------------------*/
app.use('/api/productos', routerProductos);

/* ---------------------- Servidor ----------------------*/
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});
