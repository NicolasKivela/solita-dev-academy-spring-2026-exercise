import axios from "axios"
const API_URL = "http://localhost:8010"
export const getElectricityData = async (start: String, end: String) => {
    
    const response = await axios.get(`${API_URL}/api/daily-data?start=${start}&end=${end}`)
    return response.data
}