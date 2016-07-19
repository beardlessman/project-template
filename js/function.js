$(document).on('ready', function () {
    $('.j-menu').each(function () {
        new Menu(this);
    });
    $('.j-tabs-container').each(function(){
        new Tabs(this);
    });
    $('.j-changedInput-container').each(function(){
        new ChangedFormInput(this);
    });
    $('.j-rowToHide').each(function(){
        new RowToHide(this);
    });
    $('.j-popup-overlay').each(function(){
        new Popup(this);
    });
    $('.j-input-num').each(function(){
        new InputNum(this);
    });
    $('.j-purchase').each(function(){
        new Purchase(this);
    });
    $('.j-dotted').each(function () {
        $(this).dotdotdot({
        	height: 51
        });
    });
    // Custom select
    $('.j-select').selectik({
        maxItems: 5,
        smartPosition: false,
        speedAnimation: 0
    });
    $('.j-spoiler').each(function(){
        new Spoiler(this);
    });
    $('.j-fixed-header').each(function(){
        new FixedHeader(this);
    });
    $('.j-gallery').colorbox({rel:'j-gallery', transition:"fade"});

    $('.j-product-counter').each(function(){
        new ProductCounter(this);
    });
    $('.j-popupMenu-container').each(function(){
        new PopupMenu(this);
    });

    var searchContainer = $('.j-search-form');
    if(searchContainer.length > 0) {
        new Search(this);
    }
});


/* Menu */
	Menu = function (container) {
	    this.container = $(container);
	    this.links = this.container.find('.j-menu-link');
	    this.rows = this.container.find('.j-menu-row');
	    this.columns = this.container.find('.j-menu-column');
	    this.blocks = this.container.find('.j-menu-body');

	    this.init();
	};

	Menu.prototype.init = function () {
	    var cmp = this;

	    cmp.links.on('click', function (e) {
	        var $this = $(this);
	        if($(window).width() < 1025 - GetScrollBarWidth()){
	            e.preventDefault();
	            var block = $this.parents('.j-menu-column').find('.j-menu-body');
	            if(!$this.hasClass('_opened')){
	                cmp.links.removeClass('_opened');
	                var row = $this.parents('.j-menu-row');
	                if(row.hasClass('_opened')){
	                    TweenMax.to(row,
	                        0.3,
	                        {
	                            height: 50,
	                            delay: 0,
	                            ease: Power2.easeOut
	                        }
	                    );
	                    TweenMax.to(cmp.blocks,
	                        0.3,
	                        {
	                            opacity: 0,
	                            delay: 0,
	                            ease: Power2.easeIn,
	                            onComplete: function () {
	                                cmp.blocks.css({visibility: "hidden"});
	                                block.css({visibility: 'visible'});
	                            }
	                        }
	                    );
	                    TweenMax.to(row,
	                        0.3,
	                        {
	                            height: 50 + block.height(),
	                            delay: 0.3,
	                            ease: Power2.easeOut
	                        }
	                    );
	                    TweenMax.to(block,
	                        0.3,
	                        {
	                            opacity: 1,
	                            delay: 0,
	                            ease: Power2.easeOut
	                        }
	                    );
	                    $this.addClass('_opened');
	                }
	                else{
	                    cmp.rows.removeClass('_opened');
	                    row.addClass('_opened');
	                    TweenMax.to(cmp.rows,
	                        0.3,
	                        {
	                            height: 50,
	                            delay: 0,
	                            ease: Power2.easeOut
	                        }
	                    );
	                    TweenMax.to(cmp.blocks,
	                        0.3,
	                        {
	                            opacity: 0,
	                            delay: 0,
	                            ease: Power2.easeIn,
	                            onComplete: function () {
	                                cmp.blocks.each(function () {
	                                    var tmp = $(this);
	                                    if(!tmp.is(block)){
	                                        tmp.css({visibility: "hidden"});
	                                    }
	                                });
	                            }
	                        }
	                    );
	                    TweenMax.to(row,
	                        0.3,
	                        {
	                            height: 50 + block.height(),
	                            delay: 0,
	                            ease: Power2.easeOut
	                        }
	                    );
	                    block.css({visibility: 'visible'});
	                    TweenMax.to(block,
	                        0.3,
	                        {
	                            opacity: 1,
	                            delay: 0,
	                            ease: Power2.easeOut
	                        }
	                    );
	                    $this.addClass('_opened');
	                }
	            }
	            else{
	                cmp.links.removeClass('_opened');
	                cmp.rows.removeClass('_opened');
	                TweenMax.to(cmp.rows,
	                    0.3,
	                    {
	                        height: 50,
	                        delay: 0,
	                        ease: Power2.easeOut
	                    }
	                );
	                TweenMax.to(block,
	                    0.3,
	                    {
	                        opacity: 0,
	                        delay: 0,
	                        ease: Power2.easeIn,
	                        onComplete: function () {
	                            block.css({visibility: "hidden"})
	                        }
	                    }
	                );
	            }
	        }
	    });

	    $(window).on('resize', function () {
	        if($(window).width() >= 1025 - GetScrollBarWidth()) {
	            cmp.rows.removeAttr('style');
	            cmp.links.removeClass('_opened');
	            cmp.rows.removeClass('_opened');
	        }
	        else{
	            cmp.blocks.css({bottom: "0"});
	        }
	    });

	    if(!navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
	        cmp.columns.on('mouseenter', function () {
	            if($(window).width() >= 1025 - GetScrollBarWidth()) {
	                var column = $(this);
	                var link = column.find('.j-menu-link');
	                var block = column.find('.j-menu-body');
	                block.css({visibility: "visible"});
	                TweenMax.to(block,
	                    0.3,
	                    {
	                        bottom: -1 * block.height(),
	                        opacity: 1,
	                        delay: 0,
	                        ease: Power2.easeOut
	                    }
	                );
	            }
	        });

	        cmp.columns.on('mouseleave', function () {
	            if($(window).width() >= 1025 - GetScrollBarWidth()) {
	                var column = $(this);
	                var link = column.find('.j-menu-link');
	                var block = column.find('.j-menu-body');
	                TweenMax.to(block,
	                    0.3,
	                    {
	                        bottom: 0,
	                        opacity: 0,
	                        delay: 0,
	                        ease: Power2.easeOut,
	                        onComplete: function () {
	                            block.css({visibility: "hidden"});
	                        }
	                    }
	                );
	            }
	        });
	    }
	};
