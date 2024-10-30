import { d as defineStore, s as storages, m as skipHydrate, n as navigateTo } from './server.mjs';
import { ref, computed } from 'vue';
import { u as useCheckout } from './useCheckout-hgERupd8.mjs';

const useAuthStore = defineStore(
  "auth",
  () => {
    const users = ref(null);
    const isLoggedIn = ref(false);
    const updateCount = ref(0);
    const registrationEmail = ref("");
    const setUser = (user) => {
      users.value = user;
    };
    const getUser = computed(() => {
      return users.value;
    });
    const removeUser = () => {
      users.value = null;
    };
    const setIsLoggedIn = (value) => {
      isLoggedIn.value = value;
    };
    const setUpdateCount = () => {
      updateCount.value++;
    };
    const setRegisterEmail = (value) => {
      registrationEmail.value = value;
    };
    const removeRegisterEmail = () => {
      registrationEmail.value = "";
    };
    const checkLoggedIn = async () => {
      const { isAuthenticated } = useCheckout();
      const isLogin = await isAuthenticated();
      if (!isLogin) {
        removeUser();
        setIsLoggedIn(false);
        await logMeOut();
      }
    };
    const logMeOut = async () => {
      const { logout } = useCheckout();
      const { status } = await logout();
      if (status === "success") {
        removeUser();
        setIsLoggedIn(false);
        return navigateTo("/");
      }
    };
    return {
      users: skipHydrate(users),
      isLoggedIn,
      updateCount,
      registrationEmail,
      setUser,
      getUser,
      removeUser,
      setIsLoggedIn,
      setUpdateCount,
      setRegisterEmail,
      removeRegisterEmail,
      checkLoggedIn,
      logMeOut
    };
  },
  {
    persist: {
      storage: storages.localStorage()
    }
  }
);

export { useAuthStore as u };
//# sourceMappingURL=authStore-B9R4yTW5.mjs.map
