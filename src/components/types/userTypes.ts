export interface User {
    idUser: number,
    idRole: number,
    username: string,
    password: string,
    email: string,
    isBanned: boolean,
    score: number
}