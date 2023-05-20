import * as Matter from "matter-js";

// 创建引擎和渲染器
var World = Matter.World,
    Bodies = Matter.Bodies;
var ballRadius = 15;

export function createMainBall(engine: Matter.Engine) {
    // 创建母球
    var cueBall = Bodies.circle(100, 200, ballRadius, {
        restitution: 1, // 调整回弹系数以控制球的弹跳
    });
    World.add(engine.world, cueBall);
    return cueBall;
}
export function createBall(engine: Matter.Engine) {
    // 创建被打击的球
    var objectBalls: Matter.Body[] = [];
    var numRows = 6;
    var startX = 500;
    var startY = 200;

    for (var row = 0; row < numRows; row++) {
        var ballsInRow = row + 1;
        var rowStartX = startX;
        var rowStartY = startY - row * ballRadius;
        for (var i = 0; i < ballsInRow; i++) {
            var x = rowStartX + (row - numRows / 2) * ballRadius * 2;
            var y = rowStartY + i * ballRadius * 2;

            var ball = Bodies.circle(x, y, ballRadius, {
                restitution: 1, // 调整回弹系数以控制球的弹跳
            });

            objectBalls.push(ball);
        }
    }

    // 将所有物体添加到世界中
    World.add(engine.world, [...objectBalls]);
}
/**
 *
 * @param engine
 */
export function createWall(engine: Matter.Engine) {
    // 创建一个静态矩形刚体
    var staticRect = Bodies.rectangle(-10000, -450, 30000, 1000, {
        isStatic: true,
        restitution: 1, // 调整回弹系数以控制球的弹跳
    });

    var staticRectBanner = Bodies.rectangle(0, 850, 30000, 1000, {
        isStatic: true,
        restitution: 1, // 调整回弹系数以控制球的弹跳
    });

    var leftWall = Bodies.rectangle(-4950, 0, 10000, 1000000, {
        isStatic: true,
        restitution: 1, // 调整回弹系数以控制球的弹跳
    });
    var rightWall = Bodies.rectangle(800, 0, 100, 1000000, {
        isStatic: true,
        restitution: 1, // 调整回弹系数以控制球的弹跳
    });
    World.add(engine.world, staticRect);
    World.add(engine.world, staticRectBanner);
    World.add(engine.world, leftWall);
    World.add(engine.world, rightWall);
}
/**
 * 朝向
 * @param angle
 * @returns
 */
export function getNormalizedVectorFromAngle(angle: number): { x: number; y: number } {
    const degree = angle % 360; // 将角度限制在 0 到 360 度之间
    const radian = (degree * Math.PI) / 180; // 将角度转换为弧度
    const x = Math.cos(radian);
    const y = Math.sin(radian);

    return { x, y };
}
