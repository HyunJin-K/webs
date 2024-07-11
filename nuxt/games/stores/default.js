export const useDefaultStore = defineStore('default', () => {
    const gameData = reactive({});

    return{
        gameData
    }
});