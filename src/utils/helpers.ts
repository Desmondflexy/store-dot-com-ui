export function formatNumber(num: number, frac:number) {
    // num /= 100;
    const formattedNumber = new Intl.NumberFormat('en-US', {
        // style: 'currency',
        // currency: 'ngn',
        minimumFractionDigits: frac,
        maximumFractionDigits: frac
    }).format(num);

    return "₦" + formattedNumber;
}

/**Show paystack payment window */
// export function payWithPaystack(email: string, amount: number, callback: (response: { reference: string }) => void) {
//     const handler = PaystackPop.setup({
//         key: import.meta.env.VITE_APP_PAYSTACK_PUBLIC,
//         email,
//         amount,
//         onClose: () => console.log('window closed!'),
//         callback
//     });
//     handler.openIframe();
// }

export function formatDateTime(date: string) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const hour = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hour}:${minutes}`;
}

export function greet() {
    const date = new Date();
    const hour = date.getHours();
    if (hour < 12) {
        return 'Good morning';
    } else if (hour < 17) {
        return 'Good afternoon';
    } else {
        return 'Good evening';
    }
}

export function handleErrorToast(err: any, toast: any, warn: boolean = false) {
    let xx = 'error';
    if (warn) xx = 'warn';
    if (err.response) {
        const error = err.response.data.message;
        if (typeof error === "string") {
            toast[xx](error);
        } else {
            toast[xx](error[0]);
        }
    } else {
        toast[xx](err.message);
    }
}

export function shortenText(text: string, maxLength: number) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + ' ...';
}

export function getCartItemsCount(items: IItem[]) {
    if (!items) return 0;
    return items.reduce((s, i) => s + i.quantity, 0);
}

export function getCartTotal(items: IItem[]) {
    return items.reduce((s, i) => s + i.unitPrice * i.quantity, 0)
}

export const broadcastLogin = () =>
    localStorage.setItem("login-event", Date.now().toString());

export const broadcastLogout = () =>
    localStorage.setItem("logout-event", Date.now().toString());