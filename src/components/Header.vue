<template>
    <el-select
        v-model="value"
        class="m-2"
        placeholder="Select"
        size="large"
        style="width: 240px"
    >
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
    </el-select>
</template>