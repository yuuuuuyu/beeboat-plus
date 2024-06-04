import type { Directive, DirectiveBinding } from 'vue'
/**
 * 设置水印文案，颜色，字体大小即可
 * {text:'HY版权',font:'16px Microsoft JhengHei',textColor:'rgba(180, 180, 180, 0.4)'}
 * @param str 水印文本内容
 * @param parentNode 父节点
 * @param font 字体大小、字体
 * @param textColor 字体颜色
 */
const addWaterMarker: Directive = (str: string, parentNode: any, font: any, textColor: string) => {
    // 水印文字，父元素，字体，文字颜色
    const can: HTMLCanvasElement = document.createElement('canvas')
    parentNode.appendChild(can)
    can.width = 210
    can.height = 150
    can.style.display = 'none'
    const cans = can.getContext('2d') as CanvasRenderingContext2D
    cans.rotate((-20 * Math.PI) / 180)
    cans.font = font || '16px Microsoft JhengHei'
    cans.fillStyle = textColor || 'rgba(180, 180, 180, 0.3)'
    cans.textAlign = 'left'
    cans.textBaseline = 'Middle' as CanvasTextBaseline
    cans.fillText(str, can.width / 10, can.height / 2)
    parentNode.style.backgroundImage = `url(${can.toDataURL('image/png')})`
}
/**
 * 使用：设置水印文案，颜色，字体大小即可
 * {text:'HY版权',font:'16px Microsoft JhengHei',textColor:'rgba(180, 180, 180, 0.4)'}
 */
const waterMarker: Directive = {
    mounted(el: DirectiveBinding, binding: DirectiveBinding) {
        addWaterMarker(binding.value.text, el, binding.value.font, binding.value.textColor)
    },
}

export default waterMarker
