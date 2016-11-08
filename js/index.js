var favorites = ["freecodecamp", "Arquel", "Leh_TV", "izakooo", "fsfsfsdasfgad"];

$(document).ready(function() {
	showFeatured();
});

$(".nav-li").click(function() {
	$(".nav-li").removeClass("active-li");
	$(this).addClass("active-li");
	switch ($(this).attr('id')) {
		case "featured":
			showFeatured();
			break;
		case "favorite":
			showFavorite();
	}

});

$(".filter-li").click(function() {
	$(".filter-li").removeClass("active-li");
	$(this).addClass("active-li");
	switch ($(this).attr('id')) {
		case "all":
			showFavorite();
			break;
		case "online":
			showFavoriteOnline();
			break;
		case "offline":
			showFavoriteOffline();
	}

});

function showFeatured() {
	$('.filter-div').hide();
	$('.streams').empty();
	//Creates three rows with three columns
	for (var i = 0; i < 3; i++) {
		generateRowOfThree();
	}
	var apiURL = "https://api.twitch.tv/kraken/streams/featured?client_id=hf76dbhi0eqby21ip2gca00ccmet10h";
	$.getJSON(apiURL, function(featData) {

		$(".col-sm-4").each(function(i) {
			var streamThumbURL = featData.featured[i].stream.preview.large;
			var streamURL = featData.featured[i].stream.channel.url;
			var streamerName = featData.featured[i].stream.channel.display_name;
			var streamStatus = featData.featured[i].stream.channel.status;
			var streamViewers = featData.featured[i].stream.viewers;
			$(this).append(getImgHtml(streamThumbURL, streamURL));
			$(this).append(getStreamerNameHtml(streamerName, streamURL));
			$(this).append(getStreamStatusHtml(streamStatus));
			$(this).append(getStreamViewersHtml(streamViewers));
		});
	});
}

function showFavorite() {
	$('.filter-div').show();
	$('.streams').empty();
	for (var i = 0; i < favorites.length; i++) {
		if (i % 3 === 0)
			generateRowOfThree();
	}

	$(".col-sm-4").each(function(i) {
		var apiURL = "https://api.twitch.tv/kraken/streams/" + favorites[i] + "?client_id=hf76dbhi0eqby21ip2gca00ccmet10h";
		var element = $(this);
		var streamerName = favorites[i];
		var streamThumbURL, streamURL, streamStatus, streamViewers;
		$.getJSON(apiURL, function(data) {
				if (i < favorites.length) {
					if (data.stream !== null) {
						streamThumbURL = data.stream.preview.large;
						streamURL = data.stream.channel.url;
						streamStatus = data.stream.channel.status;
						streamViewers = data.stream.viewers;
						element.append(getImgHtml(streamThumbURL, streamURL));
						element.append(getStreamerNameHtml(streamerName, streamURL));
						element.append(getStreamStatusHtml(streamStatus));
						element.append(getStreamViewersHtml(streamViewers));
					} else {
						streamThumbURL = "https://s11.postimg.org/lvjnq8kqb/offline_thumb.jpg";
						streamURL = "https://www.twitch.tv/" + streamerName;
						streamStatus = "Channel offline";
						element.append(getImgHtml(streamThumbURL, streamURL));
						element.append(getStreamerNameHtml(streamerName, streamURL));
						element.append(getStreamStatusHtml(streamStatus));
					}
				}
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				streamThumbURL = "https://s11.postimg.org/lvjnq8kqb/offline_thumb.jpg";
				streamURL = "";
				streamStatus = "Channel does not exists";
				element.append(getImgHtml(streamThumbURL, streamURL));
				element.append(getStreamerNameHtml(streamerName, streamURL));
				element.append(getStreamStatusHtml(streamStatus));
			});
	});
}

function showFavoriteOnline() {
	$('.filter-div').show();
	$('.streams').empty();
	for (var i = 0; i < favorites.length; i++) {
		if (i % 3 === 0)
			generateRowOfThree();
	}

	$(".col-sm-4").each(function(i) {
		var apiURL = "https://api.twitch.tv/kraken/streams/" + favorites[i] + "?client_id=hf76dbhi0eqby21ip2gca00ccmet10h";
		var element = $(this);
		var streamerName = favorites[i];
		var streamThumbURL, streamURL, streamStatus, streamViewers;
		$.getJSON(apiURL, function(data) {
			if (i < favorites.length) {
				if (data.stream !== null) {
					streamThumbURL = data.stream.preview.large;
					streamURL = data.stream.channel.url;
					streamStatus = data.stream.channel.status;
					streamViewers = data.stream.viewers;
					element.append(getImgHtml(streamThumbURL, streamURL));
					element.append(getStreamerNameHtml(streamerName, streamURL));
					element.append(getStreamStatusHtml(streamStatus));
					element.append(getStreamViewersHtml(streamViewers));
				}
			}
		});
	});
}

function showFavoriteOffline() {
	$('.filter-div').show();
	$('.streams').empty();
	for (var i = 0; i < favorites.length; i++) {
		if (i % 3 === 0)
			generateRowOfThree();
	}

	$(".col-sm-4").each(function(i) {
		var apiURL = "https://api.twitch.tv/kraken/streams/" + favorites[i] + "?client_id=hf76dbhi0eqby21ip2gca00ccmet10h";
		var element = $(this);
		var streamerName = favorites[i];
		var streamThumbURL, streamURL, streamStatus, streamViewers;
		$.getJSON(apiURL, function(data) {
				if (i < favorites.length) {
					if (data.stream === null){
						streamThumbURL = "https://s11.postimg.org/lvjnq8kqb/offline_thumb.jpg";
						streamURL = "https://www.twitch.tv/" + streamerName;
						streamStatus = "Channel offline";
						element.append(getImgHtml(streamThumbURL, streamURL));
						element.append(getStreamerNameHtml(streamerName, streamURL));
						element.append(getStreamStatusHtml(streamStatus));
					}
				}
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				streamThumbURL = "https://s11.postimg.org/lvjnq8kqb/offline_thumb.jpg";
				streamURL = "";
				streamStatus = "Channel does not exists";
				element.append(getImgHtml(streamThumbURL, streamURL));
				element.append(getStreamerNameHtml(streamerName, streamURL));
				element.append(getStreamStatusHtml(streamStatus));
			});
	});
}

function generateRowOfThree() {
	var html =
		"<div class=\"row\"><div class=\"col-sm-4\"></div><div class=\"col-sm-4\"></div><div class=\"col-sm-4\"></div></div>";
	$(".streams").append(html);
}
function getImgHtml(src, url) {
	var html = "<a href=\"" + url + "\" target=\"_blank\"><img src=\"" + src + "\"class=\"img-responsive\"></a>";
	return html;
}

function getStreamerNameHtml(name, url) {
	var html = "<a href=\"" + url + "\" target=\"_blank\" class=\"streamer-name\"><i class=\"fa fa-twitch\" aria-hidden=\"true\"></i> " + name + "</a>";
	return html;
}

function getStreamStatusHtml(status) {
	var html = "<p class=\"status\">" + status + "</p>";
	return html;
}

function getStreamViewersHtml(viewers) {
	var html = "<p class=\"viewers\"><i class=\"fa fa-eye\" aria-hidden=\"true\"></i> " + viewers + " watching</p>";
	return html;
}