var app = {

    init: function() {        
        app.desktopSite();
    },
    
    desktopSite: function () {           
        if ($.cookie('desktopSite') === undefined) {
            $.cookie('desktopSite', 'set', { expires: 7 });
        }        
    },

    makeFavorite: function () {
        
        var el = $('#makeFavoriteMobile'),
            text = $('#makeFavoriteMobile .ui-btn-inner .ui-btn-text');
        
        el.on('tap', function(e) { 
            e.preventDefault();
            var favUrl = $(this).data('url'),
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
                text.text('Add to favorites');
                localStorage.removeItem(favId);
                _gaq.push(['_trackEvent', 'Visitor action - mobile', 'Favorite removed', favTitle]);
            } else if (localStorage.getItem(favId) === null) {
                //setting up local storage for favorites  
                text.text('Remove from favorites');
                localStorage.setItem(favId, JSON.stringify(store));
                _gaq.push(['_trackEvent', 'Visitor action - mobile', 'Favorite removed', favTitle]);
            }
        });
        
    },
    
    updateFavoriteButton: function () {     
        // update text to favorite button hehe :)
        var el = $('#makeFavoriteMobile'),
            text = $('#makeFavoriteMobile .ui-btn-inner .ui-btn-text'),
            favId = el.data('id');
        if (localStorage.getItem(favId)) {
            text.text('Remove from favorites');
        } else if (localStorage.getItem(favId) === null) {
            text.text('Add to favorites');
        }
    },
    
    favoritesPageUpdate: function () {        
        var favCont = $('#favoritesListContainer'),
            localStorageKeys = Object.keys(localStorage),
            entries = window.oe;       
            favCont.empty();  
        
        function getMatch(a, b) {
            var matches = [];
            for ( var i = 0; i < a.length; i++ ) {
                for ( var e = 0; e < b.length; e++ ) {
                    if ( a[i] === b[e] ) matches.push( a[i] );
                }
            }
            return matches;
        }

        //localstorage entries
        var localEntries = getMatch(localStorageKeys, entries);    
           
        // if no favorites 
        if(localStorage.length<1) {
            favCont.append('<li>You have no favorites saved</li>');      
        } else if (localStorage.length>=1) {
            // update list , wicked is it not :)
            for(var i = 0; i < localEntries.length; i++) {
                var key = localEntries[i],
                    value = localStorage.getItem(key), 
                    itemTitle = JSON.parse(value).title,
                    itemUrl = JSON.parse(value).url,
                    itemId = JSON.parse(value).id,
                    itemDate = JSON.parse(value).date,
                    itemImg = JSON.parse(value).img;

                favCont.append('<li id="'+itemId+'" class="'+key+'"><a href="'+window.siteUrl+'/mobile/page/'+itemUrl+'"><p><strong>'+itemDate+'</strong></p><img width="80" height="80" src="'+itemImg+'" /><h3>'+itemTitle+'</h3></a></li>');         
            }         
            
            favCont.listview("refresh");
            $('li.addToHome').remove(); // hack to remove "add to home" widget local storage 
        }         
    },
    
    journeyPlannerDatesMob: function() {
        var month=new Array(12),
            weekday=new Array(7),
            dateSelect = $('#journeyDateMob');
            
            month[0]="Jan";
            month[1]="Feb";
            month[2]="Mar";
            month[3]="Apr";
            month[4]="May";
            month[5]="Jun";
            month[6]="Jul";
            month[7]="Aug";
            month[8]="Sep";
            month[9]="Oct";
            month[10]="Nov";
            month[11]="Dec";

            weekday[0]="Sun";
            weekday[1]="Mon";
            weekday[2]="Tue";
            weekday[3]="Wed";
            weekday[4]="Thu";
            weekday[5]="Fri";
            weekday[6]="Sat";

        for(i=0;i<31;i++){
            var date = new Date();
            date.setDate(date.getDate() + i);

            var dateMsg = weekday[date.getDay()]+' '+date.getDate()+' '+ (month[date.getMonth()]);
            dateSelect.append('<option>'+dateMsg+'</option');
        }
       
    }
}

$(document).bind('pageinit', function(){ 
    $('.singleItemButton').on('tap', function(){
        app.updateFavoriteButton();
    });  
    app.init(); 
    //$.mobile.ajaxEnabled = false;
    $('#favorites').on('pageshow', function() {
        app.favoritesPageUpdate();
    });
    $('#page').on('pageshow', function() {
        app.updateFavoriteButton();
        app.makeFavorite();
    });
    $('#journeyPlannerPage').on('pageshow', function(){
        app.journeyPlannerDatesMob();
        $('#moreTravelOptMob').on('tap', function() {
            $('#moreTravelOptions').slideToggle();
        });
    });
});
$(document).on('pageshow', function() {
    _gaq.push(['_trackPageview']);
    
//    function onUpdateReady() {
//        window.applicationCache.update();
//    }
//    window.applicationCache.addEventListener('cached', onUpdateReady);
//    if(window.applicationCache.status === window.applicationCache.CACHED) {
//        onUpdateReady();
//    }    
});
