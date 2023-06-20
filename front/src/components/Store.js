import create from 'zustand';

const useStore = create((set) => ({
  isLogin: false,
  pk: false,
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