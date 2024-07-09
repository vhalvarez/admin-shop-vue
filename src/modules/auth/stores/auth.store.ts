import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus, type User } from '../interfaces';
import { loginAction, registerAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password);

      if (!loginResponse.ok) {
        logout();
        return false;
      }

      user.value = loginResponse.user;
      token.value = loginResponse.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch (error) {
      return logout();
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    try {
      const registerResponse = await registerAction(fullName, email, password);

      if (!registerResponse.ok) {
        logout();
        return { ok: false, message: registerResponse.message };
      }
      user.value = registerResponse.user;
      token.value = registerResponse.token;
      authStatus.value = AuthStatus.Authenticated;

      return {ok: true, message: 'Usuario registrado'}
    } catch (error) {
      return { ok: false, message: 'Error al registrar el usuario' };
    }
  };

  const logout = () => {
    authStatus.value = AuthStatus.unAuthenticated;
    user.value = undefined;
    token.value = '';
    return false;
  };

  return {
    user,
    authStatus,
    token,

    // Getters
    isCheking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),

    // TODO: getter para saber si es admin o no

    username: computed(() => user.value?.fullName),

    // Actions
    login,
    logout,
    register,
  };
});
