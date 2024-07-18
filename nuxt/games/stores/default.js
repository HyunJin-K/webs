export const useDefaultStore = defineStore('default', () => {
    const gameData = reactive({});
    const state = reactive({
        selectGenre: 'all',
        startPage: 1,    // 각 pagination별 시작 페이지 넘버
        currentPage: 1, // 현재 페이지
        searching: false,
        gameKeyword: ''
    })
    
    return{
        gameData, state
    }
});