export default url =>
    new Promise((resolve, reject) =>
        document.head.appendChild(
            Object.assign(document.createElement('script'), {
                async: true,
                src: url,
                onload: resolve,
                onerror: reject,
            }),
        ),
    );