let amen_ID = {};


$(function() {
        $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
	        if ('status' in data) {
		        console.log(data)
		        $('header DIV#api_status').addClass('available');
		} else {
		        $('header DIV#api_status').removeClass('available');
		}
	});

	$('.amenities .popover li input[type="checkbox"]').click(function() {
	        console.log(amen_ID);
		if ($(this).is(':checked')) {
			amen_ID[$(this).data('id')] = $(this).data('name')
		} else {
			delete amen_ID[$(this).data('id')];
		}
		$('.amenities h4').text(Object.values(amen_ID).join(', '));  
	});
});

