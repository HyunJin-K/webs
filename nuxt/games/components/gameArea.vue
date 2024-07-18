<template>
    <div class="game_wrap">
        <h2 class="title">
            <button type="button" @click="resetList()">GAMES</button>
        </h2>
        <div class="tool">
            <div class="select">
                <select name="gameGenre" v-model="defaultStore.state.selectGenre" @change="changeGenre()">
                    <option value="all">All</option>
                    <option value="MMORPG">MMORPG</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Action RPG">Action RPG</option>
                </select>
            </div>
            <div class="ipt">
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
    </div>
</template>

<script setup>
const {data} = await useFetch('/api/games', {
    method: 'GET',
})
const defaultStore = useDefaultStore();
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
    return defaultData.value.slice(startIndex, lastIndex);
});

const totalPage = computed(() => {
    let endPage = ref(0)
    totalPagination.value >= (defaultStore.state.startPage + pageView) ? endPage.value = (defaultStore.state.startPage + (pageView - 1)) : endPage.value = defaultStore.state.startPage + (totalPagination.value % pageView - 1)

    const pages = [];
    for (let i = defaultStore.state.startPage; i <= endPage.value; i++) {
        pages.push(i);
    }
    return pages;
});

const nextMove = () => {
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
    }
}
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
        width:38%;height:30px;border:1px solid #ccc;display:flex;
        input   {width:70%;height:100%;font-size:14px;padding:0 10px;}
        button  {width:30%;height:100%;border-left:1px solid #ccc;font-size:12px;}
    }
}
.no_list    {
    border:1px solid #333;margin-top:10px;text-align:center;padding:40px;
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