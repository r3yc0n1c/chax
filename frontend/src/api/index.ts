import axios from "axios";

// Axios instance
const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
    withCredentials: true,
    timeout: 100000
});

// Interceptor to set auth header with user token
apiInstance.interceptors.request.use(
    (config) => {
        const token = L localStorage.get("token");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//

const login = async (data: { email: string; password: string }) => {
    return await apiInstance.post("/auth/login", data);
};

const googleLogin = async (codeResponse: any) => {
    // const res = await axios
    //     .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
    //         headers: {
    //             Authorization: `Bearer ${access_token}`,
    //             Accept: 'application/json'
    //         }
    //     })
    // console.log('google data', res)
    const res = await axios.post('/auth/google', {
        codeResponse,
    });

    return res;
}

const signup = async (data: {
    email: string;
    password: string;
    username: string;
}) => {
    return await apiInstance.post("/users/register", data);
};

const logout = async () => {
    return await apiInstance.post("/users/logout");
};

/*
const getAvailableUsers = () => {
return apiClient.get("/chat-app/chats/users");
};

const getUserChats = () => {
return apiClient.get(`/chat-app/chats`);
};

const createUserChat = (receiverId: string) => {
return apiClient.post(`/chat-app/chats/c/${receiverId}`);
};

const createGroupChat = (data: { name: string; participants: string[] }) => {
return apiClient.post(`/chat-app/chats/group`, data);
};

const getGroupInfo = (chatId: string) => {
return apiClient.get(`/chat-app/chats/group/${chatId}`);
};

const updateGroupName = (chatId: string, name: string) => {
return apiClient.patch(`/chat-app/chats/group/${chatId}`, { name });
};

const deleteGroup = (chatId: string) => {
return apiClient.delete(`/chat-app/chats/group/${chatId}`);
};

const deleteOneOnOneChat = (chatId: string) => {
return apiClient.delete(`/chat-app/chats/remove/${chatId}`);
};

const addParticipantToGroup = (chatId: string, participantId: string) => {
return apiClient.post(`/chat-app/chats/group/${chatId}/${participantId}`);
};

const removeParticipantFromGroup = (chatId: string, participantId: string) => {
return apiClient.delete(`/chat-app/chats/group/${chatId}/${participantId}`);
};

const getChatMessages = (chatId: string) => {
return apiClient.get(`/chat-app/messages/${chatId}`);
};

const sendMessage = (chatId: string, content: string, attachments: File[]) => {
const formData = new FormData();
if (content) {
formData.append("content", content);
}
attachments?.map((file) => {
formData.append("attachments", file);
});
return apiClient.post(`/chat-app/messages/${chatId}`, formData);
};

const deleteMessage = (chatId: string, messageId: string) => {
return apiClient.delete(`/chat-app/messages/${chatId}/${messageId}`);
};

// Export all the API functions
export {
addParticipantToGroup,
createGroupChat,
createUserChat,
deleteGroup,
deleteOneOnOneChat,
getAvailableUsers,
getChatMessages,
getGroupInfo,
getUserChats,
loginUser,
logoutUser,
registerUser,
removeParticipantFromGroup,
sendMessage,
updateGroupName,
deleteMessage,
};
*/

const api = {
    signup,
    login,
    logout,
    googleLogin
}

export default api;