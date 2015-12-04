/* FoundationCDN */
;(function($){
	var CDN_ROOT = 'https://cdn.jsdelivr.net';
	var PROJECT_NAME = window.app.projectName;
	var CSS_PATTERN = /\.css$/i;
	var JS_PATTERN = /\.js$/i;
	var versions, selectedVersion;

	/* ---------------------------------------------------------------------- */
	/*	ZeroClipboard configuration
	/* ---------------------------------------------------------------------- */
	ZeroClipboard.config({
		swfPath: '//cdn.jsdelivr.net/zeroclipboard/2.2.0/ZeroClipboard.swf'
	});

	/* ---------------------------------------------------------------------- */
	/*	checkOrientation
	/* ---------------------------------------------------------------------- */
		var checkOrientation;
		checkOrientation = function() {
			var viewport;
			viewport = document.querySelector("meta[name=viewport]");
			if (window.orientation === 90 || window.orientation === -90) {
				return viewport.setAttribute("wrapper", "width:device-width, initial-scale=1.0, user-scalable=1");
			} else {
				return viewport.setAttribute("wrapper", "width:device-width, initial-scale=0.75, user-scalable=1");
			}
		};
		window.onorientationchange = function() {
			return checkOrientation();
		};
		checkOrientation();
	/* ---------------------------------------------------------------------- */
	/*	Toggle Top Area
	/* ---------------------------------------------------------------------- */
	jQuery(document).ready(function($){
		$(window).on("scroll", function () {
			var headerHeight = $('header').height(),
				scrollHeader = $(window).scrollTop() > headerHeight;

			$("body").toggleClass("down", scrollHeader);
			$(".top-nav").toggleClass("fixed", scrollHeader);
			$(".customize-bar").toggleClass("fixed-cb", scrollHeader);
			$(".push-bar").toggleClass("on", scrollHeader);
		});
		$("#view-cf").on('click', function() {
			var position = $("#block-cf").offset().top;
			$("html, body").animate({
				scrollTop: position
			}, 1000);
		});
		$("#view-features").on('click', function() {
			var position = $(".ocf-title").offset().top;
			$("html, body").animate({
				scrollTop: position
			}, 1000);
		});
	});

	/* ---------------------------------------------------------------------- */
	/*	Checkboxes styles
	/* ---------------------------------------------------------------------- */


	function checkLinkItem(){
		$('#get-all-links').on("click", function() {
			var checkId = $('.cf-list > ul > li input:checkbox');
			$(checkId).prop('checked', this.checked).each(function() {
				$(this).val( this.checked ? this.id : '' );
			});
			if (this.checked) {
				$('.item').addClass("active");
			} else {
				$('.item').removeClass("active");
			}

			updateCustomLink();
			updateModal();
		});
		$('#cdn-files-list').on("change", ":checkbox", function () {
			$(this).val( this.checked ? this.id : '' );
			if (this.checked) {
				$(this).closest('li').addClass("active");
			} else {
				$(this).closest('li').removeClass("active");
			}

			updateCustomLink();
			updateModal();
		});
	}
	checkLinkItem();

	function getSelectedFiles () {
		var selectedFiles = [];

		$('#cdn-files-list').find('.item.active .link').each(function () {
			selectedFiles.push($(this).attr('data-filename'));
		});

		return selectedFiles;
	}

	/* ---------------------------------------------------------------------- */
	/*	Responsive menu
	/* ---------------------------------------------------------------------- */
	function hamburger(){
		var isOpen = false,
			menuBtn = $('#hamburger');
		menuBtn.click(function () {
			if (isOpen == false) {
				$(this).addClass('hamburger-left');
				$('.responsive-menu').addClass('expand');
				$('.responsive-menu').focus();
				isOpen = true;
			} else {
				$(this).removeClass('hamburger-left');
				$('.responsive-menu').removeClass('expand');
				$('.responsive-menu').focusout();
				isOpen = false;
			}
		});
		menuBtn.mouseup(function () {
			return false;
		});
		$('.responsive-menu').mouseup(function () {
			return false;
		});
		$(document).mouseup(function () {
			if (isOpen == true) {
				$('hamburger').hasClass('hamburger-left');
				$('hamburger').css('display', 'block');
					menuBtn.click();
			}
		});
	}

	hamburger();

	/* ---------------------------------------------------------------------- */
	/*	Our CDN Features
	/* ---------------------------------------------------------------------- */
	$('#view-features, #view-features-m').on('click', function () {
		$('html, body').animate({
			scrollTop: $("#our-features").offset().top
		}, 400);

		return false;
	});

	/* ---------------------------------------------------------------------- */
	/*	Responsive menu
	/* ---------------------------------------------------------------------- */
	function dropdown(){
		var isOpen = false,
			dropBtn = $('.dropdown');
		dropBtn.click(function () {
			if (isOpen == false) {
				$('.dropdown > i').attr('class', 'fa fa-angle-up');
				$('.versions > ul').addClass('expand');
				$('.versions > ul').focus();
				isOpen = true;
			} else {
				$('.dropdown > i').attr('class', 'fa fa-angle-down');
				$('.versions > ul').removeClass('expand');
				$('.versions > ul').focusout();
				isOpen = false;
			}
		});


		dropBtn.mouseup(function () {
			return false;
		});
		$('.dropdown').mouseup(function () {
			return false;
		});
		$(document).mouseup(function () {
			if (isOpen == true) {
				$('.dropdown').hasClass('expand');
				$('.versions > ul').css('display', 'block');
					dropBtn.click();
			}
		});
	}

	dropdown();

// Defining a function to set size for #hero
	function fullscreen(){
		jQuery('header').css({
			height: jQuery(window).height()-58+'px'
		});
	}

	fullscreen();

	// Run the function in case of window resize
	jQuery(window).resize(function() {
		fullscreen();
	});


	/* ---------------------------------------------------------------------- */
	/*	Modal-box for Customize
	/* ---------------------------------------------------------------------- */
	function getmodalbox(){
		var appendthis = ("<div class='modal-overlay js-modal-close'></div>"),
			isOpen = false,
			viewModal = $('button[data-modal-id]'),
			headerHeight = $('header').height()+119+'px';
		viewModal.click(function (e) {
			if (isOpen == false) {
				e.preventDefault();
				var modalBox = $(this).attr('data-modal-id');
				$("body").append(appendthis);
				$(".modal-overlay").fadeTo(500, 0.7);
				$('#'+modalBox).css('top', headerHeight).fadeIn($(this).data());
				$(this).focus();
				isOpen = true;
			} else {
				$('.modal-box, .modal-overlay').focusout();
				isOpen = false;
			}
		});

		$(".js-modal-close").click(function(e) {
			e.preventDefault();
			$(".modal-box, .modal-overlay").fadeOut(500, function() {
				$(".modal-overlay").remove();
			});
			isOpen = false;
			return false;
		});

		viewModal.mouseup(function () {
			return false;
		});

		$('.modal-box').mouseup(function () {
			return false;
		});

		$(document).on('mouseup', '.modal-overlay', function (e) {
			if (isOpen == true) {
				e.preventDefault();
				$(".modal-box, .modal-overlay").fadeOut(500, function() {
					$(".modal-overlay").remove();
				});
				viewModal.click();
			}
		});
	}

	getmodalbox();

	/* ---------------------------------------------------------------------- */
	/*	Fill in data
	/* ---------------------------------------------------------------------- */
	$.getJSON('js/' + window.app.projectName + '.json', function (data) {
		versions = data.vers;
		selectedVersion = versions.sort(function (a, b) {
			return a.num < b.num;
		})[0];

		$('#version-dropdown').empty().append(versions.map(function (version) {
			return $('<li><a href="#">' + version.name +'</a></li>');
		}));

		$('#getjs').val(getFileLink(selectedVersion.mainJs, selectedVersion.name));
		$('#getcss').val(getFileLink(selectedVersion.mainCss, selectedVersion.name));
		updateFileList(selectedVersion);
		updateCustomLink();
		updateDropdown();
		updateModal();
		/* bindZeroClipboard(); */
	});

	/* ---------------------------------------------------------------------- */
	/*	Quick Use
	/* ---------------------------------------------------------------------- */
	$('#addTag').on('change', updateAddTag);
	$('#enableSRI').on('change', updateEnableSri);

	function updateQuickUse () {
		$('#getjs').val(getFileLink(selectedVersion.mainJs, selectedVersion.name, $('#addTag').is(':checked'), $('#enableSRI').is(':checked') && selectedVersion.sri[selectedVersion.mainJs]));
		$('#getcss').val(getFileLink(selectedVersion.mainCss, selectedVersion.name, $('#addTag').is(':checked'), $('#enableSRI').is(':checked') && selectedVersion.sri[selectedVersion.mainCss]));
	}

	function updateAddTag () {
		if (!$(this).is(':checked')) {
			$('#enableSRI').prop('checked', false);
		}

		updateQuickUse();
	}

	function updateEnableSri () {
		if ($(this).is(':checked')) {
			$('#addTag').prop('checked', true);
		} else {
			$('#addTag').prop('checked', false);
		}

		updateQuickUse();
	}

	/* ---------------------------------------------------------------------- */
	/*	Custom foundation
	/* ---------------------------------------------------------------------- */
	function updateCustomLink () {
		var links = buildLinks(getSelectedFiles(), selectedVersion, true);

		$('#customjs_form').val(links.js[0] && links.css[0] ? 'Multiple file types selected. Use the View button instead.' : links.js[0] || links.css[0]);
	}

	function updateFileList (version) {
		var files = [];

		sortFiles(version).forEach(function (file) {
			var $li = $('<li class="item"></li>');
			var link = getFileLink(file, version.name);
			var checked = file === version.mainJs || file === version.mainCss;

			if (checked) {
				$li.addClass('active');
			}

			$li
				.append(
					$('<span class="link left"></span>').text(link).attr('data-filename', file)
				)
				.append(
					$('<div class="switch right"></div>')
						.append($('<input type="checkbox">').attr({ id: link, checked: checked || undefined }))
						.append($('<label></label>').attr({ for: link }))
				);

			files.push($li);
		});

		$('#cdn-files-list').empty().append(files);

		$('#cdn-files-list li').hide().filter(':lt(5)').show();
		$('#cdn-files-list').append('<li class="showmoreless"><span><i class="fa fa-chevron-down"></i> Show more...</span><span class="less"><i class="fa fa-chevron-up"></i> Show less...</span></li>').find('li:last').click(function(){
			$(this).siblings(':gt(4)').slideToggle('fast', 'linear').end().find('span').slideToggle('fast', 'linear');
		});

	}

	/* ---------------------------------------------------------------------- */
	/*	Modal
	/* ---------------------------------------------------------------------- */
	$('#addTagM').on('change', updateTagM);
	$('#enableSRIM').on('change', updateSriM);
	$('#groupLinksM').on('change', updateGroupLinksM);

	function createModalItem (link) {
		return $(
			$('<li class="item"></li>')
				.append($('<span class="link left"></span>').text(link))
				.append($('<button class="button copy right"></button>').attr('data-clipboard-text', link).append('<i class="fa fa-copy"></i>'))
		);
	}

	function updateModal () {
		var links = buildLinks(getSelectedFiles(), selectedVersion, $('#groupLinksM').is(':checked'), $('#addTagM').is(':checked'), $('#enableSRIM').is(':checked'));

		$('#fileListM')
			.empty()
			.append(links.js.map(createModalItem))
			.append(links.css.map(createModalItem))
			.append(links.other.map(createModalItem));

		bindZeroClipboard();
	}

	function updateTagM () {
		if (!$(this).is(':checked')) {
			$('#enableSRIM').prop('checked', false);
		}

		return updateModal();
	}

	function updateSriM () {
		if ($(this).is(':checked')) {
			$('#addTagM').prop('checked', true);
			$('#groupLinksM').prop('checked', false);
		} else {
			$('#addTagM').prop('checked', false);
		}

		return updateModal();
	}

	function updateGroupLinksM () {
		if ($(this).is(':checked')) {
			$('#addTagM').prop('checked', false);
			$('#enableSRIM').prop('checked', false);
		}

		return updateModal();
	}

	/* ---------------------------------------------------------------------- */
	/*	Version dropdown
	/* ---------------------------------------------------------------------- */
	$('#version-dropdown').on('click', 'a', function () {
		selectedVersion = versions.filter(function (version) {
			return version.name === $(this).text();
		}, this)[0];

		updateFileList(selectedVersion);
		updateCustomLink();
		updateDropdown();
		updateModal();

		return false;
	});

	function updateDropdown () {
		$('#selected-version').text(selectedVersion.name);
		$('#download-link').attr('href', 'https://cdn.jsdelivr.net/' + PROJECT_NAME + '/' + selectedVersion.name + '/' + PROJECT_NAME + '.zip');
	}

	/* ---------------------------------------------------------------------- */
	/*	Copy to clipboard by either:
	/*   - setting data-clipboard-target attribute to an ID of an input whose value you want to copy
	/*   - setting data-clipboard-text to any text you want to copy
	/* ---------------------------------------------------------------------- */
	function bindZeroClipboard () {
		$('[data-clipboard-target], [data-clipboard-text]').each(function () {
			if (!this._zc) {
				this._zc = new ZeroClipboard(this);
			}
		}).off('click').on('click', function () {
			this.blur();
		});
	}

	function getFileLink (file, version, addTag, sri) {
		var link = CDN_ROOT + '/' + PROJECT_NAME + '/' + version + '/' + file;

		if (addTag || sri) {
			return CSS_PATTERN.test(link)
				? getCssLink(link, sri)
				: JS_PATTERN.test(link)
					? getScriptLink(link, sri)
					: link;
		}

		return link;
	}

	function getScriptLink (link, sriHash) {
		return sriHash
			? '<script crossorigin="anonymous" integrity="' + sriHash + '" src="' + link + '"></script>'
			: '<script src="' + link + '"></script>';
	}

	function getCssLink (link, sriHash) {
		return sriHash
			? '<link rel="stylesheet" crossorigin="anonymous" integrity="' + sriHash + '" href="' + link + '">'
			: '<link rel="stylesheet" href="' + link + '">';
	}

	function sortFiles (version) {
		return version.files.sort(function (a, b) {
			if (a === version.mainJs || a === version.mainCss || /\.map$/i.test(b)) {
				return -1;
			}

			if (b === version.mainJs || b === version.mainCss || /\.map$/i.test(a)) {
				return 1;
			}

			if (/[._-]min./i.test(a)) {
				if (/[._-]min./i.test(b)) {
					return a > b || -1;
				}

				return -1;
			}

			if (/[._-]min./i.test(b)) {
				return 1;
			}

			return a > b || -1;
		})
	}

	function buildLinks (files, version, groupLinks, addTag, sri) {
		var links = { js: [], css: [], other: [] };

		files.forEach(function (file) {
			var link = !groupLinks || sri ? getFileLink(file, version.name, addTag, sri && version.sri[file]) : file;

			if (CSS_PATTERN.test(file)) {
				links.css.push(link);
			} else if (JS_PATTERN.test(file)) {
				links.js.push(link);
			} else {
				links.other.push(link);
			}
		});

		if (!groupLinks || sri) {
			return links;
		}

		return {
			js: buildLink(links.js, version, addTag, getScriptLink),
			css: buildLink(links.css, version, addTag, getCssLink),
			other: links.other,
		};
	}

	function buildLink (files, version, addTag, linkFn) {
		if (!files.length) {
			return [];
		} else if (files.length === 1) {
			return [ getFileLink(files[0], version.name, addTag) ];
		}

		var link = CDN_ROOT + '/g/' + PROJECT_NAME + '@' + version.name + '(' + files.join('+') + ')';

		return [ addTag ? linkFn(link) : link ];
	}




})(jQuery);
