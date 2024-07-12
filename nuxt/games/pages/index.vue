<template>
    <div>
        <GameArea></GameArea>
    </div>
</template>

<script setup>
const defaultStore = useDefaultStore();
const { data } = await useFetch('https://www.freetogame.com/api/games?platform=pc', {
    method: 'GET',
})

defaultStore.gameData = data.value;
</script>

<style lang="scss" scoped></style>