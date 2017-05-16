var errorMessage =require('lm-sr-error-message')
module.exports={
	success:function(success,fail,makeData){
		console.log('success handler maked')
		return function(response){
			console.log(response)
			console.log('request network success')
			var data=typeof response.data=='object' ? response.data : JSON.parse(response.data)
			if(data.resultCode==100){
				console.log('success')
				success && success(makeData ? makeData(data) : data)
			}else if(data.resultCode==602 || data.resultCode==603){
				console.log('success')
				success && success(makeData ? makeData({}) : {})
			}else{
				console.log('fail')
				fail && fail(data.errorMessage || errorMessage[data.resultCode] || '未定义错误消息'+data.resultCode,data.resultCode)
			}
		}
	},
	error:function(error){
		return function(){
			console.log('net error')
			error && error('网络错误')			
		}
	}
}