// Requires
let nullControl = require('../Config/Control').nullControl
let { PrismaClient } = require('@prisma/client')
let bcrypt = require('bcrypt')
let jToken = require('jsonwebtoken')

let Prisma = new PrismaClient()


module.exports = {

    signIn: async (request, response) => {

        let { email, password } = request.body
        let data = [email, password]

        if(data.every(nullControl)) {
            
            let UserFound = await Prisma.user.findFirst({
                where: {
                    email: email
                }
            })

            if(UserFound) {

                let UserPassword = UserFound.password

                bcrypt.compare(password, UserPassword, async (err, result) => {
                    
                    if(result) {

                        jToken.sign(UserFound, 'azaeazaazae', (error, token) => {
                            response.status(200).json({
                                token: token
                            })
                        })
                    } else {

                        return response.status(401).json({
                            error: "Password is not correct"
                        })
                    }
                })
            } else {

                return response.status(404).json({
                    error: "User not found"
                })
            }
        } else {

            return response.status(204).json({
                error: "All fields are required"
            })
        }
    },

    register: async (request, response) => {

        let { firstName, lastName, email, password  } = request.body
        let data = [firstName, lastName, email, password]

        if(data.every(nullControl)) {

            let UserFound = await Prisma.user.findFirst({
                where: {
                    email: email
                }
            })

            if(!UserFound) {

                bcrypt.hash(password, 12, async (err, result) => {

                    let UserCreate = await Prisma.user.create({
                        data: {
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            password: result
                        }
                    }) 
    
                    if(UserCreate) {
    
                        return response.status(200).json({
                            User: User
                        })
                    } else {
    
                        return response.status(501).json({
                            error: "Could not add User"
                        })
                    }
                })
            } else {

                return response.status(302).json({
                    error: "User already exists"
                })
            }

        } else {

            return response.status(204).json({
                error: "All fields are required"
            })
        }

    },
}