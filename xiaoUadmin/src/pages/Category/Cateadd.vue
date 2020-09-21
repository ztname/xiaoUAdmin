<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/category' }">商品分类列表</el-breadcrumb-item>
            <el-breadcrumb-item>商品{{menumsg}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :model="ruleForm"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px"
                 class="demo-ruleForm">
            <el-form-item label="上级分类"
                          prop="pid">
                <el-select v-model="ruleForm.pid"
                           placeholder="请选择上级菜单">
                    <el-option label="顶级菜单"
                               :value="0"></el-option>
                    <el-option :label="item.catename"
                               :value="item.id"
                               v-for="item in list"
                               :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="分类名称"
                          prop="catename">
                <el-input v-model="ruleForm.catename"></el-input>
            </el-form-item>
            <el-form-item label="图片"
                          prop="img">
                <el-upload action="#"
                           list-type="picture-card"
                           :auto-upload="false"
                           :on-change="getimgfile"
                           :file-list="imgarr">
                    <i class="el-icon-plus"></i>
                </el-upload>
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
        this.$http.get("/catelist", { pid: 0 }).then(res => {
            let status =
                this.list = res.data.list;
            // console.log(this.list)
        });
        this.id = this.$route.query.id
        if (this.id) {
            this.$http.get("/cateinfo", { id: this.id }).then(res => {
                console.log(res.data.list)
                // console.log(typeof (res.data.list.status))
                this.ruleForm = res.data.list
                this.imgarr.push({
                    url:"http://localhost:3000"+res.data.list.img
                })
                console.log(this.imgarr)
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
            imgarr:[],
            btnmsg: "",
            menumsg: "",
            id: "",
            list: [],
            ruleForm: {
                pid: "",
                catename: "",
                img: "",
                status: true
            },
            rules: {
                pid: [
                    { required: true, message: '请选择上级分类', trigger: 'change' }
                ],
                catename: [
                    { required: true, message: '请输入分类名称', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        getimgfile (file, filelist) {
            console.log(file, filelist)
            this.ruleForm.img = file.raw
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.status = this.ruleForm.status ? 1 : 2
                    let form = new FormData()
                    for (let key in this.ruleForm) {
                        form.append(key, this.ruleForm[key])
                        // console.log(this.ruleForm, form)
                    }
                    if (this.id) {
                        form.append("id",this.id)
                        this.$http.post("/cateedit", form).then(res => {
                            // console.log(res)
                            if (res.data.code == 200) {
                                this.$router.back()
                            }
                        })
                    } else {
                        this.$http.post("/cateadd", form).then(res => {
                            console.log(res.data);
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