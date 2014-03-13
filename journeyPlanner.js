app.journeyPlannerApi = {
    
    init: function() {
        "use strict";
        
        app.journeyPlannerApi.initChoosen();
        app.journeyPlannerApi.journeyPlannerDates();        
        app.journeyPlannerApi.journeyPlanner();
        app.journeyPlannerApi.journeyPlannerSubmit();        
    },    
    
    initChoosen: function() {     
        app.journeyPlannerApi.journeyPlannerDates();
        app.journeyPlannerApi.setJourneyTime();      
        
        $(".topRightWidgets form select").chosen({disable_search_threshold: 10000});
        $('#journeyDateSelection .chosen-container-single .chosen-single span').text('Today');
    },
    
    setJourneyTime: function() {
        var date = new Date();
            mins = date.getMinutes(),
            hours = date.getHours(),
            exMins = "00";
            
        if( mins>=0 && mins<=10 ) {
            exMins = "15"; 
        }else if( mins>=11 && mins<=25 ) {
            exMins = "30";
        }else if( mins>=26 && mins<=40 ) {
            exMins = "45";
        }else if( mins>=41 && mins<=59 ) {
            exMins = "00";
            hours = date.getHours()+1;
        }
           
        var timeStr = hours.toString()+exMins;
        $('#journeyTime').find('option[value="'+timeStr+'"]').attr('selected','selected');
    },
        
    journeyPlanner: function() {
        var moreOption = $('#travelMoreOptions'),
            optionsBlock = $('.topRightWidgets #journeyMoreOptions'),
            optionItem = $('.topRightWidgets #journeyMoreOptions ul li span'),
            journeyOption = $('.journeyOptionBtn');

        function destinations() {
            $( "#travelFrom, #travelTo" ).autocomplete({
                source: app.journeyDestination,
                delay: 0
            });         
        }

        destinations();

        journeyOption.on('click', function() {          
            $(this).siblings().removeClass('activeJourneyType');
            $(this).addClass('activeJourneyType');     
        });

        optionItem.on('click', function() {
            if($(this).hasClass('selectedMOT')){
                $(this).removeClass('selectedMOT').addClass('exOption');
            }else if(!($(this).hasClass('selectedMOT'))){
                $(this).addClass('selectedMOT').removeClass('exOption');
            }
        });

        moreOption.on('click', function(e){
            e.preventDefault();
            if(optionsBlock.hasClass('hiddenOptions')){
                optionsBlock.show();
                $(this).addClass('activeOptionsBtn');
                optionsBlock.removeClass('hiddenOptions');
            }else if(!(optionsBlock.hasClass('hiddenOptions'))){
                optionsBlock.hide();
                $(this).removeClass('activeOptionsBtn');
                optionsBlock.addClass('hiddenOptions');
            }

        });
    },
    
    journeyPlannerDates: function() {
        var month=new Array(12),
            weekday=new Array(7),
            monthNum=new Array(12),
            dayNum=new Array(),
            dateSelect = $('#journeyDate');

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

            monthNum[0]="01";
            monthNum[1]="02";
            monthNum[2]="03";
            monthNum[3]="04";
            monthNum[4]="05";
            monthNum[5]="06";
            monthNum[6]="07";
            monthNum[7]="08";
            monthNum[8]="09";
            monthNum[9]="10";
            monthNum[10]="11";
            monthNum[11]="12";

            dayNum[1]="01";
            dayNum[2]="02";
            dayNum[3]="03";
            dayNum[4]="04";
            dayNum[5]="05";
            dayNum[6]="06";
            dayNum[7]="07";
            dayNum[8]="08";
            dayNum[9]="09";
            dayNum[10]="10";
            dayNum[11]="11";
            dayNum[12]="12";
            dayNum[13]="13";
            dayNum[14]="14";
            dayNum[15]="15";
            dayNum[16]="16";
            dayNum[17]="17";
            dayNum[18]="18";
            dayNum[19]="19";
            dayNum[20]="20";
            dayNum[21]="21";
            dayNum[22]="22";
            dayNum[23]="23";
            dayNum[24]="24";
            dayNum[25]="25";
            dayNum[26]="26";
            dayNum[27]="27";
            dayNum[28]="28";
            dayNum[29]="29";
            dayNum[30]="30";
            dayNum[31]="31";

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

            var dateMsg = weekday[date.getDay()]+' '+date.getDate()+' '+month[date.getMonth()];

            dateSelect.append('<option value="'+date.getUTCFullYear()+monthNum[date.getMonth()]+dayNum[date.getUTCDate()]+'">'+dateMsg+'</option>');
        }
        $('#journeyDate option:nth-child(1)').text('Today');
        $('#journeyDate option:nth-child(2)').text('Tomorrow');
    },
    
    journeyPlannerSubmit: function() {
        var submitPlanner = $('#planJourneySubmit'),
            modalPopup = $('#modalPopup');

        submitPlanner.on('click', function(e) {
            e.preventDefault();    
            
            var travelFrom = $('#travelFrom').val(),
                travelTo = $('#travelTo').val(),
                itdTripDateTimeDepArr = $('#activeJourneyType').data('journey-type'),
                itdDate = $('#journeyDate').val(),
                itdTime = $('#journeyTime').val(),
                journeyOpt = $('.exOption'),
                exOptionItems,
                exOption = '',
                dataRequest;

            if( travelFrom === 'Travel from' ) {
                app.modalPopup.initModal(modalPopup, travelFrom);
                return;
            } else if( travelTo === 'Travel to' ) {
                app.modalPopup.initModal(modalPopup, travelTo);
                return;
            } else if( travelFrom !== 'Travel from' && travelTo !== 'Travel to' ) {
                planJourney();
            }
            function planJourney() {

                function journeyPlannerError() {

                }
                function beforeJourneyPlanner() {

                }
                function journeyPlannerSuccess(dataResponse) {
                     console.log(dataResponse);
                }
                if(journeyOpt.length>0){
                    exOptionItems = journeyOpt.map(function(){
                        var x = $(this).data('mot-val');
                        return x;
                    }).get().join("=-&"); 
                    exOption = "&"+exOptionItems;
                }
                
                dataRequest = "language=en&sessionID=0&itdTripDateTimeDepArr="+itdTripDateTimeDepArr+"&itdDate="+itdDate+"&itdTime="+itdTime+"&eleteAssignedStops=1&place_origin=London&type_origin=stop&name_origin="+encodeURIComponent(travelFrom)+"&place_destination=London&type_destination=stop&name_destination="+encodeURIComponent(travelTo)+"&calcNumberOfTrips=1&coordOutputFormatTail=0&coordListOutputFormat=STRING&excludedMeans=checkbox&exclMOT_6=-&exclMOT_10=-&exclMOT_11=-&exclMOT_12=-&exclMOT_13=-&exclMOT_14=-&exclMOT_15=-&exclMOT_16=-&exclMOT_17=-&exclMOT_18=-&exclMOT_19=-"+exOption+"";
               
               
                $.ajax({
                    url: 'http://tubeme.co.uk/php/journey-planner-api.php',
                    type: "POST",
                    data: dataRequest,
                    beforeSend: function () {
                        beforeJourneyPlanner();
                    },
                    error: function (jqXHR, textStatus, errorThrown){
                        journeyPlannerError();
                    },
                    success: function(data) {
                        journeyPlannerSuccess(data);

                        // getting ready to show selected journey details
                        app.journeyPlannerApi.journeyPlannerShowJoruney();
                    }
                });

            }            
        });
    },
    
    journeyPlannerShowJoruney: function() {

    }   
};

$(document).ready(app.journeyPlannerApi.init);