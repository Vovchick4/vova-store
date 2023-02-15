import axios, { RawAxiosRequestConfig } from "axios"

export default class FriendController {
    baseURL: string

    constructor() {
        this.baseURL = "/friend/"
    }

    // addToFriend(userId: number) {
    //     console.log("🚀 ~ file: use-controllers.ts:12 ~ FriendController ~ addToFriend ~ userId", userId)
    //     return useSwr({ method: "POST", url: this.baseURL + userId }, this.sendFetcher)
    // }

    async sendFetcher(requestOps: RawAxiosRequestConfig) {
        try {
            await axios({ ...requestOps })
        } catch (e) {
            alert((e as Error).message)
        }
    }
}


