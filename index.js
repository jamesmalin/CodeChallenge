const fs = require('fs');
const readlineSync = require('readline-sync');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const dirTree = require('directory-tree');
const fsExtra = require('fs-extra');

console.log('Welcome. Please use one of the following commands: "CREATE", "LIST", "MOVE", "DELETE". \
	Type "exit" to quit.');

readlineSync.promptCLLoop({
  CREATE: function(target) {
 	if (fs.existsSync(target)){
     	console.log(target + ' already exists.');
 	} else {
 		try{
		    mkdirp.sync('./directories/'+target, function (err) {
			    if (err) console.error(err)
			});
		    console.log('CREATE ' + target);
		}
		catch(e){
		    //do whatever with error
		    console.log('There was an error moving ' + target + ' into ' + into);
		}
 	}
  },
  MOVE: function(target, into) {
	try{
		var endTarget = target.split(/[\s/]+/);

	    fsExtra.moveSync('./directories/'+target, './directories/'+into+'/'+endTarget[endTarget.length-1], err => {
		  if(err) return console.error(err);
		  console.log('success!');
		});
	    console.log('MOVED ' + endTarget[endTarget.length-1]);
	}
	catch(e){
	    //do whatever with error
	    console.log('There was an error moving ' + target + ' into ' + into);
	}

  },
  LIST: function(target, into) {
	const tree = dirTree('./directories/', {exclude:/node_modules/}, null, (item, PATH, stats) => {
	    var tab = "  ";
		var count = (item.path.match(/\\/g) || []).length;
		function repeatStringNumTimes(string, times) {
		  return times > 0 ? string.repeat(times) : "";
		}
		if (item.path !== './directories/') {
			console.log(repeatStringNumTimes(tab, count) + item.name);
		}
	});
  },
  DELETE: function(target) {
  	//refactor
  	try {
	    fs.statSync('./directories/'+target);
		try{
		    rimraf.sync('./directories/'+target);
		    console.log('DELETE ' + target);
		}
		catch(err){
		    //do whatever with error
		    console.log(err);
		}
	  } catch(e) {
	    console.log('Cannot delete ' + target + ' - ' + target + ' does not exist');
	  }
  },
  exit: function() { return true; }
});

console.log('Exited');
