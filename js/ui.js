// Common variable
const wrap = document.querySelector('#mainWrap');

// LOADING
function loadFnc(){
	const loadArea = document.querySelector('.load_area');
	setTimeout(function(){
		loadArea.style.display = 'none';
		wrap.classList.add('loaded');
	},500);
}

// nav menu
function menuControl(){
	const btnMenu = document.querySelector('.btn_menu');
	const menu = document.querySelector('#menu');
	const btnMenuClose = menu.querySelector('.btn_close');

	btnMenu.addEventListener('click', function(){
		menu.style.display = 'block';
	});
	btnMenuClose.addEventListener('click', function(){
		menu.style.display = 'none';
	});
}

// popup
function popupControl(){
	// 팝업 열기
	const btnPop = document.querySelectorAll('a[href^="#pop"]');
	btnPop.forEach(evt => {
		evt.addEventListener('click', function(e){
			e.preventDefault();
			let targetPop = document.querySelector(evt.getAttribute('href'));
			targetPop.style.display = 'block';
		});
	});

	// 팝업 닫기
	const btnPopClose = document.querySelectorAll('.pop_wrap .btn_close');
	btnPopClose.forEach(evt => {
		evt.addEventListener('click', function(){
			evt.closest('.pop_wrap').style.display = 'none';
		});
	});
}

// Baseball
function pitchingSwitch(){
	const btnSwitch = document.querySelector('.btn_switch');
	const pitchBtn = document.querySelector('.btn_pitching');
	const pitchBar = document.querySelector('.bar');
	const pitchBarI = pitchBar.querySelector('i');
	const strikeZone = document.querySelector('.mitt i');
	const countStrike = document.querySelector('#countStrike');
	const countBall = document.querySelector('#countBall');
	let checkStrike = 0;	// 0: 볼, 1: 스트라이크
	let windup = true;
	let pitchCheck = true;
	let countStrikeNum = 0;
	let countBallNum = 0;

	btnSwitch.addEventListener('click', function(){
		if(this.closest('.baseball').classList.contains('on_play')){
			this.closest('.baseball').classList.remove('on_play');
		}else{
			this.closest('.baseball').classList.add('on_play');
		}
	});

	pitchBtn.addEventListener('click', function(){
		if(pitchCheck === true){
			if(windup === true){
				pitchBar.classList.add('on');
				windup = false;
			}else {
				pitchBar.classList.add('stop');
				setTimeout(function(){
					let barPos = Math.floor(pitchBarI.offsetLeft / pitchBar.clientWidth * 100);
					if(barPos >= 51 && barPos <= 71){
						if(Math.random() < 0.7){
							checkStrike = 1;
						}else	{
							checkStrike = 0;
						}
					}else if(barPos >= 72 && barPos <= 87){
						checkStrike = 1;
					}else{
						checkStrike = 0;
					}
					drawBall();

					pitchCheck = false;
				}, 100);

				// reset
				setTimeout(function(){
					pitchBar.className = 'bar';
					strikeZone.setAttribute('data-pos', 0);
					windup = true;
					pitchCheck = true;
				}, 2000);
			}
		}
	});

	// 피칭하지 않을 때 볼 처리
	pitchBarI.addEventListener('animationend', function(){
		let randomBall_2 = Math.floor(Math.random() * 3 + 2);
		pitchBar.className = 'bar';
		windup = true;
		pitchCheck = false;
		strikeZone.setAttribute('data-pos', randomBall_2);
		countBallNum++;
		setTimeout(function(){
			countBall.innerText = countBallNum;
		}, 500);

		// reset
		setTimeout(function(){
			pitchCheck = true;
			strikeZone.setAttribute('data-pos', 0);
		}, 2000);
	});

	// 스트라이크 존 피칭
	function drawBall(){
		let randomStrike = 1;
		let randomBall = Math.floor(Math.random() * 3 + 2);

		if(checkStrike >= 1){
			// strike
			strikeZone.setAttribute('data-pos', randomStrike);
			countStrikeNum++;
			setTimeout(function(){
				countStrike.innerText = countStrikeNum;
			}, 500);
		}else{
			// ball
			strikeZone.setAttribute('data-pos', randomBall);
			countBallNum++;
			setTimeout(function(){
				countBall.innerText = countBallNum;
			}, 500);
		}
	}
}

// bg-change
function changeBG(){
	const btnBG = document.querySelector('.bg_switch .btn_bg');
	const ArrColor = ['yellow', 'pink', 'blue', 'green'];
	const switchList = document.querySelectorAll('.bg_switch .list button');
	let targetColor = 1;

	// 전체 스위치
	btnBG.addEventListener('click', function(){
		if(targetColor >= ArrColor.length-1){
			targetColor = 0;
		}else{
			targetColor++;
		}
		wrap.setAttribute('data-bg', ArrColor[targetColor]);
		this.setAttribute('data-target', targetColor);
	});

	// 각 버튼
	switchList.forEach((evt, i) => {
		evt.addEventListener('click', function(){
			targetColor = i;
			btnBG.setAttribute('data-target', targetColor);
			let targetBG = evt.getAttribute('data-bgcolor');
			wrap.setAttribute('data-bg', targetBG);
		});
	});
}

// music player
function playMusic(){
	const player = document.querySelector('.items.player');
	const playBtn = document.querySelector('.player .btn_play');
	const pauseBtn = document.querySelector('.player .btn_pause');
	const audioMp3 = new Audio('./sound/bgm_1.mp3');

	// play
	playBtn.addEventListener('click', function(){
		this.classList.toggle('on');
		pauseBtn.classList.remove('on');
		audioMp3.play();
		player.classList.add('playing');
		player.classList.remove('on_stop');
	});

	// pause
	pauseBtn.addEventListener('click', function(){
		this.classList.toggle('on');
		playBtn.classList.remove('on');
		audioMp3.pause();
		player.classList.add('on_stop');
	});
}