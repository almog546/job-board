function requireEmployer(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    if (req.session.user.role !== 'EMPLOYER') {
        return res.status(403).json({ message: 'Employers only' });
    }

    next();
}

function requireJobSeeker(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    if (req.session.user.role !== 'JOB_SEEKER') {
        return res.status(403).json({ message: 'Job seekers only' });
    }

    next();
}

module.exports = { requireEmployer, requireJobSeeker };
