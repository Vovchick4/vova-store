import axios from "axios"

const http = {
    get(url: string, parameters: any | undefined, cancel: any | undefined): Promise<any> {
        return axios.get(url, { params: parameters, cancelToken: cancel ? cancel.token : null })
    }
}

export default http