/* /Menu */

/* tabs */

	Tabs = function(container) {
	    this.container = $(container);
	    this.tabsCollection = this.container.find('.j-tab');
	    this.tabsBlocksCollection = this.container.find('.j-tabs-body');
	    this.init();
	};

	Tabs.prototype.init = function() {
	    var cmp = this;
	    cmp.tabsCollection.bind('click.tab', function(e){
	        e.preventDefault();
	        if(!$(this).hasClass('active')) {
	            cmp.tabsCollection.removeClass('active');
	            $(this).addClass('active');
	            cmp.tabsBlocksCollection.hide();
	            $('#' + $(this).attr('data-id')).fadeIn(300);
	        }
	    });
	};
/* /tabs */

/* get scrollbar width */
	GetScrollBarWidth = function() {
	    var inner = document.createElement('p');
	    inner.style.width = "100%";
	    inner.style.height = "200px";

	    var outer = document.createElement('div');
	    outer.style.position = "absolute";
	    outer.style.top = "0px";
	    outer.style.left = "0px";
	    outer.style.visibility = "hidden";
	    outer.style.width = "200px";
	    outer.style.height = "150px";
	    outer.style.overflow = "hidden";
	    outer.appendChild (inner);

	    document.body.appendChild (outer);
	    var w1 = inner.offsetWidth;
	    outer.style.overflow = 'scroll';
	    var w2 = inner.offsetWidth;
	    if (w1 == w2) w2 = outer.clientWidth;

	    document.body.removeChild (outer);

	    return (w1 - w2);
	};
/* /get scrollbar width */

/* ChangedFormInput */
	ChangedFormInput = function(container){
	    this.container = $(container);
	    this.input = this.container.find('.j-changed-input');
	    this.link = this.container.find('.j-changed-link');
	    this.text = this.container.find('.j-changed-text');
	    
	    this.init();
	};
	ChangedFormInput.prototype.init = function() {
	    var cmp = this;
	    
	    if(cmp.container.hasClass('_filled')) {
	        cmp.input.hide();
	    } else {
	        cmp.link.hide();
	        cmp.text.hide();
	    }

	    cmp.link.on('click', function(e){
	        e.preventDefault();
	        var target = $(e.target);
	        if(target.hasClass('cancel')) {
	            cmp.container.addClass('_filled');
	            cmp.text.toggle();
	            cmp.input.toggle();
	            cmp.link.text("Изменить").removeClass('cancel');    
	        } else {
	            cmp.container.removeClass('_filled');
	            cmp.text.toggle();
	            cmp.input.toggle().focus();
	            cmp.link.text("Отменить").addClass('cancel');
	        }
	    });
	    
	};
