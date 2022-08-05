$(function () {

	var $searchMenuUi = $('.header .search-menu > ul')
	var $searchMenuArrow = $('.header .arrow')
	var $searchHouseInput = $('.header .house-search')
	var $searchList = $('.header .search-list')
	var $searchTips = $('.header .search-tips')
	var homePageInfoData = {} // 首页的所有数据
	var cacheSearchListData = [] // 将热门推荐的数据缓存到这个数组中
	var currentSearchBarSelector = 'site'
	var currentSearchPlaceHolder = '请输入区域，商圈或小区名开始'

	initPage()
	function initPage() {
		ztReq.get(ZTAPI.HOME_PAGE_INFO).then(res => {
			console.log('---home page info res---', res)
			homePageInfoData = res
			renderHeaderAddress(res) // 渲染头部地址
			renderSearchBar(res) // 渲染搜索栏
		})
	}
	function renderHeaderAddress(res) {
		// 更新左上角的地址
		var addr = res.curLocation || {}
		$('.header .address').text(addr.city)
	}
	function renderSearchBar(res) {
		// 更新搜索框上方标签
		var searchBarData = res.searchMenus || []
		var htmlString = ''
		searchBarData.forEach((item, index) => {
			var active = index === 0 ? 'active' : ''
			htmlString += `
			<li class="item ${active}" data-key="${item.key}">
				<span>${item.title}</span>
			</li>`
			$searchMenuUi.empty().append(htmlString)
		});
	}

	// 监听搜索房子输入框的 focus 事件
	$searchHouseInput.on('focus', function () {
		var value = $(this).val()
		if (value.trim()) { // 如果 input 模拟搜索
			$(this).trigger('input') // 通过代码模拟用户的输入事件
			return
		}
		if (cacheSearchListData.length) { // 如果没有就是热门搜索
			renderSearchList(cacheSearchListData)
			return
		}
		// 1.发起网络请求，获取热门推荐的数据
		ztReq.get(ZTAPI.HOT_RECOMMEND).then(res => {
			console.log('---hot recommend res---', res)
			var searchListData = res.rent_house_list .list|| []
			if (!searchListData) return
			cacheSearchListData = searchListData.map(item => ({title: item.app_house_title})) // 将复杂数据映射为简单数组
			renderSearchList(cacheSearchListData)
		})
	})
	// 监听搜索房子输入框的 blur 事件
	$searchHouseInput.on('blur', function () {
		$searchTips.css('display', 'none')
	})
	function renderSearchList(searchListData = []) {
		var htmlString = `
		<li>
			<span>热门搜索</sapn>
		</li>`
		searchListData.forEach(item => {
			htmlString += `
			<li>
				<span>${item.title}</span>
			</li>`
		})
		$searchList.empty().append(htmlString)
		$searchTips.css('display', 'block')
	}

	// 搜索框输入事件
	$searchHouseInput.on('input', debounce(function () {
		var value = $(this).val()
		var curLocation = homePageInfoData.curLocation  // {city: '广州', cityCode: '440100'}
		ztReq.get(ZTAPI.HOME_SEARCH, {
			cityId: curLocation.cityCode,
			cityName: curLocation.city,
			channel: currentSearchBarSelector,
			keyword: value,
			query: value
		}).then(res => {
			console.log('---home search res---', res)
			var searchData = res.data.result || []
			var searchListData = searchData.map(item => ({title: item.h1sTex || item.text})) // 将复杂数据映射为简单数组
			renderSearchList(searchListData)
		})
	}))

	// 搜索框上方标签点击事件
	$searchMenuUi.on('click', 'li', function () {
		// 1.修改 li 的高亮
		var $li = $(this)
		$li.addClass('active').siblings().removeClass('active')
		// 2.修改箭头
		var liwidth = $li.width()
		var position = $li.position()
		var arrowLeft = position.left + (liwidth / 2)
		$searchMenuArrow.css('left', arrowLeft)
		// 3.修改 placeholder
		$searchHouseInput.prop({
			placeholder: currentSearchPlaceHolder + $li.text().trim()
		})
		// 4.拿到 li 中绑定的 key
		currentSearchBarSelector = $li.data('key')
	})
})