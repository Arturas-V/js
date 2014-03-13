app.modalPopup = {
    
    overLay: $('#overlayPlain'),   
    
    initModal: function(elem, msg) {
        "use strict";
        
        var item = elem.html();
        $('body').append(item);
        if(msg){
            $('#modalContentBody').append('<h3>'+msg+' required</h3>')
        }
        this.overLay.fadeIn(200);
        this.centerModal();
        this.closeModal();
    },
    closeModal: function() {
        $('.closeModal').on('click', function(e) {
            e.preventDefault();
            $('#modalBody').remove();
            app.modalPopup.overLay.fadeOut(200);
        });
    },
    centerModal: function() {        
        var item = $('#modalBody'),
        elW = item.width(),
        elH = item.height(),
        top, left;

        function alignBox() {
            top = ((window.innerHeight || document.documentElement.clientHeight) - elH) / 2;
            left = ((window.innerWidth || document.documentElement.clientWidth) - elW) / 2;

            item.css({
                'top':top-50,
                'left':left-50
            })
        }

        alignBox();

        $(window).resize(function() {
            alignBox();
        });
    }
    
}