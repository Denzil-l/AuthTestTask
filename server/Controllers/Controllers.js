import { getUserByPhoneNumber, createUser, checkFormData } from "../Models/Connections.js";

import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export const Register = async (req,res) => {
    //Step 1
    //Server get a request and pull from the req.body all data
    const {name, username, email, phoneNumber, password} = req.body
    console.log(req.body)
    try {
        //Step 2
        //Server checks is this user in the table or not
        console.log('2')
        
        const userExist = await checkFormData(username, email, phoneNumber)
        //If ther user doesn't exist, Server start to creating a new User
        console.log('3')
        console.log(userExist)
        if(!userExist){
            try {
            //Step 3
            //Here Server use bcrypt module for creating hash and adding it to the password for more security 
            const saltRounds = 10
            const salt = await bcrypt.genSalt(saltRounds)
            const hashedPassword = await bcrypt.hash(password, salt)
            try {
                //Step 4
                //Then Server create a new User in the table and response to client status 200
                const newUser = await createUser({
                    name,
                    username,
                    email,
                    phone_number: phoneNumber,
                    password: hashedPassword,
                  });                
                  console.log(newUser)
                res.status(201).json({meassge: 'New user was created'})
            } catch (error) {
                console.log('Error happened on stage of creating a new user ')
                console.log(error)
                res.status(409).json({meassge: error})
            }
        } catch (error) {
            console.log('Error happened on stage of creating a hashedPassword ')
            console.log(error)
            res.status(500).json({meassge: 'Something was wrong when server tried to create a secret password'})
        }
        }else{
            //Step 3
            //If User already exist, Server response status 400
            res.status(409).json({message: userExist})   
        }

    } catch (error) {
        console.log('Error happened on a first stage ')
        console.log(error)
        res.status(500).json({meassge: 'Something was wrong in first stage'})
    }
}

export const Login = async (req,res) => {
    //Step 1
    //Server get a request and pull from the req.body phone_number and password
    const {phone_number, password} = req.body
    const userAgent = req.headers['user-agent']
    console.log(userAgent)
    try {
         //Step 2
        //Server checks is this user in the table or not
        const userExist = await getUserByPhoneNumber(phone_number)
        if(userExist !== undefined){
            //Step 3
            //If the user exists, Server checks the password
            try {
                const match = await bcrypt.compare(password, userExist.password)
                if(match){
                    //Step 4
                    //If the password equals to user's password in the table, Server creating a JWT
                    const userId = userExist.id
                    const phone_number = userExist.phone_number
                    const accessToken = jwt.sign({userId, phone_number}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '2m'})
                    // Then Server checks source of the request. If it's a browser, Server send a cookie with this token, if it's a Mobile App, Server make something else
                    res.cookie('token', accessToken,{
                        httpOnly: true,
                        maxAge: 60 * 1000 * 2
                    })

                    res.status(200).json({message: 'you loged in'})
                }else{
                    res.status(400).json({message: 'Password is not correct'})
                }
            } catch (error) {
                console.log('Something was wrong in the stage of checking password and creating JWT')
                console.log(error)
                res.status(500).json({message: 'Something was wrong'})
            }

        }else{
            //Step 3
            //If User doesn't exist, Server send status 400
            res.status(400).json({message: 'This user is not exist'})
        }

    } catch (error) {
        console.log('Error happened on a first stage ')
        console.log(error)
        res.status(500).json({meassge: 'Something was wrong in first stage'})
    }
}

export const Logout = async (req,res) => {
    const userAgent = req.headers['user-agent']
    
    res.clearCookie('token')
    return res.status(200).json({meassge:'You loged out'})
}


//In this module I created 3 function for Register, Login, Logout. They will be used as response for user's request 