
function initialize() {

	const cow1 = document.getElementById('cow1');
	const oopCow = new Cow(cow1);

	setTimeout(() => {oopCow.blink()}, 1000);
	setTimeout(() => {oopCow.blink()}, 1500);
	setTimeout(() => {oopCow.blink()}, 3400);
	setTimeout(() => {oopCow.blink()}, 5600);

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
