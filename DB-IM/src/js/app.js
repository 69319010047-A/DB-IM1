document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.loader');

    // 1. ระบบ Show/Hide Password
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // ปรับความทึบของไอคอนเพื่อให้รู้สถานะ
        togglePasswordBtn.style.opacity = type === 'text' ? '1' : '0.6';
    });

    // 2. จัดการ Event การ Submit Form
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บ

        const email = document.getElementById('email').value;
        const password = passwordInput.value;

        // เปลี่ยนสถานะปุ่มเป็น Loading
        setLoadingState(true);

        try {
            // จำลองการเชื่อมต่อ API หรือ Firebase Auth (Delay 1.5 วินาที)
            await simulateApiCall(1500);

            // Mock Validation อย่างง่าย
            if (email === "admin@company.com" && password === "password") {
                showToast('Login successful! Redirecting...', 'success');
                // window.location.href = '../pages/dashboard.html'; // โค้ดสำหรับ Redirect ไปหน้า Dashboard จริง
            } else {
                showToast('Invalid email or password.', 'error');
            }
        } catch (error) {
            showToast('System error. Please try again later.', 'error');
        } finally {
            // คืนค่าสถานะปุ่มกลับมาเป็นปกติ
            setLoadingState(false);
        }
    });

    // 3. ฟังก์ชันปรับสถานะปุ่ม (Micro-interaction)
    function setLoadingState(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            btnText.classList.add('hidden');
            loader.classList.remove('hidden');
        } else {
            submitBtn.disabled = false;
            btnText.classList.remove('hidden');
            loader.classList.add('hidden');
        }
    }

    // 4. ระบบแจ้งเตือน Custom Toast (แทนการใช้ alert ธรรมดา)
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        toastContainer.appendChild(toast);

        // ลบ Toast ทิ้งหลังจาก 3 วินาที
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ฟังก์ชันจำลอง Delay สำหรับ API
    function simulateApiCall(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});