import * as Matter from "matter-js";
import { createBall, createMainBall, createWall, getNormalizedVectorFromAngle } from "./tool";
import { Input } from "normalize-package-data";
// 创建引擎和渲染器
var Engine = Matter.Engine,
    Render = Matter.Render;

var engine = Engine.create({
    gravity: { x: 0, y: 0 }, // 关闭重力效果
});
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 400,
        wireframes: false,
    },
});
var mainball = createMainBall(engine);
createBall(engine);
createWall(engine);
export function hitBall() {
    let inpute: Input = document.getElementById("djInput");
    let angle = getNormalizedVectorFromAngle(Number(inpute.value));
    let ball = mainball;
    // 施加一个向右的力
    var forceMagnitude = 0.05;
    angle.x *= forceMagnitude;
    angle.y *= forceMagnitude;
    var force = { x: angle.x, y: angle.y };
    Matter.Body.applyForce(ball, ball.position, force);
}
//@ts-ignore
window["hitBall"] = hitBall;
var runner = Matter.Runner.create();

//@ts-ignore
window["runner"] = function () {
    setInterval(() => {
        Matter.Runner.tick(runner, engine, 1000 / 60);
    }, 1000 / 60);
    // 启动引擎
};
//@ts-ignore
window["runner"] && window["runner"]();
// Matter.Runner.run(engine);
// 启动渲染器
Render.run(render);
document.getElementById("dj").addEventListener("click", function () {
    // 在这里编写点击按钮后要执行的代码
    console.log("按钮被点击了！");
    hitBall();
});
