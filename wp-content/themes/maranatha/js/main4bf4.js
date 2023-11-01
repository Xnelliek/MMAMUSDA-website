/**
 * Main JavaScript
 */

// Max width for mobile
var maranatha_mobile_width = 700; // match value in _media-queries.scss

// DOM is fully loaded
jQuery( document ).ready( function( $ ) {

	/**********************************************
	 * LAYOUT
	 **********************************************/

	/*---------------------------------------------
	 * Viewport Units
	 *--------------------------------------------*/

	// Buggyfill to help correct vh units on old iOS Safari, Android and IE
	window.viewportUnitsBuggyfill.init( {
		refreshDebounceWait: 50,
		hacks: window.viewportUnitsBuggyfillHacks
	} );

	/*---------------------------------------------
	 * Header Top
	 *--------------------------------------------*/

	// Show narrow header top bar when scroll down
	$( window ).scroll( function() {

		// Not on mobile devices
		if ( $( window ).width() <= maranatha_mobile_width ) {
			return;
		}

		// Scroll down, show narrow top bar
		if ( $( document ).scrollTop() > 0 ) {
			$( '.maranatha-not-scrolled #maranatha-header-top' ).show();
		}

		// Scroll up, show full top bar
		else {
			$( '.maranatha-scrolled #maranatha-header-top' ).show();
		}

	} );

	/*---------------------------------------------
	 * Header Menu
	 *--------------------------------------------*/

	 setTimeout( function() { // helps with mobile menu icon position old iOS
		maranatha_activate_menu();
	 }, 50 );

	/*---------------------------------------------
	 * Header Search
	 *--------------------------------------------*/

	// Open Search
	$( '#maranatha-header-search-open' ).click( function( e ) {

		// Stop regular click action
		e.preventDefault();

		// Lock logo width/height to keep it from sizing up when search is opened and hidden menu gives it more space
		// The restraint should be removed on closing search
		maranatha_search_lock_logo();

		// Add body class for "search is open"
		// See media queries for hiding logo on mobile
		jQuery( 'body' ).addClass( 'maranatha-search-is-open' );


		// Focus on search input
		$( '#maranatha-header-search input' ).focus();

	} );

	// Close Search
	$( '#maranatha-header-search-close' ).click( function( e ) {

		// Stop regular click action
		e.preventDefault();

		// Unlock logo width/height
		maranatha_search_lock_logo( 'unlock' );

		// Remove body class for "search is open"
		jQuery( 'body' ).removeClass( 'maranatha-search-is-open' );

		// Snap mobile menu icon into proper position
		$( window ).resize();

	} );

	/*---------------------------------------------
	 * Header Archives (Dropdowns)
	 *--------------------------------------------*/

	if ( $( '#maranatha-header-archives' ).length ) {

		// Loop top-level links
		$( 'a.maranatha-header-archive-top-name' ).each( function() {

			var $link, $dropdown, dropdown_id;

			$link = $( this );
			$dropdown = $link.next( '.maranatha-header-archive-dropdown' );
			dropdown_id = $dropdown.attr( 'id' );

			// Move it to before </body> where jQuery Dropdown works best
			$dropdown.appendTo( 'body' );

			// Attach dropdown to control
			$link.dropdown( 'attach', '#' + dropdown_id );

		} );

	}

	/*---------------------------------------------
	 * Footer Stickies
	 *--------------------------------------------*/

	// Show latest events, comments, etc.
	// Hide stickies when scroll to/from footer to prevent covering copyright, etc.
	// Also hide on homepage when not scrolled beneath the first section
	maranatha_show_footer_stickies();
	$( window ).scroll( maranatha_show_footer_stickies );

	/*---------------------------------------------
	 * Search Forms (Header, Widget, etc.)
	 *--------------------------------------------*/

	// Submit on link button click
	$( '.maranatha-search-button' ).click( function( event ) {

		event.preventDefault();

		$( this ).parent( 'form' ).submit();

	} );

	// Trim search query and stop if empty
	$( '.maranatha-search-form form' ).submit( function( event ) {

		var s;

		s = $( 'input[name=s]', this ).val().trim();

		if ( s.length ) { // submit trimmed value
			$( 'input[name=s]', this ).val( s );
		} else { // empty, stop
			event.preventDefault();
		}

	} );

	/*---------------------------------------------
	 * Homepage
	 *--------------------------------------------*/

	if ( $( '.page-template-homepage' ).length ) {

		// Fade in header section
		if ( ! maranatha_is_mobile() ) { // not on mobile (better performance)
			$( '#maranatha-home-section-1' ).hide().css( 'visibility', 'visible' ).fadeIn( 600 );
		} else {
			$( '#maranatha-home-section-1' ).hide().css( 'visibility', 'visible' ).show();
		}

	}

	/*---------------------------------------------
	 * Post Navigation
	 *--------------------------------------------*/

	// Make nav blocks on single posts click anywhere
	$( '.maranatha-nav-block' ).click( function() {

		var url;

		url = $( '.maranatha-nav-block-title', this ).prop( 'href' );

		if ( url ) {
			window.location = url;
		}

	} );

	// Brighten on hover
	$( '.maranatha-nav-block' ).hover( function( e ) {

		var $image, new_opacity;

		$image = $( '.maranatha-nav-block-image', this );

		if ( $image.length ) {

			// Get original opacity on first hover
			if ( 'mouseenter' == e.type ) {

				opacity = $image.css( 'opacity' ); // global
				new_opacity = opacity * 1.75; // increase by 75%

				$image.fadeTo( 0, new_opacity );

			}

			else {
				$image.fadeTo( 0, opacity );
			}

		}

	} );

	/*---------------------------------------------
	 * Entries
	 *--------------------------------------------*/

	// Add class to images in full content big enough to make exceed content width
	$( 'img.alignnone, img.aligncenter', $( '.maranatha-content-width-700 .maranatha-entry-full-content > p' ) ).each( function() {

		var img_width;

		img_width = parseFloat( $( this ).attr( 'width' ) );

		if ( img_width >= 980 ) {
			$( this ).parents( 'p' ).addClass( 'maranatha-image-exceed-700-980' );
		}

	} );

	// Hide empty footer element (ie. no button)

	$( '.maranatha-entry-short-footer' ).each( function() {
		if( 0 == $(this ).children().length ){
			$( this ).hide();
		}
	} );

	/*---------------------------------------------
	 * Sermons
	 *--------------------------------------------*/

	if ( $( '.single-ctc_sermon' ).length ) {

		// Scroll down to article when "Read" is clicked
		$( '#maranatha-sermon-read-button a' ).click( function( e ) {

			var buttons_bottom;

			e.preventDefault();

			buttons_bottom = $( '#maranatha-sermon-buttons' ).position().top + $( '#maranatha-sermon-buttons' ).outerHeight();

			$.smoothScroll( {
				offset: buttons_bottom - 10,
				easing: 'swing',
				speed: 1200,
			} );

		} );

		// Dropdown for download links on Save button
		$( '#maranatha-sermon-download-button a' )
			.dropdown( 'attach', '#maranatha-sermon-download-dropdown' );

	}

	/*---------------------------------------------
	 * Single Event
	 *--------------------------------------------*/

	// Single event only
	if ( $( '.maranatha-event-full' ).length ) {

		// Recurrence tooltip
		$( '#maranatha-event-recurrence a' ).tooltipster( {
			theme: 'maranatha-tooltipster',
			arrow: false,
			animation: 'fade',
			speed: 0, // fade speed
		} ).click( function( e ) {
			e.preventDefault(); // stop clicks
		});

	}

	/*---------------------------------------------
	 * Events Calendar
	 *--------------------------------------------*/

	// Calendar template only
	if ( $( '#maranatha-calendar' ).length ) {

		// Attach dropdowns to controls
		maranatha_attach_calendar_dropdowns();

		// AJAX-load event calendar when use controls
		// This keeps page from reloading and scrolling to top
		// PJAX updates URL, <title> and browser/back history
		$( document ).pjax( '.maranatha-calendar-control, .maranatha-calendar-dropdown a', '#maranatha-calendar', {
			fragment: '#maranatha-calendar', // replace only the calendar
			scrollTo: false, // don't scroll to top after loading
			timeout: 5000, // page reloads after timeout (default 650)
		} );

		// Loading indicator
		$( document ).on( 'pjax:send', function() {
			$( '.maranatha-calendar-dropdown-control' ).dropdown( 'hide' ); // hide controls
			$( '#maranatha-calendar-loading' ).show();
		})
		$( document ).on( 'pjax:complete', function() {
			$( '#maranatha-calendar-loading' ).hide();
		})

		// After contents replaced
		$( document ).on( 'pjax:success', function() {

			// Re-attach dropdowns to controls
			maranatha_attach_calendar_dropdowns();

			// Re-activate tooltip hovering
			maranatha_activate_calendar_hover();

		} );

		// Hide dropdowns on back/forward
		$( document ).on( 'pjax:popstate', function( e ) {
			if ( e.direction ) {
				$( '.maranatha-calendar-dropdown-control' ).dropdown( 'hide' );
			}
		} );

		// Use Tooltipster to show event hover for each link
		maranatha_activate_calendar_hover();

		// Handle mobile clicks on linked days
		$( document ).on( 'click', 'a.maranatha-calendar-table-day-number', function( e ) {

			var $day, $events, date_formatted, scroll_offset;

			e.preventDefault();

			// Get day cell
			$day = $( this ).parents( 'td' );

			// Show heading for date
			date_formatted = $day.attr( 'data-date-formatted' );
			$( '#maranatha-calendar-list h3:first-of-type' ).remove();
			$( '#maranatha-calendar-list' ).prepend( '<h3 id="maranatha-calendar-list-heading">' + date_formatted + '</h3>' );
			$( '#maranatha-calendar-list-heading' ).show();

			// Hide all events in list and show list container
			$( '#maranatha-calendar-list .maranatha-event-short' ).hide();
			$( '#maranatha-calendar-list' ).show();

			// Show all events for this day
			$events = $( '.maranatha-calendar-table-day-events li', $day );
			$events.each( function() {

				var event_id;

				// Get event ID
				event_id = $( this ).attr( 'data-event-id' );

				// Show that event in list
				$( '#maranatha-calendar-list .maranatha-event-short[data-event-id="' + event_id + '"]' ).show();

			} );

			// Scroll down if events are out of view
			// Otherwise user sees no change
			if ( ! $( '#maranatha-calendar-list-heading' ).visible() ) {

				// Scroll events into bottom of screen
				scroll_offset = 0 - $( window ).height() + 150; // negative

				$.smoothScroll( {
					scrollTarget: '#maranatha-calendar-list-heading',
					offset: scroll_offset,
					easing: 'swing',
					speed: 800
				} );

			}

		} );

	}

	/*---------------------------------------------
	 * Galleries
	 *--------------------------------------------*/

	// Make clicks on caption also go to URL
	$( '.gallery-caption' ).click( function() {

		var $parent, url;

		$parent = $( this ).parent();
		url = $( 'a', $parent ).prop( 'href' );

		// Go to URL if no data- attributes, which indicate Jetpack Carousel or possbily other lightbox
		if ( url && $.isEmptyObject( $( '.gallery-icon img', $parent ).data() ) ) {
			window.location = url;
		}

	} );

	/*---------------------------------------------
	 * Comments
	 *--------------------------------------------*/

	// Scroll to comments on click Comments sticky or comment permalink
	if ( $( 'a.maranatha-scroll-to-comments' ).length ) {
		$( 'a.maranatha-scroll-to-comments, a[href*=comment]' ).smoothScroll( {
			offset: -120, // consider sticky bar
			easing: 'swing',
			speed: 1200,
		} );
	}

	// Scroll to comments section, specific comment, or add comment form
	var hash = window.location.hash;
	if ( hash && hash.match( /comment|respond/ ) ) {

		// Scroll down
		$.smoothScroll( {
			scrollTarget: hash,
			offset: -120, // consider sticky bar
			easing: 'swing',
			speed: 1200,
		} );

	}

	// Comment Validation using jQuery Validation Plugin by Jörn Zaefferer
	// http://bassistance.de/jquery-plugins/jquery-plugin-validation/
	if ( jQuery().validate ) { // if plugin loaded

		var $validate_params, $validate_comment_field;

		// Parameters
		$validate_params = {
			rules: {
				author: {
					required: maranatha_main.comment_name_required !== '' ? true : false // if WP configured to require
				},
				email: {
					required: maranatha_main.comment_email_required !== '' ? true : false, // if WP configured to require
					email: true // check validity
				},
				url: 'url' // optional but check validity
			},
			messages: { // localized error strings
				author: maranatha_main.comment_name_error_required,
				email: {
					required: maranatha_main.comment_email_error_required,
					email: maranatha_main.comment_email_error_invalid
				},
				url: maranatha_main.comment_url_error_invalid
			}
		};

		// Comment textarea
		// Use ID instead of name to work with Antispam Bee plugin which duplicates/hides original textarea
		$validate_comment_field = $( '#comment' ).attr( 'name' );
		$validate_params['rules'][$validate_comment_field] = 'required';
		$validate_params['messages'][$validate_comment_field] = maranatha_main.comment_message_error_required;

		// Validate the form
		$( '#commentform' ).validate( $validate_params );

	}

	/*---------------------------------------------
	 * Widgets
	 *--------------------------------------------*/

	// Categories dropdown redirect
	$( '.maranatha-dropdown-taxonomy-redirect' ).change( function() {

		var taxonomy, taxonomy_id;

		taxonomy = $( this ).prev( 'input[name=taxonomy]' ).val();
		taxonomy_id = $( 'option:selected', this ).val();

		if ( taxonomy && taxonomy_id && -1 != taxonomy_id ) {
			location.href = maranatha_main.home_url + '/?redirect_taxonomy=' + taxonomy + '&id=' + taxonomy_id;
		}

	} );

	/*---------------------------------------------
	 * List Item Counts
	 *--------------------------------------------*/

	// Modify list item counts
	// This includes widgets and sermon topics, etc. indexes using wp_list_categories()
	// Change (#) into <span class="maranatha-list-item-count">#</span> so it can be styled
	var $list_items = $( '.maranatha-list li, .maranatha-sermon-index-list li, .widget_categories li, .widget_ctfw-categories li, .widget_ctfw-archives li, .widget_ctfw-galleries li, .widget_recent_comments li, .widget_archive li, .widget_pages li, .widget_links li, .widget_nav_menu li' );
	for ( var i = 0; i < $list_items.length; i++ ) {

		$list_items.each( function() {

			var modified_count;

			// Manipulate it
			modified_count = $( this ).html().replace( /(<\/a>.*)\(([0-9]+)\)/, '$1 <span class="maranatha-list-item-count">$2</span>' );

			// Replace it
			$( this ).html( modified_count );

		} );

	}
	$list_items.parent( 'ul' ).css( 'visibility', 'visible' );

	/*---------------------------------------------
	 * CSS Classes
	 *--------------------------------------------*/

	// <body> classes for client detection (mobile, browser, etc.) should be done here with JS
	// instead of in body.php so that they work when caching plugins are used.

	// Scrolled down or not

		// On load
		if ( $( document ).scrollTop() > 0 ) {

			$( 'body' )
				.removeClass( 'maranatha-not-scrolled' )
				.addClass( 'maranatha-scrolled' )
				.addClass( 'maranatha-loaded-scrolled' );

		} else {

			$( 'body' )
				.addClass( 'maranatha-not-scrolled' );

		}

		// User scrolled
		$( window ).scroll( function() {

			if ( $( document ).scrollTop() > 0 ) {

				$( 'body' )
					.removeClass( 'maranatha-loaded-scrolled' )
					.removeClass( 'maranatha-not-scrolled' )
					.addClass( 'maranatha-scrolled' );

			} else {

				$( 'body' )
					.removeClass( 'maranatha-scrolled' )
					.addClass( 'maranatha-not-scrolled' );

			}

		} );

	// Mobile Detection
	// Useful for :hover issue with slider video play icon (some browsers handle it better than others)
	if ( maranatha_is_mobile() ) {
		$( 'body' ).addClass( 'maranatha-is-mobile' );
	} else {
		$( 'body' ).addClass( 'maranatha-not-mobile' );
	}

	// iOS Detection
	// Especially useful for re-styling form submit buttons, which iOS takes too much liberty with
	if ( navigator.userAgent.match( /iPad|iPod|iPhone|iWatch/ ) ) {
		$( 'body' ).addClass( 'maranatha-is-ios' );
	} else {
		$( 'body' ).addClass( 'maranatha-not-ios' );
	}

	// Showing singe post nav
	if ( $( '.maranatha-nav-blocks' ).length ) {
		$( 'body' ).addClass( 'maranatha-has-nav-blocks' );
	} else {
		$( 'body' ).addClass( 'maranatha-no-nav-blocks' );
	}

	// Showing comments section
	if ( $( '#comments' ).length ) {
		$( 'body' ).addClass( 'maranatha-has-comments-section' );
	} else {
		$( 'body' ).addClass( 'maranatha-no-comments-section' );
	}

	// Showing full entry map
	if ( $( '.maranatha-entry-full-map' ).length ) {
		$( 'body' ).addClass( 'maranatha-has-entry-map' );
	} else {
		$( 'body' ).addClass( 'maranatha-no-entry-map' );
	}

	// Section map has info box
	if ( $( '#maranatha-map-section-info' ).length ) {
		$( 'body' ).addClass( 'maranatha-has-map-info' );
	} else {
		$( 'body' ).addClass( 'maranatha-no-map-info' );
	}

	// Has header bottom bar (breadcrumbs / archive dropdowns)
	if ( $( '#maranatha-header-bottom' ).length ) {
		$( 'body' ).addClass( 'maranatha-has-header-bottom' );
	} else {
		$( 'body' ).addClass( 'maranatha-no-header-bottom' );
	}

} );

