const prisma = require('../prismaClient');

async function showfavorites(req, res) {
    const favorites = req.favorites;
    try {
        const favoriteJobsDetails = await Promise.all(
            favorites.map(async (favorite) => {
                const job = await prisma.job.findUnique({
                    where: { id: favorite.jobId },
                });
                return job;
            })
        );
        res.json(favoriteJobsDetails);
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while fetching favorite job details.',
        });
    }
}

module.exports = { showfavorites };
