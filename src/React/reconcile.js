// src/ReactReconciliation/reconcile.js

/**
 * 协调虚拟 DOM 树和真实 DOM 树
 * @param {HTMLElement} parentNode 父节点
 * @param {object} oldNode 旧的虚拟 DOM 节点
 * @param {object} newNode 新的虚拟 DOM 节点
 */
function reconcile(parentNode, oldNode, newNode) {
    if (!oldNode) {
        // 创建新节点
        parentNode.appendChild(createDOM(newNode));
    } else if (!newNode) {
        // 删除旧节点
        parentNode.removeChild(oldNode.dom);
    } else if (oldNode.type !== newNode.type) {
        // 替换节点
        parentNode.replaceChild(createDOM(newNode), oldNode.dom);
    } else {
        // 更新节点属性
        updateDOMProperties(oldNode.dom, oldNode.props, newNode.props);
        // 递归比较子节点
        const newChildren = newNode.props.children || [];
        const oldChildren = oldNode.props.children || [];
        const maxLength = Math.max(newChildren.length, oldChildren.length);
        for (let i = 0; i < maxLength; i++) {
            reconcile(oldNode.dom, oldChildren[i], newChildren[i]);
        }
    }
}

/**
 * 创建 DOM 节点
 * @param {object} node 虚拟 DOM 节点
 * @returns {HTMLElement} 真实 DOM 节点
 */
function createDOM(node) {
    const dom = node.type === "TEXT_ELEMENT"
        ? document.createTextNode(node.props.nodeValue) // 创建文本节点
        : document.createElement(node.type); // 创建元素节点
    updateDOMProperties(dom, {}, node.props); // 设置 DOM 属性
     // 处理子节点
     if (node.props.children) {
        node.props.children.forEach(child => {
            if (child) {
                dom.appendChild(createDOM(child));
            }
        });
    }
    node.dom = dom; // 将 DOM 节点添加到虚拟 DOM 节点
    return dom;
}

/**
 * 更新 DOM 节点属性
 * @param {HTMLElement} dom 真实 DOM 节点
 * @param {object} oldProps 旧的属性
 * @param {object} newProps 新的属性
 */
function updateDOMProperties(dom, oldProps, newProps) {
    if (oldProps === newProps) {
        return; // 新旧属性完全相同，直接返回
    }
    const isProperty = key => key !== "children"; // 过滤 children 属性
    Object.keys(oldProps)
        .filter(isProperty)
        .forEach(name => {
            if (!(name in newProps)) {
                dom[name] = ""; // 删除旧属性
            }
        });
    Object.keys(newProps)
        .filter(isProperty)
        .forEach(name => {
            if (oldProps[name] !== newProps[name]) {
                dom[name] = newProps[name]; // 更新或添加新属性
            }
        });
}

export { reconcile };