/**********************************************
 * FUNCTIONS
 **********************************************/

/*---------------------------------------------
 * Menu Functions
 *--------------------------------------------*/

var $maranatha_header_menu_raw; // make accessible to maranatha_activate_menu() later

// Activate Menu Function
// Also used in Customizer admin preview JS
function maranatha_activate_menu() {

	var $header_menu_raw_list, $header_menu_raw_items;

	// Continue if menu not empty
	if ( ! jQuery( '#maranatha-header-menu-content' ).children().length ) {
		return;
	}

	// Make copy of menu contents before Superfish modified
	// Original markup works better with MeanMenu (less Supersubs and styling issues)
	if ( ! jQuery( $maranatha_header_menu_raw ).length ) { // not done already
		$maranatha_header_menu_raw = jQuery( '<div></div>' ); // Create empty div
		$header_menu_raw_list = jQuery( '<ul></ul>' ); // Create empty list
		$header_menu_raw_items = jQuery( '#maranatha-header-menu-content' ).html(); // Get menu items
		$header_menu_raw_list = $header_menu_raw_list.html( $header_menu_raw_items ); // Copy items to empty list
		$maranatha_header_menu_raw = $maranatha_header_menu_raw.html( $header_menu_raw_list ); // Copy list to div
	}

	// Regular Menu (Superfish)
	jQuery( '#maranatha-header-menu-content' ).supersubs( { // Superfish dropdowns
		minWidth: 14.5,	// minimum width of sub-menus in em units
		maxWidth: 14.5,	// maximum width of sub-menus in em units
		extraWidth: 1	// extra width can ensure lines don't sometimes turn over due to slight rounding differences and font-family
	} ).superfish( {
		delay: 150,
		disableHI: false,
		animation: {
			opacity: 'show',
			//height:'show'
		},
		speed: 0, // animation
		onInit: function() {

			// Responsive Menu (MeanMenu) for small screens
			// Replaces regular menu with responsive controls
			// Init after Superfish done because Supersubs needs menu visible for calculations
		    jQuery( $maranatha_header_menu_raw ).meanmenu( {
		    	meanMenuContainer: '#maranatha-header-mobile-menu',
				meanScreenWidth: maranatha_mobile_width, // use CSS media query to hide #maranatha-header-menu-content at same size
		    	meanRevealPosition: 'right',
		    	meanRemoveAttrs: true, // remove any Superfish classes, duplicate item ID's, etc.
		    	meanMenuClose: '<i class="' + maranatha_main.mobile_menu_close + '"></i>',
		    	meanExpand:  '+',
		    	meanContract:  '-',
		    	//removeElements: '#maranatha-header-menu-inner' // toggle visibility of regular
		    } );

			// Set open/close height same as logo and position top same as logo, so vertically centered
			// Also insert search into mobile menu
			// And again on resize in case logo changes height of bar
			maranatha_activate_mobile_menu();
			jQuery( window ).resize(function() {
				maranatha_activate_mobile_menu();
			} );

		},
		onBeforeShow: function() {

			// Make dropdowns on right open to the left if will go off screen
			// This considers that the links may have wrapped and dropdowns may be mobile-size

			var $link, $dropdown, $dropdown_width, $offset;

			// Detect if is first-level dropdown and if not return
			if ( jQuery( this, '#maranatha-header-menu-content' ).parents( 'li.menu-item' ).length != 1 ) {
				return;
			}

			// Top-level link hovered on
			$link = jQuery( this ).parents( '#maranatha-header-menu-content > li.menu-item' );

			// First-level dropdown
			$dropdown = jQuery( '> ul', $link );

			// First-level dropdown width
			$dropdown_width = $dropdown.outerWidth();
			$dropdown_width_adjusted = $dropdown_width - 20; // compensate for left alignment

			// Remove classes first in case don't need anymore
			$link.removeClass( 'maranatha-dropdown-align-right maranatha-dropdown-open-left' );

			// Get offset between left side of link and right side of window
			$offset = jQuery( window ).width() - $link.offset().left;

			// Is it within one dropdown length of window's right edge?
			// Add .maranatha-dropdown-align-right to make first-level dropdown not go off screen
			if ( $offset < $dropdown_width_adjusted ) {
				$link.addClass( 'maranatha-dropdown-align-right' );
			}

			// Is it within two dropdown lengths of window's right edge?
			// Add .maranatha-dropdown-open-left to open second-level dropdowns left: https://github.com/joeldbirch/superfish/issues/98
			if ( $offset < ( $dropdown_width_adjusted * 2 ) ) {
				$link.addClass( 'maranatha-dropdown-open-left' );
			}

		},

	} );

}

