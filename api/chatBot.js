import api from "./api"

const chatBot = async(data)=>{
    const response = await api.post(`/api/v1/chat/chatBot` , data)
    return response.data

}
export default chatBot;
