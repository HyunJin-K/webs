<template>
    <div class="game_wrap">
        <h2 class="title">{{totalPage}}</h2>
        <h2 class="title">{{totalPagination}}</h2>
        <div class="tool">
            <div class="select">
                <select name="gameGenre" v-model="selectGenre" @change="changeGenre()">
                    <option value="all">All</option>
                    <option value="MMORPG">MMORPG</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Action RPG">Action RPG</option>
                </select>
            </div>
            <div class="ipt">
                <input type="text" placeholder="search">
                <button type="button">Search</button>
            </div>
        </div>
        <ul class="game_list">
            <li v-for="(game, index) in posts" :key="index">
                <gameList :game-target="game"></gameList>
            </li>
        </ul>
        <div class="pagination">
            <button type="button" :class="['btn_prev', { off: currentPage === 1 }]"
                @click="currentPage !== 1 ? prevMove() : ''">prev</button>
            <ul class="number">
                <li v-for="(page, index) in totalPage" :key="index" :class="{on: currentPage === totalPage[index]}">
                    <button type="button" @click="currentPage = totalPage[index]">{{ page }}</button>
                </li>
            </ul>
            <button type="button" :class="['btn_next', {off: currentPage === totalPagination}]"
                @click="currentPage !== totalPagination ? nextMove() : ''">next</button>
        </div>
    </div>
</template>

<script setup>
const defaultStore = useDefaultStore();
const defaultData = ref(defaultStore.gameData);
const currentPage = ref(1); // 현재 페이지
const postView = 12;    // 한 페이지당 몇개씩 보여줄지
const pageView = 10;    // 한 번에 보여줄 pagination 수
const startPage = ref(1);   // 각 pagination별 시작 페이지 넘버


const totalPagination = computed(()=>{
    return Math.ceil(defaultData.value.length / postView);
})
const posts = computed(() => {
    const startIndex = (currentPage.value - 1) * postView;
    const lastIndex = startIndex + postView;
    return defaultData.value.slice(startIndex, lastIndex);
});
const totalPage = computed(() => {
    let endPage = ref(0)
    totalPagination.value >= (startPage.value + pageView) ? endPage.value = (startPage.value + (pageView - 1)) : endPage.value = startPage.value + (totalPagination.value % pageView - 1)

    const pages = [];
    for (let i = startPage.value; i <= endPage.value; i++) {
        pages.push(i);
    }
    return pages;
});

const nextMove = () => {
    if (currentPage.value%pageView === 0) {
        startPage.value += pageView;
    }
    currentPage.value++;
}
const prevMove = () => {
    if(currentPage.value%pageView === 1){
        startPage.value -= pageView;
    }
    currentPage.value--;
}

// select
const selectGenre = ref('all');

const changeGenre = () => {
    if(selectGenre.value === 'all'){
        defaultData.value = defaultStore.gameData
    }else{
        defaultData.value = defaultStore.gameData.filter(e => e.genre === selectGenre.value);
    }
    startPage.value = 1;
    currentPage.value = 1;
}

// search
// 1. input에 값을 v-model로 받아온다
// 2. 받아온 값을 소문자로 변환한다.
// 3. 현재 필터링 되어있는 defaultData에서 받아온 소문자로 변환한 값을 게임명으로 filter 처리해서 다시 defaultData로 담는다.
// 4. 검색어를 비우고 검색했을 경우 다시 전체를 노출한다.
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
.tool   {
    display:flex;padding:2% 1%;
    justify-content: space-between;
    .select {
        width:30%;height:30px;border:1px solid #ccc;
        select  {width:100%;height:100%;padding:0 10px;}
    }
    .ipt    {
        width:38%;height:30px;border:1px solid #ccc;
        input   {width:70%;height:100%;font-size:14px;padding:0 10px;}
        button  {width:30%;height:100%;border-left:1px solid #ccc;font-size:12px;}
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
            &.on    {
                button  {background:#000;color:#fff;}
            }
        }
    }
}
</style>