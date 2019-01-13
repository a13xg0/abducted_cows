const { map, filter, scan, delay, mergeMap, concatMap } = rxjs.operators;

class Cow {
	constructor(element, sceneWidth) {
		this.COW_TYPE = 'bw';
		this.cowWidth = 220;
		this.COW_SPEED = 200;
		this.element = element;

		// images initialization
		this.initializeImages();
		this.show();

		const elStyles = window.getComputedStyle(element);
		
		const cowTop = parseInt(elStyles.getPropertyValue('top'))||0;
		const cowLeft = parseInt(elStyles.getPropertyValue('left'))||0;
		const headTop = 0;


		rxjs.interval(300)
		.pipe(
				filter(() => {
					return Math.random() > 0.8;
				})
			)
		.subscribe(() => this.blink());

		const stepSequence$ = rxjs.of(
			{ deltaCow: -10, deltaHead: 10},
			{ deltaCow: 10, deltaHead: -10},
			);

		rxjs.interval(300)
		.pipe(
				filter(() => {
					return Math.random() > 0.8;
				}),

				map(_ => {
					return {
						direction: Math.random() > 0.5? 1 :-1,
						pace: parseInt(Math.random() * 50) + 50
					};
				}),
				mergeMap(movieParam => stepSequence$.pipe(map(stepDelta => 
					 Object.assign(
					 {},
					 stepDelta,
					 {
					 	deltaStep: movieParam.direction * movieParam.pace/2
					 }
					 )
				))),
				concatMap(x => rxjs.of(x).pipe(delay(200))),
				scan((position, stepDelta) => {
					position.cowTop += stepDelta.deltaCow;
					position.cowLeft += stepDelta.deltaStep;
					position.headTop += stepDelta.deltaHead;

					if (position.cowLeft < - position.cowWidth) {
						position.cowLeft = position.sceneWidth + position.cowWidth -1;
					}

					if (position.cowLeft >  position.sceneWidth + position.cowWidth) {
						position.cowLeft = -position.cowWidth + 1;
					}

					return position;
				},
				{cowTop: cowTop, cowLeft: cowLeft, headTop: headTop, sceneWidth: sceneWidth, cowWidth: this.cowWidth}),
				
			)
		.subscribe(position => {
			this.applyPositionStyles(position.cowTop, position.cowLeft, position.headTop)});
		
	}

	initializeImages() {
		this.bodyImg = document.createElement('img');
		this.bodyImg.src = `img/cow_${this.COW_TYPE}_body.png`;

		this.headImg = document.createElement('img');
		this.headImg.setAttribute('src',`img/cow_${this.COW_TYPE}_head_open.png`);
		this.headImg.style.position = 'absolute';
		this.headImg.style.top = this.inPx(this.headTop);
		this.headImg.style.left = '0';

	}

	show() {
		this.element.appendChild(this.bodyImg);
		this.element.appendChild(this.headImg);
	}

	inPx(val) {
		if (val !== 0) {
			return `${val}px`;
		}
		else {
			return '0';
		}
	}

	applyPositionStyles(cowTop, cowLeft, headTop) {
		this.element.style.left = this.inPx(cowLeft);
		this.element.style.top = this.inPx(cowTop);
		this.headImg.style.top = this.inPx(headTop);
	}

	blink() {
		this.headImg.setAttribute('src',`img/cow_${this.COW_TYPE}_head_close.png`);
		setTimeout(() => {
			this.headImg.setAttribute('src',`img/cow_${this.COW_TYPE}_head_open.png`);
		}, this.COW_SPEED)
	}
}
