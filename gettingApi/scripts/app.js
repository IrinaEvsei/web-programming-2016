'use strict';

$(document).ready(function(){
	$(".loading").hide();
	$("#search-action").on('submit', function(event){
		event.preventDefault();
		$(".pre-loading").hide();
		$(".loading").show();
		$(".entry").empty();

		var repository = $("#search-keyword").val();
		var language   = $("#search-language").val();
		if(language == "Choose language"){
			language = "whatever";
		}

		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://api.github.com/search/repositories?q=' + repository + '+language:' + language + '&sort=stars&order=desc', true);
		xhr.onload = function(){
			$(".loading").hide();
			if(this.status == 422){
				console.log("422 Unprocessable Entity");
			}
			if(this.status == 400){
				console.log("400 Bad Request");
			}
			if(this.status == 200){
				var responseData = JSON.parse(xhr.responseText);
				console.log(responseData);

				var source = $("#entry-template").html();
				var template = Handlebars.compile(source);
				$('.loaded-info').append(template({objects:responseData.items}));
			}
		}
		xhr.onerror = function(){
			console.log("BAD: " + this.status);
		}
		xhr.send();
	});
});