import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string,
    description: string,
}

const StoreItem = ({ id, name, price, imgUrl, description }: StoreItemProps) => {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart();
    const quantity = getItemQuantity(id);

    return (
        <Card className='h-100'>
            <Card.Img
                variant='top'
                src={imgUrl}
                height='200px'
                style={{ objectFit: 'cover' }}
            />

            <Card.Body className='d-flex flex-column'>
                <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
                    <span className='fs-2'>{name}</span>
                    <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
                </Card.Title>

                <p>{description}</p>

                <div className='mt-auto' >
                    {quantity === 0 ? (
                        <Button variant='outline-primary' className='w-100' onClick={() => increaseCartQuantity(id)}>
                            Add to Cart
                        </Button>
                    ) : (
                        <div>
                            <div className='align-items-center justify-content-center d-flex mb-3' style={{ gap: '1rem' }}>
                                <Button variant='outline-primary' className='w-100' onClick={() => increaseCartQuantity(id)}>
                                    +
                                </Button>

                                <span className='fs-3 fw-bold text-primary'>{quantity}</span>

                                <Button variant='outline-primary' className='w-100' onClick={() => decreaseCartQuantity(id)}>
                                    -
                                </Button>
                            </div>

                            <div>
                                <Button variant='outline-primary' className='w-100 btn-outline-danger' onClick={() => removeFromCart(id)}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    )
}

export default StoreItem;