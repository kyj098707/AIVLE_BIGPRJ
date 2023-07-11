import create from 'zustand';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export const useStore = create((set) => ({
  isLogin: localStorage.getItem("access") ? true : false,
  pk: localStorage.getItem("pk") ? localStorage.getItem("pk") : false,
  isLoginTrue: (id) => {
    set({ isLogin: true,
          pk: id });
  },
  isLoginFalse: () => {
    set({ isLogin: false,
          pk: false });
  },
}));

export function refresh(refreshToken) {
  axios.post(Domain + "refresh/", { refresh_token: refreshToken })
    .then((response) => {
      localStorage.setItem("access", response.data.access);
    }
    )
    .catch((error) => {
      console.log(error.response)
      return (error.response.data.msg)
    }
    )
}

// export const Domain = 'http://152.67.218.5/api/';
// export const DjangoUrl = 'http://152.67.218.5:8000';

export const Domain = 'http://localhost:8000/api/';
export const DjangoUrl = 'http://localhost:8000';