/* /ChangedFormInput */

/* Row To Hide */
	RowToHide = function(container){
	    this.container = $(container);
	    this.delBtn = this.container.find('.j-rowToHide-delete');

	    this.init();
	};

	RowToHide.prototype.init = function(){
	    var cmp = this;

	    cmp.delBtn.on('click', function (e) {
	        e.preventDefault();
	        TweenMax.to(cmp.container,
	            0.3,
	            {
	                height: 0,
	                delay: 0,
	                ease: Power2.easeOut,
	                onComplete: function () {
	                    cmp.container.remove();
	                }
	            }
	        );
	    });
	};
/* /Row To Hide */

/* Overlay */
	Overlay = function (){};

	Overlay.show = function ()
	{
	    $ ('body').append ('<div class="overlay j-overlay"></div>');
	};

	Overlay.hide = function ()
	{
	    var overlay = $ ('.j-overlay');
	    if (overlay.length > 0) {
	        overlay.remove ();
	    }
	};
/* /Overlay */

/* Popup */
	function Popup(popupContainer){
	    this.popupContainer = $(popupContainer);
	    this.popupLink = $('[rel="' + this.popupContainer.attr('id') + '"]');
	    this.popup = this.popupContainer.find('.j-popup');
	    this.closeLink = this.popupContainer.find('.j-close-popup');

	    this.body = $('body');
	    this.paddedElem = $('.j-padded-element');
	    this.scrollBarWidth = GetScrollBarWidth();

	    this.init();
	};
	/*
	Popup.prototype.init = function(){
	    var cmp = this;

	    cmp.popupLink.on('click.popup', function(){
	        cmp.show();
	        return false;
	    });

	    $(document).on('show.popup', function(e){
	        if(e.targetId == cmp.popupContainer.attr('id')) {
	            cmp.show();
	        }
	    });

	    cmp.closeLink.on('click.popup', function(){
	        var tmp = parseInt(cmp.body[0].style.top,10);
	        cmp.hide();
	        window.scrollTo(0, -tmp);
	        return false;
	    });

	    $(document).on('closePopup', function(){
	        cmp.hideSingle();
	    })
	};
	*/
	Popup.prototype.init = function(){
	    var cmp = this;

	    cmp.popupLink.on('click.popup', function(){
	        cmp.show();
	        return false;
	    });

	    $(document).on('showPopup.popup', function(e){
	        if(e.rel == cmp.popupLink.attr('rel')) {
	            cmp.show();
	        }
	    });

	    cmp.closeLink.on('click.popup', function(){
	        cmp.hide();
	        return false;
	    });

	    cmp.popupContainer.on('click.popup', function(e){
	        if($(e.target).is(cmp.popupContainer)) {
	            cmp.hide();
	            return false;
	        }
	    });

	    $(document).on('closePopup', function(){
	        cmp.hideSingle();
	    })
	};

	Popup.prototype.show = function (){
	    var cmp = this;

	    if(cmp.popupLink.data('modal')) $.event.trigger({type: "closePopup"});
	    cmp.popupContainer.show();
	    this.popup.removeClass('animated bounce-in').addClass('animated bounce-in').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	        $(this).removeClass('animated bounce-in');
	    });
	    cmp.body.css({overflow: "hidden", paddingRight: GetScrollBarWidth(), position: "fixed", left: 0, top: -$(window).scrollTop()+'px', right: 0, bottom: 0});
	    cmp.paddedElem.css({right: this.scrollBarWidth});
	    if(!cmp.popupLink.data('modal')) Overlay.show();
	};

	Popup.prototype.hideSingle = function (){
	    var cmp = this;

	    cmp.popupContainer.removeAttr('style');

	    cmp.popup.removeClass('animated bounce-in').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	        $(this).removeClass('animated bounce-in');
	    });
	    cmp.body.removeAttr('style');
	    cmp.paddedElem.removeAttr('style');
	};

	Popup.prototype.hide = function (){
	    var cmp = this;

	    Overlay.hide();
	    cmp.popupContainer.removeAttr('style');
	    cmp.popup.removeClass('animated bounce-in').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	        $(this).removeClass('animated bounce-in');
	    });
	    cmp.body.removeAttr('style');
	    cmp.paddedElem.removeAttr('style');
	};
/* /Popup */

