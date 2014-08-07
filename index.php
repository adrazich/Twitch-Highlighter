<!DOCTYPE html>
<html>
	<head>
		<title>Twitch Highlighter : An easier way to highlight and browse past broadcasts on Twitch!</title>

		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<meta name="description" content="An easier way to highlight past broadcasts!" />
		<meta name="keywords" content="twitch, highlights, highlighter, broadcasts, broadcast, past broadcasts, gaming, game, video games" />
		<meta http-equiv="content-language" content="en-us" />

		<meta property="og:title" content="Twitch Highlighter : An easier way to highlight and browse past broadcasts on Twitch!"/>
		<meta property="og:type" content="website"/>
		<meta property="og:url" content="http://www.twitchhighlighter.com"/>
		<meta property="og:image" content="http://www.twitchhighlighter.com/src/css/images/twitch-highlighter.jpg"/>
		<meta property="og:site_name" content="Twitch Highlighter"/>
		<meta property="og:description" content="An easier way to highlight and browse past broadcasts on Twitch!"/>

		<link rel="stylesheet" type="text/css" href="/lib/semantic/ui/build/packaged/css/semantic.min.css">
		<link rel="stylesheet" type="text/css" href="/src/css/screen.css">
		
		<script src="/lib/jquery/jquery.min.js"></script>
		<script src="/lib/underscore/underscore-min.js"></script>
		<script src="/lib/semantic/ui/build/packaged/javascript/semantic.min.js"></script>
		<script src="https://ttv-api.s3.amazonaws.com/twitch.min.js"></script>
		<script src="/src/js/main.js"></script>
	</head>

	<body>
		<div id="menu" class="ui inverted tiered menu">
			<div class="main menu">
				<a class="item logo">Twitch Highlighter</a>

				<div class="item right">
					<img src="http://ttv-api.s3.amazonaws.com/assets/connect_dark.png" class="twitch connect" href="#" />

					<div class="logged in ui dropdown">
						<div class="text">
							<img class="circular ui image" src="" width="30" height="30" />
							<span class="name"></span>
						</div>
						<i class="dropdown icon"></i>
						
						<div class="menu">
							<div class="item twitch logout">Logout</div>
						</div>
					</div>

				</div>
			</div>
		</div>

		<div id="filters">
			<div class="search">
				<div class="ui fluid action input">
					<input class="broadcast search" type="text" placeholder="Channel name..." spellcheck="false">
					<div class="ui button broadcast search">Search</div>
				</div>
			</div>
		</div>

		<div id="videos">
			<div class="pagination"></div>
			<div class="videos"></div>
		</div>

		<div id="donate">
			<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
				<input type="hidden" name="cmd" value="_s-xclick">
				<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
			">
				<input type="image" src="/src/css/images/donate-beer.png" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
				<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
			</form>
		</div>

		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			ga('create', 'UA-53574133-1', 'auto');
			ga('send', 'pageview');
		</script>

	</body>
</html>