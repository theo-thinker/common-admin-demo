<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPaneRef" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tagRefs"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query }"
        class="tags-view-item"
        @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent="openMenu(tag, $event)"
      >
        {{ tag.meta?.title }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        >
          <el-icon>
            <Close />
          </el-icon>
        </span>
      </router-link>
    </scroll-pane>

    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick, computed, onBeforeUnmount } from 'vue'
import { type RouteRecordRaw, useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/stores/modules/app'
import { usePermissionStore } from '@/stores/modules/permission'
import ScrollPane from './scroll-pane.vue'
import { ElMessageBox, ElIcon } from 'element-plus'
import { Close } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const permissionStore = usePermissionStore()

const visible = ref(false)
const top = ref(0)
const left = ref(0)
const selectedTag = ref()
const affixTags = ref([])

const visitedViews = computed(() => appStore.visitedViews)
const routes = computed(() => permissionStore.routes)

const tagRefs = ref([])
const scrollPaneRef = ref()

const isActive = (r) => {
  return r.path === route.path
}

const isAffix = (tag) => {
  return tag?.meta?.affix === true
}

const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
  let tags: any[] = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      const tagPath = '/'.startsWith(route.path) ? route.path : `${basePath}${route.path}`
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

const initTags = () => {
  const affixTags = filterAffixTags(routes.value)
  for (const tag of affixTags) {
    // Must have tag name
    if (tag.name) {
      appStore.addVisitedView(tag)
    }
  }
}

const addTags = () => {
  const { name } = route
  if (name) {
    appStore.addView(route)
  }
  return false
}

const moveToCurrentTag = () => {
  nextTick(() => {
    for (const tag of tagRefs.value) {
      if (tag.to.path === route.path) {
        scrollPaneRef.value.moveToTarget(tag)
        // when query is different then update
        if (tag.to.fullPath !== route.fullPath) {
          appStore.updateVisitedView(route)
        }
        break
      }
    }
  })
}

const refreshSelectedTag = (view) => {
  appStore.delCachedView(view).then(() => {
    const { fullPath } = view
    nextTick(() => {
      router.replace({
        path: '/redirect' + fullPath,
      })
    })
  })
}

const closeSelectedTag = (view) => {
  appStore.delView(view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}

const closeOthersTags = () => {
  router.push(selectedTag.value)
  appStore.delOthersViews(selectedTag.value).then(() => {
    moveToCurrentTag()
  })
}

const closeAllTags = (view) => {
  appStore.delAllViews().then(({ visitedViews }) => {
    if (affixTags.value.some((tag) => tag.path === view.path)) {
      return
    }
    toLastView(visitedViews, view)
  })
}

const toLastView = (visitedViews, view) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === 'Dashboard') {
      // to reload home page
      router.replace({ path: '/redirect' + view.fullPath })
    } else {
      router.push('/')
    }
  }
}

const openMenu = (tag, e) => {
  const menuMinWidth = 105
  const offsetLeft = e.currentTarget.getBoundingClientRect().left
  const offsetWidth = e.currentTarget.offsetWidth
  const maxLeft = document.body.offsetWidth - menuMinWidth
  const left15 = e.clientX - offsetLeft + 15

  if (left15 > maxLeft) {
    left.value = maxLeft
  } else {
    left.value = left15
  }

  top.value = e.clientY
  visible.value = true
  selectedTag.value = tag
}

const closeMenu = () => {
  visible.value = false
}

watch(
  route,
  () => {
    addTags()
    moveToCurrentTag()
  },
  {
    immediate: true,
  },
)

onMounted(() => {
  initTags()
  document.addEventListener('click', closeMenu)
})

// Clean up event listener
onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenu)
})
</script>

<style scoped lang="scss">
@import '@/styles/themes/default.scss';
@import '@/styles/variables.scss';

.tags-view-container {
  height: $tags-view-height;
  width: 100%;
  background: $tags-view-background-color;
  border-bottom: 1px solid $tags-view-border-color;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      border-radius: 2px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: $primary-color;
        color: #fff;
        border-color: $primary-color;

        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
