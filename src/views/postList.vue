<template>
  <div class="postList">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        ><a href="javascript:;">文章管理</a></el-breadcrumb-item
      >
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card" style="margin-top: 20px">
      <!-- 表格 -->
      <el-table :data="postList" style="width: 100%" border>
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="title" label="标题" width="580">
        </el-table-column>
        <el-table-column label="类型" width="150">
          <template slot-scope="scope"
            >{{ scope.row.type == 1 ? "文章" : "视频" }}
          </template>
        </el-table-column>
        <el-table-column prop="user.nickname" label="作者" width="280">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[4, 6, 8, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="25"
        style="margin-top: 20px"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getPostList } from "@/apis/post.js";
export default {
  data() {
    return {
      postList: [],
      pageIndex: 1,
      pageSize: 4,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let res = await getPostList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      // console.log(res);
      this.postList = res.data.data;
    },
    // 表格 编辑的函数
    handleEdit(data) {
      console.log(data);
    },
    // 表格 删除数据的函数
    handleDelete(data) {
      console.log(data);
    },
    // 切换数量下拉列表的处理函数
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.init();
    },
    // 单击页码的处理函数
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.init();
    },
  },
};
</script>

<style>
</style>