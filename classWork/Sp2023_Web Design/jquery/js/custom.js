$(document).ready(function(){

	$("#curtain").animate({
		"top":"-=120vh",
		"backgroundColor" : "white"
		
	},2000, function(){
		$("#logo span").velocity("transition.slideRightIn");
	});


	$("#closeBtn").click(function(){
		$("#lightbox").css("display","none");
	});

	$("#keyBtn").click(function(){

		var customHTML = "<ul>"
		customHTML += "<li> 1</li>"
		customHTML += "<li> 2</li>"
		customHTML += "<li> 3</li>"
		customHTML += "<li> 4</li>"
		customHTML += "<li> 5</li>"
		customHTML += "<li> 6</li>"
		customHTML += "</ul>"

		$("#lb_content_text").html(customHTML);
		$("#lightbox").css("display","flex");
	});
	$("#btnText").click(function(){

	var resetbtn = document.getElementById("btnText");
	var btn = new Neontext("btnText");
	var neontext = new Neontext("btnText");
		neontext.render.run();
		btn.render.run();
	resetbtn.addEventListener("click",function(){
		neontext.render.killer();
		btn.render.killer();
	})
	});

});