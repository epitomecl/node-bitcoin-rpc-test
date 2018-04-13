module.exports = function(app, key) {

	const RpcClient = require('node-json-rpc2').Client;
	const config = {
	    protocol:'http',//Optional. Will be http by default
	    host: key.host,//Will be 127.0.0.1 by default
	    user: key.user,//Optional, only if auth needed
	    password: key.password,//Optional. Can be named 'pass'. Mandatory if user is passed.
	    port: key.port,//Will be 8443 for https or 8080 for http by default
	    method:'POST'//Optional. POST by default
	};


	app.get('/getBalance', (req, res) => {
		const client = new RpcClient(config);
		client.call({
		    method:'getbalance',//Mandatory
		    params:[],//Will be [] by default
		    id:'rpcExample',//Optional. By default it's a random id
		    jsonrpc:'2.0'//Optional. By default it's 2.0
		},(err, res)=>{
		    if(err){	       
		       console.error("err:"+err);
		    }
		    console.log('Data:', res);
		});
	});	

}