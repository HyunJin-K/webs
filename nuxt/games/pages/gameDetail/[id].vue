<template>
    <div class="wrap">
        <div class="thmb">
            <img :src="targetGame.thumbnail" alt="">
        </div>
        <div class="info">
            <strong class="tit">{{ targetGame.title }}</strong>
            <strong class="dsc">{{ targetGame.desc }}</strong>
            <div class="developer">{{ targetGame.developer }}</div>
            <div class="publisher">{{ targetGame.publisher }}</div>
            <div class="dtl">
                <a :href="targetGame.game_url" class="link">LINK</a>
                <div class="date">{{ targetGame.release_date }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const defaultStore = useDefaultStore();
    const route = useRoute()
    const {data} = await useFetch('/api/games', {
        method: 'GET',
    })
    const targetGame = data.value.filter(e => e.id == route.params.id)[0];
    console.log(defaultStore.state.selectGenre)
</script>

<style lang="scss" scoped>

</style>