
// importando fastify
import { fastify } from "fastify";
// Importando database
import { DatabaseMemory } from "./database-memory.js";
//criando o Database
const database = new DatabaseMemory()
//criando servidor
const server = fastify()
//criando um livro
server.post('/livro', (request, reply) => {
// Acessando dados do corpo
    const {titulo, autor, npaginas, editora} = request.body

    database.create({
        titulo: titulo,
        autor: autor,
        npaginas: npaginas,
        editora: editora
        
    })
    return reply.status(201).send()
});
/*Lendo livros cadastrados*/
server.get('/livros', (request) => {
    //pegando busca
    const search = request.query.search
    // imprimindo a busca
    console.log(search)
// Acessando database
    const livros = database.list(search)
// Retornado livro
    return livros
})
/*Atualiza livro totalmente, lembre-se de passar o route parament*/
server.put('/livros/:id', (request, reply) => {
    //return "Atualizar total"

    //passando ID do livro
    const livroId = request.params.id
    console.log(livroId)
    //passando o restante dos atributos
    const {titulo, autor, npaginas, editora} = request.body
    //passamdo dados para serem atualizados
    const livro = database.update(livroId,{
        titulo: titulo,
        autor: autor,
        npaginas: npaginas,
        editora: editora
    })
    //sucesso sem conteúdo
    return reply.status(204).send()
})
/*Atualiza livro parcialmente, lembre-se de passar o route parament*/
server.patch('/livros/:id', (request, reply) => {
   
    const livroId = request.params.id;
    const update = request.body

    const livrosExistentes = database.getById(livroId)

    const novoLivro = {...livrosExistentes, ...update}

    database.update(livroId, novoLivro)


    return reply.status(204).send()

});

/*Exclui livro, lembre-se de passar o route parament*/
server.delete('/livros/:id', (request, reply) => {
    // pegando o ID do livro
    const livroId = request.params.id
    // deletando o livro
    database.delete(livroId)
    //retornando status de sucesso na exclusão
    return reply.status(204).send()
})
// Criando nosso servidor
server.listen({
    port: 3333,
});