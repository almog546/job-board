const bcrypt = require('bcrypt');
const prisma = require('../prismaClient');

async function signup(req, res) {
    try {
        const { email, password, role, name } = req.body;

        if (!email || !password || !role || !name) {
            return res.status(400).json({
                message: 'Email, password, role, and name are required',
            });
        }

        const allowedRoles = ['JOB_SEEKER', 'EMPLOYER'];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role,
                name,
            },
        });

        req.session.userId = newUser.id;

        res.status(201).json({
            message: 'User created successfully',
            userId: newUser.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: 'Email and password are required' });
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        req.session.user = {
            id: user.id,
            role: user.role,
        };

        req.session.userId = user.id;

        res.status(200).json({
            message: 'Login successful',
            userId: user.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function me(req, res) {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await prisma.user.findUnique({
            where: { id: req.session.userId },
            select: {
                id: true,
                email: true,
                role: true,
                name: true,
                createdAt: true,
            },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = { signup, login, me };
