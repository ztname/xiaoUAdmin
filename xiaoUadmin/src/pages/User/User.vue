<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
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
                             label="用色编号"
                             width="180">
            </el-table-column>
            <el-table-column prop="username"
                             label="用户名"
                             width="180">
            </el-table-column>
            <el-table-column label="所属角色"
                             width="180"
                             prop="rolename">

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
                                   @onConfirm="del(scope.row.uid)">
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
    // filters: {
    //     formatroleid (roleid, rolelist) {
    //         console.log(rolelist)
    //         // console.log(roleid)
    //         if (rolelist.length > 0) {
    //             let item = rolelist.find((item) => {
    //                 return item.id == roleid
    //             })
    //             // console.log(item)
    //             return item.rolename
    //         }
    //     }
    // },
    data () {
        return {
            tableData: [],
            rolelist: []
        }
    },
    methods: {
        getlist () {
            this.$http.get("/userlist", { size: 10, page: 1 }).then(res => {
                console.log(res)
                this.tableData = res.data.list
            })
        },
        del (id) {
            console.log(id)
            this.$http.post("/userdelete", { uid: id }).then(res => {
                console.log(res)
                this.getlist()
                this.$message('删除成功');
            })
        },
        addmenu () {
            console.log(11)
            this.$router.push("/user/add")
        },
        handleEdit (index, row) {
            console.log(index, row);
            console.log(row.id)
            this.$router.push("/user/edit?id=" + row.uid)
        },
        handleDelete (index, row) {
            console.log(index, row);
        }
    },
    mounted () {
        this.getlist(),
            this.$http.get("/rolelist").then(res => {
                this.rolelist = res.data.list
            })
    }
}
</script>

<style lang="stylus" scoped>
.el-breadcrumb
    height 50px
    line-height 50px
</style>