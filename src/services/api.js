// src/services/api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const api = axios.create({
  baseURL: "http://192.168.0.113:3333/v1", 
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
