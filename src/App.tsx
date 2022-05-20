import { useState } from 'react';
import { useQuery } from 'react-query';
//Components
import Drawer from '@mui/material/Drawer';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Item from './Item/Item';
import Cart from './Cart/Cart';
//Styles
import { Wrapper, Header, StyledButton, SiteTitle } from './App.styles';
//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType> => (
  await (await fetch('https://fakestoreapi.com/products')).json()
)

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType>('products', getProducts);
  console.log(data);

  const getTotalItems = (items: CartItemType[]) => 
    items.reduce((ack: number, item) => ack + item.amount, 0)

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      //1. Item já está no carrinho?
      const isItemInCart = prev.find(item => item.id === clickedItem.id)
      if(isItemInCart) {
        return prev.map(item => (
          item.id === clickedItem.id
           ? {...item, amount: item.amount + 1}
           : item
        ));
      }

      //2. Primeira vez adicionando o items
      return [...prev, {...clickedItem, amount: 1}]
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if(item.id === id) {
          if(item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1}];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    ));
  };
  
  if(isLoading) return <LinearProgress />
  if(error) return <div>Ocorreu um erro... Tente novamente.</div>

  return (
    <Wrapper>
      <Drawer anchor='right' 
      open={cartOpen} 
      onClose={() => setCartOpen(false)}>
        <Cart 
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <Header>
        <SiteTitle variant='h3'>
        Loja Virtual
        </SiteTitle>
        <div>
          <StyledButton onClick={() => setCartOpen(true)}>
            <Badge badgeContent={getTotalItems(cartItems)} color='error'>
              <AddShoppingCartIcon />
            </Badge>
          </StyledButton>
        </div>
      </Header>
      <Grid container spacing={3}>
        {Array.isArray(data) && data.length && data.map(item => (
              <Grid item key={item.id} xs={12} sm={4}>
                <Item item={item} 
                handleAddToCart={handleAddToCart} />
              </Grid>
            ))          
        }
      </Grid>
    </Wrapper>
  );
}
