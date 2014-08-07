<% _.each(videos, function(item){ %>
	<div class="broadcast item" data-url="<%= item.url %>">
		<div class="title"><%= item.title %></div>
		<div class="thumbnail image">
			<img src="<%= item.preview %>" width="320" />
		</div>
		<div class="recorded"><%= item.recorded_at %></div>
	</div>
<% 	}); %>