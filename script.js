const form = document.getElementById('breakfastForm');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const selectedBreakfast = document.querySelector('input[name="breakfast"]:checked');

    if (!selectedBreakfast) {
        alert('Выберите блюдо!');
        return;
    }

    const order = selectedBreakfast.value;

    // Отправка данных через Telegram Bot API
    await sendTelegramMessage(order);
    alert(`Ваш заказ: ${order} принят!`);
});

async function sendTelegramMessage(order) {
    const wifeChatId = '1028348298'; // ID чата жены
    const yourChatId = '1340433524'; // Ваш ID чата
    const botToken = '8015097869:AAHWZj9G9ngNN9Ygn6e0Zye55pJr7rJFzR0';

    const wifeMessage = `Ваш заказ на завтрак (${order}) принят! 💖`;
    const yourMessage = `Приготовь ${order} для жены! 🚀`;

    // Сообщение жене
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: wifeChatId, text: wifeMessage })
    });

    // Сообщение вам
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: yourChatId, text: yourMessage })
    });
}
