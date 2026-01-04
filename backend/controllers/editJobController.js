const prisma = require('../prismaClient');
async function editJob(req, res) {
    try {
        const jobId = req.params.id;
        const { title, description, location, jobtype, isremote } = req.body;
        const employerId = req.session.user.id;

        const job = await prisma.job.findUnique({
            where: { id: jobId },
        });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        if (job.employerId !== employerId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const updatedJob = await prisma.job.update({
            where: { id: jobId },
            data: { title, description, location, jobtype, isremote },
        });
        res.json(updatedJob);
    } catch (error) {
        console.error('Error editing job:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { editJob };
