class PasswordGenerator {
    constructor() {
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.passwordOutput = document.getElementById('passwordOutput');
        this.copyButton = document.getElementById('copyButton');
        this.generateButton = document.getElementById('generateButton');
        this.lengthSlider = document.getElementById('passwordLength');
        this.lengthValue = document.getElementById('lengthValue');
        this.uppercaseCheck = document.getElementById('uppercase');
        this.lowercaseCheck = document.getElementById('lowercase');
        this.numbersCheck = document.getElementById('numbers');
        this.symbolsCheck = document.getElementById('symbols');
        this.strengthBar = document.querySelector('.strength-bar');
        this.strengthText = document.querySelector('.strength-text');
    }

    setupEventListeners() {
        this.generateButton.addEventListener('click', () => this.generatePassword());
        this.copyButton.addEventListener('click', () => this.copyPassword());
        this.lengthSlider.addEventListener('input', () => {
            this.lengthValue.textContent = this.lengthSlider.value;
        });
    }

    generatePassword() {
        const length = parseInt(this.lengthSlider.value);
        const hasUpper = this.uppercaseCheck.checked;
        const hasLower = this.lowercaseCheck.checked;
        const hasNumbers = this.numbersCheck.checked;
        const hasSymbols = this.symbolsCheck.checked;

        if (!hasUpper && !hasLower && !hasNumbers && !hasSymbols) {
            alert('请至少选择一种字符类型！');
            return;
        }

        const password = this.createPassword(length, hasUpper, hasLower, hasNumbers, hasSymbols);
        this.passwordOutput.value = password;
        this.updateStrengthMeter(password);
    }

    createPassword(length, hasUpper, hasLower, hasNumbers, hasSymbols) {
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        let chars = '';
        if (hasUpper) chars += upper;
        if (hasLower) chars += lower;
        if (hasNumbers) chars += numbers;
        if (hasSymbols) chars += symbols;

        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return password;
    }

    updateStrengthMeter(password) {
        const strength = this.calculatePasswordStrength(password);
        const colors = ['#ff4444', '#ffbb33', '#00C851', '#007E33'];
        const texts = ['弱', '中等', '强', '非常强'];

        this.strengthBar.style.width = `${(strength / 4) * 100}%`;
        this.strengthBar.style.background = colors[strength - 1];
        this.strengthText.textContent = `密码强度: ${texts[strength - 1]}`;
    }

    calculatePasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 12) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        return Math.max(1, strength);
    }

    async copyPassword() {
        if (!this.passwordOutput.value) return;

        try {
            await navigator.clipboard.writeText(this.passwordOutput.value);
            this.copyButton.textContent = '已复制！';
            setTimeout(() => {
                this.copyButton.textContent = '复制';
            }, 2000);
        } catch (err) {
            alert('复制失败，请手动复制');
        }
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new PasswordGenerator();
}); 