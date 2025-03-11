// src/React/createElement.js

import { createTextElement } from './createTextElement.js'; // 添加导入语句

/**
 * 创建虚拟 DOM 元素
 * @param {string|function} type 元素类型或组件函数
 * @param {object} props 元素属性
 * @param  {...any} children 子元素
 * @returns {object} 虚拟 DOM 对象
 */
function createElement(type, props, ...children) {
    return {
        type, // 元素类型
        props: {
            ...props, // 复制属性
            children: children.map(child =>
                typeof child === "object"
                    ? child // 如果是虚拟 DOM 对象，则直接使用
                    : createTextElement(child) // 否则，创建文本节点
            ),
        },
    };
}

export { createElement };