$(document).ready(function() {
    $('.carousel__inner').slick({
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                dots: true,
                arrows: false,
            }
        }]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
                $('.catalog-item__back').eq(i).toggleClass('catalog-item__back_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
               name: {
                   required: "Пожалуйста, введите свое имя",
                   minlength: jQuery.validator.format("Введите минимум {0} символа")
               },
               phone: "Пожалуйста, введите свой номер телефона",
               email: {
                   required: "Пожалуйста, введите свою почту",
                   email: "Неправильно введен адрес почты"
               }
            }
        });
    }

    validateForm('#consultation-form');
    validateForm('#consultation form');
    validateForm('#order form');

    $('input[name=phone]').mask("(+38) 099-999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");


            $('form').trigger('reset');
        });
        return false;
    });

    //Smooth scroll

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1136) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#up']").click(function() {
        const _href = $(this).attr('href');
        $('html, body').animate({scrollTop: $(_href).offset().top + 'px'});
        return false;
    });

    // Rewiew section animation

    new WOW().init();
});

$(window).on('load', function(){

    new WOW().init(); 
});