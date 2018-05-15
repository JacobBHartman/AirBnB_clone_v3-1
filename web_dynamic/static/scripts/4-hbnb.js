$(function () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if ('status' in data) {
      $('header DIV#api_status').addClass('available');
    } else {
      $('header DIV#api_status').removeClass('available');
    }
  });

  let amen_ID = {};
  $('.amenities .popover li input[type="checkbox"]').click(function () {
    // console.log(amen_ID);
    if ($(this).is(':checked')) {
      amen_ID[$(this).data('id')] = $(this).data('name');
    } else {
      delete amen_ID[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amen_ID).join(', '));
    // console.log('meeeeeeep');
    // console.log(amen_ID);
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: printPlaces,
    error: 'error'
  });

  function printPlaces (data) {
    let placesStr = '';
    for (let i = 0; i < data.length; i++) {
      let placeStr = `
	    <article>
              <div class="title">
                <h2>${data[i].name}</h2>
                <div class="price_by_night">
                  ${data[i].price_by_night}
                </div>
              </div>
              <div class="information">
                <div class="max_guest">
                  <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                  <br />
                  ${data[i].max_guest} Guests
                </div>
                <div class="number_rooms">
                  <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
                  <br />
                  ${data[i].number_rooms} Bedrooms
                </div>
                <div class="number_bathrooms">
                  <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
                  <br />      console.log(data);
                  ${data[i].number_bathrooms} Bathroom
                </div>
              </div>
              <div class="description">
                ${data[i].description}
              </div>
              </article>
	      `;
      placesStr += placeStr;
    }
    $('section.places').append(placesStr);
  }

  $('button').click(() => {
    let amen = { 'amenities': amen_ID };
    // console.log('weeeeeeeeee');
    // console.log(amen);
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify(amen),
      success: function (data) {
        // console.log('success');
        // console.log(data);
        amen_ID = {};
        $('section.places').children().remove();
        printPlaces(data);
      },
      error: 'error'
    });
  });
});
