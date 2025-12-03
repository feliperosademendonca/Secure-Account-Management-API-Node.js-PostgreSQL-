interface SignUpBody {
    phone:string;
    name:string;
    email?:string;
    password:string;
        confirmPassword?:string;

    indicationId:string
}

export { SignUpBody }