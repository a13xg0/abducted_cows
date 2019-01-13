
function initialize() {

	const { map, filter } = rxjs.operators;

	const cow1 = document.getElementById('cow1');
	const oopCow = new Cow(cow1);

	rxjs.interval(300)
		.pipe(
				filter(() => {
					return Math.random() > 0.8;
				})
			)
		.subscribe(() => oopCow.blink());

	setTimeout(() => {oopCow.step(1, 100).then(()=>
		oopCow.step(1, 100).then(()=>{
			oopCow.step(1, 100).then(()=>{
				oopCow.step(1, 100).then(()=>
					console.log('ok')
					);
			})
		})
		
	)}, 1400);
}
