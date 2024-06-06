export function getStore(name: string) {
    return JSON.parse(localStorage.getItem(name)!);
}

export function setStore(name: string, store: any) {
    const content = JSON.stringify(store);
    localStorage.setItem(name, content);
}

export function removeStore(name: string) {
    localStorage.removeItem(name);
}

export function clearStore() {
    localStorage.clear();
}