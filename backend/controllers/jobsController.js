const prisma = require('../prismaClient');

async function jobs(req, res) {
    const title = req.query.title;
    const location = req.query.location;
    const filter = {};
    try {
        if (title) {
            filter.title = {
                contains: title,
                mode: 'insensitive',
            };
        }

        if (location) {
            filter.location = {
                contains: location,
                mode: 'insensitive',
            };
        }

        const jobList = await prisma.job.findMany({
            where: filter,
        });

        res.json(jobList);
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while fetching jobs.',
        });
    }
}
async function jobById(req, res) {
    const jobid = req.params.id;
    try {
        const job = await prisma.job.findUnique({
            where: { id: jobid },
        });
        res.json(job);
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while fetching the job.',
        });
    }
}

module.exports = { jobs, jobById };
