// $('.js-audio').each(function (index, el) {
// 	initAudioPlayer($(this), index);
// });

// Starts playing when screen loads
// $('.js-audio').addClass('playing');
// $('.js-audio').removeClass('paused');
// $('.js-audio').find('video')[0].play();

$('.audio__slider').roundSlider({
	radius: 30,
	value: 0,
	startAngle: 90,
	width: 5,
	handleSize: '+6',
	handleShape: 'round',
	sliderType: 'min-range'
});

let theVideo = document.querySelector('.slide__audio-player');
theVideo.volume = 0;

$('.js-audio').addClass('playing');

let initialBars = [...document.querySelectorAll('.bar')];
let initialMuteBtn = document.getElementById('mute');
initialBars.forEach((bar) => {
    bar.style.cssText = 'fill: grey';
    initialMuteBtn.style.cssText = 'fill: grey';
})



$('.audio__slider').on('drag, change', function (e) {
	let $this = $(this);
	let $elem = $this.closest('.js-audio');
	updateAudio(e, $elem);
	$this.addClass('active');
});

function updateAudio(e, $elem) {
	// console.log(e.handle.value);
	let value = e.handle.value;
	// var thisPlayer = el.find('.js-audio'),
	var play = $elem.find('.play-pause'),
		circle = $elem.find('#seekbar'),

		getCircle = circle.get(0),
		totalLength = getCircle.getTotalLength(),
		//currentTime = $elem.find('audio')[0].currentTime,
		maxduration = $elem.find('video')[0].duration;
	var y = (value * maxduration) / 100;
	$elem.find('video')[0].currentTime = y;
}

// send help
let audio = $('.js-audio').find('.slide__audio-player'),
		play = $('.js-audio').find('.play-pause'),
		circle = $('.js-audio').find('#seekbar'),
		getCircle = circle.get(0),
		totalLength = getCircle.getTotalLength();

        circle.attr({
            'stroke-dasharray': totalLength,
            'stroke-dashoffset': totalLength,
        });


        play.on('click', () => {
            if (audio[0].paused) {
                $('video').each((index, el) => {
                    $('video')[index].pause();
                });
                $('.js-audio').removeClass('playing');
                audio[0].play();
                $('.js-audio').removeClass('paused');
                $('.js-audio').addClass('playing');
            } else {
                audio[0].pause();
                $('.js-audio').removeClass('playing');
                $('.js-audio').addClass('paused');
            }
        });

        audio.on('timeupdate', () => {
            let currentTime = audio[0].currentTime,
                maxduration = audio[0].duration,
                calc = totalLength - (currentTime / maxduration * totalLength);
    
            circle.attr('stroke-dashoffset', calc);
    
            let value = Math.floor((currentTime / maxduration) * 100);
    
            var slider = audio.closest('.js-audio').find('.audio__slider');
            $(slider).roundSlider('setValue', value);
        });

        audio.on('ended', () => {
            $('.js-audio').removeClass('playing');
            circle.attr('stroke-dashoffset', totalLength);
    
        });

// send help

// function initAudioPlayer(player) {
// 	// let audio = player.find('.slide__audio-playervideo'),
// 	// 	play = player.find('.play-pause'),
// 	// 	circle = player.find('#seekbar'),
// 	// 	getCircle = circle.get(0),
// 	// 	totalLength = getCircle.getTotalLength();


// 	circle.attr({
// 		'stroke-dasharray': totalLength,
// 		'stroke-dashoffset': totalLength,
// 	});

// 	play.on('click', () => {
// 		if (audio[0].paused) {
// 			$('video').each((index, el) => {
// 				$('video')[index].pause();
// 			});
// 			$('.js-audio').removeClass('playing');
// 			audio[0].play();
// 			player.removeClass('paused');
// 			player.addClass('playing');
// 		} else {
// 			audio[0].pause();
// 			player.removeClass('playing');
// 			player.addClass('paused');
// 		}
// 	});

// 	audio.on('timeupdate', () => {
// 		let currentTime = audio[0].currentTime,
// 			maxduration = audio[0].duration,
// 			calc = totalLength - (currentTime / maxduration * totalLength);

// 		circle.attr('stroke-dashoffset', calc);

// 		let value = Math.floor((currentTime / maxduration) * 100);

// 		var slider = audio.closest('.js-audio').find('.audio__slider');
// 		$(slider).roundSlider('setValue', value);
//     });
    

// 	audio.on('ended', () => {
// 		player.removeClass('playing');
// 		circle.attr('stroke-dashoffset', totalLength);

// 	});
// }


// Changes equalizer bar colors when muted or unmuted

let muteBtn = document.getElementById('mute');
var vid = document.querySelector(".audio__slider");
let bars = [...document.querySelectorAll('.bar')];
let isMuted = $("video").prop('muted', true);
mute.style.cssText = 'fill: grey';


function makeBarsGreen() {
    bars.forEach((bar) => {
        bar.style.cssText = 'fill: #0c2';
        mute.style.cssText = 'fill: #0c2';
    })
}

function makeBarsGrey() {
    bars.forEach((bar) => {
        bar.style.cssText = 'fill: grey';
        mute.style.cssText = 'fill: grey';
    })
}

function bigImg() {
    if( $("video").prop('muted') ) {
        $("video").prop('muted', false);

        try {
            theVideo.volume = 1;
            if ($('.js-audio').find('.slide__audio-player')[0].paused) {
                console.log("Video forced pause")
                $('.js-audio').find('.slide__audio-player')[0].pause();
                $('.js-audio').removeClass('playing');
                $('.js-audio').addClass('paused');
            } 
          }
          catch(err) {
            console.log("My error =>", err);
          }

        makeBarsGreen()
    } else {
        $("video").prop('muted', true);
        theVideo.volume = 0;
        makeBarsGrey()     
    }
}

// Runs emojis
window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
    })();
    
    var $parent= $("#parent"),
    $elements= $('img', $parent),
    vertSpeed= 2,
    horiSpeed= 2;
    
    var height=$parent.height(),
        width=$parent.width();
        $parent.css("position", "relative")
        .css("overflow", "hidden");
    
    // store all the data for animation
    var items= [];
    for(var i=0; i<$elements.length; i++){
        var $element= $($elements[i]),
        elementWidth= $element.width(),
        elementHeight= $element.height();
    
        $element.css("position", "absolute");
      
        var item= {
            element: $element[0],
            elementHeight: elementHeight,
            elementWidth: elementWidth,
            ySpeed: -vertSpeed,
    
            omega: 2*Math.PI* horiSpeed/(width*60), //omega= 2Pi*frequency
            random: (Math.random()/2+0.5) * i * 10000, //random time offset
            x: function(time){
                return (Math.sin(this.omega *(time+this.random)) + 1)/2 * (width-elementWidth);
            },
            y: height + (Math.random()+1)*i*elementHeight,
        }
        items.push(item);
    }
    
    var counter=0;
    var animationStep= function(){ //called 60 times a second
      var time=+new Date(); //little trick, gives unix time in ms
      var check= (counter%10 === 0);
    
      for(var i=0; i<items.length; i++){
        var item= items[i];
    
        transformString= "translate3d("+item.x(time)+"px,"+item.y+"px,0px)";
        item.element.style.transform= transformString;
        item.element.style.webkitTransform= transformString;
    
        item.y += item.ySpeed;
        if(check && item.y < -item.elementHeight){ //check bounds every 10th iteration
            item.y= height;
        }
      }
    
      counter%=10;
      counter++;
      requestAnimationFrame(animationStep); 
    }
        
    requestAnimationFrame(animationStep);   
    
