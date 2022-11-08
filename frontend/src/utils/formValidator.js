
class FormValidator {
    constructor(data) {
        this.form = data.form
        this.rules = data.rules
        this.msgElement = data.msgElement
        this.css = data.css
    }

    static validateTests = {
        require: (data) => {
            return data ? undefined : "Vui lòng hoàn thành trường bắt buộc này"
        },
        email: (data) => {
            const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b$/
            return regex.test(data) ? undefined : "Email phải được định dạng chính xác."
        },
        min: (min) => {
            return (data) => {
                return data.length >= Number(min) ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`
            }
        }
    }

    notify(formGroup, type, message="") {
        formGroup.classList[type](this.css)
        formGroup.querySelector(this.msgElement).innerHTML = message
    }

    handleValidate(value, selector, formGroup) {
        let message
        for (const test of this.rules[selector]) {
            message = test(value)
            if (message) {
                this.notify(formGroup, "add", message)
                break
            }
            else {
                this.notify(formGroup, "remove")
            }
        }
        return !message
    }

    validate() {
        for (const selector in this.rules) {
            this.rules[selector] = this.rules[selector].map(rule => {
                let test = FormValidator.validateTests[rule]
                if (Array.isArray(rule) && rule.includes(':')) {
                    const ruleData = rule.split(':')
                    rule = ruleData[0]
                    test = FormValidator.validateTests[rule](ruleData[1])
                }
                return test
            })

            const input = this.form.querySelector(selector)
            const formGroup = input.parentElement
            
            input.onblur = (event) => {
                this.handleValidate(event.target.value, selector, formGroup)
            }

            input.oninput = () => {
                this.notify(formGroup, "remove")
            }
        }
    }

    validateAll() {
        const inputs = this.form.querySelectorAll('input')
        let isPassed = true
        const submitData = {}
        for (const input of inputs) {
            const formGroup = input.parentElement
            const selector = `#${input.id}`
            if (!this.handleValidate(input.value, selector, formGroup)) {
                isPassed = false
            }
            submitData[input.id] = input.value
        }
        
        return {
            isPassed,
            submitData
        }
    }
}

export default FormValidator