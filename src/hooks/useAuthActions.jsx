// src/hooks/useAuthActions.js
import { useSetRecoilState } from 'recoil';
import { userState, isLoadingState } from '../states/userState';

export function useAuthActions() {
  const setUser = useSetRecoilState(userState);
  const setIsLoading = useSetRecoilState(isLoadingState);

  const login = async (token) => {
    // 실제 앱에서는 토큰 유효성 검증 등의 로직이 필요할 수 있습니다.
    localStorage.setItem('token', token);
    setUser(token);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return { login, logout };
}
