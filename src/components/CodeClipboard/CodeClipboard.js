import ClayTooltip from 'clay-tooltip';
import Clipboard from 'metal-clipboard';

class SingletonEnforcer {};

class CodeClipboard {
    constructor() {
        const selector = '.code-container .btn-copy';

        this.clayTooltip = new ClayTooltip(new SingletonEnforcer());
        this.clayClipboard = new Clipboard({
            selector: selector,
            text: delegateTarget => {
                delegateTarget.setAttribute('title', 'Copied');

                setTimeout(() => {
                    delegateTarget.setAttribute('title', 'Copy');
                }, 2000);

                return delegateTarget.parentNode.querySelector('pre code').innerText;
            }
        });
    }

    dispose() {
        this.clayTooltip.dispose();
        this.clayClipboard.dispose();
    }
}

export default CodeClipboard;