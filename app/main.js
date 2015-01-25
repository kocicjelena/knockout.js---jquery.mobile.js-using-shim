/*global require*/
require.config({
    baseUrl: './',
    paths: {
        'jquery': 'lib/jquery/jquery-1.11.1.min',
        'jquery-ui': 'lib/jquery-ui/ui',
        'knockout': 'lib/knockout/knockout-3.1.0',
        'knockout-jqueryui': 'lib/knockout-jqueryui',
		'jqueryMobile': 'lib/jquery.mobile-1.3.2'
    },
  shim: {
	"lib/jquery.mobile-1.3.2'" : { deps: ["jquery-1.11.1.min"], exports: 'jquery-1.11.1.min' },
  }
});

require(["jquery",
	"jqueryMobile",
], function ($) {
$(document).bind( "pagebeforechange", function( e, data ) {
	// We only want to handle changePage() calls where the caller is
	// asking us to load a page by URL.
	if ( typeof data.toPage === "string" ) {
		// We are being asked to load a page by URL, but we only
		// want to handle URLs that request the data for a specific
		// category.
		var u = $.mobile.path.parseUrl( data.toPage ),
			re = /^#category-item/;
		if ( u.hash.search(re) !== -1 ) {
			// We're being asked to display the items for a specific category.
			// Call our internal method that builds the content for the category
			// on the fly based on our in-memory category data structure.
			showCategory( u, data.options );

			// Make sure to tell changePage() we've handled this call so it doesn't
			// have to do anything.
			e.preventDefault();
		}
	}
});
});
require(

    [
        'knockout',
		
        'app/viewModel'
    ],
    function (ko, ContactsModel) {

        'use strict';

      ko.applyBindings(new ContactsModel());
    }
);
