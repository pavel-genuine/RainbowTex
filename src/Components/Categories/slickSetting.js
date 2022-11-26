export const settings = {
    // infinite: true,
    slidesToShow: 5,
    rows: 1,
    // slidesToScroll: 2,
    // accessibility:true,
    swipeToSlide: true,
    // autoplay: true,
    // speed: 7000,
    arrows: false,
    // autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 5,
                // slidesToScroll: 2,
                // infinite: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                // initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                // slidesToScroll: 1
            }
        }
    ]
};