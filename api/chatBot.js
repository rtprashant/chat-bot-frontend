import api from "./api"

const chatBot = async(data)=>{
    const response = await api.post(`/chatBot` , data)
    return response.data

}
export default chatBot;