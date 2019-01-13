class Cow {
	constructor(element) {
		this.COW_TYPE = 'bw';
		this.COW_SPEED = 200;
		this.element = element;

		// images initialization
		this.initializeImages();
		this.show();

		const elStyles = window.getComputedStyle(element);
		
		this.cowTop = parseInt(elStyles.getPropertyValue('top'))||0;
		this.cowLeft = parseInt(elStyles.getPropertyValue('left'))||0;
		this.headTop = 0;


		
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

	applyPositionStyles() {
		this.element.style.left = this.inPx(this.cowLeft);
		this.element.style.top = this.inPx(this.cowTop);
		this.headImg.style.top = this.inPx(this.headTop);
	}

	blink() {
		this.headImg.setAttribute('src',`img/cow_${this.COW_TYPE}_head_close.png`);
		setTimeout(() => {
			this.headImg.setAttribute('src',`img/cow_${this.COW_TYPE}_head_open.png`);
		}, this.COW_SPEED)
	}

	step(direction, pace) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				this.cowLeft += direction * pace/2;
				this.cowTop -= 10;
				this.headTop += 10;
				this.applyPositionStyles();

				setTimeout(() => {
					this.cowLeft += direction * pace/2;
					this.cowTop += 10;
					this.headTop -= 10;
					this.applyPositionStyles();
					resolve();
				}, this.COW_SPEED);
			}, this.COW_SPEED);
		});
	}
}
