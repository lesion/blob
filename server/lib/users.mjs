import prisma from './db.mjs'
import bcrypt from 'bcrypt'

export const createUser = (userData) => {

    const data = {
        ...userData,
        password: bcrypt.hashSync(userData.password, 10)
    }

    return prisma.user.create({ data })
}


export const getUserByUsername = username => {
    return prisma.user.findUnique({ where: { username } })
}

export const getUserById = (userId) => {
    return prisma.user.findUnique({
        where: {
            id: userId
        }
    })
}