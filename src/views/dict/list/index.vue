<template>
  <div class="app-container">
    <div class="el-toolbar">
      <div class="el-toolbar-body" style="justify-content: flex-start">
        <el-button type="text" @click="exportData"
          ><i class="fa fa-plus" /> 导出</el-button
        >
        <el-button type="text" @click="importData"
          ><i class="fa fa-plus" /> 导入</el-button
        >
      </div>
    </div>

    <el-table
      :data="list"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称" width="150"> </el-table-column>
      <el-table-column prop="dictCode" label="编码" width="150">
      </el-table-column>
      <el-table-column prop="value" label="值" width="150"> </el-table-column>

      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
    </el-table>
    <el-dialog title="导入" :visible.sync="dialogImportVisible" width="480px">
      <el-form label-position="right" label-width="170px">
        <el-form-item label="文件">
          <el-upload
            :multiple="false"
            :on-success="onUploadSuccess"
            :action="'http://localhost:8202/admin/cmn/dict/importData'"
            class="upload-demo"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传xls文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogImportVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import dict from "@/api/yygh/dict";
export default {
  data() {
    return {
      list: [], //数据字典列表数组
      dialogImportVisible: false,
    };
  },
  created() {
    this.getDictList(1);
  },
  methods: {
    //数据字典列表
    getDictList(id) {
      dict.findChildData(id).then((response) => {
        this.list = response.data.list;
      });
    },
    load(tree, treeNode, resolve) {
      dict.findChildData(tree.id).then((response) => {
        resolve(response.data.list);
      });
    },
    exportData() {
      window.open(`${process.env.VUE_APP_BASE_API}/admin/cmn/dict/exportData`);
    },
    importData() {
      this.dialogImportVisible = true;
    },

    onUploadSuccess(response, file) {
      this.$message.info("上传成功");
      this.dialogImportVisible = false;
      this.getDictList();
    }
  },
};
</script>