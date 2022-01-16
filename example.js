var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine = Engine.create();

var render = Render.create({
    element: document.body,
    engine: engine
});

var ball = Bodies.circle(420, 15, 20);

var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

World.add(engine.world, [ball, boxA, boxB, ground]);

Engine.run(engine);

Render.run(render);
