import axios from "axios";
import { RadioStation } from "./interfaces";

export const getRadioList = async (): Promise<RadioStation[]> => {
  const response = await axios.get('http://localhost:5000/radio/list');
  return response.data.data;
};
