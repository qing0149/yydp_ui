<template>
  <div class="app-container">
    医院设置列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.hosname" placeholder="医院名称" />
      </el-form-item>

      <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="医院编号" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 工具条 -->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()"
        >批量删除</el-button
      >
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      @selection-change="handleSelectionChange"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="hosname" label="医院名称" width="180" />

      <el-table-column prop="hoscode" label="医院编号" width="160" />

      <el-table-column prop="apiUrl" label="地址" width="200" />

      <el-table-column prop="contactsName" label="联系人" />

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? "可用" : "不可用" }}
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/yygh/hospset/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >修改</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />
  </div>
</template>
<script>
import hospsetApi from "@/api/yygh/hospset";
export default {
  data() {
    return {
      listLoading: true, // 是否显示loading信息
      list: null, // 数据列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 4, // 每页记录数
      searchObj: {}, // 查询条件
      ids: [],
    };
  },

  methods: {
    removeRows() {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return hospsetApi.removeRows(this.ids);
        })
        .then(() => {
          this.fetchData();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch((response) => {
          // 失败
          if (response === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          }
        });
    },
    fetchData(page = 1) {
      // 调用api层获取数据库中的数据
      //   debugger;
      console.log("加载列表");
      this.page = page;
      this.listLoading = true;
      hospsetApi
        .pageQuery(this.page, this.limit, this.searchObj)
        .then((response) => {
          // debugger 设置断点调试
          console.log(response);
          if (response.success === true) {
            this.list = response.data.rows;
            this.total = response.data.total;
          }
          this.listLoading = false;
        });
    },
    resetData() {
      this.searchObj = {};
      this.fetchData();
    },
    removeDataById(id) {
      // debugger
      // console.log(memberId)
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return hospsetApi.removeById(id);
        })
        .then(() => {
          this.fetchData();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch((response) => {
          // 失败
          if (response === "cancel") {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          } else {
            this.$message({
              type: "error",
              message: "删除失败",
            });
          }
        });
    },
    handleSelectionChange(selection) {
      for (let i = 0; i < selection.length; i++) {
        this.ids.push(selection[i].id);
      }
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style>
</style>
