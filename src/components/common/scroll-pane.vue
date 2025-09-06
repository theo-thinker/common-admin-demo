<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElScrollbar } from 'element-plus'

const tagAndTagSpacing = ref(4) // tagAndTagSpacing
const scrollContainer = ref()
const scrollWrapper = computed(() => {
  return scrollContainer.value?.wrapRef
})

const handleScroll = (e) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  scrollWrapper.value.scrollLeft += eventDelta / 4
}

const moveToTarget = (currentTag: any) => {
  const $container = scrollContainer.value.$el
  const $containerWidth = $container.offsetWidth
  const $scrollWrapper = scrollWrapper.value
  const tagList = document.querySelectorAll('.tags-view-item')

  let firstTag = null
  let lastTag = null

  // find first tag and last tag
  if (tagList.length > 0) {
    firstTag = tagList[0]
    lastTag = tagList[tagList.length - 1]
  }

  if (firstTag === currentTag) {
    $scrollWrapper.scrollLeft = 0
  } else if (lastTag === currentTag) {
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
  } else {
    // find preTag and nextTag
    const currentIndex = Array.from(tagList).indexOf(currentTag)
    const prevTag = tagList[currentIndex - 1]
    const nextTag = tagList[currentIndex + 1]

    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft = nextTag.offsetLeft + nextTag.offsetWidth + tagAndTagSpacing.value

    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.offsetLeft - tagAndTagSpacing.value

    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
      $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
    } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
      $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
    }
  }
}

defineExpose({
  moveToTarget
})
</script>

<style scoped lang="scss">
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  
  :deep(.el-scrollbar__bar) {
    bottom: 0;
  }
  
  :deep(.el-scrollbar__wrap) {
    height: 49px;
  }
}
</style>