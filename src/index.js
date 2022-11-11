// @ts-check
'use strict';

const form = document.querySelector('form');
const output = document.querySelector('#output');
const expire_time = document.getElementById('expire_time');

void
function prefillUnix() {
    const now = new Date();
    const unix = Math.round(now.getTime() / 1000) + 60 ** 2 * 24 * 7; // 1 week from now
    // @ts-ignore
    expire_time.value = String(unix);
}();

function handleSubmit(event) {
    event.preventDefault();

    const dataObj = {};
    const items = event.target.elements;

    for (const item of items) {
        if (item.id && item.id !== "submitBtn") {
            switch (item.id) {
                case "is_collectible":
                    dataObj[item.id] = item.checked;
                    break;
                default:
                    dataObj[item.id] = item.value;
            }
        }
    }

    const data = JSON.stringify(dataObj);
    const _ta = document.getElementById('outputTA');
    if (_ta) {
        // @ts-ignore
        _ta.value = window.btoa(data);
    } else {
        const ta = document.createElement('textarea');
        ta.id = 'outputTA';
        ta.value = window.btoa(data);
        ta.readOnly = true;
        ta.style.width = '100%';
        output?.appendChild(ta);
    }

    return false; // Don't reload the page
}

form?.addEventListener('submit', handleSubmit);