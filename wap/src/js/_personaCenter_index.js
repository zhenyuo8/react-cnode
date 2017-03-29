$(function(){
  var clickEvent=function(){
    $('#js_content_list li').on('click',function(){
      $(this).find('i').removeClass('red')
      console.log(this)
    })
  }
  clickEvent()
})
