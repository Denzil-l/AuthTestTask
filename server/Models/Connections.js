import db from "../DataBase/DB.js";

export const createUser = async (user) => {
    const answer = await db('users').insert(user)
    return answer
}

export const getUserByPhoneNumber = async (phoneNumber) => {
    const answer = await db('users').where({phoneNumber}).first()
    return answer
}


// In this Module I create 2 functions for creating and getting user
