const express = require('express')
const { json } = require('sequelize')
const server = express()

//com isso eu consigo enviar no corpo da requsição e criar um CURSO passando os dados via corpo da requisição
server.use(express.json());

const Bancocurso = ["Node.js", "TypeScript", "SqlServer", "SpringBoot", "JavaScript avançado"]

//Criado middlewares
server.use((req, res, next) => {
    console.log('REQUISIÇÃO CHAMADA')

    return next();
})

function chackandoDados(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ Error: "Verifique se o que voce esta mandando esta correto" });
    }

    return next();
}


//Lista todos os cursos
server.get('/curso', (req, res) => {
    return res.json(Bancocurso)
})

//Lista por parametros
server.get('/cursos/:index', (req, res) => {
    const { index } = req.params;
    return res.json(Bancocurso[index]);
})

//criando || Ultilizando Middlwares
server.post('/curso', chackandoDados , (req, res) => {
    const { name } = req.body
    Bancocurso.push(name)

    return res.json(Bancocurso)
})

//Atualizando curso 
server.put('/cursos/:index', chackandoDados,  (req, res) => {
    const { index } = req.params
    const { name } = req.body

    Bancocurso[index] = name;

    return res.json(Bancocurso);
})

//deletando
server.delete('/cursos/:index', (req, res) => {
    const { index } = req.params

    Bancocurso.splice(index, 1)

    return res.json({ message: "curso deletado com sucesso" })
})

console.log(Bancocurso)

server.listen(3000)
