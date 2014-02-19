#Grunt Watch Tutorial
This tutorial is designed to give a comprehensive overview of Grunt. It comes with a very simple project (a hello world type web site) and is fully runnable within Codio (or anywhere else for that matter).

##Installation
This project is ready to run in Codio. All you need to do is the following

1. Create a free account with Codio
1. The tutorial can be found in this [GitHub repo](https://github.com/codio/tutorial_grunt_watch_coffee)
1. Either a) Clone the project URL from the GitHub page (it's on the right hand side; use https if you have not [added your Codio SSH key](https://codio.com/s/docs/settings-prefs/account-settings/public-key/) to your GitHub account) - or b) you can copy the following to the clipboard : `https://github.com/codio/tutorial_grunt_watch_coffee.git`
1. From the main Codio Dashboard (where your projects are managed) click the 'Create Project' tab.
1. Select the 'Git' option, paste in the link from Step 3. then press the 'Create Project button'.
1. As soon as the project has been imported you will be taken to the IDE.
1. Open up a Terminal window by selecting the 'Tools->Terminal' menu option.
1. `npm install` which will install the necessary modules for our Grunt tasks (all dependencies found in `package.json` will get installed)
1. Then install `npm install -g grunt-cli` to get the Grunt command line interface tool.

##Annotations Tutorial
This Tutorial uses Codio Annotations, which gives you two ways of getting tutored

1. Wherever you see a blue icon in the file tree or on a line of code (take a look at `Gruntfile.js`) you can click on it to get information
1. Click on [`Tools->Annotations Tour`](http://boxes.preview.codiodev.com/fmay/tutorial-grunt-watch-coffee/tutorial) to get a guided tour.



## The Tutorial Project Coffee Physics
The project we used for out tutorial is thanks to Justin Windle. The original project can be found on GitHub : [https://github.com/soulwire/Coffee-Physics](https://github.com/soulwire/Coffee-Physics)

A lightweight physics engine, written in [CoffeeScript](http://coffeescript.org/). Why? Why not!?

Early demos can be found here: [http://soulwire.github.com/Coffee-Physics/](http://soulwire.github.com/Coffee-Physics/)

#### A Quick Example

The CoffeePhysics API is designed to be very simple. Consider the following [example](http://jsfiddle.net/soulwire/Ra5Ve/):

	// Create a physics instance which uses the Verlet integration method
	var physics = new Physics();
	physics.integrator = new Verlet();

	// Design some behaviours for particles
	var avoidMouse = new Attraction();
	var pullToCenter = new Attraction();

	// Allow particle collisions to make things interesting
	var collision = new Collision();

	// Use Sketch.js to make life much easier
	var example = Sketch.create({ container: document.body });

	example.setup = function() {

	    for ( var i = 0; i < 200; i++ ) {

	        // Create a particle
	        var particle = new Particle( Math.random() );
	        var position = new Vector( random( this.width ), random( this.height ) );
	        particle.setRadius( particle.mass * 10 );
	        particle.moveTo( position );

	        // Make it collidable
	        collision.pool.push( particle );

	        // Apply behaviours
	        particle.behaviours.push( avoidMouse, pullToCenter, collision );

	        // Add to the simulation
	        physics.particles.push( particle );
	    }
	    
	    pullToCenter.target.x = this.width / 2;
	    pullToCenter.target.y = this.height / 2;
	    pullToCenter.strength = 120;
	    
	    avoidMouse.setRadius( 60 );
	    avoidMouse.strength = -1000;
	    
	    example.fillStyle = '#ff00ff';
	}

	example.draw = function() {

	    // Step the simulation
	    physics.step();

	    // Render particles
	    for ( var i = 0, n = physics.particles.length; i < n; i++ ) {

	        var particle = physics.particles[i];
	        example.beginPath();
	        example.arc( particle.pos.x, particle.pos.y, particle.radius, 0, Math.PI * 2 );
	        example.fill();
	    }
	}

	example.mousemove = function() {
	    avoidMouse.target.x = example.mouse.x;
	    avoidMouse.target.y = example.mouse.y;
	}