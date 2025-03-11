// src/ReactDOM/render.js

import { reconcile } from '../React/reconcile.js'; // 导入 reconcile 函数

/**
 * 将虚拟 DOM 渲染到真实 DOM 中
 * @param {object} element 虚拟 DOM 元素
 * @param {HTMLElement} container 容器元素
 */
function render(element, container) {
    const oldNode = container.firstChild; // 获取容器的第一个子节点，作为旧的 DOM 节点
    const newNode = element; // 新的虚拟 DOM 节点
    reconcile(container, oldNode, newNode); // 调用 reconcile 函数进行协调
}

const ReactDOM = {
    render,
};

export default ReactDOM;