// Set open/close height same as logo and position top same as logo, so vertically centered
// Also insert search into mobile menu
function maranatha_activate_mobile_menu() {

	var $logo, move_up;

	if ( jQuery( '.mean-container .mean-bar' ).length ) {

		    // Move mobile search container into bottom of mobile menu
		    if ( jQuery( '#maranatha-header-search' ).length && ! jQuery( '#maranatha-header-search-mobile' ).length ) {
			  	jQuery( '.mean-nav > ul' ).append( '<li id="maranatha-header-search-mobile" role="search">' + jQuery( '#maranatha-header-search .maranatha-search-form' ).html() + '</li>' );
			}

			// Get logo
			$logo = jQuery( '#maranatha-logo' );

			// Move up to half of logo height
			move_up = $logo.offset().top - jQuery( '.mean-container .mean-bar' ).offset().top + ( $logo.outerHeight() / 2 );

			// Do not move again if already in place
			if ( move_up != 0 ) {

				jQuery( '.mean-container .mean-bar' )
					.height( $logo.outerHeight() )
					.css( 'top', move_up + 'px' );

			}

	}

}

// Lock logo width/height to keep it from sizing up when search is opened and hidden menu gives it more space
// The restraint should be removed on closing search
function maranatha_search_lock_logo( action ) {

	var action;

	if ( ! action ) {
		action = 'lock';
	}

	// Lock
	if ( 'lock' == action ) {

		jQuery( '#maranatha-logo' )
			.width( jQuery( '#maranatha-logo' ).width() + 'px' )
			.height( jQuery( '#maranatha-logo' ).height() + 'px' );

	}

	// Unlock
	else if ( 'unlock' == action ) {

		jQuery( '#maranatha-logo' )
			.width( 'auto' )
			.height( 'auto' );

	}

}

