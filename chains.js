var Example = Example || {};

Example.chains = function() {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
		Events = Matter.Events,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Bodies = Matter.Bodies;

  var engine = Engine.create(),
    world = engine.world;

  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 800,
      height: 600,
      showAngleIndicator: true,
      showCollisions: true,
      showVelocity: true
    }
  });

  engine.world.gravity.y = 0;
  Render.run(render);

  var runner = Runner.create();
  Runner.run(runner, engine);

  var group = Body.nextGroup(true);

  let wormSquares = [];

  var ropeA = Composites.stack(200, 150, 8, 1, 0, 0, function(x, y) {
    let wormSquare = Bodies.rectangle(x, y, 40, 40, { collisionFilter: { group: group } });
    wormSquares.push({
      body: wormSquare,
      x: x,
      y: y
    });
    return wormSquare;
  });

  Composites.chain(ropeA, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 0, render: { type: 'pin' } });

  group = Body.nextGroup(true);

  Composite.add(world, [
    ropeA,
    Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true })
  ]);

  /*
	var bodyA = Bodies.rectangle(300, 300, 50, 50, { isStatic: true, render: { fillStyle: '#060a19' } });

  Composite.add(world, bodyA);
  */

	Events.on(runner, 'afterTick', function(event) {
    Body.setVelocity(wormSquares[0].body, { x: -1, y: 4 })
  });

  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

  Composite.add(world, mouseConstraint);

  render.mouse = mouse;

  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 700, y: 600 }
  });

  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function() {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    }
  };
};

Example.chains.title = 'Chains';
Example.chains.for = '>=0.14.2';

if (typeof module !== 'undefined') {
  module.exports = Example.chains;
}

Example.chains();
