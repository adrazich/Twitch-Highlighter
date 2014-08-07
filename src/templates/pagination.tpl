<div class="ui pagination menu">
	<% 
		var output = '';
		if (paging.page.prev === false) 
			output += '<a class="icon item disabled">';
		else
			output += '<a class="icon item" href="'+url+params+paging.page.prev+'">';

		output += '<i class="left arrow icon"></i></a>';

		if (paging.page.first !== paging.page.current)
			output += '<a class="item" href="'+url+params+paging.page.first+'">'+paging.page.first+'</a>';

		var left = paging.page.current-1;
		if (left > paging.page.first)
			output += '<a class="item" href="'+url+params+left+'">'+left+'</a>';

		output += '<a class="active item">'+paging.page.current+'</a>';

		var right = paging.page.current+1;
		if (right < paging.page.last)
			output += '<a class="item" href="'+url+params+right+'">'+right+'</a>';

		if (paging.page.last !== paging.page.current)
			output += '<a class="item" href="'+url+params+paging.page.last+'">'+paging.page.last+'</a>';

		if (paging.page.next === false)
			output += '<a class="disabled item icon">';
		else
			output += '<a class="icon item" href="'+url+params+paging.page.next+'">';

		output += '<i class="right arrow icon"></i></a>';
	%>
	<%= output %>
</div>
<div class="clear"></div>