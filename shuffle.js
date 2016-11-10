function Shuffler(given_seed) {
	if (given_seed === undefined) given_seed = Math.floor(Math.random() * 1000);
	
	function next(seed) {
	  seed ^= seed << 13;
	  seed ^= seed >> 17;
	  seed ^= seed << 5;
	  return seed;
	};
	
	this.list = function(list) {
		var seed = given_seed || -1;
		var ret = [];

		list = [].concat(list);

		while (list.length) {
			seed = next(seed);
			ret.push(list.splice(seed%list.length, 1)[0]);
		}
		
		return ret;
	}
}