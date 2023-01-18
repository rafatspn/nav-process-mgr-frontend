export function initializeFacebookSdk() {
    if (window.FB === undefined) {
        console.log('FB undefined -> provide callback')
        window.fbAsyncInit = function () {
            initialize()
        }
    } else {
        console.log('FB defined -> call init right away')
        initialize()
    }

    function initialize() {
        window.FB.init({
            appId: '654290276302520',
            cookie: true,
            xfbml: true,
            version: 'v15.0'
        })
    }
}
