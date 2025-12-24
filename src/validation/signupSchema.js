import * as yup from 'yup';

export const signupSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),

    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),

    role: yup
        .mixed()
        .oneOf(['JOB_SEEKER', 'EMPLOYER'])
        .required('Role is required'),

    name: yup.string().required('Name is required'),
});
