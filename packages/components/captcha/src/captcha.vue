<template>
    <canvas
        ref="canvasRef"
        :width="getWidth"
        :height="props.height"
        style="cursor: pointer"
    ></canvas>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { PropsType } from './typing'
const props = defineProps(PropsType)

const emits = defineEmits<{
    (event: 'update:modelValue', value: number | string): void
}>()

const canvasRef = ref<HTMLCanvasElement>()
let preRotateDeg = [[0, 0, 0]] //
let ctx = ref<CanvasRenderingContext2D | undefined>()
let circleNum = ref(9)
const getWidth = computed(() => {
    return props.width <= 60 ? 60 : props.width
})
const getCircleNum = computed(() => {
    return props.width <= 60 ? 6 : circleNum.value
})
onMounted(() => {
    ctx.value = canvasRef.value!.getContext('2d') as any

    randomOption()
    canvasRef.value!.addEventListener('click', () => {
        randomOption()
        if (preRotateDeg.length == 3) {
            preRotateDeg.pop()
        }
    })
})
// 计算逻辑
function randomOption() {
    let operation = ''
    let firstNumber = Math.ceil(Math.random() * 10)
    let operationNumber = Math.ceil(Math.random() * 4)
    let secondNumber = Math.ceil(Math.random() * 10)
    let answer = 0
    let mul = 0 //交互使用
    switch (operationNumber) {
        case 1:
            operation = '+'
            answer = firstNumber + secondNumber
            break
        case 2:
            operation = '-'
            if (firstNumber < secondNumber) {
                mul = firstNumber
                firstNumber = secondNumber
                secondNumber = mul
            }
            answer = firstNumber - secondNumber
            break
        case 3:
            operation = '×'
            answer = firstNumber * secondNumber
            break
        case 4:
            operation = '÷'
            let answerFirst = firstNumber * secondNumber
            mul = firstNumber
            firstNumber = answerFirst
            answer = mul
            break
        default:
            break
    }

    let dataArray = [firstNumber, operation, secondNumber, answer]
    emits('update:modelValue', dataArray[3])
    //清除画布
    ctx.value!.clearRect(0, 0, getWidth.value, props.height)
    if (props.backEffects) {
        for (let index = 0; index < getCircleNum.value; index++) {
            //画球,传画球的半径（范围）
            drawArc(ctx.value!, 1)
        }
    }
    //画显示文字
    drawText(ctx.value!, dataArray)
}
// 生成背景圆形
function drawArc(ctx: CanvasRenderingContext2D, randomRange) {
    let x = randomNumber(getWidth.value)
    let y = randomNumber(props.height)
    let r = randomNumber(randomRange) + 2
    let to16Sting = randomTo16Sting()
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = to16Sting
    ctx.fill()

    ctx.strokeStyle = to16Sting
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.closePath()
}

function drawText(ctx: CanvasRenderingContext2D, dataArray) {
    // ctx.value.translate(0, 0)
    ctx.font = `${getWidth.value <= 60 ? '20' : props.size}px oblique`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    let rotateNumber = randomRotate()
    // 以数据的本身作为旋转点
    ctx.rotate(-preRotateDeg[1][0])
    ctx.rotate(rotateNumber[0])
    ctx.fillText(dataArray[0], dynamicWidth(1), props.height / 2)
    ctx.fillStyle = randomTo16Sting()

    // ctx.rotate(-preRotateDeg[1][1])
    // ctx.rotate(rotateNumber[1])
    ctx.fillText(dataArray[1], dynamicWidth(2), props.height / 2)
    ctx.fillStyle = randomTo16Sting()

    ctx.rotate(-preRotateDeg[1][2])
    ctx.rotate(rotateNumber[2])
    ctx.fillText(dataArray[2], dynamicWidth(3), props.height / 2)
    ctx.fillStyle = randomTo16Sting()
}

// 动态宽度计算
function dynamicWidth(position) {
    const avgWidth = Math.floor(getWidth.value / 3)
    let val = 0
    if (getWidth.value > 60) {
        switch (position) {
            case 1:
                val = avgWidth - Math.floor(getWidth.value / 10)
                break
            case 2:
                val = getWidth.value / 2
                break
            case 3:
                val = avgWidth * 2 + Math.floor(getWidth.value / 10)
                break
            default:
                break
        }
    } else {
        switch (position) {
            case 1:
                val = 20
                break
            case 2:
                val = 35
                break
            case 3:
                val = 50
                break
            default:
                break
        }
    }
    return val
}

//变成16位的颜色专用
function randomTo16Sting() {
    return `#${parseInt(randomNumber(0xffffff).toString()).toString(16)}`
}
//随机数
function randomNumber(number) {
    return Math.random() * number
}
// 数字旋转
function randomRotate() {
    let arr: number[] = []
    let arr1: number[] = []
    let count = 0
    //数字旋转角度调整
    while (count < 3) {
        switch (count) {
            case 0:
                arr.push(randomNumber(10))
                break
            case 1:
                arr.push(randomNumber(10))
                break
            case 2:
                arr.push(randomNumber(10))
                let sum = arr.reduce((a, b) => {
                    return a + b
                }, 0)
                if (Math.max(...arr) / sum > 0.2) {
                    arr[arr.indexOf(Math.max(...arr))] = -sum / (sum * 0.2)
                } else {
                    arr[arr.indexOf(Math.max(...arr))] = -Math.max(...arr)
                }

                arr1 = arr.map(element => {
                    return (element * Math.PI) / 300
                })

                break
            default:
                break
        }
        count++
    }
    //这个是为了存储上一次的数据，为了消除translate的下次旋转以当前位置角度开始。
    preRotateDeg.unshift(arr1)
    return arr1
}
</script>