/*---------------------------------------------
 * Footer Stickies
 *--------------------------------------------*/

// Show latest events, comments, etc.
// Hide stickies when scroll to/from footer to prevent covering copyright, etc.
// Also hide on homepage when not scrolled beneath the first section
function maranatha_show_footer_stickies() {

	var scroll_bottom, bottom_of_first, top_of_footer, show;

	show = true;
	scroll_bottom = jQuery( window ).scrollTop() + jQuery( window ).height();

	// Hide on homepage when not scrolled beneath the first section
	if ( jQuery( '#maranatha-home-section-1' ).length ) {

		bottom_of_first = jQuery( '#maranatha-home-section-1' ).outerHeight();

		// Show when below first section
		if ( scroll_bottom <= bottom_of_first ) {
			show = false;
		}

	}

	// Hide when below top of last footer element (widgets, map or bottom bar)
	top_of_footer = jQuery( document ).height() - jQuery( '#maranatha-footer > *:last-child' ).height();
	if ( scroll_bottom > top_of_footer ) {
		show = false;
	}

	// Do show/hide
	if ( show ) {
		jQuery( '#maranatha-stickies' ).show();
	} else {
		jQuery( '#maranatha-stickies' ).hide();
	}

}

/*---------------------------------------------
 * Fonts
 *--------------------------------------------*/

