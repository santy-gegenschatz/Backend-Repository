const socket = io.connect()

const render = (array) => {
    console.log('Array: ', array);
    const html = array.forEach( (m) => {
        console.log(m);
        return (`<div>
                <strong> ${m.author} </strong>
                <em> ${m.text} </em>
                </div>`)
        
    }).join (' ')
    console.log('HTML: ', html);
    document.getElementById('messages').innerHTML = html
}

socket.on('messages', (data) => {
    console.log("Message received");
    render(data)
})