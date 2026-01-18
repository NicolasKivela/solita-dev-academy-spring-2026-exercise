import axios from "axios"
const API_URL = "http://localhost:8080"
export const getElectricityData = async (start: string, end: string) => {
    const response = await axios.get(`${API_URL}/api/daily-data?start=${start}&end=${end}`)
    return response.data
}