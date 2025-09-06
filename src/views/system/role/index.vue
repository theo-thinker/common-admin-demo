<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>角色管理</span>
          <el-button type="primary" @click="handleCreate">新增角色</el-button>
        </div>
      </template>
      
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="角色名称" width="150" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button size="small" @click="handleUpdate(row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="listQuery.page"
        v-model:limit="listQuery.limit"
        @pagination="getList"
      />
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
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="formData.description" type="textarea" />
        </el-form-item>
        <el-form-item label="权限" prop="permissions">
          <el-tree
            ref="treeRef"
            :data="permissions"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            :default-checked-keys="formData.permissions"
          />
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
import Pagination from '@/components/common/pagination.vue'
import { getRoleList, createRole, updateRole, deleteRole } from '@/api/modules/system'

const list = ref([])
const total = ref(0)
const listLoading = ref(true)
const dialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)
const treeRef = ref()

const listQuery = reactive({
  page: 1,
  limit: 20
})

const formData = reactive({
  id: '',
  name: '',
  description: '',
  permissions: []
})

const rules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  description: [{ required: true, message: '请输入描述', trigger: 'blur' }]
}

const dataFormRef = ref()

// 权限树配置
const defaultProps = {
  children: 'children',
  label: 'label'
}

// 模拟权限数据
const permissions = ref([
  {
    id: 1,
    label: '系统管理',
    children: [
      {
        id: 2,
        label: '用户管理',
        children: [
          { id: 3, label: '查看用户' },
          { id: 4, label: '新增用户' },
          { id: 5, label: '编辑用户' },
          { id: 6, label: '删除用户' }
        ]
      },
      {
        id: 7,
        label: '角色管理',
        children: [
          { id: 8, label: '查看角色' },
          { id: 9, label: '新增角色' },
          { id: 10, label: '编辑角色' },
          { id: 11, label: '删除角色' }
        ]
      }
    ]
  }
])

// 获取角色列表
const getList = async () => {
  listLoading.value = true
  try {
    const res: any = await getRoleList(listQuery)
    list.value = res.data.items
    total.value = res.data.total
  } finally {
    listLoading.value = false
  }
}

// 新增角色
const handleCreate = () => {
  dialogTitle.value = '新增角色'
  isEdit.value = false
  dialogVisible.value = true
  // 重置表单
  Object.assign(formData, {
    id: '',
    name: '',
    description: '',
    permissions: []
  })
}

// 编辑角色
const handleUpdate = (row: any) => {
  dialogTitle.value = '编辑角色'
  isEdit.value = true
  dialogVisible.value = true
  // 填充表单数据
  Object.assign(formData, row)
}

// 删除角色
const handleDelete = async (row: any) => {
  try {
    await ElMessageBox.confirm('确定要删除该角色吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    await deleteRole(row.id)
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
        // 获取选中的权限
        formData.permissions = treeRef.value.getCheckedKeys()
        
        if (isEdit.value) {
          await updateRole(formData.id, formData)
        } else {
          await createRole(formData)
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