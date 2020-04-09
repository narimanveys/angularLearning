export interface User{
    email: string
    password: string
}

export interface UserInfo{
    id: number
    date: Date
    name: string
    email: string
    balance: number
}

export interface RegisterUser{
    username: string
    email: string
    password: string
}