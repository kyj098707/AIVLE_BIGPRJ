import create from 'zustand';

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

// export const Domain = 'http://152.67.218.5/api/';
// export const DjangoUrl = 'http://152.67.218.5:8000';

export const Domain = 'http://localhost:8000/api/';
export const DjangoUrl = 'http://localhost:8000';