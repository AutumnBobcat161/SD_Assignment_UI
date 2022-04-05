import { User } from "../types/userTypes"

export class UserService {

    public static createEmptyUser() {
        const user: User = {
            idUser: 0,
            idRole: 2,
            username: '',
            password: '',
            email: '',
            isBanned: false,
            score: 0
        }
        return user
    }
}