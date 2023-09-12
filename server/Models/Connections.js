import db from "../DataBase/DB.js";

export const createUser = async (user) => {

    const answer = await db('users').insert(user)
    
    return answer
}

export const getUserByPhoneNumber = async (phoneNumber) => {
    const answer = await db('users').where({phone_number: phoneNumber}).first()
    return answer
}

export const checkFormData = async (username,email,phoneNumber) => {
    let answer = await db('users').where({username: username}).first()
    if(answer == undefined){

        answer = await db('users').where({email: email}).first()
        if(answer == undefined){
            answer = await db('users').where({phone_number: phoneNumber}).first()
            if(answer == undefined){
            
                return false
            }else{
                return 'phone'
            }
        }else{
            return 'email'
        }
    }else{
        return 'username'
    }


}
// In this Module I create 2 functions for creating and getting user
