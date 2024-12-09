export interface CartItem {
    menuId: string;      // ID menu (harus string, sesuai penggunaan dalam prisma.create)
    quantity: number;    // Jumlah barang yang dibeli
    subtotal: number;    // Harga subtotal (quantity * harga per item)
  }
// types/checkout.ts
// types/checkout.ts
export interface Menu {
  id: string;
  name: string;
  price: number;
  fotoUrl: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  menuId: string;
  menu: Menu;
  quantity: number;
}

export interface BaseCheckoutFormProps {
  cartItems: CartItem[];
  onClose: () => void;
}

export interface EditCheckoutFormProps extends BaseCheckoutFormProps {
  id: string;
  onSuccess: (updatedData: any) => void;
}

export type PaymentMethodType = 'CASH' | 'QRIS';

export interface Transaction {
  id: string;
  items: CartItem[];
  note: string;
  paymentMethod: PaymentMethodType;
  cashAmount: number | null;
  change: number | null;
  referralCode: string | null;
  discount: number;
}