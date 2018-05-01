$(document).ready(function(){
	// submit form with Enter key
	$('#searchBox').keypress(function(event) {
		// Number 13 is the "Enter" key on the keyboard
		if (event.keyCode === 13) {
			// Trigger the button element with a click
			$('#submitz').click();
		}
	});
	
	//prevent form submission from reloading page
	$('#searchForm').submit(function(e) {
		e.preventDefault();
	});
	
	$("#submitz").on("click", function(event) {
		var searchText = $("#searchBox").val();
		var searchURL = "https://en.wikipedia.org/w/api.php?action=query&titles&origin=*&list=search&srsearch="+searchText+"&prop=info&inprop=url&utf8=&format=json";
		
		//get the JSON data from wikiAPI
		$.getJSON(searchURL, function(data){
			var resultsArr = data.query.search;
			$("#articles").empty();
			
			for (var i=0; i<resultsArr.length; i++) {
				var articleURL = "https://en.wikipedia.org/wiki/" + resultsArr[i].title;
				var articleTitle = resultsArr[i].title;
				var articleSummary = resultsArr[i].snippet;
				var contentResults = '<header><h2><a target="_blank" href="'+articleURL+'">'+articleTitle+
					 '</a></h2></header><p>'+articleSummary+'</p>';
				$("#articles").append(contentResults);
			}
		});
		
		//change opacity in resultsDiv
		var resultsdiv = document.getElementById("resultsDiv");
		resultsdiv.style.opacity = 1;
	});
});