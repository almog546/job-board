const prisma = require('../prismaClient');

async function myjobs(req, res) {
    try {
        const employerId = req.session.user.id;
        const jobs = await prisma.job.findMany({
            where: { employerId },
        });
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching my jobs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { myjobs };
