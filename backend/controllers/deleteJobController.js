const prisma = require('../prismaClient');

async function deleteJob(req, res) {
    const jobid = req.params.id;
    const employerId = req.session.user?.id;

    if (!employerId) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const job = await prisma.job.findUnique({
            where: { id: jobid },
        });

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.employerId !== employerId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await prisma.job.delete({
            where: { id: jobid },
        });

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { deleteJob };
