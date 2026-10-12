
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"


const JWT_SECRET = process.env.JWT_SECRET;

 const register = async  (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                error: 'Preencha todos os campos.'
            })
        }

        const existingUser = await User.findByEmail(email)

        if (existingUser) {
            return res.status(409).json({
                error: 'Este email já está cadastrado.'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create(name, email, hashedPassword)

        return res.status(201).json({
            message: 'Usuário cadastrado com sucesso.',
            user
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            error: 'Erro interno do servidor.'
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                error: 'Informe email e senha.'
            })
        }

        const user = await User.findByEmail(email)

        if (!user) {
            return res.status(401).json({
                error: 'Email ou senha inválidos.'
            })
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        )

        if (!passwordMatch) {
            return res.status(401).json({
                error: 'Email ou senha inválidos.'
            })
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '2h' }
        ) 

        return res.json({ token })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Erro interno do servidor.'
        })
    }
}



export { login, register }
