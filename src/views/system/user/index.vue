<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary" @click="handleCreate">新增用户</el-button>
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
        <el-table-column prop="name" label="用户名" width="120" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="role" label="角色" width="120" />
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
    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px" @close="handleClose">
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="formData.role" placeholder="请选择角色">
            <el-option label="管理员" value="admin" />
            <el-option label="用户" value="user" />
          </el-select>
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
import { getUserList, createUser, updateUser, deleteUser } from '@/api/modules/user'

const list = ref([])
const total = ref(0)
const listLoading = ref(true)
const dialogVisible = ref(false)
const dialogTitle = ref('')
const isEdit = ref(false)

const listQuery = reactive({
  page: 1,
  limit: 20,
})

const formData = reactive({
  id: '',
  name: '',
  email: '',
  role: '',
})

const rules = {
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
}

const dataFormRef = ref()

// 获取用户列表
const getList = async () => {
  listLoading.value = true
  try {
    const res: any = await getUserList(listQuery)
    list.value = res.data.items
    total.value = res.data.total
  } finally {
    listLoading.value = false
  }
}

// 新增用户
const handleCreate = () => {
  dialogTitle.value = '新增用户'
  isEdit.value = false
  dialogVisible.value = true
  // 重置表单
  Object.assign(formData, {
    id: '',
    name: '',
    email: '',
    role: '',
  })
}

// 编辑用户
const handleUpdate = (row: any) => {
  dialogTitle.value = '编辑用户'
  isEdit.value = true
  dialogVisible.value = true
  // 填充表单数据
  Object.assign(formData, row)
}

// 删除用户
const handleDelete = async (row: any) => {
  try {
    await ElMessageBox.confirm('确定要删除该用户吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    await deleteUser(row.id)
    await ElMessageBox.alert('删除成功', '提示', {
      type: 'success',
    })
    await getList()
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
          await updateUser(formData.id, formData)
        } else {
          await createUser(formData)
        }

        dialogVisible.value = false
        await ElMessageBox.alert(isEdit.value ? '更新成功' : '创建成功', '提示', {
          type: 'success',
        })
        await getList()
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
