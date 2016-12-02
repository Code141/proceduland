coCoLog = function(){
	this.runningApp = [];
	this.params = {
		logLenght : 10
	}

	this.coCoLog = document.createElement("div");
	this.coCoLog.id = "codeConsole";
	this.coCoLog.style.position = "absolute";

	this.coCoLog.style.color = "#ffffff";
	this.coCoLog.style.fontFamily = "arial";
	this.coCoLog.style.fontSize = "20px";
	this.coCoLog.style.bottom = "0px";

	document.body.appendChild(this.coCoLog);

	this.control = function(){
		if(this.coCoLog.children.length > this.params.logLenght){
			this.coCoLog.removeChild(this.coCoLog.firstChild);
		}

		for(var i = 0; i<this.coCoLog.children.length; i++){
			this.coCoLog.children[i].style.opacity = 1-((this.coCoLog.children.length-i)/(this.params.logLenght*1.1));
		}
	}



	this.newApp = function(app, now, max){
 	
 		var d = new Date();
 		var timestamp = d.getTime(); 
		mainDiv = document.createElement("div");
		mainDiv.id = app;
		mainDiv.style.backgroundColor = "rgba(0,0,0,0.3)";

		mainDiv.style.borderTop = "1px solid white";
		mainDiv.style.height = "30px";

		appNameDiv = document.createElement("div");
		appNameDiv.style.float = "left";
		appNameDiv.style.width = "200px";
		appNameDiv.style.padding = "5px";

		mainDiv.appendChild(appNameDiv);

		nowDiv = document.createElement("div");
		nowDiv.style.float = "left";
		nowDiv.style.width = "100px";
		nowDiv.style.padding = "5px";
		mainDiv.appendChild(nowDiv);


		barDiv = document.createElement("div");
		barDiv.style.float = "left";
		barDiv.style.height = "20px";
		barDiv.style.width = "200px";
		barDiv.style.margin = "5px";
		barDiv.style.paddingLeft = "5px";
		barDiv.style.paddingRight = "5px";
		barDiv.style.borderLeft = "1px solid white";
		barDiv.style.borderRight = "1px solid white";

		mainDiv.appendChild(barDiv);

		progressBarDiv = document.createElement("div");
		progressBarDiv.style.backgroundColor = "rgba(255,255,255,1)";
		progressBarDiv.style.float = "left";
		progressBarDiv.style.height = "20px";
		barDiv.appendChild(progressBarDiv);

		percentDiv = document.createElement("div");
		percentDiv.style.float = "left";
		percentDiv.style.padding = "5px";
		appNameDiv.style.width = "200px";

		mainDiv.appendChild(percentDiv);

		timestampDiv = document.createElement("div");
		timestampDiv.style.float = "right";
		timestampDiv.style.width = "100px";
		timestampDiv.style.padding = "5px";
		mainDiv.appendChild(timestampDiv);

		newApp = {
			now : now,
			max : max,
			div : {
				main : mainDiv,
				appName : appNameDiv,
				now : nowDiv,
				percent : percentDiv,
				progressBar : progressBarDiv,
				time : timestampDiv
			},
			time : timestamp
		}
		this.runningApp[app] = newApp;

		this.coCoLog.appendChild(this.runningApp[app].div.main);

	}
	
	this.upApp = function(app, now, max){

		this.runningApp[app].now = now;
		this.runningApp[app].max = max;
		
<<<<<<< HEAD
		percent = ( now / max * 100 ).toFixed(0);
=======
		percent = (now/max*100).toFixed(0);
>>>>>>> origin/master

		this.runningApp[app].div.appName.innerHTML = app;
		this.runningApp[app].div.now.innerHTML = now+" / "+max;
		this.runningApp[app].div.percent.innerHTML = "["+percent+"%]";
		this.runningApp[app].div.progressBar.style.width = percent+"%";

 		var d = new Date();
 		var timestamp = d.getTime(); 
 		ms = (timestamp-this.runningApp[app].time)

		this.runningApp[app].div.time.innerHTML = ms+"ms";

	}
	
	this.endApp = function(app){

		this.coCoLog.removeChild(this.runningApp[app].div.main);

		var d = new Date();
 		var timestamp = d.getTime(); 
 		ms = (timestamp-this.runningApp[app].time)
		msg = this.runningApp[app].max + " " + app + " in " + ms + "ms";
		this.runningApp[app] = undefined;

		this.print(msg);

	}

	this.load = function(app, now, max){

		if(this.runningApp[app] == undefined){
			this.newApp(app, now, max);

			this.control();

			this.upApp(app, now, max);
		}else if(this.runningApp[app] != undefined && now !== max){
			this.upApp(app, now, max);
		}else{
			this.upApp(app, now, max);
			this.endApp(app);
		}

	}

	this.print = function(msg){
		mainDiv = document.createElement("div");
		mainDiv.style.borderTop = "1px solid white";
		mainDiv.style.height = "30px";
		mainDiv.style.backgroundColor = "rgba(0,0,0,0.3)";

		msgDiv = document.createElement("div");
		msgDiv.style.float = "left";
		msgDiv.style.padding = "5px";
		msgDiv.innerHTML = msg;

		mainDiv.appendChild(msgDiv);

		this.coCoLog.appendChild(mainDiv);

		this.control();
	}

}



