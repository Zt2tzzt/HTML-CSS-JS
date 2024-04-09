// 1.获取 html 的元素
const htmlEl = document.documentElement

function setRemUnit() {
  // 2.获取 html 的宽度（视口的宽度）
  const htmlWidth = htmlEl.clientWidth

  // 3.根据宽度计算一个 html 的 font-size 的大小
  const htmlFontSize = htmlWidth / 10

  // 4.将 font-size 设置到 html 上
  htmlEl.style.fontSize = htmlFontSize + 'px'
}

// 保证第一次执行时, 可以设置一次 font-size
setRemUnit()

// 当屏幕尺寸发生变化时, 实时来修改 html 的font-size
window.addEventListener('resize', setRemUnit)
