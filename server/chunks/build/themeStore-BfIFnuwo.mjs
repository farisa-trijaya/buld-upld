import { ref } from 'vue';
import { d as defineStore } from './server.mjs';

const useThemeSettings = defineStore("themeSettings", () => {
  const isLoading = ref(true);
  const isBottomNav = ref(true);
  const collapseMenu = ref(true);
  function enableLoading() {
    isLoading.value = true;
  }
  function disableLoading() {
    isLoading.value = false;
  }
  function enableBottomNav() {
    isBottomNav.value = true;
  }
  function disableBottomNav() {
    isBottomNav.value = false;
  }
  function openCollapseMenu() {
    collapseMenu.value = true;
  }
  function closeCollapseMenu() {
    collapseMenu.value = false;
  }
  return {
    isLoading,
    isBottomNav,
    collapseMenu,
    enableLoading,
    disableLoading,
    enableBottomNav,
    disableBottomNav,
    openCollapseMenu,
    closeCollapseMenu
  };
});

export { useThemeSettings as u };
//# sourceMappingURL=themeStore-BfIFnuwo.mjs.map
