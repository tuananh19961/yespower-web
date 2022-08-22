import crypto from 'crypto-js';

export function millis() {
    return new Date().getTime();
}

export function arr2hex(uint8Array) {
    return uint8Array.reduce((a, b) => a + b.toString(16).padStart(2, '0'), '');
}

export function hex2arr(hex) {
    const bytes = []
    for (let c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return new Uint8Array(bytes);
}

export function hex2arrU32(hex) {
    const bytes = []
    for (let c = 0; c < hex.length; c += 2) {
        bytes.push(parseInt(hex.substr(c, 2), 16));
    }
    return new Uint32Array(new Uint8Array(bytes).buffer);
}

export function sha256d(hex) {
    return crypto.SHA256(crypto.SHA256(crypto.enc.Hex.parse(hex))).toString();
}

export function swap32(val) {
    return ((val >> 24) & 0xff) | ((val >> 8) & 0xff00) | ((val << 8) & 0xff0000) | ((val << 24) & 0xff000000);
}

export function swap32Arr(arr) {
    for (let i = 0; i < 8; i++) {
        arr[i] = swap32(arr[i]);
    }
    return arr;
}

export function swap32Hex(hex) {
    const arr = hex.match(/(..?)/g);
    return arr[3] + arr[2] + arr[1] + arr[0];
}