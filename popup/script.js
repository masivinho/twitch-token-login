if (document.querySelector('.twitch-token-login-popup')) {
    document.querySelector('#submit').addEventListener('click', () => {
        token = document.querySelector('#token').value;
        if (token != '') {
            document.querySelector('#token').style.border = '1px solid #222428';
            handleCookiesUpdate(token);
        } else {
            document.querySelector('#token').style.border = '1px solid #ee4445';
        }
    })
}

const handleCookiesUpdate = async (token) => {

    chrome.cookies.remove({url: 'https://www.twitch.tv', name: 'auth-token'});
    chrome.cookies.remove({url: 'https://www.twitch.tv', name: 'twilight-user'});

    await sleep(200);

    chrome.cookies.set({
        url: 'https://www.twitch.tv',
        name: 'auth-token',
        value: token
    });

    setTimeout(async () => {
        chrome.tabs.update({ url: 'https://www.twitch.tv/wallet?tab=bits-usage-history' });
    }, 200);
}

let sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}