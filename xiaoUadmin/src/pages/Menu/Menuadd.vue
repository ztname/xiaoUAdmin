<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/menu' }">菜单列表</el-breadcrumb-item>
            <el-breadcrumb-item>菜单{{menumsg}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">
            <el-form-item label="菜单名称"
                          prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="上级菜单"
                          prop="pid">
                <el-select v-model="ruleForm.pid"
                           placeholder="请选择上级菜单">
                    <el-option label="顶级菜单"
                               :value="0"></el-option>
                    <el-option :label="item.title"
                               :value="item.id"
                               v-for="item in list"
                               :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单类型"
                          prop="type">
                <el-radio-group v-model="ruleForm.type">
                    <el-radio :label="1">目录</el-radio>
                    <el-radio :label="2">菜单</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单图标"
                          prop="icon"
                          v-show="ruleForm.type == 1">
                <el-input v-model="ruleForm.icon"></el-input>
            </el-form-item>
            <el-form-item label="菜单地址"
                          prop="icon"
                          v-show="ruleForm.type == 2">
                <el-input v-model="ruleForm.url"></el-input>
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
                this.list = res.data.list;
            // console.log(this.list)
        });
        this.id = this.$route.query.id
        if (this.id) {
            this.$http.get("/menuinfo", { id: this.id }).then(res => {
                console.log(res.data.list)
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
            btnmsg: "",
            menumsg: "",
            id: "",
            list: [],
            ruleForm: {
                title: "",
                pid: "",
                type: 1,
                icon: "",
                url: "",
                status: true
            },
            rules: {
                title: [
                    { required: true, message: '请输入菜单名称', trigger: 'blur' }
                ],
                pid: [
                    { required: true, message: '请选择上级菜单', trigger: 'change' }
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
                        this.$http.post("/menuedit", { ...this.ruleForm, id: this.id }).then(res => {
                            // console.log(res)
                            if (res.data.code == 200) {
                                this.$router.back()
                            }
                        })
                    } else {
                        this.$http.post("/menuadd", this.ruleForm).then(res => {
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