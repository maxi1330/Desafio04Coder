const express = require('express');
const routerProductos = express.Router();

let DB_PRODUCTOS = [];

routerProductos.get('/', (req, res)=>{
    if(DB_PRODUCTOS.length === 0){
        return res.status(200)
            .json({
                error: 'No hay productos'
            });
    }

    return res.status(200)
       .json(DB_PRODUCTOS);

});

routerProductos.get('/:id', (req, res)=>{
    let {id} = req.params;
    const indexProducto = DB_PRODUCTOS.findIndex((producto => producto.id == id));

    if(indexProducto === -1) {
        return res.status(200)
            .json({
                error: 'Producto no encontrado'
            });
    }

    return res.status(200).json(DB_PRODUCTOS[indexProducto]);
});

routerProductos.post('/', (req, res)=>{
    let {title, price, thumbnail} = req.body;
    if(!title || !price || !thumbnail){
        return res.status(200).json({
            error: "Faltan items",
            data: req.body
        });
    }

    let newId = DB_PRODUCTOS.length === 0 ? 1 : DB_PRODUCTOS[DB_PRODUCTOS.length - 1].id + 1;
    const nuevoProducto = {
        id: newId,
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    };

    DB_PRODUCTOS.push(nuevoProducto);

    return res.status(201).json({msg: 'Producto agregado!'});
});

routerProductos.put('/:id', (req, res)=>{
    let {id} = req.params;
    let {title, price, thumbnail} = req.body;

    const indexProducto = DB_PRODUCTOS.findIndex((producto => producto.id == id));

    if(indexProducto == null) {
        return res.status(200)
            .json({
                error: 'Producto no encontrado'
            });
    }

    if(title){DB_PRODUCTOS[indexProducto].title = title}
    if(price){DB_PRODUCTOS[indexProducto].price = price}
    if(thumbnail){DB_PRODUCTOS[indexProducto].thumbnail = thumbnail}

    return res.status(201).json({msg: `Producto actualizado.`});
});

routerProductos.delete('/:id', (req, res)=>{
    let {id} = req.params;
    DB_PRODUCTOS = DB_PRODUCTOS.filter(element => element.id != id);
    return res.status(201).json({msg: 'Producto eliminado'});
});

module.exports = routerProductos;
