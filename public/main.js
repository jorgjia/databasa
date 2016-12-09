$("document").ready(function() {
	$("#shto").on("click", function() {
		var emriStudent = $("#emri").val();
		var qytetiStudent = $("#qyteti").val();
				
		if (emriStudent.trim() === "" ||qytetiStudent.trim() === "") $("#msg").html("Please fill both fields.");
		else {
			$.ajax({
				url: "/form",
				type: "POST",
				dataType: "json",
				data: {
					emri: emriStudent,
					qyteti: qytetiStudent
				},
				success: function(json) {
					$("#msg").html(json.message);
				}
			});
		}
	});
			
	$("#kerko_emrin").on("click", function() {
		$.ajax({
			url: "/kerko_emrin",
			type: "POST",
			dataType: "json",
			data: {
				emri: $("#kerko_emrin_bosh").val()
			},
			success: function(json) {
				if (json.emri.trim() === "") $("#result").html("No results found.");
				else $("#result").html("Result found: <br><span>emriStudent:</span> " + json.emri + "<br><span>qyteti: </span>" + json.qyteti + "</li>");
			}
		});
	});
			
	$("#kerko_emer_qyteti").on("click", function() {
		$.ajax({
			url: "/kerko_qytetin",
			type: "POST",
			dataType: "json",
			data: {
				qyteti: $("#kerko_qytet_bosh").val()
			},
			success: function(json) {
				if (json.emri === "") $("#result").html("No results found.");
				else $("#result").html("Result found: <br><span>emriStudent:</span> " + json.emri + "<br><span>qyteti: </span>" + json.qyteti + "</li>");
			}
		});
	});
});