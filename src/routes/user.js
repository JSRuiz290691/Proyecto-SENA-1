const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

// creando nuevo usuario
router.post('/users', (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then ((data) => res.json(data)) // si todo sale bn responde con los datos que se ingresaron 
        .catch((error) => res.json({messge: error}));
});

// consultar usuarios
router.get('/users', (req, res) => {
    userSchema
        .find()
        .then ((data) => res.json(data)) // si todo sale bn responde con los datos que se ingresaron 
        .catch((error) => res.json({messge: error}));
});

// consultar un usuario
router.get('/users/:id', (req, res) => {
    const { id } = req.params; // se obtiene el id, se extrae desde los parametros de la peticion, linea 24 
    userSchema
        .findById(id) // encontrar el usuario con el id
        .then ((data) => res.json(data)) // si todo sale bn responde con los datos que se ingresaron 
        .catch((error) => res.json({messge: error}));
});

// actualizar un usuario
router.put('/users/:id', (req, res) => {
    const { id } = req.params; // se obtiene el id, se extrae desde los parametros de la peticion, linea 24
    const {name, age, email} = req.body; // se extraen los datos a actualizar del usuario
    userSchema
        .updateOne({_id: id}, { $set:{name, age, email} }) // actualizar el usuario con el id, se ingresan los datos a actualizar como otro objeto y antes del objeto se incluye el $set
        .then ((data) => res.json(data)) // si todo sale bn responde con los datos que se ingresaron 
        .catch((error) => res.json({messge: error}));
});

// eliminar un usuario
router.delete('/users/:id', (req, res) => {
    const { id } = req.params; // se obtiene el id, se extrae desde los parametros de la peticion, linea 24
    userSchema
        .findOneAndRemove({_id: id}) // actualizar el usuario con el id, se ingresan los datos a actualizar como otro objeto y antes del objeto se incluye el $set
        .then ((data) => res.json(data)) // si todo sale bn responde con los datos que se ingresaron 
        .catch((error) => res.json({messge: error}));
});

module.exports = router;