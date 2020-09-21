<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/role' }">角色列表</el-breadcrumb-item>
            <el-breadcrumb-item>角色{{menumsg}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">
            <el-form-item label="角色名称"
                          prop="rolename">
                <el-input v-model="ruleForm.rolename"></el-input>
            </el-form-item>
            <el-form-item label="角色权限"
                          prop="menus">
                <el-tree :data="data"
                         show-checkbox
                         node-key="id"
                         :default-expanded-keys="[3]"
                         :default-checked-keys="checkedArr"
                         :props="defaultProps"
                         check-strictly
                         ref="mytree">
                </el-tree>
            </el-form-item>
            <el-form-item label="状态"
                          prop="status">
                <el-switch v-model="ruleForm.status"></el-switch>
            </el-form-item>

            <el-form-item>
                <el-button type="primary"
                           @click="submitForm('ruleForm')">{{btnmsg}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    mounted () {
        this.$http.get("/menulist", { istree: true }).then(res => {
            let status =
                this.data = res.data.list;
            // console.log(this.list)
        });
        this.id = this.$route.query.id
        if (this.id) {
            this.$http.get("/roleinfo", { id: this.id }).then(res => {
                // console.log(res.data.list)
                this.checkedArr = res.data.list.menus.split(",")
                console.log(this.checkedArr)
                // console.log(this.checkedArr)
                // console.log(typeof (res.data.list.status))
                this.ruleForm = res.data.list
                this.ruleForm.status = res.data.list.status == 1 ? true : false
                // console.log(this.ruleForm)
                this.menumsg = "修改"
                this.btnmsg = "确认修改"
            });
        } else {
            this.menumsg = "添加"
            this.btnmsg = "确认添加"
        }
    },
    data () {
        return {
            data: [],
            checkedArr: [],
            defaultProps: {
                children: 'children',
                label: 'title'
            },
            btnmsg: "",
            menumsg: "",
            id: "",
            list: [],
            ruleForm: {
                rolename: "",
                menus: [],
                status: true
            },
            rules: {
                rolename: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                this.ruleForm.menus = this.$refs.mytree.getCheckedKeys()
                if (valid) {
                    this.ruleForm.status = this.ruleForm.status ? 1 : 2
                    if (this.id) {
                        this.$http.post("/roleedit", { ...this.ruleForm, id: this.id }).then(res => {
                            // console.log(res)
                            if (res.data.code == 200) {
                                this.$router.back()
                            }
                        })
                    } else {
                        console.log(this.ruleForm.menus)
                        this.$http.post("/roleadd", this.ruleForm).then(res => {
                            // console.log(res);
                            if (res.data.code == 200) {
                                this.$router.back()
                            }
                        })
                    }
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>

<style lang="stylus" scoped>
.el-breadcrumb
    height 50px
    line-height 50px
</style>