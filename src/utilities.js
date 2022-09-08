//Hash method
String.prototype.hashCode = function() {
    let hash = 0
    let chr;
    if (this.length === 0)
        return hash;
    for (let i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

export async function encryptData(data) {
    const dataUTF8 = new TextEncoder().encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataUTF8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map(s => s.toString(16).padStart(2, '0')).join('');

    return hash;
}