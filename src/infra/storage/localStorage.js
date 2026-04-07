export const storage = {
    get: (key) => {
        try {
            const value = localStorage.getItem(key);
            if (!value) return null;

            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        } catch (err) {
            console.error("Localstorage error:", err);
            return null;
        }
    },

    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.error("Localstorage error:", err);
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (err) {
            console.error("Localstorage error:", err);
        }
    },

    clear: () => {
        try {
            localStorage.clear();
        } catch (err) {
            console.error("Localstorage rror:", err);
        }
    },

    has: (key) => {
        try {
            return localStorage.getItem(key) !== null;
        } catch {
            return false;
        }
    },
};