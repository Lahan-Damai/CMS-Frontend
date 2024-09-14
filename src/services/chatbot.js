import api from "./api";



export const getContextDocument = async () => {
    try {
        const response = await api.get(`/api/chatbot/get-context`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const insertAllContextFileToVectorDatabase = async () => {
    try {
        const response = await api.post(`/api/chatbot/context/add-to-vdb/all`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const deleteAllContextFile = async () => {
    try {
        const response = await api.delete(`/api/chatbot/context/delete/all`);
        return response;
    } catch (error) {
        throw error;
    }
}

export const postFileToGoogleCloudStorage = async (file, fileName) => {
    try {
        const formData = new FormData();
        formData.append('foto', file);      
        formData.append('uu_name', fileName); 

        const response = await api.post(`/api/chatbot/context/add`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        });

        return response;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};
