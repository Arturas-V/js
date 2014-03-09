var app = app || {};

    // global modal object
    app.modalPopup = {};
    
    //journey planner 
    app.journeyPlannerApi = {};
    
    // journey planner destinations array
    app.journeyDestination = [];
    

    app = {

        init: function() {

            app.cookieNote();
            app.bannerSlider();
            app.scrollMenu();
            app.stickyMenu();
            app.locationFilter();
            app.vieFull();
            app.locationFilterType();
            app.myWebTabs();
            app.makeFavorite();        
            app.moreAds();
            app.contactUs();
            app.updateFavoriteContainer();
            app.updateStar();
            app.favoriteWidget();
            app.desktopSite();
            app.gallery();
        },        

        cookieNote: function () {
            if($.cookie('TubeMe_cookie')===undefined) {
                setTimeout(function() {
                    $('#cookie').css({"display":"block"});
                    $('#cookie').animate({
                        top: 1
                    },600, 'linear');
                },1000)            
            }

            $('#closeCookie').on('click', function() {
                $.cookie('TubeMe_cookie', 'true', {expires: 365});            
                $('#cookie').fadeOut(300);              
            });
        },

        desktopSite: function() {      
            if($.cookie('desktopSite')) {
                var el = $('#mobileSite').html();              
                $('#wrapper').append(el);  
                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
                    $('#goToMobile').show();
                }else {
                    $('#goToMobile').hide();
                }  
            }      
        },

        stickyMenu: function() {

            var stickyNavTop = $('#stickyHead').offset().top,
                stickySideBar = $('#subMenu').offset().top;  

            var stickyNav = function(){  
                var scrollTop = $(window).scrollTop();  

                if (scrollTop > stickyNavTop) {   
                    $('#stickyHead').addClass('fix');  
                } else {  
                    $('#stickyHead').removeClass('fix');   
                }  

                if (scrollTop > stickySideBar) {   
                    $('#subMenu').addClass('fix');  
                } else {  
                    $('#subMenu').removeClass('fix');   
                }
            };  

            stickyNav();  

            $(window).scroll(function() {  
                stickyNav();  
            }); 

        },

        scrollMenu: function() {
            var el = $('.locMenuBar'),
                screenH = window.innerHeight || document.documentElement.clientHeight,
                elH = screenH-300;

            el.css({
                'max-height': elH
            });        
            // stylish scroll bar for locations menu
            el.mCustomScrollbar({
                theme:"light",
                scrollInertia:150
            });
        },

        favoriteWidget: function() {
            // position favorites widget mate
            var el = $('#favoritesBlock'),
                elH = el.height(),
                top;

            function setWidget() {
                top = ((window.innerHeight || document.documentElement.clientHeight) - elH) / 2;
                el.css({
                    'top':top
                });
            }
            setWidget();
            el.fadeIn(600);

            $(window).resize(function() {
                setWidget();
            });

            // hover state for a widget
            el.on('mouseenter', function() {
                $(this).animate({
                    left: 0 
                }, 600, 'easeInCirc');
            });
            el.on('mouseleave', function() {
                $(this).animate({
                    left: -312
                }, 600, 'easeInCirc');
            });
        },

        locationFilter: function() {
            // location filter global only homepage
            $('a.mainLoc').on('click', function(e) {
                e.preventDefault();
                app.stickyMenu();
                app.smoothScroll();            
                $('#main .block, #main .paginationHide').remove();
                $('a.mainLoc').removeClass('activeLoc');
                $(this).addClass('activeLoc');           
                _gaq.push(['_trackEvent', 'Visitor action', 'Stations selected homepage', $(this).attr('id')]);


                var url = $(this).data('loc-id'),
                    copy = $(this).children('.locationName').text();                   

                $.ajax({
                    url: "ajax/ads-locations/category/" + url,
                    beforeSend: function() {
                        $('#loader').show();
                        $('#addLocTitle').empty();
                    }                
                }).done(function(data) {
                    $('#loader').hide();
                    $('#addLocTitle').append('- '+copy);
                    $(data).hide().appendTo("#mainList").fadeIn(300);
                    app.makeFavorite();
                    app.vieFull();                
                    $(window).off('scroll');
                    app.moreAds();
                    app.updateStar();
                    app.stickyMenu();
                });
            }); 
        },

        locationFilterType: function() {
            // location filter for types
            $('a.typeLoc').on('click', function(e) {           
                e.preventDefault();
                app.stickyMenu();
                app.smoothScroll();
                $('#main .block, #main .paginationHide').remove();
                $('a.typeLoc').removeClass('activeLoc');
                $(this).addClass('activeLoc');
                _gaq.push(['_trackEvent', 'Visitor action', 'Stations selected '+location.pathname+'', $(this).attr('id')]);

                var url = $(this).data('loc-id'),
                    channel= $(this).data('channel'),
                    copy = copy = $(this).children('.locationName').text();                   

                $.ajax({
                    url: "ajax/ads-locations-type/" + channel + '/' + url,
                    beforeSend: function() {
                        $('#loader').show();
                        $('#addLocTitle').empty();
                    }
                }).done(function(data) {
                    $('#loader').hide();
                    $('#addLocTitle').append('- '+copy);
                    $(data).hide().appendTo("#mainList").fadeIn(300);
                    app.makeFavorite();
                    app.vieFull();
                    $(window).off('scroll');
                    app.moreAds();
                    app.updateStar();
                    app.stickyMenu();
                });
            });
        },

        smoothScroll: function() {
            $('html,body').animate({
                scrollTop:350
            }, 1000,'swing');
        },

        vieFull: function() {
            $('.viewFullAd').on('click', function(){
                var _this = $(this),
                    dataEntry = _this.data('entry'),
                    dataTitle = _this.data('entry-title'),
                    leftItem = $('.'+dataEntry+' .blockLeftLower');

                leftItem.slideToggle();

                _gaq.push(['_trackEvent', 'Ad read - more/less', $(this).text(), dataTitle]);

                _this.parent().prev('div').slideToggle({
                    complete: function() {
                        if(_this.text() == 'more') {
                            _this.text('less');
                        }else if(_this.text() == 'less') {
                            _this.text('more');                        
                        }                           
                    }
                });

            });        
        },

        myWebTabs: function() {
            // member my web tabs
            $('#myWebMenu li span').on('click', function() {
                var tabE = $(this).data('tab');

                $('#myWebMenu li span').removeClass('activeOne');
                $(this).addClass('activeOne');
                $('.memberMyTabContent').addClass('noActiveMyWebtab');    
                $('#' + tabE + '').removeClass('noActiveMyWebtab');
                _gaq.push(['_trackEvent', 'Visitor action', 'My Page tabs', $(this).text()+' - '+window.location.pathname]);
            });
        },

        updateFavoriteContainer: function() {
            var favCont = $("#favoritesList"),
                entries = window.ge;

            favCont.empty();

            for(var i = 0; i < entries.length; i++) {
                var key = entries[i],
                    value = localStorage.getItem(key), 
                    itemTitle = JSON.parse(value).title,
                    itemUrl = JSON.parse(value).url,
                    itemId = JSON.parse(value).id,
                    itemChannel = JSON.parse(value).channel;

                $('#favNote').remove();
                favCont.append('<a id="'+itemId+'" href="'+window.siteUrl+'/'+itemUrl+'">'+itemTitle+'</a>');

            }   

            app.favoriteWidgetNotification();

        },

        favoriteWidgetNotification: function() {
            if ($('#favoritesList a').length===0) {
                $('#favoritesBlockContainer').append('<p id="favNote">Your have no favorites saved</p>');
            }
        },

        updateStar: function() {
            // update stars from local storage data 
            $('.favoriteAd').removeClass('markedFav');
            $('.favoriteAd').data('fav-title', 'Add to favorites');

            for(var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i),
                    value = localStorage.getItem(key),
                    itemId = JSON.parse(value).id;

                $('.makeFavorite span[data-id="'+itemId+'"]').addClass('markedFav');
                $('.makeFavorite span[data-id="'+itemId+'"]').data('fav-title', 'Remove favorite');
            }          
        },

        makeFavorite: function() {

            // make favorite
            var el = $('.favoriteAd'),
            tip;

            el.on('click', function() {  
                var favCont = $("#favoritesList"),
                    favUrl = $(this).data('url'),
                    favTitle = $(this).data('title'),
                    favId = $(this).data('id'),
                    favDate = $(this).data('date'),
                    favImg = $(this).data('img'),
                    store = {
                        'title': favTitle, 
                        'url': favUrl, 
                        'id': favId, 
                        'date': favDate,
                        'img': favImg
                    }; 

                if (localStorage.getItem(favId)) {
                    // removing local storage for favorites
                    $(this).addClass('unmarkedFav');
                    $(this).removeClass('markedFav'); 
                    $('.favoriteAd').data('fav-title', 'Add to favorites');
                    $(this).children('div').text('Add to favorites');
                    localStorage.removeItem(favId);
    //                app.updateFavoriteContainer(); 
                    document.getElementById(favId).remove();
                    app.favoriteWidgetNotification();
                    _gaq.push(['_trackEvent', 'Visitor action', 'Favorite removed', favTitle]);
                } else if (localStorage.getItem(favId) === null) {
                    //setting up local storage for favorites  
                    $(this).addClass('markedFav');
                    $(this).removeClass('unmarkedFav');
                    $('.favoriteAd').data('fav-title', 'Remove favorite');
                    $(this).children('div').text('Remove favorite');
                    localStorage.setItem(favId, JSON.stringify(store));
    //                app.updateFavoriteContainer();
                    favCont.append('<a id="'+favId+'" href="'+favUrl+'">'+favTitle+'</a>');
                    $('#favNote').remove();
                    _gaq.push(['_trackEvent', 'Visitor action', 'Favorite added', favTitle]);
                }
            });  
            el.on('mouseenter', function() {
                if($(this).hasClass('markedFav')){
                    $('<div class="starToolTip">Remove fovorite</div>').appendTo(this).animate({
                        marginTop: '-20px'
                    }, 'normal');
                }else {
                    $('<div class="starToolTip">Add to favorites</div>').appendTo(this).animate({
                        marginTop: '-20px'
                    }, 'normal');
                }

            });
            el.on('mouseleave', function() {
                $(this).children('div').remove();
            });          
        },

        moreAds: function(){
            var scrollFunction = function(){
                var mostOfTheWayDown = ($(document).height() - $(window).height()) - 120;

                if ($(window).scrollTop() >= mostOfTheWayDown) {
                    $(window).unbind("scroll");
                    $('.viewFullAd, .favoriteAd').unbind('click');

                    var paginateUrl = $('.block').data('paginate'),
                        el = $('a.next.paginationHide'),
                        pageN;

                    if(el.length) {
                        pageN = el.attr('href').split('P')[1]
                        listUrl = 'ajax/' + paginateUrl + '/P' + pageN;
                    }else {
                        listUrl = 'ajax';
                    }     

                    if(el.length) {
                        $.ajax({
                            url: listUrl,    
                            complete: function() {                       
                                app.stickyMenu();
                            }                 
                        }).done(function(data) {      
                            $('#main .paginationHide').remove();                      
                            $(data).hide().appendTo("#mainList").fadeIn(200);                
                            $(window).scroll(scrollFunction);
                            app.vieFull();
                            app.makeFavorite();
                            app.updateStar();
                            app.stickyMenu();
                        });
                    }else {
                        app.stickyMenu();
                        app.vieFull();
                        app.makeFavorite();
                        app.updateStar();
                        app.stickyMenu();
                    }         
                }
            };
            $(window).scroll(scrollFunction);

        },

        contactUs: function() {
            var form = $('#footerContactUsForm'),
                el = $('#footer');

            $('.footerContactUs').on('click', function(e) {
                e.preventDefault();
                el.animate({
                    bottom: 0 
                }, 600, 'easeInCirc');            
                _gaq.push(['_trackEvent', 'Visitor action', 'Contact us']);
            });
            el.on('mouseleave', function(ev) {
                ev.preventDefault();
                el.animate({
                    bottom: -195
                }, 600, 'easeInCirc');
            });
        },

        bannerSlider: function () { 

            var el = $('#banner #carousel li'),
                speed = 6000,
                go = setInterval(function () {
                    $('#banner #next').click();
                }, speed),
                imageWidth = $('#banner #carousel li').outteWidth,
                rotate;

            $('#banner #next').on('click', function() {
                $('#banner #carousel li:last').fadeOut('2500', function() {
                    $('#banner #carousel li:first').before($('#banner #carousel li:last')); 
                    $('#banner #carousel li:first').css({
                        'display':'block'
                    });
                    $('#banner #carousel li:last').prev().css({
                        'display':'block'
                    });
                });       

                return false;

            });

            $('#banner #prev').on('click', function() { 
                $('#banner #carousel li:last').after($('#banner #carousel li:first'));
                $('#banner #carousel li:last').prev().css({
                    'z-index':'10'
                });
                $('#banner .current').css({
                    'z-index':'5'
                });
                $('#banner #carousel li:last').prev().fadeOut('2500', function() {
                    el.css({
                        'z-index':'0'
                    });
                    el.css({
                        'display':'block'
                    });		        	
                });

                return false;

            });

            $('#banner #next, #banner #prev').hover(        
                function() {
                    clearInterval(go);
                }, 
                function() {
                    go = setInterval(function () {
                        $('#banner #next').click();
                    }, speed);    
                }
                ); 		        

            function rotate() {
                $('#banner #next').click();
            }

        },		
        gallery: function(){
            var gallery = $('.mygallery');

            if(gallery.length){
                $('.mygallery').tn3({
                    startWithAlbums:true,
                    autoplay:true,
                    width: 680,
                    height: 300,
                    autohideControls: true
                });  
            } 
        }
    }

$(document).ready(app.init);



