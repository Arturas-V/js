app.journeyPlannerApi = {
    
    init: function() {
        app.journeyPlannerApi.journeyPlannerDates();        
        app.journeyPlannerApi.journeyPlanner();
        app.journeyPlannerApi.journeyPlannerSubmit();
        app.journeyPlannerApi.initChoosen();
    },    
    
    initChoosen: function() {
        $(".topRightWidgets form select").chosen({disable_search_threshold: 10000});
        $('#journeyDateSelection .chosen-container-single .chosen-single span').text('Today');
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
            if($(this).hasClass('activeJourneyType')){
                $(this).removeClass('activeJourneyType');
            }else if(!($(this).hasClass('activeJourneyType'))) {
                $(this).siblings().removeClass('activeJourneyType');
                $(this).addClass('activeJourneyType');
            }
        });

        optionItem.on('click', function() {
            if($(this).hasClass('selectedMOT')){
                $(this).removeClass('selectedMOT');
            }else if(!($(this).hasClass('selectedMOT'))){
                $(this).addClass('selectedMOT');
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
    },
    
    journeyPlannerSubmit: function() {
        var submitPlanner = $('#planJourneySubmit'),
            modalPopup = $('#modalPopup'),
            travelFrom = $('#travelFrom'),
            travelTo = $('#travelTo'),
            data;

        submitPlanner.on('click', function(e) {
            e.preventDefault();             

            if( travelFrom.val() === 'Travel from' ) {
                app.modalPopup.initModal(modalPopup, travelFrom.val());
                return;
            } else if( travelTo.val() === 'Travel to' ) {
                app.modalPopup.initModal(modalPopup, travelTo.val());
                return;
            } else if( travelFrom.val() !== 'Travel from' && travelTo.val() !== 'Travel to' ) {
                planJourney();
            }
            function planJourney() {

//                var travelFrom = $('#travelFrom').val,
//                    travelTo = ,
//                    travelType = ,
//                    travelDay = ,
//                    travelTime = ,
//                    travelOptions = ;

                function journeyPlannerError() {

                }
                function beforeJourneyPlanner() {

                }
                function journeyPlannerSuccess() {

                }
                $.ajax({
                    url: 'http://tubeme.co.uk/php/journey-planner-api.php',
                    type: "POST",
                    data: 'language=en&sessionID=0&itdDateYear=14&itdDateMonth=03&itdDateDay=09&itdTime=1430&selectAssignedStops=0&place_origin=London&type_origin=stop&name_origin=Bank&place_destination=London&type_destination=stop&name_destination=Holborn&excludedMeans=checkbox&exclMOT_6=-&exclMOT_10=-&exclMOT_11=-&exclMOT_12=-&exclMOT_13=-&exclMOT_14=-&exclMOT_15=-&exclMOT_16=-&exclMOT_17=-&exclMOT_18=-&exclMOT_19=-',
                    beforeSend: function () {
                        beforeJourneyPlanner();
                    },
                    error: function (jqXHR, textStatus, errorThrown){
                        journeyPlannerError();
                    },
                    success: function(data) {
                        journeyPlannerSuccess();

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