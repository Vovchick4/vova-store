export interface IUserDataProps {
    id: number,
    sokcetId: string
    nickName: string,
    email: string,
}

export interface IAuthDataResponse extends IUserDataProps {
    token: string,
} 