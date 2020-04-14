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

export interface UserInfo{
    id: number
    date: Date
    name: string
    email: string
    balance: number
}

export interface Transaction{
    id: number
    date: Date
    username: string
    amount: number
    balance: number
}

export interface SearchUser{
    id: number
    name: string
}

export interface NewTransaction{
    name: string
    amount: number
}

export interface TransactionCreationResult{
    id: number
    date: Date
    username: string
    amount: number
    balance: number
}