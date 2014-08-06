<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">

		<title>Twitch Highlighters</title>

		<link rel="stylesheet" type="text/css" href="/lib/semantic/ui/build/packaged/css/semantic.min.css">
		<link rel="stylesheet" type="text/css" href="/src/css/screen.css">
		
		<script src="/lib/jquery/jquery.min.js"></script>
		<script src="/lib/semantic/ui/build/packaged/javascript/semantic.min.js"></script>
		<script src="/src/js/jquery.webservice.js"></script>
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
			
		</div>
	</body>
</html>