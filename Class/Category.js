let {PrismaClient} = require('@prisma/client')

let Prisma = new PrismaClient()



module.exports = {

    create: async (request, response) => {

        let {libelle} = request.body

        let Category = await Prisma.category.create({
            data: {
                libelle: libelle
            }
        })

        if(Category) {
            return response.status(200).json(Category)
        }
    }, 

    edit: async (request, response) => {

        let {libelle} = request.body
        let id = request.params.id

        let Category = await Prisma.category.update({
            where: {
                id: id
            },
            data: {
                libelle: libelle
            }
        }) 

        if(Category) {
            return response.status(200).json(Category)
        }
    }
}