/* Input Number +/- */
	InputNum = function(container){
	    this.container = $(container);
	    this.input = this.container.find('.j-input-num__input');
	    this.minus = this.container.find('.j-input-num__minus');
	    this.plus = this.container.find('.j-input-num__plus');
	    this.init();
	};

	InputNum.prototype.init = function(){
	    var cmp = this;

	    cmp.minus.on('click', function(e) {
	        e.preventDefault();
	        var count = parseInt(cmp.input.val());
	        if(isNaN(count) || count == 0){
	            count = 1;
	        }
	        else{
	            count--;
	        }
	        count = count < 1 ? 1 : count;
	        cmp.input.val(count);
	        cmp.input.change();
	        return false;
	    });
	    cmp.plus.on('click', function(e) {
	        e.preventDefault();
	        var count = parseInt(cmp.input.val());
	        if(isNaN(count) || count == 0){
	            count = 1;
	        }
	        else{
	            count++;
	        }
	        cmp.input.val(count);
	        cmp.input.change();
	        return false;
	    });
	};
/* /Input Number +/- */

/* Purchase */
	Purchase = function(container){
	    this.container = $(container);
	    this.num = this.container.find('.j-purchase-num');
	    this.cost = this.container.find('.j-purchase-cost');
	    this.res = this.container.find('.j-purchase-result');

	    this.init();
	};

	Purchase.prototype.init = function(){
	    var cmp = this;

	    cmp.num.on('input', function () {
	        var tmp = parseInt(cmp.cost.text(),10)*parseInt(cmp.num.val(),10);
	        if(isNaN(tmp)){
	            tmp = 0;
	        }
	        if(tmp < 0){
	            tmp = 0;
	        }
	        cmp.res.text(tmp);
	    });

	    cmp.num.on('change', function () {
	        var tmp = parseInt(cmp.cost.text(),10)*parseInt(cmp.num.val(),10);
	        if(isNaN(tmp)){
	            tmp = 0;
	        }
	        if(tmp < 0){
	            tmp = 0;
	        }
	        cmp.res.text(tmp);
	    });
	};
/* /Purchase */
/* /tabs */

/* spoiler */
	Spoiler = function(container) {
	    this.container = $(container);
	    this.head = this.container.find('.j-spoiler-head');
	    this.body = this.container.find('.j-spoiler-body');
	    this.close = this.container.find('.j-spoiler-close');
	    this.init();
	};

	Spoiler.prototype.init = function() {
	    var cmp = this;
	    cmp.body.hide();
	    cmp.head.on('click', function(e){
	        e.preventDefault();
	        var target = $(e.target);
	        $(this).toggleClass('active');
	        cmp.body.toggle();    
	    });
	    cmp.close.on('click', function(e){
	        e.preventDefault();
	        cmp.body.toggle();
	        cmp.head.toggleClass('active');
	    });
	};
/* /spoiler */


/* FixedHeader */
	FixedHeader = function(container){
	    this.container = $(container);
	    this.hiddenPoint = 150;
	    this.changingPoint = 240;
	    this.wnd = $(window);

	    this.init();
	};

	FixedHeader.prototype.init = function(){
	    var cmp = this;

	    if(cmp.wnd.scrollTop() >= cmp.changingPoint){
	        cmp.container.addClass('_fixed');
	    }

	    cmp.wnd.on('scroll', function(){
	        if(cmp.wnd.scrollTop() >= cmp.hiddenPoint && !cmp.container.hasClass('_fixed')){
	            cmp.container.addClass('_fixed').addClass('_fixed-hidden');
	            setTimeout(function(){
	                cmp.container.removeClass('_fixed-hidden');
	            },1);
	        }
	        else if(cmp.wnd.scrollTop() < cmp.hiddenPoint){
	            cmp.container.removeClass('_fixed-hidden').removeClass('_fixed');
	        }
	    });
	};
/* /FixedHeader */

