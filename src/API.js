import axios from "axios";

export default axios.create({
    baseURL: `https://cv-builder.talentplace.ai/api/v1/`
  });