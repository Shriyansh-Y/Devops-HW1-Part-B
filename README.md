# HW1- Part2

* Automatically provision using a code api from **AWS and [Digital Ocean](https://developers.digitalocean.com/v2/)**. The code will request new VM and then print out the ip address of the new server.
 
The environment needs to be setup with nodejs, git, npm  
 
### DigitalOcean

DigitalOcean is one of the cheapest and lowest image providers.
1. Obtain your own api key.
2. Get your ssh key using:
```bash
curl -X GET -H 'Content-Type: application/json' -H 'Authorization: Bearer $TOKEN' "https://api.digitalocean.com/v2/account/keys"
```
The code for creating the droplet and getting its IP is in main.js

### Amazon Web Services (AWS)

AWS is a rich computation platform for supporting many services. We will create an account with AWS, and use its API.
1. Create an AWS account
2. Get the AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.
3. Get the public key .pem file from AWS.

The code for creating the EC2 instance and getting its IP is in aws.js

Running the playbook.yml to create a droplet instance and print out the IP Address as well as AWS EC2 instance and print its IP Address.

## Concepts

**1. Define idempotency. Give two examples of an idempotent operation and non-idempotent operation.**

Idempotency can be simply defined as "applying the same operation, multiple times results in the same state". It can be inferred from this definition that idempotency means a system is able to reach a desired state, regardless of its current state.

**Examples:**  
* REST API calls: GET, PUT, DELETE, HEAD, OPTIONS and TRACE are idempotent.
* REST API calls: POST APIs will be non-idempotent.


**2. Describe several issues related to management of your inventory.**
The following are the assets you own in your inventory
* Servers and IP addresses.
* Roles
* SSH keys
* SSH host signatures
* Passwords
* API tokens

The following are the issues related to management of inventory:
* One cannot commit these sensitive details on github and must be careful with that. 
* Storing them locally and using either environment variables or other indirect reference techniques to use them.
* Managing and isolating access to certain servers and secret configuration.
* Dynamic configuration properties (running in live servers) can be difficult to manage and debug.  


**3. Describe two configuration models. What are disadvantages and advantages of each model?**

The two configuration models are as follows:
* (1) **Push Model:** In this model, as an automated deployment system, you push deployments from a server by running remote commands via ssh on a set of servers.
* (2) **Pull Model:** In this model, there is a daemon running on every machine, and these machines call in to the master to see if there’s any new instructions for them. If there are, the daemon applies those instructions to the machine it is running on.

**Advantages of push:**
* Easy to bootstrap. A bare server can be setup with push, no customization needed.
* Errors are synchronous: If Setup code doesn’t work, push system will get the error back. No need to check any logs.
* Development is sensible: Change to the setup scripts, can be done from the machine itself, and the machine doesn’t have to accept connections from the slave or no special instructions to keep the slave from setting itself up as a production machine. Thus, no daemon need modifications. Basically, just change the code, and run it.  

**Disadvantages of a push:**
* Lack of full automation: Not usually possible to boot a server and have it configure itself without some sort of client/server protocol which push systems don't generally support.
* Lack of scalability: When dealing with hundreds of servers, a push system starts showing its limits.  

**Advantages of a pull:**
* Full automation capabilities: Possible to fully automate the configuration of a newly booted server using a 'pull' deployment system.
* Increased scalability: In 'pull' system, clients contact the server independently of each other, so the system as a whole is more scalable than a 'push' system.  

**Disadvantages of a pull:**
* Proprietary configuration management language: Most pull systems (except Chef) use their own proprietary specification for configuration to be deployed. A big drawback is, if you're not using the system daily, it's hard to get used to it and remember it.
* Scalability issue: Unless you deploy several master servers and keep them in sync, that one master will start getting swamped as you add extra clients and in future, will become a bottleneck.  


**4. What are some of the consequences of not having proper configuration management?**

Configuration Management is defined as (by Pressman) : set of tracking and control activities that are initiated when a software engineering projects begins and terminates when software is taken out of operation.

If the configuration management costs are avoided initially, ultimately one faces the following consequences:
* When requirements change, figuring out which system components need to change.  
* Due to no communication with all parties, redoing the implementations performed to meet changed requirements, may be cumbersome.
* When a component is replced wth a flawed new version, it becomes difficult to revert back the stable state and loss of productivity is suffered.
* Replacing the wrong component because someone didn't accurately determine which component needed replacing, can be detrimental to the project.

*Scenario 1:* When a change in device configuration is implemented, without communicating the changes to all parties and without proper  verification or approval, the changes may result in the network going down. This will definitely have a bad impact on the business and the approvers are left accountable. Without, configuration management, there will be no accountability or audit trail of who made the change or when the changes were made. The organisation has to bear the burden of the situation.

*Scenario 2:* The management has absolutely no visibility into configuration changes made in the network, can lead to large business losses, due to a small human error.

*Scenario 3:* In case the issue is found out, the manual efforts that has to go in determining the damage and fixing that issue could have been saved, had there been configuartion management. If the same changes are involved in multiple counts, the effort multiplies.



### Screencast:  

[ScreenCast Video](https://youtu.be/dci5lAfUfzA)


### References:
[1] http://agiletesting.blogspot.com/2010/03/automated-deployment-systems-push-vs.html   
[2] https://www.upguard.com/blog/5-configuration-management-boss  
[3] https://thwack.solarwinds.com/community/solarwinds-community/geek-speak_tht/blog/2013/10/10/bad-configuration-management-impact-on-network-operations
