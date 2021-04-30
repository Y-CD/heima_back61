<template>
  <div class="postPublish">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        ><a href="javascript:;">文章管理</a></el-breadcrumb-item
      >
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card" style="margin-top: 20px">
      <!-- 表单 -->
      <el-form ref="form" :model="postPublish" label-width="80px">
        <!-- 标题 -->
        <el-form-item label="标题">
          <el-input v-model="postPublish.title"></el-input>
        </el-form-item>
        <!-- 单选按钮组 -->
        <el-form-item label="类型">
          <!-- label的值 就是value值 最终会给到v-model 绑定的变量中 -->
          <el-radio-group v-model="postPublish.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 内容模块 -->
        <el-form-item label="内容">
          <!-- 富文本框 -->
          <VueEditor
            :config="config"
            v-if="postPublish.type == 1"
            ref="myeditor"
          />
          <!-- 上传视频 -->
          <el-upload
            class="upload-demo"
            :action="axios.defaults.baseURL + '/upload'"
            :headers="getToken()"
            :on-success="videoSuccess"
            v-else
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
          </el-upload>
        </el-form-item>
        <!-- 栏目 -->
        <el-form-item label="栏目">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0"></div>
          <el-checkbox-group
            v-model="checkedCate"
            @change="handleCheckedCateChange"
          >
            <el-checkbox
              v-for="value in cateList"
              :label="value.id"
              :key="value.id"
              >{{ value.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <!-- 封面 -->
        <el-form-item label="封面">
          <el-upload
            :action="axios.defaults.baseURL + '/upload'"
            :headers="getToken()"
            list-type="picture-card"
            :on-remove="coverRemove"
            :on-success="coverSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布文章</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入富文本框
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
import axios from "../utils/request.js";
import { getCateList } from "@/apis/category.js";
import { publishPost } from "@/apis/post.js";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      axios,
      postPublish: {
        title: "", // 标题
        content: "", // 内容
        categories: [], // 文章所属栏目的id 数组
        cover: [], // 封面 也是id 的数组
        type: 1, // 类型
      },
      config: {
        // 上传图片的配置
        uploadImage: {
          url: axios.defaults.baseURL + "/upload", // 上传的图片的服务器地址
          name: "file",
          // 我们要自己设置token 因为这个是组件不经过我们的拦截器
          headers: this.getToken(),
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            // console.log(res);
            insert(axios.defaults.baseURL + res.data.data.url);
          },
        },

        // 上传视频的配置
        uploadVideo: {
          url: axios.defaults.baseURL + "/upload",
          name: "file",
          // 我们要自己设置token 因为这个是组件不经过我们的拦截器
          headers: this.getToken(),
          uploadSuccess(res, insert) {
            insert(axios.defaults.baseURL + res.data.url);
          },
        },
      },
      checkAll: false, // 全选按钮的状态
      checkedCate: [], // 当前用户所选择的复选框选项值的集合：id集合
      cateList: [], // 后台拿到的所有栏目的数组
      isIndeterminate: false, // 不确定用户是否全部选中 只选中一部分 为true 如果全部选中或者全部不选中就是 false
    };
  },
  async mounted() {
    this.cateList = (await getCateList()).data.data;
    // 判断 如果登录 就删除前面的两条
    if (localStorage.getItem("heima_back61_token")) {
      this.cateList.splice(0, 2);
    } else {
      this.cateList.splice(0, 1);
    }
  },
  methods: {
    // 封装获取token的方法
    getToken() {
      return { Authorization: localStorage.getItem("heima_back61_token") };
    },
    // 上传视频成功的回调函数
    videoSuccess(response, file, fileList) {
      // console.log(response, file, fileList);
      this.postPublish.content =
        this.axios.defaults.baseURL + response.data.url;
    },
    // 文件上传按钮的处理函数
    async onSubmit() {
      // 判断类型是文章的时候 收集用户输入的内容
      if (this.postPublish.type == 1) {
        // this.$refs.myeditor.editor.root.innerHTML 可以获取到富文本框中的内容
        this.postPublish.content = this.$refs.myeditor.editor.root.innerHTML;
      }
      // 要改造数据 因为后台要的是一个对象数组形式的id数组
      this.postPublish.categories = this.checkedCate.map((v) => {
        return { id: v };
      });

      // console.log(this.postPublish);
      let res = await publishPost(this.postPublish);
      // console.log(res);
      if (res.data.message == "文章发布成功") {
        this.$message.success("文章发布成功");
        // 跳转到文章列表页
        this.$router.push({ name: "postList" });
      } else {
        this.$message.error("文章发布失败");
      }
    },
    // 全选按钮的处理函数
    handleCheckAllChange(val) {
      // console.log(val); // val 就是全选按钮的选中状态值
      // 判断 val 的值 如果是 true this.checkedCate数组中 就是所有栏目的id 否则就是一个空数组
      // this.checkedCate 还可以控制复选框组中的复选框的选中状态
      this.checkedCate = val
        ? this.cateList.map((v) => {
            return v.id;
          })
        : [];
      this.isIndeterminate = false;
    },
    // 复选框组的复选框按钮的处理函数
    handleCheckedCateChange(value) {
      // console.log(value);  // value:就是当前用户所选中的所有复选框所对应的id数组
      let checkedCount = value.length;
      // 判断全选按钮的状态 如果用户选中的复选框的数组的长度等于所有栏目数组的长度
      // 那么全选按钮就是true  否则就是false
      this.checkAll = checkedCount === this.cateList.length;
      // 如果用户只选择了其中某一部分 那么isIndeterminate 就是true 是一个 -
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cateList.length;
    },
    // 封面上传成功的函数
    coverSuccess(res) {
      // console.log(res);
      this.postPublish.cover.push({ id: res.data.id });
    },
    // 封面移除的处理函数
    coverRemove(file, fileList) {
      // console.log(file, fileList);
      let id = file.response.data.id;
      this.postPublish.cover = this.postPublish.cover.filter((v) => {
        return v.id !== id;
      });
    },
  },
};
</script>

<style>
</style>