$(document).on('ready', function () {
    $('.j-menu').each(function () {
        new Menu(this);
    });
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