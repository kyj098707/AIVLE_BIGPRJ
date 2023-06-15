import create from 'zustand';

const useStore = create((set) => ({
  isLogin: false,
  isLoginTrue: () => {
    set({ isLogin: true });
  },
  isLoginFalse: () => {
    set({ isLogin: false });
  },
}));

export { useStore };