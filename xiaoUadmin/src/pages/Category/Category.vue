<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary"
                   @click="addmenu">添加</el-button>

        <el-table :data="tableData"
                  style="width: 100%;margin-bottom: 20px;"
                  row-key="id"
                  border
                  default-expand-all
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="id"
                             label="分类编号"
                             width="180">
            </el-table-column>
            <el-table-column prop="catename"
                             label="分类名称"
                             width="180">
            </el-table-column>
            <el-table-column 
                             label="图片">
                <template slot-scope="scope">
                    <img :src="'http://localhost:3000'+scope.row.img"  alt="">
                </template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-tag>{{scope.row.status | statusfilter}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"
                               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

                    <el-popconfirm title="确认删除吗？"
                                   @onConfirm="del(scope.row.id)">
                        <el-button slot="reference"
                                   size="mini"
                                   type="danger">删除</el-button>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: []
        }
    },
    methods: {
        getlist () {
            this.$http.get("/catelist", { istree: true }).then(res => {
                console.log(res)
                this.tableData = res.data.list
            })
        },
        del (id) {
            this.$http.post("/catedelete", { id }).then(res => {
                console.log(res)
                this.getlist()
                console.log(this)
                this.$message('删除成功');
            })
        },
        addmenu () {
            console.log(11)
            this.$router.push("/category/add")
        },
        handleEdit (index, row) {
            console.log(index, row);
            console.log(row.id)
            this.$router.push("/category/edit?id=" + row.id)
        },
        handleDelete (index, row) {
            console.log(index, row);
        }
    },
    mounted () {
        this.getlist()
    }
}
</script>

<style lang="stylus" scoped>
.el-breadcrumb
    height 50px
    line-height 50px
img{
    width:200px
}
</style>