// Change <body> helper font/setting class
// Used by Theme Customizer (and front-end demo customizer)
function maranatha_update_body_font_class( setting, font ) {

	var setting_slug, font_slug, body_class;

	// Prepare strings
	setting_slug = setting.replace( /_/g, '-' );
	font_slug = font.toLowerCase().replace( /\s/g, '-' ); // spaces to -
	body_class = 'maranatha-' + setting_slug + '-' + font_slug;

	// Remove old class
	jQuery( 'body' ).removeClass( function( i, css_class ) { // helpful information: http://bit.ly/1f7KH3f
		return ( css_class.match ( new RegExp( '\\b\\S+-' + setting_slug + '-\\S+', 'g' ) ) || [] ).join( ' ' );
	} )

	// Add new class
	jQuery( 'body' ).addClass( body_class );

}

/*---------------------------------------------
 * Map Section
 *--------------------------------------------*/

// Position Google Map on homepage and footer
// Also run on resize to keep things in proper place
function maranatha_position_map_section() {

	// Delay improves resize accuracy
	setTimeout( function() {

		var map, latlng, map_width, map_center, offset_left, marker_width, pan_x, pan_y;

		map = jQuery( '#maranatha-map-section-canvas' ).data( 'ctfw-map' );
		latlng = jQuery( '#maranatha-map-section-canvas' ).data( 'ctfw-map-latlng' );

		// Reset location to center
		map.setCenter( latlng );

		// Move center left to be directly under marker icon
		if ( jQuery( '#maranatha-map-section-info' ).length ) {

			map_width = jQuery( '.maranatha-map-section' ).width();
			map_center = map_width / 2;
			offset_left = jQuery( '#maranatha-map-section-marker' ).offset().left;
			marker_width = jQuery( '#maranatha-map-section-marker' ).width();
			pan_x = map_center - ( offset_left + ( marker_width / 2 ) ); // half of marker width is its center

			// Pan map down when have breadcrumb/archive nav bar and showing map on event/location
			// This offsets the marker position after moving marker / info box down to make room for breadcrumb bar
			pan_y = 0;
			if ( jQuery( '.maranatha-entry-full-map' ).length && jQuery( '#maranatha-header-bottom' ).length ) {

				// Important: Also change value in .maranatha-has-header-bottom & #maranatha-map-section-content > *
				pan_y = -25; // half of .maranatha-has-header-bottom & #maranatha-map-section-content > *

			}

			map.panBy( pan_x, pan_y );

		}

	}, 10 );

}

