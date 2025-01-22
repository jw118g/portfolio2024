
$(document).ready(function () {

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
    lenis.raf(time * 900); // Convert time from seconds to milliseconds
    });
    gsap.ticker.lagSmoothing(0);

    $(document).mousemove(function(e){
        mouseX = e.clientX;
        mouseY = e.clientY;
        gsap.to('.cursor',{
            x:mouseX,
            y:mouseY
        })
    })

    $('.prev-work-item, .study-item .img').mousemove(function(e){
        gsap.to('.cursor',{
            backgroundColor:'#5b25b1a4'
        })
    
    })
    $('.prev-work-item, .study-item .img').on('mouseleave', function() {
        gsap.to('.cursor', {
            backgroundColor: '#ffffff58',
        });
    });

    let textSplit
    textSplit = new SplitType('.sc-home .content-wrap .home-text', {type: 'words'});
    let textSplitBtn = new SplitType('.btn-view span', {type: 'words'});
    $('.sc-home .content-wrap .home-text .word').wrap('<div class="word-wrap"></div>')

    const btnView = document.querySelectorAll('.btn-view');
    const delayStep = 0.05;

    btnView.forEach((el,idx)=>{

        const btnWords = el.querySelectorAll('.char')

        btnWords.forEach((word, index) => {
            word.style.animationDelay = `${index * delayStep}s`;
        });

    })

    gsap.to('.sc-home .content-wrap p', {
        autoAlpha: 1,
        delay:1
    })
    gsap.to('.sc-home video', {
        opacity : 1,
        delay: 1,
        duration:2
    })
    gsap.to('.sc-home .content-wrap .word', {
        autoAlpha: 1,
        stagger: {
            from: "random",
            amount:1
        },
    },"<")
    
    function homeTlFunc(){
        const HomeTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.sc-home', 
                start: "top top",  
                end: "bottom 30%",    
                scrub: 1,
                delay:1,
                //markers:true

            },
        });
        HomeTl.to('.sc-home',{
            '--opcity':0.8
        })
        HomeTl.to('.sc-home .content-wrap p .word',{
            yPercent:100,
            stagger: {
                from: "random",
                amount:1
            }
        },"<=+0.3")
    }

    homeTlFunc()


    $(window).resize(function() {
        // 기존 SplitType 인스턴스 리셋
        if (textSplit) {
            textSplit.revert();  // 기존 SplitType 인스턴스를 리셋
        }
    
        // 새로 SplitType을 생성하여 텍스트를 분할
        textSplit = new SplitType('.sc-home .content-wrap .home-text', {type: 'words'});
        let textSplitBtn = new SplitType('.btn-view span', {type: 'words'});
    
        // .word 요소를 감싸는 div 생성
        $('.sc-home .content-wrap .home-text .word').wrap('<div class="word-wrap"></div>');
    
        // GSAP 애니메이션 상태 초기화
        gsap.set('.sc-home .content-wrap p .word', {
            yPercent: 0,  // 초기 상태로 리셋
            autoAlpha: 1  // 텍스트가 보이도록 설정
        });

        //스크롤애니메이션 실행 
        homeTlFunc()
        
        // ScrollTrigger 새로 리프레시
        ScrollTrigger.refresh();
    });

    $('.right-area .desc-item').each(function (idx, el) {
        const workItems = $('.left-area li.work-item');
        const workTl = gsap.timeline({
            scrollTrigger: {
                trigger: el, 
                start: "0 50%", 
                end: "100% 50%",
                scrub: 1, 

                // 스크롤이 시작될 때
                onEnter: function () {
                    workItems.removeClass('on'); 
                    workItems.eq(idx).addClass('on');
                },
                // onLeave: function () {
                //     workItems.eq(idx).removeClass('on'); 
                // },
                onEnterBack: function () {
                    workItems.removeClass('on');
                    workItems.eq(idx).addClass('on');
                },
            },
        });
    });


});