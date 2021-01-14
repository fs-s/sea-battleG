const socket = io()

const messageContainer = document.querySelector('#message-container')
const messageInput = document.querySelector('#message-box')

messageInput.addEventListener('keyup', e => {
    if ( e.key == 'Enter' ) {
        socket.emit('chatMessage', messageInput.value)
        messageInput.value = ' '
    }
})

socket.on('chatMessage', res => {
    const messageSender = document.createElement('li')
    messageSender.innerText = res.userid + ': '
        const messageLi = document.createElement('li')
        messageLi.innerText =res.message
    messageContainer.append(messageSender)
    messageContainer.append(messageLi)
    messageContainer.scrollTop = messageContainer.scrollHeight;
})

socket.on('initGameBoard', res => {
    console.log(res.humanGameBoard)
})

messageInput.focus
messageContainer.scrollTop = messageContainer.scrollHeight;
