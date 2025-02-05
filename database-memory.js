import{randomUUID}  from "node:crypto"
export class DatabaseMemory{
    #livros = new Map()

    getById(id){
        return this.#livros.get(id)
    }
    
    //listando livros sem as chaves
    list(){
        return Array.from(this.#livros.values())
    }
    //criando livro
    create(livro){
        //gerando id aleatório com randomUUID
        const livroId = randomUUID()
        this.#livros.set(livroId, livro)
    }
     

    //atualizar livros
    update(id, livros){
        this.#livros.set(id, livros)
    }
   list(search){
    return Array.from(this.#livros.entries()).map((livroArray) => {
        //primera posição ID
        const id = livroArray[0]
        //segunda posição
        const data = livroArray[1]

        return{
             id,
              ...data
    }
   
})
//retornando apenas o resultado da pesquisa
   .filter(livro => {
    if(search){
        return livro.titulo.includes(search)
    }
    return true
   })
}
delete(id){
    this.#livros.delete(id)
   }
}