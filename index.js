const express = require('express')
const { json } = require('sequelize')
const server = express()

//com isso eu consigo enviar no corpo da requsição e criar um CURSO passando os dados via corpo da requisição
server.use(express.json());

const Bancocurso = ["Node.js", "TypeScript", "SqlServer", "SpringBoot", "JavaScript avançado"]

//c


//Lista todos os cursos
server.get('/curso', (req, res) => {
    return res.json(Bancocurso)
})

//Lista por parametros
server.get('/cursos/:index', (req, res) => {
    const { index } = req.params;
    return res.json(Bancocurso[index]);
})

//criando
server.post('/curso', (req, res) => {
    const { name } = req.body
    Bancocurso.push(name)

    return res.json(Bancocurso)
})

//Atualizando curso 
server.put('/cursos/:index', (req, res) => {
    const { index } = req.params
    const { name } = req.body

    Bancocurso[index] = name;

    return res.json(Bancocurso);
})

//deletando
server.delete('/cursos/:index', (req, res) => {
    const { index } = req.params

    Bancocurso.splice(index, 1)

    return res.json({ message: "curso deletado com sucesso"})
})

console.log(Bancocurso)

server.listen(3000)