/* Product counter */
	function ProductCounter(container){
	    this.container = $(container);
	    this.default = this.container.find('.j-product-counter-default');
	    this.input = this.container.find('.j-product-counter-input');
	    this.ending1 = this.container.data('ending1');
	    this.ending2 = this.container.data('ending2');
	    this.ending3 = this.container.data('ending3');
	    this.amount = parseFloat(this.container.data('amount'));
	    this.value = parseInt(this.container.data('value'), 10);
	    this.units = this.container.data('units');

	    this.init();
	};

	ProductCounter.prototype.init = function(){
	    var cmp = this;

	    cmp.control = $(cmp.getHTML());
	    cmp.decButton = cmp.control.find('.j-product-counter-dec');
	    cmp.incButton = cmp.control.find('.j-product-counter-inc');
	    cmp.txt = cmp.control.find('.j-product-counter-txt');

	    cmp.container.append(cmp.control);

	    cmp.input.val(cmp.value);
	    if(cmp.value > 0) {
	        cmp.default.hide();
	        cmp.control.show();
	        cmp.txt.text(cmp.getTxt());
	    }


	    cmp.default.on('click', function(e){
	        e.preventDefault();
	        cmp.default.hide();
	        cmp.control.fadeIn(300);
	        cmp.value = 1;
	        cmp.txt.text(cmp.getTxt());
	        cmp.input.val(cmp.value);
	    });

	    cmp.decButton.on('click', function(e){
	        e.preventDefault();
	        cmp.value--;
	        cmp.input.val(cmp.value);
	        if(cmp.value == 0) {
	            cmp.control.hide();
	            cmp.default.fadeIn(300);
	        } else {
	            cmp.txt.text(cmp.getTxt());
	        }
	    });
	    cmp.incButton.on('click', function(e){
	        e.preventDefault();
	        cmp.value++;
	        cmp.input.val(cmp.value);
	        cmp.txt.text(cmp.getTxt());
	    });
	};

	ProductCounter.prototype.getHTML = function(){
	    var cmp = this;

	    return '<span class="product-counter__helper j-product-counter-helper">' +
	        '<span class="product-counter__dec j-product-counter-dec"></span>' +
	        '<span class="product-counter__txt j-product-counter-txt"></span>' +
	        '<span class="product-counter__inc j-product-counter-inc"></span>' +
	        '</span>';
	};

	ProductCounter.prototype.getCase = function (num, ending1, ending2, ending3) {
	    var mod100 = num % 100;
	    var mod10 = num % 10;
	    if (mod100 >= 5 && mod100 <= 20 || mod10 == 0 || (mod10 >= 5 && mod10 <= 9)) {
	        return ending3;
	    } else if (mod10 == 1) {
	        return ending1;
	    } else {
	        return ending2;
	    }
	};

	ProductCounter.prototype.getTxt = function () {
	    var cmp = this;
	    if (cmp.amount > 0) {
	        return cmp.value + ' ' + cmp.getCase(cmp.value, cmp.ending1, cmp.ending2, cmp.ending3) + ' (' + (cmp.amount*cmp.value) + ' ' + cmp.units + ')';    
	    } else {
	        return cmp.value;
	    }
	    
	};
/* /Product counter */

/* popup-menu */
	PopupMenu = function(container) {
	    this.container = $(container);
	    this.link = this.container.find('.j-popupMenu-link');
	    this.body = this.container.find('.j-popupMenu-body');
	    this.body.hide();
	    this.init();
	};

	PopupMenu.prototype.init = function() {
	    var cmp = this;

	     cmp.link.on('click', function(e) {
	        e.preventDefault();
	        cmp.body.toggle(200);
	        cmp.link.toggleClass('_active');
	    });

	    $(document).on('click', function(e) {
	        if(!$(e.target).is(cmp.body) && !$(e.target).is(cmp.link) && !$(e.target).parents().is(cmp.body) && !$(e.target).parents().is(cmp.link)) {
	            cmp.body.hide(200);
	            cmp.link.removeClass('_active');
	        }
	    });
	};
/* popup-menu */

/* Search */
	Search = function(container){
	    this.container = $(container);
	    this.link = this.container.find('.j-search-link');
	    this.field = this.container.find('.j-search-field');
	    this.input = this.container.find('.j-search-input');
	    this.reset = this.container.find('.j-search-reset');

	    this.init();
	};

	Search.prototype.init = function() {
	    var cmp = this;

	    cmp.link.on('click', function(e){
	        e.preventDefault();
	        cmp.field.addClass('_vis');
	    });

	    cmp.reset.on('click', function(e){
	        e.preventDefault();
	        if(cmp.input.val() == "") {
	            cmp.field.removeClass('_vis');
	        } else {
	            cmp.input.val("");
	        }
	    });

	    $(document).on('click', function(e){
	        var target = $(e.target);
	        if(
	            !target.is('.j-search-field') &&
	            target.parents('.j-search-field').length == 0 &&
	            !target.is('.j-search-link')
	        ) {
	            cmp.field.removeClass('_vis');
	            cmp.input.val("");
	        }
	    });

	};
/* Search */