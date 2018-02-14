var os   = require("os");
var AWS = require('aws-sdk');

// Set the region 
var region = "us-east-2";
var secretkey = process.env.secretkey;
var accesskey = process.env.accesskey;
var instanceID;

AWS.config.update({region: 'us-east-2', secretAccessKey: secretkey, accessKeyId: accesskey});

// Create EC2 service object
var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

var params = {
   ImageId: 'ami-965e6bf3', // amzn-ami-2011.09.1.x86_64-ebs
   InstanceType: 't2.micro',
   KeyName: 'KeyPair',
   MinCount: 1,
   MaxCount: 1
};

// Create the instance
ec2.runInstances(params, function(err, data) {
   if (err) {
      console.log("Could not create instance", err);
      return;
   }
   instanceId = data.Instances[0].InstanceId;
   console.log("Created instance");
   // Add tags to the instance
   params = {Resources: [instanceId], Tags: [
      {
         Key: 'Keppair',
         Value: 'SDK Sample'
      }
   ]};
});


setTimeout(()=>{
//console.log(instanceId);
var params = {
  Filters: [
     {
    Name: "instance-id", 
    Values: [
       instanceId
    ]
   }
  ]
 };
 ec2.describeInstances(params, function(err, data) {
   if (err) console.log(err, err.stack); // an error occurred
   else     console.log(data.Reservations[0].Instances[0].PublicIpAddress);
})
},10000);
