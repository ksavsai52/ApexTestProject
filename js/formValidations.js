$(document).ready(function() {

	$("form[name='appointment_form']").validate({
		rules: {
			date: "required",
			time: "required",
			description: "required"
	    },
	    messages: {
	    	date: "Please enter date for appointment",
	    	time: "Please enter time for appointment",
	    	description: "Please enter description of appointment"
	    }
	});

});