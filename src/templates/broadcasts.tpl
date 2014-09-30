<% 
	_.each(videos, function(item){ 
		var id = item._id;
%>
	<div class="broadcast item" data-url="http://www.twitch.tv/seriousgaming/manager/<%= id %>/highlight">
		<div class="title"><%= item.title %></div>
		<div class="thumbnail image">
			<img src="<%= item.preview %>" width="320" />
		</div>
		<div class="recorded"><%= item.recorded_at %></div>
	</div>
<% 	
	}); 
%>