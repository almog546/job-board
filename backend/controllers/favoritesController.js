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
async function deletefavoritejob(req, res) {
    const userId = req.session.userId;
    const jobId = req.params.jobId;
    try {
        await prisma.favorite.deleteMany({
            where: {
                userId: userId,
                jobId: jobId,
            },
        });
        res.status(200).json({ message: 'Favorite job deleted successfully.' });
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while deleting the favorite job.',
        });
    }
}

module.exports = { showfavorites, deletefavoritejob };
