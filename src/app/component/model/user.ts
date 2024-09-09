export interface User {
    userId?: number;
    firstName: string;
    lastName: string;
    dateOfBirth?: Date;
    phoneNumber: string;
    address: string;
    district: string;
    state: string;
    zipCode: string;
    emailId: string;
    gender: string;
    password: string;
    role?: string;
}
