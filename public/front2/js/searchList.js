$(function() {

  // 获取搜索关键字
  var key = getSearch('key');

  // 1. 将搜索关键字设置给 input 框
  $('.search_input').val(key);

  // 2. 一进入页面, 根据搜索关键字发送 ajax 请求
  render();

  // 3. 点击按钮, 可以搜索
  $('.search_btn').click(function() {
    // 根据搜索关键字, 发送ajax请求, 完成渲染
    render();
  });

  // 4. 先实现点击切换高亮效果
  //    (1) 如果本身没有 current 类, 添加上 current 类, 排他
  //    (2) 如果本身有 current 类, 切换箭头的方向, 切换箭头类名 fa-angle-up  fa-angle-down
  $('.lt_sort a[data-type]').click(function() {

    if ($(this).hasClass('current')) {
      // 有类, 切换箭头方向
      $(this).find('i').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
    }
    else {
      // 没有
      $(this).addClass('current').siblings().removeClass('current');
    }

    // 修改了排序规则后, 重新渲染
    render();

  })


  // 发送ajax请求, 完成页面渲染, 如果有排序的话, 需要添加排序的参数 
  // 如何判断是否需要排序?  就看有没有高亮的 a
  function render() {
    // 在渲染前, 应该展示的是 loading 的盒子
    $('.lt_product').html('<div class="loading"></div>');

    var paramsObj = {};

    // 三个必传的参数
    paramsObj.proName = $('.search_input').val();
    paramsObj.page = 1;
    paramsObj.pageSize = 100;

    // 可传的参数, 根据是否需要排序, 决定是否传参
    // 根据是否有高亮的 a, 决定是否需要传参, 进行排序
    var $current = $('.lt_sort a.current');

    if ($current.length === 1) {
      // 有高亮的 a, 需要排序
      // 获取给后台传递的参数名, 根据自定义属性存储的 data-type 值
      var sortName = $current.data('type');   // price

      // 获取给后台传递的参数值, 根据箭头的方向决定  1升序，2降序
      var sortValue = $current.find('i').hasClass('fa-angle-down') ? 2 : 1;

      // 将参数拼接到对象中
      paramsObj[sortName] = sortValue;
    }

    console.log(paramsObj);

    setTimeout(function() {
      $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: paramsObj,
        dataType: 'json',
        success: function( info ) {
          console.log( info );
          var htmlStr = template('searchTpl', info);
          $('.lt_product').html( htmlStr );
        }
      });
    }, 1000);
  }

})