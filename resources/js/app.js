import './bootstrap';
import { createApp } from 'vue';
import ReviewForm from './components/ReviewForm.vue';

const app = createApp({});

app.component('review-form', ReviewForm);

app.mount('#app');