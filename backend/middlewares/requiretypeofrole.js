function requireEmployer(req, res, next) {
    if (req.user.role !== 'EMPLOYER') {
        return res.status(403).json({ message: 'Employers only' });
    }
    next();
}

function requireJobSeeker(req, res, next) {
    if (req.user.role !== 'JOB_SEEKER') {
        return res.status(403).json({ message: 'Job seekers only' });
    }
    next();
}

module.exports = { requireEmployer, requireJobSeeker };
