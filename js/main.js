
function initialize() {

	const { map, filter } = rxjs.operators;

	const cow1 = document.getElementById('cow1');
	const oopCow = new Cow(cow1, document.body.clientWidth);

}
