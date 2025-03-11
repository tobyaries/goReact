// src/ReactDOM/render.js

/**
 * 将虚拟 DOM 渲染到真实 DOM 中
 * @param {object} element 虚拟 DOM 元素
 * @param {HTMLElement} container 容器元素
 */
function render(element, container) {
    const dom = createDOM(element); // 调用 createDOM 函数创建真实的 DOM 节点
    container.appendChild(dom); // 将创建的 DOM 节点添加到容器元素中
}

/**
 * 创建 DOM 节点
 * @param {object} node 虚拟 DOM 节点
 * @returns {HTMLElement} 真实 DOM 节点
 */
function createDOM(node) {
    if (node.type === "TEXT_ELEMENT") {
        // 如果节点类型为 "TEXT_ELEMENT"，则创建文本节点
        return document.createTextNode(node.props.nodeValue);
    }

    // 创建元素节点
    const dom = document.createElement(node.type);

    // 过滤掉 children 属性
    const isProperty = key => key !== "children";

    // 遍历节点的属性，并将它们设置到 DOM 节点上
    Object.keys(node.props)
        .filter(isProperty)
        .forEach(name => {
            dom[name] = node.props[name];
        });

    // 递归处理子节点，并将它们添加到 DOM 节点中
    if (node.props.children && node.props.children.length > 0) {
        node.props.children.forEach(child => {
            if (child) {
                dom.appendChild(createDOM(child));
            }
        });
    }

    return dom; // 返回创建的 DOM 节点
}

const ReactDOM = {
    render, // 导出 render 函数
};

export default ReactDOM; // 默认导出 ReactDOM 对象