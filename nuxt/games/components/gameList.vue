<template>
    <a :href="gameTarget.game_url">
        <div class="thmb">
            <img :src="gameTarget.thumbnail" alt="">
            <div class="genre">{{ gameTarget.genre }}</div>
        </div>
        <div class="info">
            <strong class="tit">{{ gameTarget.title }}</strong>
            <p class="dsc">{{ gameTarget.short_description }}</p>
            <div class="developer">{{ gameTarget.developer }}</div>
        </div>
    </a>
</template>

<script setup>
    const defaultStore = useDefaultStore();
    defineProps({
        gameTarget: Object
    })
</script>

<style lang="scss" scoped>
    a   {
        color:#333;
        &:hover {
            .info .tit  {text-decoration:underline}
        }
    }
    .thmb   {
        position:relative;
        img {width:100%;height:100%;object-fit:cover;}
        .genre  {position:absolute;background:#fff;padding:4px 8px;top:5%;left:2%;font-size:11px;font-weight:bold;}
    }
    .info   {
        padding:10px 10px 50px;
        .tit    {font-size:16px;display:block;}
        .dsc    {margin-top:5px;}
        .developer  {position:absolute;color:#999;text-align:right;bottom:10px;right:10px;}
    }
</style>