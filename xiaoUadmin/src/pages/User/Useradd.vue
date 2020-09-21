<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/user' }">管理员管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户{{menumsg}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">
            <el-form-item label="角色编号"
                          prop="roleid">
                <el-select v-model="ruleForm.roleid"
                           placeholder="选择角色">
                    <el-option :label="item.rolename"
                               :value="item.id"
                               v-for="item in list"
                               :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="用户名"
                          prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码"
                          prop="password">
                <el-input v-model="ruleForm.password"></el-input>
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
        this.$http.get("/rolelist").then(res => {
            this.list = res.data.list;
            // console.log(this.list)
        });
        this.id = this.$route.query.id
        if (this.id) {
            this.menumsg = "修改"
            this.btnmsg = "确认修改"
            this.$http.get("/userinfo", { uid: this.id }).then(res => {
                console.log(res)
                // console.log(typeof (res.data.list.status))
                this.ruleForm = res.data.list
                this.ruleForm.status = res.data.list.status == 1 ? true : false
                this.ruleForm.password = ""
                // console.log(this.ruleForm)
            });
        } else {
            this.menumsg = "添加"
            this.btnmsg = "确认添加"
        }
    },
    data () {
        return {
            btnmsg: "",
            menumsg: "",
            id: "",
            list: [],
            ruleForm: {
                roleid: "",
                username: "",
                password: "",
                status: true
            },
            rules: {
                roleid: [
                    { required: true, message: '请选择角色编号', trigger: 'change' }
                ],
                username: [
                    { required: true, message: '请选择上级菜单', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.status = this.ruleForm.status ? 1 : 2
                    if (this.id) {
                        this.$http.post("/useredit", { ...this.ruleForm, id: this.id }).then(res => {
                            // console.log(res)
                            if (res.data.code == 200) {
                                this.$router.back()
                            }
                        })
                    } else {
                        this.$http.post("/useradd", this.ruleForm).then(res => {
                            console.log(res);
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