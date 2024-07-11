<template>
    <div class="game_wrap">
        <h2 class="title">{{posts[0]}}</h2>
        <ul class="game_list">
            <li v-for="(game, index) in posts" :key="index">
                <gameList :game-target="game"></gameList>
            </li>
        </ul>
        <div class="pagination">
            <button type="button" class="btn_prev" @click="currentPage > 1 ? currentPage-- : ''">prev</button>
            <ul class="number">
                <li v-for="(page, index) in totalPage" :key="index"><button type="button">{{ index+1 }}</button></li>
            </ul>
            <button type="button" class="btn_next" @click="currentPage < totalPage ? currentPage++ : ''">next</button>
        </div>
    </div>
</template>

<script setup>
    const defaultStore = useDefaultStore();
    const currentPage = ref(1); // 현재 페이지
    const postView = 12;    // 한 페이지당 몇개씩 보여줄지

    const posts = computed(()=>{
        const startIndex = (currentPage.value - 1) * postView;
        const lastIndex = startIndex + postView
        return defaultStore.gameData.slice(startIndex, lastIndex);
    });
    const totalPage = computed(()=>{
        return Math.ceil(defaultStore.gameData.length / postView);
    });
</script>

<style lang="scss" scoped>
.game_wrap  {
    padding:10px;
    .title  {font-size:30px;padding:0 1%;}
}
.game_list  {
    display:flex;flex-wrap:wrap;
    li  {width:31.333%;margin:1%;box-sizing:border-box;border:1px solid #ccc;position:relative;}
}
</style>