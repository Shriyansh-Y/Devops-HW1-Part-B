var needle = require("needle");
var os   = require("os");

var config = {};
config.token = process.env.TOKEN;
var ssh_key = process.env.sshkey;

var headers =
{
	'Content-Type':'application/json',
	Authorization: 'Bearer ' + config.token
};

// Documentation for needle:
// https://github.com/tomas/needle

var client =
{
	createDroplet: function (dropletName, region, imageName, onResponse)
	{
		var data = 
		{
			"name": dropletName,
			"region":region,
			"size":"512mb",
			"image":imageName,
			// Id to ssh_key already associated with account.
			"ssh_keys":[ssh_key],
			//"ssh_keys":null,
			"backups":false,
			"ipv6":false,
			"user_data":null,
			"private_networking":null
		};

		//console.log("Attempting to create: "+ JSON.stringify(data) );

		needle.post("https://api.digitalocean.com/v2/droplets", data, {headers:headers,json:true}, onResponse );
	},
	
	getDroplet: function( dropletId, onResponse )
	{
		needle.get("https://api.digitalocean.com/v2/droplets/"+dropletId, {headers:headers}, onResponse);
	}
};


// #########################################################
// Create droplet with the specified name, region, and image

var name = "scyadav"+os.hostname();
var region = "nyc3"; // Fill one in from #1
var image = "ubuntu-16-04-x64"; // Fill one in from #2
var dropletId;
client.createDroplet(name, region, image, function(err, resp, body)
{
	console.log("Droplet Created");
	// StatusCode 202 - Means server accepted request.
	if(!err && resp.statusCode == 202)
	{
		dropletId = body['droplet']['id'];	 		
	}
});


setTimeout(()=>{client.getDroplet(dropletId, function(err, resp, body)
{
	var obj= body.droplet.networks.v4[0]; 	
	console.log(obj.ip_address);
})
},10000);

