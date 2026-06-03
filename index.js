const express = require('express')
const { json } = require('sequelize')
const server = express()

//com isso eu consigo enviar no corpo da requsição e criar um CURSO passando os dados via corpo da requisição
server.use(express.json());

// poderia ser um banco de dados tambem
const Bancocurso = ["Node.js", "TypeScript", "SqlServer", "SpringBoot", "JavaScript avançado"]

//Criando middlewares
server.use((req, res, next) => {
    console.log(`URL CHAMADA  ${req.url}`)

    return next();
})

function chackandoDados(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ Error: "Verifique se o que voce esta mandando esta correto" });
    }

    return next();
}

//criando um middare que verificar o tamanho da string
function validandoTamanhoDaString(req, res, next) {
    const { name } = req.body

    // o nome passado precisa ser maior que 3 caracteres 
    if (!name || name.length < 3) {
        return res.status(400).json({
            erro: "O nome precisa ser maior que 3 caracteres"
        })
    }

    return next()
}

//Lista todos os cursos
server.get('/curso', chackandoDados, (req, res) => {
    return res.json(Bancocurso)
})

//Lista por parametros
server.get('/cursos/:index', (req, res) => {
    const { index } = req.params; // requisição via URL por isso é request params 
    return res.json(Bancocurso[index]);
})

//criando || Ultilizando Middlwares
server.post('/curso', chackandoDados, validandoTamanhoDaString ,(req, res) => {
    const { name } = req.body
    Bancocurso.push(name)

    return res.json(Bancocurso)
})

//Atualizando curso 
server.put('/cursos/:index', chackandoDados, (req, res) => {
    const { index } = req.params // requisição via url por isso é requeste params
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
