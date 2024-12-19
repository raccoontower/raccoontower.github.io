const buttons = document.querySelectorAll('.order-btn');
const modal = document.getElementById('modal');
const kissesCount = document.getElementById('kisses-count');
const confirmBtn = document.getElementById('confirm-btn');
const cancelBtn = document.getElementById('cancel-btn');

let currentDish = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        currentDish = button.dataset.dish;
        const kisses = Math.floor(Math.random() * 5) + 1;
        kissesCount.textContent = kisses;
        modal.classList.remove('hidden');
    });
});

confirmBtn.addEventListener('click', async () => {
    await sendTelegramMessage(currentDish);
    alert(`Ваш заказ: ${currentDish} принят!`);
    modal.classList.add('hidden');
});

cancelBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

async function sendTelegramMessage(dish) {
    const wifeChatId = '1028348298'; // ID чата жены
    const yourChatId = '1340433524'; // Ваш ID чата
    const botToken = '8015097869:AAHWZj9G9ngNN9Ygn6e0Zye55pJr7rJFzR0';

    const wifeMessage = `Ваш заказ на завтрак (${dish}) принят! 💖`;
    const yourMessage = `Приготовь ${dish} для жены! 🚀`;

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: wifeChatId, text: wifeMessage })
    });

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: yourChatId, text: yourMessage })
    });
}
