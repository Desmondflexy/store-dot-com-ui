import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ROUTES_PATH } from "../../utils/routes";
import "./Checkout.css";
import { useEffect, useState } from "react";
import { apiService } from "../../lib/api.service";

export default function Checkout() {
    const { register, handleSubmit, watch } = useForm<CheckoutForm>();
    const [userAddresses, setUserAddresses] = useState<Address[]>([]);
    const [shopAddresses, setShopAddresses] = useState<Address[]>([]);

    const deliveryMethod = watch("deliveryMethod");

    const onSubmit = (data: CheckoutForm) => {
        console.log(data);
    }

    useEffect(() => {
        apiService.getUserAddress().then(res => {
            setUserAddresses(res.data);
        })
        apiService.getShopAddress().then(res => {
            setShopAddresses(res.data);
        })
    }, []);

    let addressLabel = "Pickup Station";
    let addresses = shopAddresses;
    if (deliveryMethod === "doorDelivery") {
        addressLabel = "Delivery Address";
        addresses = userAddresses;
    }

    return <div className="checkout-form">
        <h2>Checkout Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <p>Fill shipping details</p>

            <fieldset>
                <legend>Delivery Method</legend>
                <div>
                    <input {...register("deliveryMethod")} id="pickupStation" value="pickupStation" type="radio" required />
                    <label htmlFor="pickupStation">Pickup station</label>
                </div>
                <div>
                    <input {...register("deliveryMethod")} id="doorDelivery" value="doorDelivery" type="radio" defaultChecked required />
                    <label htmlFor="doorDelivery">Door delivery</label>
                </div>
            </fieldset>

            <fieldset>
                <legend>{addressLabel}</legend>
                {
                    addresses.map(i => (
                        <div key={i.id}>
                            <input {...register("deliveryAddressId")} id={`deliveryAddressId-${i.id}`} value={i.id} type="radio" required />
                            <label htmlFor={`deliveryAddressId-${i.id}`}>{i.street} {i.city}</label>
                        </div>
                    ))
                }
                {deliveryMethod === "doorDelivery" && <Link to="#">Add new address</Link>}
            </fieldset>

            <fieldset>
                <legend>Payment Method</legend>
                <div>
                    <input {...register("paymentMethod")} value="card" id="paymentMethod-card" type="radio" required />
                    <label htmlFor="paymentMethod-card">Card</label>
                </div>
                <div>
                    <input {...register("paymentMethod")} value="payOnDelivery" id="paymentMethod-payOnDelivery" type="radio" required />
                    <label htmlFor="paymentMethod-payOnDelivery">Pay on delivery</label>
                </div>
                <div>
                    <input {...register("paymentMethod")} value="transfer" id="paymentMethod-transfer" type="radio" disabled required />
                    <label htmlFor="paymentMethod-transfer">Transfer</label>
                </div>
                <div>
                    <input {...register("paymentMethod")} value="wallet" id="paymentMethod-wallet" type="radio" disabled required />
                    <label htmlFor="paymentMethod-wallet">Wallet</label>
                </div>
            </fieldset>

            <div className="button">
                <button>Next</button>
            </div>
        </form>
        <p>Continue shopping? <Link to={ROUTES_PATH.SHOP_PRODUCTS}>Click here</Link></p>
    </div>
}

type CheckoutForm = {
    deliveryMethod: string;
    deliveryAddressId: string;
    paymentMethod: string;
}