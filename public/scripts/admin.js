$('.del').click(function (e) {
  let id = $(e.target).data('id')
  let tr = $('item-id-' + id)
  $.ajax({
    type: 'DELETE',
    url: '/admin/delet1e?id=' + id,
    success: function (res) {
      console.log(res)
      if (res.success) {
        if (tr.length > 0) {
          tr.remove()
        }
        alert('删除成功~')
      } else {
        alert('删除失败！')
      }
    },
    error: function (e) {
      console.error(e)
      alert('网络出错！')
    }
  })
})