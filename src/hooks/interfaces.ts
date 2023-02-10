export interface IUserDataProps {
    id: number,
    nickName: string,
    email: string,
}

export interface IAuthDataResponse extends IUserDataProps {
    token: string,
} 