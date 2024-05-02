# 主内容 main

为主内容封装样式 wrapper_02，在其中设置宽度，并水平居中显示。

```css
.wrapper_02 {
  width: 980px;
  margin: 0 auto;
}
```

为主内容封装央视 area，在其中设置 flex 布局，并设置精灵图。

```css
.main > .area {
  display: flex;
  justify-content: space-between;
  border: 1px #3d3d3d solid;
  border-width: 0 1px;
  background-image: url(../../image/main_bg.png);
}
```
