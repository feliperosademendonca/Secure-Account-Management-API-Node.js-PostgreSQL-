interface SignUpBody {
    phone: string;
    name: string;
    email?: string;
    password: string;
    confirmPassword: string;
    indicationId: string
}

interface loginBody {
    phone: string;
    password: string;
}

export { SignUpBody , loginBody }