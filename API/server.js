/* Metodos HTTP: Get(listar) - Post(Criar) - Put(Editar Varios) - Patch(editar um) - Delete(Deletar)*/

import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)

})

app.put('/usuarios/:id', async (req, res) => {

  await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)

})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(201).json( {message: "Usuario deletado com sucesso!"} )

})

app.get('/usuarios', async (req, res)  => {
    let user = []

    if(req.query) {
        user = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    } else {
        user = await prisma.user.findMany()
    }

    const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.listen(3000)

/*  --objetivo--
     CRIAR API DE USUARIOS
       -Criar um usuário
       -Listar todos os usuários
       -Editar um Usuário
       -Deletar um usuario
*/



/*
    1) Tipo de Rota / Metodo HTTP
    2) Endereço
 

    --MongoDB--
      Vini
       JGNkOrfVjWe2MW5b
*/