/*---------------------------------------------
 * Event Calendar
 *--------------------------------------------*/

// Attach calendar dropdowns to controls
// Used on load and after PJAX replaces content
function maranatha_attach_calendar_dropdowns() {

	// Remove it from before </body> if already exists (old before PJAX)
	jQuery( 'body > #maranatha-calendar-month-dropdown' ).remove();
	jQuery( 'body > #maranatha-calendar-category-dropdown' ).remove();

	// Move it from calendar container to before </body>
	// jQuery Dropdown works best with it there
	// But need it in main calendar container for PJAX to get new contents of dropdowns
	jQuery( '#maranatha-calendar-month-dropdown' ).appendTo( 'body' );
	jQuery( '#maranatha-calendar-category-dropdown' ).appendTo( 'body' );

	// Re-attach dropdown to control
	jQuery( '#maranatha-calendar-month-control' ).dropdown( 'attach', '#maranatha-calendar-month-dropdown' );
	jQuery( '#maranatha-calendar-category-control' ).dropdown( 'attach', '#maranatha-calendar-category-dropdown' );

}

// Use Tipster to show calendar's event hover for each link
function maranatha_activate_calendar_hover() {

	// Use Tipster to show event hover for each link
	jQuery( '#maranatha-calendar .maranatha-event-short' ).each( function() {

		var event_id;

		// Get ID
		event_id = jQuery( this ).attr( 'data-event-id' );

		// Activate tooltips on links having that ID
		if ( event_id ) {

			jQuery( '.maranatha-calendar-table-day-events a[data-event-id="' + event_id + '"]' ).tooltipster( {
				theme: 'maranatha-tooltipster-calendar',
				content: jQuery( this ),
				contentCloning: true,
				functionInit: function( origin, content ) {

					var date_formatted;

					// Get localized date from calendar
					date_formatted = jQuery( origin ).parents( 'td' ).attr( 'data-date-formatted' );

					// Add date to the tooltip
					jQuery( '.maranatha-event-short-date-range', content ).html( date_formatted );

					return content;

				},
				minWidth: 300,
				maxWidth: 600,
				touchDevices: false, // no hovers on touch (including w/mouse; otherwise pure touch opens + goes)
				interactive: true, // let them click on tooltip
				arrow: false,
				delay: 50,
				animation: 'fade',
				speed: 0, // fade speed
				onlyOne: true, // immediately close other tooltips when opening
			} );

		}

	} );

}

