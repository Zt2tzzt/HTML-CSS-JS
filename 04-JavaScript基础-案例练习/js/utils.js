/**
 * @description: 此函数用于，为 flex 布局的最后一行添加空元素，是的元素对齐。
 * @Author: ZeT1an
 * @param {*} parentEl flex 布局的元素
 * @param {*} colum 要添加空元素的列数。
 * @return {*}
 */
function addProductsEmptyItem(parentEl, colum) {
	for (let i = 0; i < colum; i++) {
		var itemEl = document.createElement('li')
		itemEl.classList.add('item', 'empty')
		// itemEl.classList.add('item')
		// itemEl.classList.add('empty')
		parentEl.append(itemEl)
	}
}