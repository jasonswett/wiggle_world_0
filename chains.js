var Example = Example || {};

Example.chains = function() {
  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
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

  Render.run(render);

  var runner = Runner.create();
  Runner.run(runner, engine);

  var group = Body.nextGroup(true);

  var ropeA = Composites.stack(100, 50, 8, 1, 10, 10, function(x, y) {
    return Bodies.rectangle(x, y, 40, 40, { collisionFilter: { group: group } });
  });

  Composites.chain(ropeA, 0.5, 0, -0.5, 0, { stiffness: 0.8, length: 2, render: { type: 'line' } });
  Composite.add(ropeA, Constraint.create({ 
    bodyB: ropeA.bodies[0],
    pointB: { x: -25, y: 0 },
    pointA: { x: ropeA.bodies[0].position.x, y: ropeA.bodies[0].position.y },
    stiffness: 0.5
  }));

  group = Body.nextGroup(true);

  Composite.add(world, [
    ropeA,
    Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true })
  ]);

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 700, y: 600 }
  });

  // context for MatterTools.Demo
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
