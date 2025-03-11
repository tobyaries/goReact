// index.js - 使用简易React创建应用
import React from './React/index.js';
import ReactDOM from './ReactDOM/render.js';

// 使用React.createElement创建虚拟DOM
const element = React.createElement(
    "div", // 创建一个div元素
    { id: "root-div", className: "container" }, // 设置div的属性
    React.createElement("h1", null, "Hello, Tiny React!"), // 创建一个h1元素，内容为"Hello, Tiny React!"
    React.createElement("p", null, "This is a simple example.") // 创建一个p元素，内容为"This is a simple example."
);

// 使用ReactDOM.render将虚拟DOM渲染到真实的DOM中
ReactDOM.render(element, document.getElementById("root")); // 将虚拟DOM渲染到id为"root"的元素中