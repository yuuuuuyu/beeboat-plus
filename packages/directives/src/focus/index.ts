import type { ObjectDirective } from 'vue'
const btFocus: ObjectDirective = {
	mounted(el) {
		const element = ['INPUT', 'TEXTAREA']
		if (element.includes(el.nodeName)) {
			el.focus()
		} else {
			// 如果不是原生的标签在获取一下内部input或textarea
			element.forEach(item => {
				const tag = el.querySelector(item.toLowerCase())
				if (tag?.nodeName === item) {
					tag.focus()
				}
			})
		}
	},
}
export default btFocus
