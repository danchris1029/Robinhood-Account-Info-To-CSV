document.addEventListener('DOMContentLoaded', function() {
  var checkPageButton = document.getElementById('checkPage');
  var total_return = [];
  var names = [];
  var cb = [];
  checkPageButton.addEventListener('click', function() {
   
    chrome.tabs.executeScript(null, {
		code: "var stocks_html = []; var total_return = []; var equity_array = []; var price_array = [];"
			  +"var names = [\"ATVI\", \"IQ\", \"NMIH\", \"HPQ\", \"BAC\", \"SNAP\", \"HEXO\", \"F\", \"LB\", \"NGL\", \"GE\", \"INTC\", \"TWTR\", \"DISH\", \"AMD\", \"GILD\"];" // Get names of stocks
			  +"for(i = 0; i < names.length; i++){"
			  +"	names[i] = '/stocks/' + names[i];"
			  +"	stocks_html.push(document.querySelector('a[href=\"'+names[i]+'\"]'));"
			  +"}"
			 
			  // Push total_return and html
			 +"for(i = 0; i < stocks_html.length; i++){"
			  +"	var ue_stock = stocks_html[i].querySelector('span[class=\"Ue-PUFBPXUbpP5zhTrFKT\"]');"
			  +"	total_return.push(((ue_stock.getElementsByTagName('span')[0].getElementsByTagName('span')[0].innerHTML).replace(',', '').replace('\\$', '')));" // remove ',' and '$' from digits
			  +" 	if(ue_stock.getElementsByTagName('svg')[0].classList.contains('_2mbK0Mw-5HM4q7eeuDqOau')){"
			  +"    		total_return[i] = total_return[i]*(-1);"
			  +"	}"
			  +"	console.log(i+1 + '. ' + names[i]+': ' + total_return[i]);"
			  +"}"
			  +"console.log(names.length);"
			  
			  // Push equity and price
			  +"for(i = 0; i < stocks_html.length; i++){"
			  +"	equity_array.push((stocks_html[i].querySelector('span[class=\"atrP1y1y_C9ULHV4BSwFj\"]').innerHTML).replace(',', '').replace('\\$', ''));"
			  +"	price_array.push((stocks_html[i].querySelector('span[class=\"_1aY3uEJAcFViGgVc3SRz4d\"]').innerHTML).replace(',', '').replace('\\$', ''));"
			  +"}"
			  
			  +"var stock_string = ''; "
		
			  +"for(i = 0; i < total_return.length-1 ;i++){ stock_string += total_return[i]+','; }"// write stock_return to csv
			  +"stock_string += total_return[i]; stock_string += '\\n';"
			  
			  +"for(i = 0; i < names.length-1 ;i++){ stock_string += names[i]+','; }"// write names to csv
			  +"stock_string += names[i]; stock_string += '\\n';"
			  
			  +"for(i = 0; i < equity_array.length-1 ;i++){ stock_string += equity_array[i]+','; }"// write equity to csv
			  +"stock_string += equity_array[i]; stock_string += '\\n';"
			  
			  +"stock_string += document.querySelectorAll('span[class=\"css-1vdcxym\"]')[1].innerHTML.replace(',', '').replace('\\$', '');" // write total_cash to csv
			  +"for(i = 0; i < equity_array.length-1 ;i++){ stock_string += '0'+','; }"// pad total_cash line with stock_string.length - 1
			  +"stock_string += '0'; stock_string += '\\n';"
			  
			  +"for(i = 0; i < equity_array.length-1 ;i++){ stock_string += price_array[i]+','; }"// write stock price to csv
			  +"stock_string += price_array[i]; stock_string += '\\n';"
			  
			  // Create download
			  +"   function saveText(filename, text){ "
			  +"		var tempElem = document.createElement('a');"
			  +"		tempElem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));"
			  +"		tempElem.setAttribute('download', filename);"
			  +"		tempElem.click();"
			  +"	}"
			  +" saveText('stocks.csv', stock_string);"
			  +"var callback = [total_return, names];"
			  +"callback;"
			  
	}, 
	function(callback){
		total_return = callback[0][0];					// For some reason a multi-dimensional array is always returned with call back
		names = callback[0][1];
		console.log(total_return);
		console.log(names);
	});
  });
}, false);
