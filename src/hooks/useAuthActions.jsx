import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userState, isLoadingState, tokenState } from '../states/userState';

export function useAuthActions() {
  const setUser = useSetRecoilState(userState);
  const setIsLoading = useSetRecoilState(isLoadingState);
  const token = useRecoilValue(tokenState);

  const login = async (token) => {
    localStorage.setItem('token', token);
    setUser(token);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { login, logout, token };
}