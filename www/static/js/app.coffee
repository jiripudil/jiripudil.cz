$ ->
	$.nette.ext 'spinner',
		start: (xhr, settings) ->
			if settings.nette && settings.nette.el.is '[data-ajax-spinner]'
				settings.nette.el.parents('.spinnerWrap').append('<div class="spinnerOverlay"></div><div class="spinner"></div>')
				return
		complete: (xhr, status, settings) ->
			if settings.nette && settings.nette.el.is '[data-ajax-spinner]'
				settings.nette.el.parents('.spinnerWrap').find('.spinnerOverlay, .spinner').remove()
				return

	$.nette.ext 'load', false
	$.nette.ext 'init', false
	$.nette.ext 'init', {
		load: (rh) ->
			$(document).off('click.nette', this.linkSelector, rh).on('click.nette', this.linkSelector, rh)
			$(document).off('submit.nette', this.formSelector, rh).on('submit.nette', this.formSelector, rh)
			$(document).off('click.nette', this.buttonSelector, rh).on('click.nette', this.buttonSelector, rh)
	}, {
		linkSelector: 'a.ajax'
		formSelector: 'form.ajax'
		buttonSelector: 'input.ajax[type="submit"], button.ajax[type="submit"], input.ajax[type="image"]'
	}

	$.nette.init()

	return
