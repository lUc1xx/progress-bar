"use strict";
import $ from "jquery";
import 'is-in-viewport'

export class ProgressBar {
	constructor(selector, options) {
		this.$el 			 	= document.querySelector(selector)
		this.items			 	= options.items
		this.progressPosition   = '0%'
		this.progressHeight     = `${100 / this.items.length}%`
		this.as     			= options.animationSpeed ?? 0
		this.blockStart			= options.classStart ? $(`${options.classStart}`)  : $('.start')
		this.blockEnd			= options.classEnd 	 ? $(`${options.classEnd}`)	   : $('.end')

		this.#render()
		this.#appear()
	}

	#render() {
		this.$el.innerHTML = getTemplate(this.items, this.progressPosition, this.progressHeight)
	}

	#appear() {
		this.items.forEach( (item) => {
			let blockId 		= item.blockId,
				progressLink 	= $(`.progress-bar__list a[href="${item.blockId}"]`),
				headerHeight    = 0;

			progressLink.on('click', (e) => {
		  		e.preventDefault()
		  		$('html, body').animate({scrollTop: $(blockId).offset().top - headerHeight + 'px'}, this.as);
		  	})
		});

		this.items.forEach( (item) => {

			$(window).bind('mousewheel DOMMouseScroll MozMousePixelScroll wheel scroll', (event) => {
			  	let block 			= $(item.blockId),
			  		progressLink 	= $(`.progress-bar__list a[href="${item.blockId}"]`),
			  		progressLinks   = $(`.progress-bar__list a`);

			  	if ( this.blockStart.is( ':in-viewport(300)' ) || this.blockEnd.is( ':in-viewport(300)' ) ) {
		  			this.$el.classList.remove('active')
		  		}

		  		if ( block.is( ':in-viewport(-300)' ) ) {
		  			this.$el.classList.add('active')
		  			progressLinks.removeClass('active')
				    progressLink.addClass('active')

				    this.progressPosition = `${100 / this.items.length * ( item.positionProgress - 1) }%`
				    $('#progress-bar-el').css({top: this.progressPosition})
		  		}
			});
		});
	}
}

const getTemplate = (data, progressPosition, progressHeight) => {

	const items = data.map(item => {
		return `<a href="${item.blockId}">${item.text}</a>`
	})
	return `
		<div class="progress-bar__line">
			<span id="progress-bar-el" style="top:${progressPosition}; height: ${progressHeight}"></span>
		</div>
		<div class="progress-bar__list">
			${items.join('')}
		</div>
	`
}
