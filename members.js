$(document).ready(function() {

    'use strict';

    // preview ad
    $('.postPreview').on('click', function(e) {
        var preview = $('#preview').html(),
            entryId = $(this).data("entry"),
            entryUrl = "ajax-ads-preview/" + entryId;

        e.preventDefault();
        $('body').append(preview);
        $('#overlay').fadeIn(200);

        $.ajax({
            url: entryUrl
        }).done(function(data) {
            $('#memberModalBody').append(data);
            modal.initModal();
        });
    });

    // edit ad
    $('.postEdit').on('click', function(e) {
        var preview = $('#edit').html(),
            entryId = $(this).data("entry"),
            channel = $(this).data("channel-name"),
            entryUrl = "ajax-edit/" + channel + '/' + entryId;

        e.preventDefault();
        $('body').append(preview);
        $('#overlay').fadeIn(200);

        $.ajax({
            url: entryUrl
        }).done(function(data) {
            $('#memberModalBody').append(data);
            modal.initModal();
            $('#entry_date').datepicker({ dateFormat: "dd-M-yy" });
        });
    });

    // create ad
    $('.createAd').on('click', function(e) {
        var preview = $('#create').html(),
            entryId = $(this).data("entry"),
            entryUrl = "ajax-post/" + $(this).data('type');
        
        e.preventDefault();
        $('body').append(preview);
        $('#overlay').fadeIn(200);

        $.ajax({
            url: entryUrl
        }).done(function(data) {
            $('#memberModalBody').append(data);
            modal.initModal();   
            $('#entry_date').datepicker({ dateFormat: "dd-M-yy" });         
        });
    });

    // delete ad
    $('.deleteAd').on('click', function(e) {
        var preview = $('#delete').html(),
            entryId = $(this).data("entry"),
            channel = $(this).data("channel-name"),
            entryUrl = "ajax-delete-ad/" + channel + '/' + entryId;

        e.preventDefault();
        $('body').append(preview);
        $('#overlay').fadeIn(200);
        modal.initModal();

        $('#adDeleteConfirm').on('click', function(k) {
            var el = $('#memberModal');
            k.preventDefault();
            $.ajax({
                url: entryUrl
            }).done(function(data) {                
                el.remove();
                $('#overlay').fadeOut(200, function() {
                    window.location.href="my-ads"; 
                });
            });           
        });
    });

    // status change
    var elStatus = $('.on_off :checkbox');

    if(elStatus.length) {
        elStatus.iphoneStyle({
            checkedLabel: 'YES',
            uncheckedLabel: 'NO',
            onChange: function(elem, value) { 
                var status = $('#statusChange').html(),
                    channel = elem.data("channel-name"),
                    entryID = elem.data('entry-id');
                           
                    $('#overlay').fadeIn(200);
                    $('body').append(status);

                    $.ajax({
                        url: 'ajax-status/' + channel + '/' + entryID + '/' + value
                    }).done(function(data) {
                        $('#memberModalBody').append(data);
                        modal.initModal();
                        modal.closeModal();
                    });              
             

            }
        });
    }
    

    // edit web pages - all pages for premium acc my web section
    $('.memberMyWebCall').on('click', function(e) {
        var editAboutUs = $('#editMemberWeb').html(),
            entryId = $(this).data("entry");

        e.preventDefault();
        $('#overlay').fadeIn(200);
        $('body').append(editAboutUs);

        $.ajax({
            url: entryId
        }).done(function(data) {
            $('#memberModalBody').append(data);
            modal.initModal();
        });
    });  

    var form = $('#footerContactUsForm');

    $('.footerContactUs').on('click', function(e) {
        e.preventDefault();
        $('#footer').animate({
            bottom: 0 
        }, 600, 'easeInCirc');
    });
    $('#contactUsHide').on('click', function(ev) {
        ev.preventDefault();
        $('#footer').animate({
            bottom: -195
        }, 600, 'easeInCirc');
    });

    var modal = {

        initModal: function() {

            var el = $('#memberModal');

            el.fadeIn(200);
            
            this.closeModal();
            this.centerModal();
        },
        closeModal: function() {
            var el = $('#memberModal');

            $('.closeModal').on('click', function(e) {
                e.preventDefault();
                el.remove();
                $('#overlay').fadeOut(200);
            });
        },
        centerModal: function() {
            var el = $('#memberModal'),
                elW = el.width(),
                elH = el.height(),
                top, left;

                function alignBox() {
                    top = ((window.innerHeight || document.documentElement.clientHeight) - elH) / 2;
                    left = ((window.innerWidth || document.documentElement.clientWidth) - elW) / 2;

                    el.css({
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
      
});