<template>
    <NuxtLink :to="`/gameDetail/${gameTarget.id}`">
        <div class="thmb">
            <img :src="gameTarget.thumbnail" alt="">
            <div class="genre">{{ gameTarget.genre }}</div>
        </div>
        <div class="info">
            <strong class="tit">{{ gameTarget.title }}</strong>
            <div class="developer">{{ gameTarget.developer }}</div>
        </div>
    </NuxtLink>
</template>

<script setup>
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
        padding:10px 10px 40px;
        .tit    {font-size:15px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        // .dsc    {margin-top:5px;height:34px;line-height:17px;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:2;display:-webkit-box;-webkit-box-orient: vertical;}
        .developer  {position:absolute;color:#999;text-align:right;bottom:10px;right:10px;font-size:11px;}
    }
</style>