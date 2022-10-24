import { Button, Offcanvas, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import CartItem from '../components/CartItem';
import { formatCurrency } from '../utilities/formatCurrency';
import storeItems from '../data/items.json';

type ShoppingCartProps = {
    isOpen: boolean,
};

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
    const { closeCart, cartItems } = useShoppingCart();

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='d-flex text-primary fw-bold'>
                    <svg
                        style={{ width: '2rem', height: '2rem', marginRight: '0.4rem' }}
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    Your Cart
                </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.length !== 0 ? (
                        <>
                            {cartItems.map(item => (
                                <CartItem key={item.id} {...item} />
                            ))}
                            <hr />
                            <div className='ms-auto fw-bold fs-5'>
                                Grand Total {formatCurrency(cartItems.reduce((total, cartItem) => {
                                    const item = storeItems.find(i => i.id === cartItem.id);
                                    return total + (item?.price || 0) * cartItem.quantity;
                                }, 0))}
                            </div>
                        </>
                    ) : (
                        <div className='text-muted text-center'>
                            <p style={{ fontStyle: 'italic' }}>Your Cart is Empty</p>
                            <Button variant='outline-primary' href='/store'>Buy items</Button>
                        </div>
                    )}

                    <Button variant='outline-primary'>Pay Now</Button>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas >
    )
}

export default ShoppingCart;