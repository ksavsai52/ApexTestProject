$(document).ready(function() {
	
	var init = function(){
		$("#appointment_list").hide();
		$("#appointment_form").hide();
		$("#search_text").val('');
		$("#date").val('');
		$("#time").val('');
		$("#description").val('');
		$("#new_button").show();	
	};

	var getAppointments = function () {
		$("#appointment_data").empty();
		var value = $("#search_text").val();
		$.ajax({
            type: 'GET',
            url: 'cgi-bin/get_appointments.pl',
            data: { 'search': value },
            success: function(res) {
            	var tr = '';
       	       	$.each(res, function(i, item) {
       	       		item = JSON.parse(item);
       	       		tr += '<tr><td>' + item.date + '</td><td>' + item.time + '</td><td>' + item.description + '</td></tr>';
			    });
			    $("#appointment_data").append(tr);
			},
            error: function() {
            	alert("Sorry!! Something went wrong!");
            }
        });
		$("#appointment_list").show();
	};

	init();

	$("#search_appointment").click(getAppointments);

	$("#new_button").click(function() {
		$("#appointment_form").show();
		$("#new_button").hide();
	});

	$("#cancel_appointment").click(function() {
		init();
	});

});