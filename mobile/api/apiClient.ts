import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";

type Config = {
  method: string;
  headers: {
    "Content-Type": string;
    "x-auth-token": string;
  };
  body?: string;
};

const apiClient = {
  async request(method, endpoint, data = null) {
    const token = await AsyncStorage.getItem("userToken");
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
    };

    const config: Config = {
      method,
      headers,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, config);
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "API request failed");
      }
      return json;
    } catch (error) {
      throw error;
    }
  },

  get(endpoint) {
    return this.request("GET", endpoint);
  },

  post(endpoint, data) {
    return this.request("POST", endpoint, data);
  },
};

export default apiClient;
