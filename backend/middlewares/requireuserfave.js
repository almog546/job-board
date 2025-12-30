const prisma = require('../prismaClient');

async function favoritejobs(req, res, next) {
    console.log('SESSION:', req.session);

    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    const favorites = await prisma.favorite.findMany({
        where: { userId },
    });

    req.favorites = favorites;
    next();
}

module.exports = { favoritejobs };
