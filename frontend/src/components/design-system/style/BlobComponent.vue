<script setup lang="ts">

export interface Props {
    color?: 'blue' | 'red';
    // TODO: add responsivity
}

const props = withDefaults(defineProps<Props>(), {
    color: "blue",
});

const blobUrl = () => {
    if (props.color == "blue") {
        return "./assets/background/blue-blob.svg";
    } else return "./assets/background/red-blob.svg";
}
</script>

<template>
    <template v-if="props.color == 'blue'">
        <img src="@/assets/background/blue-blob.svg" class="blob" :alt="'blue background blob'" />
    </template>
    <template v-else>
        <img src="@/assets/background/red-blob.svg" class="blob" :alt="'red background blob'" />
    </template>
</template>

<style scoped lang="scss">
.blob {
    filter: blur(120px);
    z-index: -1;
}
</style>