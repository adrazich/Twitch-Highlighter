// main.js - javascript controls the site
(function(){
	"use strict";

	var _g = {
		directories:{
			templates: '/src/templates/'
		},
		limit:12,
		page:{
			current: 1
		},
		channel:''
	}

	function Init(){
		$('.ui.dropdown').dropdown();

		Twitch.init({clientId: ''}, function(error, status){
			// the sdk is now loaded
			if (status.authenticated){
				LoggedIn();
			} else {
				LoggedOut();
			}

			// check to see if they are params set and we need to search
			CheckForParams();
		});
	}

	function LoggedOut(){
		// !! always hide
		$('.logged.in').hide();
		$('.twitch.connect').hide();
		return;

		$('.logged.in').hide();
		$('.twitch.connect').show();
	}

	function LoggedIn(){
		// !! always hide
		$('.logged.in').hide();
		$('.twitch.connect').hide();
		return;

		// Already logged in, hide button
		$('.logged.in').show();
		$('.twitch.connect').hide();

		// Show their name and icon
		Twitch.api({method: 'channel'}, function(error, channel){
			$('.logged.in .image').attr('src', channel.logo);
			$('.logged.in .name').html(channel.display_name);

			CleanURL();
		});
	}
	
	// remove # nonsense
	function CleanURL(){
		// this gets rid of everything except #
		window.location.hash = '';
		
		// push state <3 ie </3
		if (history !== undefined && history.pushState !== undefined){
			//history.pushState('', document.title, window.location.pathname);
		}
	}

	function SearchBroadcasts(channel, page){
		// make sure page is set to a valid number
		page = _.isEmpty(page) ? 1 : page;
		page = parseInt(page);
		page = page > 0 ? page : 1;

		_g.page.current = page;
		_g.channel = channel;

		var params = {
			broadcasts: true,
			limit: _g.limit,
			offset: (page-1) * _g.limit
		};

		Twitch.api({method: 'channels/'+channel+'/videos', params: params }, function(error, data){
			RenderView('broadcasts', { videos:data.videos }).then(function(view){
				$('#videos .videos').html(view);
			});

			RenderPagination(data);
		});
	}

	function RenderPagination(data){
		var paging = {
			page:{
				prev: false,
				next: false,
				current: _g.page.current,
				first: 1,
				last: 1
			}
		};

		// determine paging data
		if (_g.limit <= 0) _g.limit = 1;
		paging.page.last = Math.ceil(data._total / _g.limit) -1;

		paging.page.prev = paging.page.current - 1 > 0 ? paging.page.current - 1 : false;
		paging.page.next = paging.page.current + 1 <= paging.page.last ? paging.page.current + 1 : false;

		var pagingData = {
			url:'/',
			params:'?channel='+_g.channel+'&page=',
			paging: paging
		};

		RenderView('pagination', pagingData).then(function(view){
			$('#videos .pagination').html(view);
		});
	}

	// Returns an array of the variables from the path
	function GetUrlVars(){
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}

	// Check to see if we need to load in broadcasts
	function CheckForParams(){
		var params = GetUrlVars();
		var page = 1;
		
		// Must have the channel name
		if (_.isEmpty(params['channel'])) return;

		// Should we look for the page?
		if (!_.isEmpty(params['page'])){
			page = params['page'];
		}

		// add the channel to the search bar
		$('#filters .search input.broadcast.search').val(params['channel']);

		// search and display
		SearchBroadcasts(params['channel'], page);
	}

	/**
	* RenderView - renders a view from a template
	* @param name - string - name of the template file (no extension)
	* @param data - json - data to pass the template
	*/
	function RenderView(name, data){
		var dfd = new $.Deferred();

		$.ajax({
			url: _g.directories.templates+name+'.tpl',
			method: 'GET',
			async: false,
			success: function(temp){
				if (temp !== undefined && temp !== '' && temp !== null){
					var template = _.template(temp);
					dfd.resolve(template(data));
				} else {
					dfd.reject('Data wasn\'t recieved');
				}
			}
		});

		return dfd.promise();
	}

	/*****************************************
	//
	//	Document Ready
	//
	*****************************************/
	$(document).ready(function(){
		Init();

		// Log the user in
		$('.twitch.connect').click(function(){
			Twitch.login({
				scope: ['user_read', 'channel_read']
			});
		});

		// Log the user out
		$('.twitch.logout').click(function(e){
			e.preventDefault();

			CleanURL();

			Twitch.logout(function(error){
				LoggedOut();
			});
		});

		// Search for a broadcast
		$('.button.broadcast.search').click(function(){
			var channel = $('input.broadcast.search').val();
			SearchBroadcasts(channel);
		});

		$('input.broadcast.search').keydown(function(e){
			// enter
			if (e.which == 13 || e.keyCode == 13){
				var channel = $('input.broadcast.search').val();
				//SearchBroadcasts(channel);
				window.location.href = '/?channel='+channel;
			}
		});

		// Open the broadcast
		$(document).on('click', '#videos .videos .broadcast', function(){
			var url = $(this).attr('data-url');
			window.open(url, '_blank');
		});
	});

})();