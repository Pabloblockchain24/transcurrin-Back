import userService from "../models/user.model.js"
import bcrypt from "bcrypt"
// import { createAccessToken } from "../libs/jwt.js"

import {createAccessToken} from "../libs/jwt.js"

import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"
import { set } from "mongoose"



export const register = async (req, res) => {
    const { name, company, email, password,rol } = req.body
    try{
        const userFound = await userService.findOne({email})
        if (userFound) return res.status(400).json(["El email ya esta registrado"])
        const hash = await bcrypt.hash(password, 10)
        const newUser = await userService.create({ name, company, email, password: hash, rol, verificado:false })
        const token = await createAccessToken({ id: newUser._id })
        res.cookie("token", token)
        res.json({
            id: newUser._id,
            name: newUser.name,
            company: newUser.company,
            email: newUser.email,
            verificado: newUser.verificado
        })
    }catch(error){
        console.log(error)
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    const userFound = await userService.findOne({ email })
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" })

    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" })

        const token = await createAccessToken({ id: userFound._id })
        res.cookie("token", token,{
            httpOnly:true,
            path: '/',
            maxAge:86400000,
        }).status(200).send("Cookie creada correctamente")
        res.json(userFound)


}

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {
    const userFound = await userService.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" })

    return res.json({
        id: userFound._id,
        name: userFound.name,
        company: userFound.company,
        email: userFound.email,
        verificado: userFound.verificado
    })
}

export const verifyToken =  async(req,res)=>{
    const {token} = req.cookies
    if(!token) return res.status(401).json({message: "unauthorized "})

    jwt.verify(token, TOKEN_SECRET, async (err,user)=>{
        if(err) return res.status(401).json({message: "unauthorized"})

        const userFound = await userService.findById(user.id)
        if (!userFound) return res.status(401).json({message: "unauthorized"})
   
        return res.json({
            id: userFound._id,
            name: userFound.name,
            email: userFound.email,
            company: userFound.company
        })

    })
}