# 主内容 KPL 赛程

KPL 赛程表，使用 table 进行布局。

```html
<!-- KPL schedule table -->
<table class="schedule-time">
  <thead>
    <tr>
      <td>时间</td>
      <td>战队</td>
      <td></td>
      <td>战队</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>5-8 18:00</td>
      <td>
        <div class="team">
          <img src="./img/team_01.png" alt="" />
        </div>
        广州TTG
      </td>
      <td>VS</td>
      <td>
        <div class="team">
          <img src="./img/team_02.png" alt="" />
        </div>
        北京WB
      </td>
    </tr>
    <tr>
      <td>5-8 18:00</td>
      <td>
        <div class="team">
          <img src="./img/team_01.png" alt="" />
        </div>
        广州TTG
      </td>
      <td>VS</td>
      <td>
        <div class="team">
          <img src="./img/team_02.png" alt="" />
        </div>
        北京WB
      </td>
    </tr>
  </tbody>
</table>
```

使用结构伪类，设定表格中，第二、四列和第三列特定的 CSS 属性。

```css
.match-center .right-content .schedule-time td:nth-child(2),
.match-center .right-content .schedule-time td:nth-child(4) {
  width: 83px;
}

.match-center .right-content .schedule-time td:nth-child(3) {
  font-size: 14px;
  color: #f3c258;
}
```

