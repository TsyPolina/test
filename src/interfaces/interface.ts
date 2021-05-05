export interface IUser {
    _id?: string
    email: string,
    password: string
}

export interface ITokenPayload {
    userId: string,
    email: string,
}