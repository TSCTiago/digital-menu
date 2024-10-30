import * as yup from 'yup';

export const loginSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  }),
});

export type LoginSchema = yup.InferType<typeof loginSchema>;

export const registerSchema = yup.object({
  body: yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  }),
});

export type RegisterSchema = yup.InferType<typeof registerSchema>;
