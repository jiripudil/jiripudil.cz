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

	$.nette.ext 'confirm', {
		init: ->
			$(document).on 'click', '[data-confirm]', (e) ->
				if ! confirm $(this).data 'confirm'
					e.preventDefault()
	}

	$.nette.ext 'antispam', {
		init: ->
			$input = $ '[data-antispam]'
			$input.val ''
			$input.attr 'value', null
			$input.parents('p').addClass 'hidden'
	}

	$.nette.init()

	# webfont loader
	window.WebFontConfig =
		google:
			families: [
				'PT Sans:400,700:latin,latin-ext'
				'Lora:400,700:latin,latin-ext'
			]
		timeout: 2000

	((d) ->
		wf = d.createElement 'script'
		s = d.scripts[0]
		wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js'
		s.parentNode.insertBefore wf, s
		return
	) document

	return
