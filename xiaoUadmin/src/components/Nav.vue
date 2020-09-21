<template>
    <el-col :span="24">
        <el-menu default-active="2"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
            <el-menu-item index="0">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>

            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>系统设置</span>
                </template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>商城管理</span>
                </template>
                <el-menu-item index="1-1">选项2-1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu>
        </el-menu>
    </el-col>
</template>

<script>
export default {
    methods: {
        handleOpen (key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose (key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style lang="stylus" scoped>
.el-col, .el-menu
    height 100%
</style>