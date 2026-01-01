const prisma = require('../prismaClient');

async function createJob(req, res) {
    try {
        const { title, description, location, jobtype, isremote } = req.body;
        const employerId = req.session.user.id;

        if (
            !title ||
            !description ||
            !location ||
            !jobtype ||
            isremote === undefined
        ) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const newJob = await prisma.job.create({
            data: {
                title,
                description,
                location,
                jobtype,
                isremote,
                employerId,
            },
        });
        res.status(201).json(newJob);
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { createJob };
