/**
 * 创建文本节点的虚拟 DOM 元素
 * @param {string} text 文本内容
 * @returns {object} 虚拟 DOM 对象
 */
function createTextElement(text) {
    return {
        type: "TEXT_ELEMENT", // 文本节点类型
        props: {
            nodeValue: text, // 文本内容
            children: [], // 没有子节点
        },
    };
}

export { createTextElement };