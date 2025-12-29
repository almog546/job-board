const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const employer1 = await prisma.user.create({
        data: {
            email: 'employer1@test.com',
            password: 'hashed-password',
            role: 'EMPLOYER',
            name: 'Techify Ltd',
        },
    });

    const employer2 = await prisma.user.create({
        data: {
            email: 'employer2@test.com',
            password: 'hashed-password',
            role: 'EMPLOYER',
            name: 'CloudCore',
        },
    });

    const jobs = [
        {
            employerId: employer1.id,
            title: 'Junior Frontend Developer',
            description:
                'Work on UI features using React. Collaborate with designers and backend developers.',
            location: 'Tel Aviv',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer1.id,
            title: 'Frontend Developer (React)',
            description:
                'Build and maintain modern web applications using React and TypeScript.',
            location: 'Remote',
            jobtype: 'Full-time',
            isremote: true,
        },
        {
            employerId: employer2.id,
            title: 'Backend Developer (Node.js)',
            description:
                'Develop REST APIs using Node.js and Express. Work with SQL databases.',
            location: 'Haifa',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer2.id,
            title: 'Junior Backend Developer',
            description:
                'Assist in backend development, queries, and API maintenance.',
            location: 'Jerusalem',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer1.id,
            title: 'Full Stack Developer',
            description:
                'Work across frontend and backend using React, Node.js, and SQL.',
            location: 'Remote',
            jobtype: 'Full-time',
            isremote: true,
        },
        {
            employerId: employer1.id,
            title: 'Senior Full Stack Engineer',
            description:
                'Lead feature development and mentor junior developers.',
            location: 'Tel Aviv',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer2.id,
            title: 'Junior Software Developer',
            description: 'Entry-level role working on real production systems.',
            location: 'Ramat Gan',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer2.id,
            title: 'React Developer',
            description:
                'Develop reusable React components and product features.',
            location: 'Remote',
            jobtype: 'Contract',
            isremote: true,
        },
        {
            employerId: employer1.id,
            title: 'Node.js API Developer',
            description:
                'Design REST APIs, authentication flows, and database queries.',
            location: 'Petah Tikva',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer1.id,
            title: 'Junior Web Developer',
            description:
                'Maintain existing web apps and implement small features.',
            location: 'Ashdod',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer2.id,
            title: 'Software Engineer',
            description:
                'Build scalable systems and participate in technical design.',
            location: 'Tel Aviv',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer1.id,
            title: 'Frontend Engineer',
            description:
                'Focus on UI performance, accessibility, and clean architecture.',
            location: 'Remote',
            jobtype: 'Full-time',
            isremote: true,
        },
        {
            employerId: employer2.id,
            title: 'Backend Engineer',
            description: 'Work on server-side logic and database modeling.',
            location: 'Netanya',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer1.id,
            title: 'Junior React Developer',
            description: 'Help build user-facing features using React.',
            location: 'Beer Sheva',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer2.id,
            title: 'Full Stack JavaScript Developer',
            description:
                'Develop end-to-end features using JavaScript and Node.js.',
            location: 'Remote',
            jobtype: 'Contract',
            isremote: true,
        },
        {
            employerId: employer1.id,
            title: 'Web Application Developer',
            description:
                'Maintain and improve internal and customer-facing apps.',
            location: 'Herzliya',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer2.id,
            title: 'Junior Full Stack Developer',
            description:
                'Gain experience across frontend and backend development.',
            location: 'Tel Aviv',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer1.id,
            title: 'Software Developer',
            description: 'Feature development, bug fixing, and code reviews.',
            location: 'Remote',
            jobtype: 'Full-time',
            isremote: true,
        },
        {
            employerId: employer2.id,
            title: 'Frontend UI Developer',
            description: 'Translate designs into responsive interfaces.',
            location: 'Holon',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer1.id,
            title: 'Backend Systems Developer',
            description: 'Implement backend logic and optimize databases.',
            location: 'Kfar Saba',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer2.id,
            title: 'Junior Node.js Developer',
            description: 'Support backend services and learn best practices.',
            location: 'Remote',
            jobtype: 'Full-time',
            isremote: true,
        },
        {
            employerId: employer1.id,
            title: 'JavaScript Developer',
            description:
                'Build interactive features using modern JS frameworks.',
            location: 'Tel Aviv',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer2.id,
            title: 'Web Developer',
            description: 'General web development across frontend and backend.',
            location: 'Rehovot',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer1.id,
            title: 'Remote Full Stack Developer',
            description: 'Remote work on a growing SaaS product.',
            location: 'Remote',
            jobtype: 'Full-time',
            isremote: true,
        },
        {
            employerId: employer2.id,
            title: 'Entry-Level Software Engineer',
            description: 'Great opportunity for recent graduates.',
            location: 'Tel Aviv',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer1.id,
            title: 'Product-Focused Frontend Developer',
            description: 'Work closely with product teams on UX.',
            location: 'Remote',
            jobtype: 'Full-time',
            isremote: true,
        },
        {
            employerId: employer2.id,
            title: 'Backend API Engineer',
            description: 'Design and maintain APIs for web and mobile clients.',
            location: 'Rishon LeZion',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer1.id,
            title: 'Junior Web Engineer',
            description:
                'Build real features with guidance from senior developers.',
            location: 'Tel Aviv',
            jobtype: 'Full-time',
            isremote: false,
        },
        {
            employerId: employer2.id,
            title: 'Software Developer (Remote)',
            description: 'Fully remote role working on internal tools.',
            location: 'Remote',
            jobtype: 'Full-time',
            isremote: true,
        },
    ];

    for (const job of jobs) {
        await prisma.job.create({ data: job });
    }
}

main()
    .then(() => {
        console.log('✅ Seed completed successfully (30 jobs)');
    })
    .catch((e) => {
        console.error('❌ Seed failed', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
