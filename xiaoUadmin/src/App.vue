<template>
    <div id="app">
        <el-container>
            <el-aside width="200px">
                <sidenav></sidenav>
            </el-aside>
            <el-container>
                <el-header>
                    {{username}}
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import sidenav from "./components/Nav"
export default {
    components: {
        sidenav
    },
    computed: {
        username () {
            return this.$store.state.user.username
        }
    }
}
</script>

<style>
* {
    padding: 0;
    margin: 0;
}
html,
body,
#app,
.el-container {
    width: 100%;
    height: 100%;
}
.el-header {
    background-color: #b3c0d1;
    color: #333;
    text-align: right;
    line-height: 60px;
    padding-right: 20px;
}

.el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
}

.el-main {
    color: #333;
    padding-top: 0;
}
</style>
