<template>
    <div class="game_wrap">
        <h2 class="title">{{ totalPage }}</h2>
        <h2>{{ startPage }}</h2>
        <ul class="game_list">
            <li v-for="(game, index) in posts" :key="index">
                <gameList :game-target="game"></gameList>
            </li>
        </ul>
        <div class="pagination">
            <button type="button" :class="['btn_prev', { off: currentPage === 1 }]"
                @click="currentPage > 1 ? currentPage-- : ''">prev</button>
            <ul class="number">
                <li v-for="(page, index) in totalPage" :key="index">
                    <button type="button" @click="currentPage = index + 1">{{ page }}</button>
                </li>
            </ul>
            <button type="button" :class="['btn_next']"
                @click="currentPage < totalPage.length ? nextMove() : ''">next</button>
        </div>
    </div>
</template>

<script setup>
const defaultStore = useDefaultStore();
const currentPage = ref(1); // 현재 페이지
const postView = 12;    // 한 페이지당 몇개씩 보여줄지
const startPage = ref(1);

const posts = computed(() => {
    const startIndex = (currentPage.value - 1) * postView;
    const lastIndex = startIndex + postView
    return defaultStore.gameData.slice(startIndex, lastIndex);
});
const totalPage = computed(() => {
    // let totals = Math.ceil(defaultStore.gameData.length / postView);
    // if(totals > 10){
    //     return 10
    // }else{
    //     return totals
    // }
    // return Math.ceil(defaultStore.gameData.length / postView);
    
    let totals = Math.ceil(defaultStore.gameData.length / postView);
    let endPage = ref(0)
    totals > (startPage.value + 10) ? endPage.value = (startPage.value + 9) : endPage.value = 10
    let pages = [];
    for (let i = startPage.value; i <= endPage.value; i++) {
        pages.push(i);
    }
    return pages;
});

const nextMove = () => {
        currentPage.value++;
    if (totalPage.value.length <= currentPage.value) {
        console.log(119)
        startPage.value += 10;
    }else{
    }
}
</script>

<style lang="scss" scoped>
.game_wrap {
    padding: 10px;

    .title {
        font-size: 30px;
        padding: 0 1%;
    }
}

.game_list {
    display: flex;
    flex-wrap: wrap;

    li {
        width: 31.333%;
        margin: 1%;
        box-sizing: border-box;
        border: 1px solid #ccc;
        position: relative;
    }
}

.pagination {
    display: flex;
    margin-top: 20px;
    justify-content: center;

    .btn_prev,
    .btn_next {
        font-size: 0;
        flex-shrink: 0;

        &:after {
            display: inline-block;
            content: '';
            width: 8px;
            height: 8px;
            border: solid #666;
            transform: rotate(45deg);
        }

        &.off {
            opacity: 0.3;
            background: #ccc;
            cursor: default;
        }
    }

    .btn_prev:after {
        border-width: 0 0 2px 2px;
        margin-left: 6px;
    }

    .btn_next:after {
        border-width: 2px 2px 0 0;
        margin-right: 6px;
    }

    button {
        width: 30px;
        height: 30px;
        border: 1px solid #aaa;
    }

    ul {
        display: flex;
        margin-right: 4px;

        li {
            margin-left: 4px;
        }
    }
}
</style>