<template>
    <form @submit.prevent="submitForm" class="form">
        <input v-model="form.name" type="text" placeholder="Ваше ім'я" required class="form__input">
        <input v-model="form.email" type="email" placeholder="Ваш Email" required class="form__input">
        <textarea v-model="form.message" placeholder="Ваше повідомлення або відгук" required class="form__input" rows="5"></textarea>
        
        <div v-if="status.message" :class="{'success': status.type === 'success', 'error': status.type === 'error'}" style="margin-bottom: 15px; padding: 10px; border-radius: 5px;">
            {{ status.message }}
        </div>

        <button type="submit" :disabled="loading" class="btn btn--submit">
            {{ loading ? 'Відправка...' : 'Надіслати відгук' }}
        </button>
    </form>
</template>

<script setup>
import { ref, reactive } from 'vue';

const form = reactive({
    name: '',
    email: '',
    message: '',
    honeypot: '' // Анти-спам поле (приховане логічно)
});

const status = reactive({ type: '', message: '' });
const loading = ref(false);

const submitForm = async () => {
    loading.value = true;
    status.message = '';

    try {
        const response = await fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(form)
        });

        const data = await response.json();

        if (response.ok) {
            status.type = 'success';
            status.message = 'Дякуємо! Ваш відгук збережено.';
            // Очистка форми
            form.name = '';
            form.email = '';
            form.message = '';
        } else {
            status.type = 'error';
            status.message = data.message || 'Помилка при відправці.';
        }
    } catch (error) {
        status.type = 'error';
        status.message = 'Помилка з\'єднання з сервером.';
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.success { background-color: #d4edda; color: #155724; }
.error { background-color: #f8d7da; color: #721c24; }
</style>