<template>
    <div class="game_wrap">
<<<<<<< HEAD
        <h2 class="title">
            <button type="button" @click="resetList()">GAMES</button>
        </h2>
        <div class="tool">
            <div class="select">
                <select name="gameGenre" v-model="defaultStore.state.selectGenre" @change="changeGenre()">
=======
        <h2 class="title">{{totalPage}}</h2>
        <h2 class="title">{{totalPagination}}</h2>
        <div class="tool">
            <div class="select">
                <select name="gameGenre" v-model="selectGenre" @change="changeGenre()">
>>>>>>> d9ea1284f33fcabd6fc81b19a5910826611fe2a5
                    <option value="all">All</option>
                    <option value="MMORPG">MMORPG</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Action RPG">Action RPG</option>
                </select>
            </div>
            <div class="ipt">
<<<<<<< HEAD
                <input type="text" placeholder="search" v-model="defaultStore.state.gameKeyword" @keyup.enter="searchKeyword()">
                <button type="button" @click="searchKeyword()">Search</button>
            </div>
        </div>
        <div class="no_list" v-if="defaultData.length === 0">
            NO RESULT
        </div>
        <template v-else>
            <ul class="game_list">
                <li v-for="(game, index) in posts" :key="index">
                    <gameList :game-target="game"></gameList>
                </li>
            </ul>
            <div class="pagination">
                <button type="button" :class="['btn_prev', { off: defaultStore.state.currentPage === 1 }]"
                    @click="defaultStore.state.currentPage !== 1 ? prevMove() : ''">prev</button>
                <ul class="number">
                    <li v-for="(page, index) in defaultStore.pages" :key="index" :class="{on: defaultStore.state.currentPage === defaultStore.pages[index]}">
                        <button type="button" @click="defaultStore.state.currentPage = defaultStore.pages[index]">{{ page }}</button>
                    </li>
                </ul>
                <button type="button" :class="['btn_next', {off: defaultStore.state.currentPage === totalPagination}]"
                    @click="defaultStore.state.currentPage !== totalPagination ? nextMove() : ''">next</button>
            </div>
        </template>
=======
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
>>>>>>> d9ea1284f33fcabd6fc81b19a5910826611fe2a5
    </div>
</template>

<script setup>
const {data} = await useFetch('/api/games', {
    method: 'GET',
})
const defaultStore = useDefaultStore();
<<<<<<< HEAD
const defaultData = ref(data.value);
const postView = 12;    // 한 페이지당 몇개씩 보여줄지
const pageView = 10;    // 한 번에 보여줄 pagination 수

const totalPagination = computed(()=>{
    return Math.ceil(defaultData.value.length / postView);
})
defaultStore.state.searching = true;
const posts = computed(() => {
    const startIndex = (defaultStore.state.currentPage - 1) * postView;
    const lastIndex = startIndex + postView;
    if(defaultStore.state.searching === true){
        searchFilter();
        defaultStore.state.searching = false
    }
=======
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
>>>>>>> d9ea1284f33fcabd6fc81b19a5910826611fe2a5
    return defaultData.value.slice(startIndex, lastIndex);
});

const totalPage = computed(() => {
    let endPage = ref(0)
<<<<<<< HEAD
    totalPagination.value >= (defaultStore.state.startPage + pageView) ? endPage.value = (defaultStore.state.startPage + (pageView - 1)) : endPage.value = defaultStore.state.startPage + (totalPagination.value % pageView - 1)

    const pages = [];
    for (let i = defaultStore.state.startPage; i <= endPage.value; i++) {
=======
    totalPagination.value >= (startPage.value + pageView) ? endPage.value = (startPage.value + (pageView - 1)) : endPage.value = startPage.value + (totalPagination.value % pageView - 1)

    const pages = [];
    for (let i = startPage.value; i <= endPage.value; i++) {
>>>>>>> d9ea1284f33fcabd6fc81b19a5910826611fe2a5
        pages.push(i);
    }
    return pages;
});

const nextMove = () => {
<<<<<<< HEAD
    if (defaultStore.state.currentPage%pageView === 0) {
        defaultStore.state.startPage += pageView;
    }
    defaultStore.state.currentPage++;
}
const prevMove = () => {
    if(defaultStore.state.currentPage%pageView === 1){
        defaultStore.state.startPage -= pageView;
    }
    defaultStore.state.currentPage--;
}

// select
const changeGenreFilter = () => {
    if(defaultStore.state.selectGenre === 'all'){
        defaultData.value = data.value
    }else{
        defaultData.value = data.value.filter(e => e.genre === defaultStore.state.selectGenre);
=======
    if (currentPage.value%pageView === 0) {
        startPage.value += pageView;
>>>>>>> d9ea1284f33fcabd6fc81b19a5910826611fe2a5
    }
    currentPage.value++;
}
<<<<<<< HEAD
const changeGenre = () => {
    changeGenreFilter();
    defaultStore.state.startPage = 1;
    defaultStore.state.currentPage = 1;
    defaultStore.state.gameKeyword = '';
}

// search
const searchFilter = () => {
    defaultData.value = data.value.filter(e => e.title.toLowerCase().replace(/\s+/g, '').indexOf(defaultStore.state.gameKeyword.toLowerCase().replace(/\s+/g, '')) !== -1);
}
const searchKeyword = () => {
    if(defaultStore.state.gameKeyword !== ''){
        resetList();
        searchFilter();
        defaultStore.state.searching = true;
    }
}

// reset
const resetList = () => {
    defaultData.value = data.value;
    defaultStore.state.selectGenre = 'all';
    defaultStore.state.startPage = 1;
    defaultStore.state.currentPage = 1;
}
changeGenreFilter();
defaultStore.pages = totalPage;

=======
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
>>>>>>> d9ea1284f33fcabd6fc81b19a5910826611fe2a5
</script>

<style lang="scss" scoped>
.game_wrap {
    padding: 10px;

    .title {
        font-size: 30px;
        padding: 0 1%;
        button  {font-weight:bold;}
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
<<<<<<< HEAD
        width:38%;height:30px;border:1px solid #ccc;display:flex;
=======
        width:38%;height:30px;border:1px solid #ccc;
>>>>>>> d9ea1284f33fcabd6fc81b19a5910826611fe2a5
        input   {width:70%;height:100%;font-size:14px;padding:0 10px;}
        button  {width:30%;height:100%;border-left:1px solid #ccc;font-size:12px;}
    }
}
<<<<<<< HEAD
.no_list    {
    border:1px solid #333;margin-top:10px;text-align:center;padding:40px;
}
=======
>>>>>>> d9ea1284f33fcabd6fc81b19a5910826611fe2a5
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