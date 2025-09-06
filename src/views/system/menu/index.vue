<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>菜单管理</span>
          <el-button type="primary" @click="handleCreate">新增菜单</el-button>
        </div>
      </template>
      
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        highlight-current-row
        style="width: 100%"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="菜单名称" width="150" />
        <el-table-column prop="path" label="路径" width="150" />
        <el-table-column prop="component" label="组件路径" />
        <el-table-column prop="icon" label="图标" width="80">
          <template #default="{ row }">
            <el-icon v-if="row.icon">
              <component :is="row.icon" />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button size="small" @click="handleUpdate(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    
    <!-- 对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="500px"
      @close="handleClose"
    >
      <el-form
        ref="dataFormRef"
        :model="formData"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="上级菜单" prop="parentId">
          <el-tree-select
            v-model="formData.parentId"
            :data="menuOptions"
            :props="defaultProps"
            node-key="id"
            placeholder="请选择上级菜单"
            check-strictly
            filterable
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="formData.path" />
        </el-form-item>
        <el-form-item label="组件路径" prop="component">
          <el-input v-model="formData.component" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="formData.icon" placeholder="请输入Element Plus图标名称" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="formData.sort" :min="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import { getMenuList, createMenu, updateMenu, deleteMenu } from '@/api/modules/system'

const list = ref([])
const listLoading = ref(true)
const dialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)

const formData = reactive({
  id: '',
  parentId: '',
  name: '',
  path: '',
  component: '',
  icon: '',
  sort: 0
})

const rules = {
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  path: [{ required: true, message: '请输入路径', trigger: 'blur' }]
}

const dataFormRef = ref()

// 菜单树配置
const defaultProps = {
  children: 'children',
  label: 'name'
}

// 模拟菜单选项数据
const menuOptions = ref([
  {
    id: 0,
    name: '顶级菜单',
    children: []
  }
])

// 获取菜单列表
const getList = async () => {
  listLoading.value = true
  try {
    const res: any = await getMenuList()
    list.value = res.data
    // 更新菜单选项数据
    menuOptions.value[0].children = res.data
  } finally {
    listLoading.value = false
  }
}

// 新增菜单
const handleCreate = () => {
  dialogTitle.value = '新增菜单'
  isEdit.value = false
  dialogVisible.value = true
  // 重置表单
  Object.assign(formData, {
    id: '',
    parentId: '',
    name: '',
    path: '',
    component: '',
    icon: '',
    sort: 0
  })
}

// 编辑菜单
const handleUpdate = (row: any) => {
  dialogTitle.value = '编辑菜单'
  isEdit.value = true
  dialogVisible.value = true
  // 填充表单数据
  Object.assign(formData, row)
}

// 删除菜单
const handleDelete = async (row: any) => {
  try {
    await ElMessageBox.confirm('确定要删除该菜单吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    await deleteMenu(row.id)
    ElMessageBox.alert('删除成功', '提示', {
      type: 'success'
    })
    getList()
  } catch (error) {
    // 取消删除或删除失败
  }
}

// 提交表单
const submitForm = () => {
  dataFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      try {
        if (isEdit.value) {
          await updateMenu(formData.id, formData)
        } else {
          await createMenu(formData)
        }
        
        dialogVisible.value = false
        ElMessageBox.alert(isEdit.value ? '更新成功' : '创建成功', '提示', {
          type: 'success'
        })
        getList()
      } catch (error) {
        console.error(error)
      }
    }
  })
}

// 关闭对话框
const handleClose = () => {
  dataFormRef.value.resetFields()
}

onMounted(() => {
  getList()
})
</script>

<style scoped lang="scss">
.app-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>