/*---------------------------------------------
 * Detection
 *--------------------------------------------*/

// Is device mobile?
// The regex below is based on wp_is_mobile() -- good enough for most
// "Mobile" will handle iOS devices and many others
function maranatha_is_mobile() {
	return navigator.userAgent.match( /Mobile|Android|Silk\/|Kindle|BlackBerry|Opera Mini|Opera Mobi/ )
}

/*---------------------------------------------
 * Google Maps
 *--------------------------------------------*/

// Global marker image
var ctfw_map_marker_image = maranatha_main.theme_url + '/images/map-marker.png';
var ctfw_map_marker_image_hidpi = maranatha_main.theme_url + '/images/map-marker@2x.png';
var ctfw_map_marker_image_width = 69; // only necessary when providing HiDPI image
var ctfw_map_marker_image_height = 69;

// Custom map styles that are more minimal and flat than default ROADMAP
// This is applied globally to all maps using framework integration
var ctfw_map_styles = [

	// Lighten BG
	{
		"featureType": "landscape",
		"elementType": "geometry",
		"stylers": [
			{ "saturation": -100 },
			{ "lightness": 100 }
		]
	},

	// No stroke on labels
	{
		"elementType": "labels",
		"stylers": [
			{ "visibility": "simplified" }
		]
	},

	// No color on labels
	{
		"elementType": "labels.text",
		"stylers": [
			{ "saturation": -100 }
		]
	},

	// Darken city, neighborhood names
	{
		"featureType": "administrative",
		"elementType": "labels.text.fill",
		"stylers": [
			{ "saturation": -100 },
			{ "lightness": -70 }
		]
	},

	// Lighten water
	{
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [
			{ "lightness": 40 }
		]
	},

	// Lighten places of interests
	{
		"featureType": "poi",
		"elementType": "geometry",
		"stylers": [
			{ "lightness": 30 }
		]
	},

	// Hide churches
	{
		"featureType": "poi.place_of_worship",
		"stylers": [
			{ "visibility": "off" }
		]
	},

	// Hide businesses
	{
		"featureType": "poi.business",
		"stylers": [
			{ "visibility": "off" }
		]
	},

	// Hide labels for business, parks, schools, etc.
	{
		"featureType": "poi",
		"elementType": "labels",
		"stylers": [
			{ "visibility": "off" }
		]
	},

	// Hide labels for airport, bus, ferries, etc.
	{
		"featureType": "transit",
		"elementType": "labels",
		"stylers": [
			{ "visibility": "off" }
		]
	},

	// Simplify highways
	{
		"featureType": "road.highway",
		"stylers": [
			{ "visibility": "simplified" }
		]
	},

	// Darken highways
	{
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [
			{ "lightness": -10 },
			{ "saturation": -10 }
		]
	},

	// Make major roads thinner, uncolored
	{
		"featureType": "road.arterial",
		"stylers": [
			{ "saturation": -100 },
			{ "weight": 0.3 },
		]
	},

	// Lessen minor streets
	{
		"featureType": "road.local",
		"stylers": [
			{ "visibility": "simplified" },
			{ "saturation": -100 },
			{ "weight": 0.8 },
			{ "lightness": -5 }
		]
	},

	// Lighten minor road labels
	{
		"featureType": "road.local",
		"elementType": "labels",
		"stylers": [
			{ "lightness": 17 }
		]
	},

	// Don't show property lines
	{
		"featureType": "administrative.land_parcel",
		"stylers": [
			{ "visibility": "off" }
		]
	}

];
