


var htmlContent = '<!DOCTYPE html>';

// Load the webpage (using the hash? If not, imitate a click on what needs to be clicked to load the content) then append the document innerHTML to htmlContent.
var page = new WebPage();

if (phantom.args.length < 2) {
    console.log('\nUsage: script.js <url> <file>'
    	+'\n\n  Where <url> is the desired url to load (including the ajax #! hash'
    	  +'\n  if needed), and <file> is the output file relative to the current'
    	  +'\n  working directory where the html output will be written to.'
    );
    console.log('\nExiting phantom...');
    phantom.exit();
}
else {
	var url			= phantom.args[0],
		outputFile	= phantom.args[1],
		time		= Date.now();
	
	console.log("\n -- opening: "+url+"\n");

	page.onConsoleMessage = function (msg) {
	    console.log(msg);
	};

	page.open(url, function (status) {
		if (status !== 'success') {
		    console.log('\n -- FAILED to load the address');
		}
		else {
		    time = Date.now() - time;
		    console.log('\n -- Loading time: ' + time + ' ms');
		
			htmlContent += ""+page.evaluate(function() {
				return document.documentElement.outerHTML;
			});

			htmlContent += '';

			var fs = require("fs"); 
			fs.write(outputFile, htmlContent, "w");

			console.log('\n -- Exiting phantom...');
			phantom.exit();
		}
	});
}






