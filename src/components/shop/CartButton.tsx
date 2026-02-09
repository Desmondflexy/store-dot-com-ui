export default function CartButton(prop: Prop) {
    const { qty, onIncrease, onDecrease } = prop
    return <>
        <button onClick={onDecrease} disabled={qty <= 0}>-</button>
        <span>{qty}</span>
        <button onClick={onIncrease}>+</button>
    </>
}

type Prop = {
    qty: number;
    onIncrease: () => void;
    onDecrease: () => void;
};