interface MockStorage {
    [key: string]: string;
}

export const createMockLocalStorage = () => {
    const storage: MockStorage = {};

    return {
        getItem: vi.fn((key: string) => storage[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            storage[key] = value;
        }),
        removeItem: vi.fn((key: string) => {
            delete storage[key];
        }),
        clear: vi.fn(() => {
            Object.keys(storage).forEach(key => delete storage[key]);
        }),
        get length() {
            return Object.keys(storage).length;
        },
        key: vi.fn((index: number) => {
            const keys = Object.keys(storage);
            return keys[index] || null;
        })
    };
};
