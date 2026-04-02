import styles from './StoreFront.module.css';
import { ShoppingCart, ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  url: string;
}

export function StoreFront() {
  const products: Product[] = [
    {
      id: '1',
      name: 'Moletom Skorpion Limited Edition',
      price: 'R$ 189,90',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600&h=600',
      url: '#'
    },
    {
      id: '2',
      name: 'Mousepad Skorpion Speed Gen-2',
      price: 'R$ 99,90',
      image: 'https://images.unsplash.com/photo-1615663245857-ac1eeb536fcb?auto=format&fit=crop&q=80&w=600&h=600',
      url: '#'
    },
    {
      id: '3',
      name: 'Keycap Artesanal Skorpion',
      price: 'R$ 59,90',
      image: 'https://images.unsplash.com/photo-1618384881928-34384906d221?auto=format&fit=crop&q=80&w=600&h=600',
      url: '#'
    }
  ];

  return (
    <section className={styles.storeSection}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>Loja do Canal</h2>
          <div className={styles.divider} />
        </div>
        <button className={styles.allButton}>
          Ver Catálogo <ArrowRight size={18} />
        </button>
      </div>

      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <img src={product.image} alt={product.name} className={styles.image} />
              <div className={styles.overlay}>
                <button className={styles.cartButton}>
                  <ShoppingCart size={20} /> Adicionar
                </button>
              </div>
            </div>
            <div className={styles.info}>
              <h3 className={styles.productName}>{product.name}</h3>
              <span className={styles.price}>{product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}