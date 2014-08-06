// main.js - javascript controls the site
(function(){
	"use strict";

	function Init(){
		$('.ui.dropdown').dropdown();

		Twitch.init({clientId: ''}, function(error, status){
			// the sdk is now loaded
			if (status.authenticated){
				LoggedIn();
			} else {
				LoggedOut();
			}
		});
	}

	function LoggedOut(){
		$('.logged.in').hide();
		$('.twitch.connect').show();
	}

	function LoggedIn(){
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
			history.pushState('', document.title, window.location.pathname);
		}
	}

	function SearchBroadcasts(channel){
		var params = {
			broadcasts: true,
			limit: 10
		};

		Twitch.api({method: 'channels/'+channel+'/videos', params: params }, function(error, list){
			console.log(list);
		});
	}

	$(document).ready(function(){
		Init();

		// Log the user in
		$('.twitch.connect').click(function(){
			console.log('connecting user');

			Twitch.login({
				scope: ['user_read', 'channel_read']
			});
		});

		// Log the user out
		$('.twitch.logout').click(function(e){
			e.preventDefault();

			CleanURL();

			Twitch.logout(function(error){
				console.log('logging out');
				console.log(error);
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
				SearchBroadcasts(channel);
			}
		});
	});

})();