
import bcrypt from "bcrypt"
import User from "../models/User.js"

const getAll = async (req, res) => {
    try {
        const users = await User.findAll()
        return res.json(users)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor.' })
    }
}

const getById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' })
        }

        const { password, ...safeUser } = user
        return res.json(safeUser)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Erro interno do servidor.' })
    }
}

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' })
        }

        const { password, ...safeUser } = user
        return res.json(safeUser)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Erro interno do servidor.' })
    }
}

const update = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'ID inválido.' })
        }

        if (id !== req.user.id) {
            return res.status(403).json({ error: 'Acesso negado.' })
        }

        const { name, email, password } = req.body

        if (!name || !email) {
            return res.status(400).json({ error: 'Nome e email são obrigatórios.' })
        }

        const existingUser = await User.findByEmail(email)

        if (existingUser && existingUser.id !== id) {
            return res.status(409).json({ error: 'Este email já está cadastrado.' })
        }

        const hashedPassword = password
            ? await bcrypt.hash(password, 10)
            : null

        const changes = await User.update(id, name, email, hashedPassword)

        if (!changes) {
            return res.status(404).json({ error: 'Usuário não encontrado ou sem alterações.' })
        }

        return res.json({ message: 'Usuário atualizado com sucesso.' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor.' })
    }
}

const remove = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'ID inválido.' })
        }

        if (id !== req.user.id) {
            return res.status(403).json({ error: 'Acesso negado.' })
        }

        const changes = await User.delete(id)

        if (!changes) {
            return res.status(404).json({ error: 'Usuário não encontrado.' })
        }

        return res.json({ message: 'Usuário excluído com sucesso.' })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno do servidor.' })
    }
}


export {getAll, getById, getMe, update, remove }
