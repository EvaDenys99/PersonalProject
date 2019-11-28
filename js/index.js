{
  // module aliases
  const Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Constraint = Matter.Constraint,
    Composite = Matter.Composite,
    Common = Matter.Common,
    Body = Matter.Body;

  // create an engine
  const engine = Engine.create();

  // create a renderer
  const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      showAngleIndicator: true
    }
  });

  //const ground = Bodies.rectangle(x, y, width, height, zwaartekracht uit);
  const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
  //making an instance of the function ragdoll below
  robot = robot(200, 100, 1);

  // add mouse control
  const mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: true
        }
      }
    });

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  //persoon
  function robot(x, y, scale, options) {
    scale = typeof scale === "undefined" ? 1 : scale;
    const chestOptions = Common.extend(
      {
        label: "chest",
        collisionFilter: {
          group: Body.nextGroup(true)
        },
        render: {
          fillStyle: "#E0A423"
        }
      },
      options
    );

    const leftArmOptions = Common.extend(
      {
        label: "left-arm",
        collisionFilter: {
          group: Body.nextGroup(true)
        },
        render: {
          fillStyle: "#FFBC42"
        }
      },
      options
    );

    const leftLowerArmOptions = Common.extend({}, leftArmOptions, {
      render: {
        fillStyle: "#E59B12"
      }
    });

    const rightArmOptions = Common.extend(
      {
        label: "right-arm",
        collisionFilter: {
          group: Body.nextGroup(true)
        },
        render: {
          fillStyle: "#FFBC42"
        }
      },
      options
    );

    const rightLowerArmOptions = Common.extend({}, rightArmOptions, {
      render: {
        fillStyle: "#E59B12"
      }
    });

    const leftLegOptions = Common.extend(
      {
        label: "left-leg",
        collisionFilter: {
          group: Body.nextGroup(true)
        },
        render: {
          fillStyle: "#FFBC42"
        }
      },
      options
    );

    const leftLowerLegOptions = Common.extend({}, leftLegOptions, {
      render: {
        fillStyle: "#E59B12"
      }
    });

    const rightLegOptions = Common.extend(
      {
        label: "right-leg",
        collisionFilter: {
          group: Body.nextGroup(true)
        },
        render: {
          fillStyle: "#FFBC42"
        }
      },
      options
    );

    const rightLowerLegOptions = Common.extend({}, rightLegOptions, {
      render: {
        fillStyle: "#E59B12"
      }
    });
    //the actual robot
    const chest = Bodies.rectangle(x, y, 100 * scale, 50 * scale, chestOptions);
    //voorpoten
    const rightUpperArm = Bodies.rectangle(
      x + 0 * scale,
      y + 20 * scale,
      20 * scale,
      60 * scale,
      rightArmOptions
    );
    const rightLowerArm = Bodies.rectangle(
      x + 0 * scale,
      y + 60 * scale,
      20 * scale,
      60 * scale,
      rightLowerArmOptions
    );
    const leftUpperArm = Bodies.rectangle(
      x + 0 * scale,
      y + 20 * scale,
      20 * scale,
      60 * scale,
      leftArmOptions
    );
    const leftLowerArm = Bodies.rectangle(
      x + 0 * scale,
      y + 60 * scale,
      20 * scale,
      60 * scale,
      leftLowerArmOptions
    );

    //achterpoten
    const leftUpperLeg = Bodies.rectangle(
      x + 15 * scale,
      y + 57 * scale,
      20 * scale,
      60 * scale,
      leftLegOptions
    );
    const leftLowerLeg = Bodies.rectangle(
      x + 15 * scale,
      y + 97 * scale,
      20 * scale,
      60 * scale,
      leftLowerLegOptions
    );
    const rightUpperLeg = Bodies.rectangle(
      x + 15 * scale,
      y + 57 * scale,
      20 * scale,
      60 * scale,
      rightLegOptions
    );
    const rightLowerLeg = Bodies.rectangle(
      x + 15 * scale,
      y + 97 * scale,
      20 * scale,
      60 * scale,
      rightLowerLegOptions
    );

    //samenhangen van lichaam
    const chestToRightUpperArm = Constraint.create({
      bodyA: chest,
      pointA: {
        x: -24 * scale,
        y: 23 * scale
      },
      pointB: {
        x: 0 * scale,
        y: -8 * scale
      },
      bodyB: rightUpperArm,
      stiffness: 0.6,
      render: {
        visible: true
      }
    });

    const chestToLeftUpperArm = Constraint.create({
      bodyA: chest,
      pointA: {
        x: -24 * scale,
        y: 23 * scale
      },
      pointB: {
        x: 0 * scale,
        y: -8 * scale
      },
      bodyB: leftUpperArm,
      stiffness: 0.6,
      render: {
        visible: true
      }
    });

    const chestToLeftUpperLeg = Constraint.create({
      bodyA: chest,
      pointA: {
        x: 24 * scale,
        y: 20 * scale
      },
      pointB: {
        x: 0 * scale,
        y: -8 * scale
      },
      bodyB: leftUpperLeg,
      stiffness: 0.6,
      render: {
        visible: true
      }
    });

    const chestToRightUpperLeg = Constraint.create({
      bodyA: chest,
      pointA: {
        x: 24 * scale,
        y: 20 * scale
      },
      pointB: {
        x: 0 * scale,
        y: -8 * scale
      },
      bodyB: rightUpperLeg,
      stiffness: 0.6,
      render: {
        visible: true
      }
    });

    const upperToLowerRightArm = Constraint.create({
      bodyA: rightUpperArm,
      bodyB: rightLowerArm,
      pointA: {
        x: 0 * scale,
        y: 20 * scale
      },
      pointB: {
        x: 0 * scale,
        y: -20 * scale
      },
      stiffness: 0.6,
      render: {
        visible: true
      }
    });

    const upperToLowerLeftArm = Constraint.create({
      bodyA: leftUpperArm,
      bodyB: leftLowerArm,
      pointA: {
        x: 0 * scale,
        y: 20 * scale
      },
      pointB: {
        x: 0 * scale,
        y: -20 * scale
      },
      stiffness: 0.6,
      render: {
        visible: true
      }
    });

    const upperToLowerLeftLeg = Constraint.create({
      bodyA: leftUpperLeg,
      bodyB: leftLowerLeg,
      pointA: {
        x: 0 * scale,
        y: 20 * scale
      },
      pointB: {
        x: 0 * scale,
        y: -20 * scale
      },
      stiffness: 0.6,
      render: {
        visible: true
      }
    });

    const upperToLowerRightLeg = Constraint.create({
      bodyA: rightUpperLeg,
      bodyB: rightLowerLeg,
      pointA: {
        x: 0 * scale,
        y: 20 * scale
      },
      pointB: {
        x: 0 * scale,
        y: -20 * scale
      },
      stiffness: 0.6,
      render: {
        visible: true
      }
    });

    const robot = Composite.create({
      bodies: [
        chest,
        leftLowerArm,
        leftUpperArm,
        rightLowerArm,
        rightUpperArm,
        leftLowerLeg,
        rightLowerLeg,
        leftUpperLeg,
        rightUpperLeg
      ],
      constraints: [
        upperToLowerLeftArm,
        upperToLowerRightArm,
        chestToLeftUpperArm,
        chestToRightUpperArm,
        upperToLowerLeftLeg,
        upperToLowerRightLeg,
        chestToLeftUpperLeg,
        chestToRightUpperLeg
      ]
    });

    return robot;
  }

  // add all of the bodies to the world
  World.add(engine.world, [ground, mouseConstraint, robot]);

  // run the engine
  Engine.run(engine);

  // run the renderer
  Render.run(render);
}
