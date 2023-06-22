import create from 'zustand';

const useStore = create((set) => ({
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

export { useStore };