<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/specs' }">规格列表</el-breadcrumb-item>
      <el-breadcrumb-item>规格{{menumsg}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >

      <el-form-item label="规格名称" prop="specsname">
        <el-input v-model="ruleForm.specsname"></el-input>
      </el-form-item>
      <!-- arrt:[{
           value
       }] -->
       <el-form-item
    v-for="(item, index) in ruleForm.attrs"
    :label="'属性规格' + index"
    :key="index" >
    <el-input v-model="item.value"></el-input>
    <el-button @click="addDomain" v-if="index == 0">新增规格属性</el-button>
    <el-button @click.prevent="removeDomain(item)" v-if="index != 0">删除</el-button>
  </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{btnmsg}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$http.get("/specslist", {"size":10,"page":1 }).then(res => {
      let status = (this.list = res.data.list);
    //   console.log(res.data.list)
    });
    this.id = this.$route.query.id;
    if (this.id) {
      this.$http.get("/specsinfo", { id: this.id }).then(res => {
        // console.log(res);
        console.log(res.data.list[0]);
        // res.data.list[0].attrs 拿到的是数组需要遍历，将其变成对象格式
        /* let len = res.data.list[0].attrs.length
        console.log(len) */
        /* for(let i in res.data.list[0].attrs){
            this.obj["value"]=res.data.list[0].attrs[i];
            res.data.list[0].attrs.push(this.obj)
        } */
    //    res.data.list[0].attrs=res.data.list[0].attrs.slice(len)
        // console.log(typeof (res.data.list[0].status))
        this.ruleForm = res.data.list[0];
       this.ruleForm.attrs = res.data.list[0].attrs.map((item)=>{
           return {"value":item}
       })
        this.ruleForm.status = res.data.list[0].status == 1 ? true : false;
        console.log(this.ruleForm)
        this.menumsg = "修改";
        this.btnmsg = "确认修改";
      });
    } else {
      this.menumsg = "添加";
      this.btnmsg = "确认添加";
    }
  },
  data() {
    return {
        obj:{},
      btnmsg: "",
      menumsg: "",
      id: "",
      list: [],
      ruleForm: {
        specsname: "",
        attrs: [{
            value:''
        }],
        status: true
      },
      rules: {
        title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.status = this.ruleForm.status ? 1 : 2;
        /* //    attrs: [{
            value:''
        }], */
        this.ruleForm.attrs = this.ruleForm.attrs.map((item)=>{
            return item.value
        }).join(",")
          if (this.id) {
            this.$http
              .post("/specsedit", { ...this.ruleForm, id: this.id })
              .then(res => {
                // console.log(res)
                if (res.data.code == 200) {
                  this.$router.back();
                }
              });
          } else {
            this.$http.post("/specsadd", this.ruleForm).then(res => {
            //   console.log(res);
              if (res.data.code == 200) {
                this.$router.back();
              }
            });
          }
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

 removeDomain(item) {
        var index = this.ruleForm.attrs.indexOf(item)
        if (index !== -1) {
          this.ruleForm.attrs.splice(index, 1)
        }
      },
      addDomain() {
        this.ruleForm.attrs.push({
          value: ''
        });
      },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-breadcrumb {
  height: 50px;
  line-height: 50px;
}
</style>