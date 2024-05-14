# 头部下载 App 区域

头部下载 App 区域，使用 flex 布局：

- 右侧下载按钮有固定宽度。
- 左侧区域使用伸缩布局。

css\home_dowload.less

```css
.download {
  display: flex;
  height: 16vw;
  box-sizing: border-box;
  border-bottom: 1px solid #e3e3e3;
  background-color: #fff;

  .left {
    flex: 1;
  }

  .right {
    width: 25.2vw;
  }
}
```

使用 border-radius 来设置 logo 的背景。

css\home_dowload.less

```css
.logo {
  width: 10.6667vw;
  height: 10.6667vw;
  border-radius: 2.1333vw;
  box-shadow: 0 0 0.9333vw 0 rgba(0, 0, 0, 0.15);
}
```
