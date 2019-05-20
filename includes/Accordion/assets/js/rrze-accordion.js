/**
 * RRZE Accordion 1.0.0
 * RRZE Webteam
 */

jQuery(document).ready(function($) {
    // Close Accordions on start, except first
    $('.accordion-body').not(".accordion-body.open").not('.accordion-body.stayopen').hide();

    $('.accordion-toggle').bind('click', function(event) {
        event.preventDefault();
        var $accordion = $(this).attr('href');
        toggleAccordion($accordion);
        window.history.replaceState(null, null, $accordion);
    });

    // Keyboard navigation for accordions
    $('.accordion-toggle').keydown(function(event) {
        if (event.keyCode == 32) {
            var $accordion = $(this).attr('href');
            toggleAccordion($accordion);
            window.history.replaceState(null, null, $accordion);
        }
    });

    function toggleAccordion($accordion) {
        var $thisgroup = $($accordion).closest('.accordion-group');
        var $othergroups = $($accordion).closest('.accordion').find('.accordion-group').not($thisgroup);
        $($othergroups).children('.accordion-heading').children(' .accordion-toggle').removeClass('active');
        $($othergroups).children('.accordion-body').not('.accordion-body.stayopen').slideUp();
        $($thisgroup).children('.accordion-heading').children('.accordion-toggle').toggleClass('active');
        $($thisgroup).children('.accordion-body').slideToggle();
    }

    function openAnchorAccordion($target) {
        if ($target.closest('.accordion').parent().closest('.accordion-group')) {
            var $thisgroup = $($target).closest('.accordion-group');
            var $othergroups = $($target).closest('.accordion').find('.accordion-group').not($thisgroup);
            $($othergroups).find('.accordion-toggle').removeClass('active');
            $($othergroups).find('.accordion-body').not('.accordion-body.stayopen').slideUp();
            $($thisgroup).find('.accordion-toggle').not('.active').addClass('active');
            $($thisgroup).find('.accordion-body').slideDown();

        }
        var offset = $target.offset();
        var $scrolloffset = offset.top - 300;
        $('html,body').animate({
            scrollTop: $scrolloffset
        }, 'slow');
    }

    if (window.location.hash) {
        var identifier = window.location.hash.split('_')[0];
        var inpagenum = window.location.hash.split('_')[1];
        if (identifier == '#collapse') {
            if ($.isNumeric(inpagenum)) {
                var $findid = 'collapse_' + inpagenum;
                var $target = $('body').find('#' + $findid);
            }
        } else {
            var $findname = identifier.replace('\#', '');
            var $target = $('body').find('div[name=' + $findname + ']');
        }
        if ($target.length > 0) {
            openAnchorAccordion($target);
        }
    }

    $('a').click(function(e) {
        // nur auf Seiten, auf denen ein Accordion existiert,
        // und nur, wenn der geklickte Link nicht der Accordion-Toggle-Link oder der Expand-All-Link ist
        if (($('#accordion-0').length) &&
            (!$(this).hasClass("accordion-toggle"))) {
            var $hash = $(this).prop("hash");
            var identifier = $hash.split('_')[0];
            var inpagenum = $hash.split('_')[1];
            if (identifier == '#collapse') {
                if ($.isNumeric(inpagenum)) {
                    var $findid = 'collapse_' + inpagenum;
                    var $target = $('body').find('#' + $findid);
                }
            } else {
                var $findname = identifier.replace('\#', '');
                var $target = $('body').find('div[name=' + $findname + ']');
            }
            if ($target) {
                openAnchorAccordion($target);
            }
        }
    });

    $('.expand-all').click(function(e) {
        var $thisgroup = $(this).closest('.accordion');
        if ($(this).data('status') === 'open') {
            $($thisgroup).find('.accordion-body').slideUp();
            $($thisgroup).find('.accordion-toggle').removeClass('active');
            $(this).attr("data-status", 'closed').data('status', 'closed').html(accordionToggle.expand_all);
        } else {
            $($thisgroup).find('.accordion-body').slideDown();
            $($thisgroup).find('.accordion-toggle').addClass('active');
            $(this).attr("data-status", 'open').data('status', 'open').html(accordionToggle.collapse_all);
        }
    });

});